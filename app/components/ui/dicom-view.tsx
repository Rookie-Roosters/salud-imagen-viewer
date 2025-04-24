import React, { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { useCornerstone } from '../../hooks/use-cornerstone';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

interface DicomViewProps {
    imageIds?: string[];
    width?: string | number;
    height?: string | number;
    className?: string;
    tools?: string[];
    onImageRendered?: (element: HTMLDivElement, imageId: string) => void;
    onMeasurementComplete?: (measurement: any) => void;
}

export const DicomView: React.FC<DicomViewProps> = ({
    imageIds = [],
    tools = ['Pan', 'Zoom', 'WindowLevel', 'StackScroll'],
    width = '100%',
    height = '500px',
    className = '',
    onImageRendered,
    onMeasurementComplete,
}) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTool, setActiveTool] = useState('');
    const [viewportId] = useState('dicomViewerViewport');
    const [engineId] = useState('dicomViewerEngine');
    const [toolGroupId] = useState('dicomViewerToolGroup');
    const [isClient, setIsClient] = useState(false);

    // Using our custom hook
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

    // Reset view
    const resetView = () => {
        if (!viewport) return;

        // Reset the viewport camera and render
        viewport.resetCamera();
        viewport.render();
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
        return <div className="flex items-center justify-center" style={{ width, height }}>Loading DICOM viewer...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center text-red-500" style={{ width, height }}>{error}</div>;
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex gap-2 p-2 bg-gray-100 border-b">
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
                <Button variant="outline" size="sm" onClick={resetView}>Reset</Button>
            </div>

            <div
                ref={viewportRef}
                className="cornerstone-viewport relative"
                style={{ width, height }}
            />

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

export default DicomView;
