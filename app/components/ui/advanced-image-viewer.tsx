import React, { useRef, useState, useEffect } from 'react';
import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { Button } from './button';
import { useCornerstone } from '../../hooks/use-cornerstone';
import Minimap from './minimap';
import ImageAnnotations from './image-annotations';
import type { Annotation } from './image-annotations';

interface AdvancedImageViewerProps {
    imageIds?: string[];
    width?: string | number;
    height?: string | number;
    className?: string;
    tools?: string[];
    onImageRendered?: (element: HTMLDivElement, imageId: string) => void;
    onMeasurementComplete?: (measurement: any) => void;
}

export const AdvancedImageViewer: React.FC<AdvancedImageViewerProps> = ({
    imageIds = [],
    tools = ['Pan', 'Zoom', 'WindowLevel', 'StackScroll'],
    width = '100%',
    height = '500px',
    className = '',
    onImageRendered,
    onMeasurementComplete,
}) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTool, setActiveTool] = useState('');
    const [viewportId] = useState('advancedViewerViewport');
    const [engineId] = useState('advancedViewerEngine');
    const [toolGroupId] = useState('advancedViewerToolGroup');
    const [isClient, setIsClient] = useState(false);
    const [showMinimap, setShowMinimap] = useState(true);
    const [imageSource, setImageSource] = useState<string | null>(null);
    const [transformState, setTransformState] = useState({
        scale: 1,
        positionX: 0,
        positionY: 0
    });
    const [showAnnotations, setShowAnnotations] = useState(true);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);

    // Using our custom Cornerstone hook
    const {
        isInitialized,
        isLoading,
        error,
        createViewport,
        createToolGroup,
        loadAndDisplayImage,
        getToolByName
    } = useCornerstone();

    const [viewport, setViewport] = useState<any>(null);
    const [toolGroup, setToolGroup] = useState<any>(null);

    // Set client-side flag on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Setup viewport and tools when cornerstone is initialized
    useEffect(() => {
        if (!isClient || !isInitialized || !viewportRef.current || imageIds.length === 0) return;

        const setup = async () => {
            try {
                // Create viewport
                const element = viewportRef.current as HTMLDivElement;
                const viewportData = await createViewport(element, engineId, viewportId);
                setViewport(viewportData.viewport);

                // Create tool group
                const newToolGroup = createToolGroup(toolGroupId, viewportId, engineId, tools);
                setToolGroup(newToolGroup);

                // Set active tool
                if (tools.length > 0) {
                    setToolActive(tools[0]);
                }

                // Load first image
                await loadAndDisplayImage(viewportData.viewport, imageIds[0]);

                // Call onImageRendered callback
                if (onImageRendered && element) {
                    onImageRendered(element, imageIds[0]);
                }
            } catch (error) {
                console.error('Error setting up viewport:', error);
            }
        };

        setup();

        // Cleanup on unmount
        return () => {
            if (viewport) {
                const renderingEngine = viewport.renderingEngine;
                if (renderingEngine) {
                    renderingEngine.disableElement(viewportId);
                }
            }
        };
    }, [isClient, isInitialized, imageIds]);

    // Update image source for minimap when image is loaded
    useEffect(() => {
        if (!viewportRef.current || !isInitialized || !viewport) return;

        // Wait a bit for the image to render fully
        const timer = setTimeout(() => {
            try {
                const canvas = viewportRef.current?.querySelector('canvas');
                if (canvas) {
                    setImageSource(canvas.toDataURL('image/png'));
                }
            } catch (error) {
                console.error('Error capturing canvas for minimap:', error);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isInitialized, viewport, currentImageIndex]);

    // Handle image navigation
    const navigateImages = (step: number) => {
        if (!viewport || imageIds.length <= 1) return;

        const newIndex = (currentImageIndex + step + imageIds.length) % imageIds.length;
        setCurrentImageIndex(newIndex);

        loadAndDisplayImage(viewport, imageIds[newIndex])
            .then(() => {
                if (onImageRendered && viewportRef.current) {
                    onImageRendered(viewportRef.current, imageIds[newIndex]);
                }
            })
            .catch(error => {
                console.error('Error navigating images:', error);
            });
    };

    // Tool selection
    const setToolActive = (toolName: string) => {
        if (!toolGroup) return;

        const tool = getToolByName(toolName);
        if (tool) {
            toolGroup.setToolActive(tool.name, { bindings: [{ mouseButton: 1 }] });
            setActiveTool(toolName);
        }
    };

    // Reset view - works with both the TransformWrapper and Cornerstone
    const resetView = () => {
        // Reset the Cornerstone viewport
        if (viewport) {
            viewport.resetCamera();
            viewport.render();
        }

        // Reset the react-zoom-pan-pinch transformation
        if (transformComponentRef.current) {
            transformComponentRef.current.resetTransform();
        }
    };

    // Export current image
    const exportImage = () => {
        if (!viewport || !viewportRef.current) return;

        try {
            // Get the canvas element from the cornerstone viewport
            const canvas = viewportRef.current.querySelector('canvas');
            if (!canvas) return;

            // Create a temporary link element to download the image
            const link = document.createElement('a');
            link.download = `dicom-image-${currentImageIndex + 1}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    // Rotate image
    const rotateImage = (degrees: number) => {
        if (!viewport) return;

        try {
            // Get current camera parameters
            const camera = viewport.getCamera();

            // Set the rotation angle
            camera.roll += degrees * (Math.PI / 180);

            // Update the viewport camera
            viewport.setCamera(camera);
            viewport.render();
        } catch (error) {
            console.error('Error rotating image:', error);
        }
    };

    // Flip image horizontally or vertically
    const flipImage = (direction: 'horizontal' | 'vertical') => {
        if (!viewport) return;

        try {
            // Get current camera parameters
            const camera = viewport.getCamera();

            // Apply flip
            if (direction === 'horizontal') {
                camera.flipHorizontal = !camera.flipHorizontal;
            } else {
                camera.flipVertical = !camera.flipVertical;
            }

            // Update the viewport camera
            viewport.setCamera(camera);
            viewport.render();
        } catch (error) {
            console.error('Error flipping image:', error);
        }
    };

    // Handle position change from minimap
    const handleMinimapPositionChange = (x: number, y: number) => {
        if (transformComponentRef.current) {
            transformComponentRef.current.setTransform(x, y, transformState.scale);
        }
    };

    // Handle adding a new annotation
    const handleAnnotationAdd = (annotation: Annotation) => {
        setAnnotations(prev => [...prev, annotation]);
    };

    // Handle deleting an annotation
    const handleAnnotationDelete = (id: string) => {
        setAnnotations(prev => prev.filter(a => a.id !== id));
    };

    // If we're not in a browser or not mounted yet, render a placeholder
    if (!isClient) {
        return (
            <div
                className={`flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <div className="text-center">
                    <div className="animate-pulse bg-gray-300 h-6 w-32 mx-auto mb-2 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-4 w-48 mx-auto rounded"></div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <div className="flex items-center justify-center" style={{ width, height }}>Loading advanced image viewer...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center text-red-500" style={{ width, height }}>{error}</div>;
    }

    return (
        <div className={`flex flex-col ${className}`}>
            {/* Main toolbar */}
            <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b">
                <div className="flex gap-1">
                    {/* Tools section */}
                    {tools.map((tool) => (
                        <Button
                            key={tool}
                            variant={activeTool === tool ? "default" : "outline"}
                            size="sm"
                            onClick={() => setToolActive(tool)}
                        >
                            {tool}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-1 ml-auto">
                    {/* View manipulation section */}
                    <Button variant="outline" size="sm" onClick={resetView}>Reset</Button>
                    <Button variant="outline" size="sm" onClick={() => rotateImage(90)}>Rotate 90°</Button>
                    <Button variant="outline" size="sm" onClick={() => flipImage('horizontal')}>Flip H</Button>
                    <Button variant="outline" size="sm" onClick={() => flipImage('vertical')}>Flip V</Button>
                    <Button variant="outline" size="sm" onClick={exportImage}>Export</Button>
                    <Button
                        variant={showMinimap ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowMinimap(!showMinimap)}
                    >
                        Minimap
                    </Button>
                    <Button
                        variant={showAnnotations ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowAnnotations(!showAnnotations)}
                    >
                        Annotations
                    </Button>
                </div>
            </div>

            {/* Image viewport with react-zoom-pan-pinch wrapper */}
            <div className="relative">
                <TransformWrapper
                    ref={transformComponentRef}
                    initialScale={1}
                    minScale={0.5}
                    maxScale={10}
                    centerOnInit
                    doubleClick={{
                        mode: "reset"
                    }}
                    panning={{
                        excluded: ['cornerstone-viewport']
                    }}
                    onTransformed={(ref) => {
                        setTransformState({
                            scale: ref.state.scale,
                            positionX: ref.state.positionX,
                            positionY: ref.state.positionY
                        });
                    }}
                >
                    {({ zoomIn, zoomOut }) => (
                        <>
                            <TransformComponent wrapperStyle={{ width, height }}>
                                <div
                                    ref={viewportRef}
                                    className="cornerstone-viewport"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </TransformComponent>

                            {/* Zoom controls */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => zoomIn()}>+</Button>
                                <Button variant="outline" size="sm" onClick={() => zoomOut()}>-</Button>
                            </div>
                        </>
                    )}
                </TransformWrapper>

                {/* Minimap */}
                {showMinimap && imageSource && (
                    <div className="absolute top-4 right-4">
                        <Minimap
                            sourceImage={imageSource}
                            viewportWidth={typeof width === 'number' ? width : 500}
                            viewportHeight={typeof height === 'number' ? height : 500}
                            scale={transformState.scale}
                            positionX={transformState.positionX}
                            positionY={transformState.positionY}
                            onPositionChange={handleMinimapPositionChange}
                        />
                    </div>
                )}

                {/* Annotations layer */}
                {showAnnotations && (
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <ImageAnnotations
                            annotations={annotations}
                            onAnnotationAdd={handleAnnotationAdd}
                            onAnnotationDelete={handleAnnotationDelete}
                            containerWidth={typeof width === 'string' ? parseInt(width) : width as number}
                            containerHeight={typeof height === 'string' ? parseInt(height) : height as number}
                            scale={transformState.scale}
                            offsetX={transformState.positionX}
                            offsetY={transformState.positionY}
                        />
                    </div>
                )}
            </div>

            {/* Image navigation controls */}
            {imageIds.length > 1 && (
                <div className="flex justify-between p-2 bg-gray-100 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateImages(-1)}
                        disabled={imageIds.length <= 1}
                    >
                        Previous
                    </Button>
                    <span>{currentImageIndex + 1} / {imageIds.length}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateImages(1)}
                        disabled={imageIds.length <= 1}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdvancedImageViewer; 