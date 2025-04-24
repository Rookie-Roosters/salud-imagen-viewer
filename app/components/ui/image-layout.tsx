import React, { useRef, useEffect, useState } from "react"
import { cn } from "~/lib/utils"
import { type Image } from "./image-carousel"
import { type LayoutType } from "./navigation-bar"
import {
    TransformWrapper,
    TransformComponent,
    type ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch'
import { useImageTools } from "~/contexts/image-tools-context"
import ImageDrawing from "./image-drawing"

interface DrawPath {
    id: string;
    points: { x: number; y: number }[];
    color: string;
    width: number;
}

interface ImageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedImages: Image[]
    layoutType: LayoutType
    onImageSelect?: (image: Image) => void
}

const layoutGridConfigs = {
    "single": "grid-cols-1 grid-rows-1",
    "2x2": "grid-cols-2 grid-rows-2",
    "3x3": "grid-cols-3 grid-rows-3",
    "1x2": "grid-cols-1 grid-rows-2",
    "2x1": "grid-cols-2 grid-rows-1",
}

export function ImageLayout({ selectedImages, layoutType, className, onImageSelect, ...props }: ImageLayoutProps) {
    // Default to single if no layout type specified
    const gridConfig = layoutGridConfigs[layoutType] || layoutGridConfigs.single

    const {
        activeTool,
        transformRef,
        rotation,
        horizontalFlip,
        verticalFlip,
        brightness,
        contrast,
        zoomLevel
    } = useImageTools()

    // State for drawings
    const [drawingPaths, setDrawingPaths] = useState<Record<string, DrawPath[]>>({})
    const [currentScale, setCurrentScale] = useState(1)
    const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 })
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    // Create refs for each cell in multi-layout mode
    const multiImageRefs = useRef<Record<number, ReactZoomPanPinchRef | null>>({})

    // Calculate how many grid cells we need based on the layout
    const getCellCount = () => {
        switch (layoutType) {
            case "2x2": return 4
            case "3x3": return 9
            case "1x2": return 2
            case "2x1": return 2
            default: return 1
        }
    }

    const cellCount = getCellCount()
    const cells = Array.from({ length: cellCount }).map((_, index) => {
        const image = selectedImages[index] || null
        return { image, index }
    })

    // Helper to set ref for a specific index in multi-layout mode
    const setMultiImageRef = (index: number) => (ref: ReactZoomPanPinchRef | null) => {
        if (ref) {
            multiImageRefs.current[index] = ref
        }
    }

    // Update container size on resize
    useEffect(() => {
        if (!containerRef.current) return

        const updateContainerSize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect()
                setContainerSize({ width, height })
            }
        }

        // Initial size
        updateContainerSize()

        // Update on resize
        window.addEventListener('resize', updateContainerSize)
        return () => window.removeEventListener('resize', updateContainerSize)
    }, [])

    // Handle drawing completion
    const handleDrawingComplete = (imageId: string, path: DrawPath) => {
        setDrawingPaths(prev => {
            const imagePaths = prev[imageId] || []
            return {
                ...prev,
                [imageId]: [...imagePaths, path]
            }
        })
    }

    // Update transform state when scale changes
    const handleTransformChange = (ref: ReactZoomPanPinchRef | null) => {
        if (!ref) return

        const { scale, positionX, positionY } = ref.state
        setCurrentScale(scale)
        setCurrentOffset({ x: positionX, y: positionY })
    }

    // Container styles for maximizing available space
    const containerStyle = layoutType === "single"
        ? { height: 'calc(100vh - 150px)', width: '100%' }
        : {};

    return (
        <div
            className={cn(
                "grid gap-1 bg-black",
                gridConfig,
                className
            )}
            style={containerStyle}
            {...props}
        >
            {cells.map(({ image, index }) => (
                <div
                    ref={index === 0 ? containerRef : undefined}
                    key={index}
                    className={cn(
                        "relative bg-black overflow-hidden",
                        image ? "border border-gray-700" : "border border-gray-800",
                    )}
                    style={{
                        ...(image?.borderColor ? { borderColor: image.borderColor } : {}),
                        ...(layoutType === "single" ? { width: '100%', height: '100%' } : {})
                    }}
                    onClick={() => {
                        if (image && onImageSelect && activeTool !== "draw") {
                            onImageSelect(image)
                        }
                    }}
                >
                    {image && (
                        <>
                            {image.seriesName && layoutType !== "single" && (
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
                                    {image.seriesName}
                                </div>
                            )}
                            {image.picturesCount !== undefined && layoutType !== "single" && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-md">
                                    {image.picturesCount}
                                </div>
                            )}

                            {/* Use different TransformWrapper config based on single/multi layout */}
                            {layoutType === "single" ? (
                                // Full size viewer for single layout
                                <div className="w-full h-full flex items-center justify-center">
                                    <TransformWrapper
                                        ref={transformRef}
                                        initialScale={2.5}
                                        minScale={0.1}
                                        maxScale={10}
                                        centerOnInit
                                        wheel={{
                                            disabled: activeTool !== "zoom" && activeTool !== "none",
                                            step: 0.2
                                        }}
                                        panning={{ disabled: activeTool !== "move" && activeTool !== "none" }}
                                        onTransformed={(ref) => handleTransformChange(ref)}
                                    >
                                        <TransformComponent
                                            wrapperStyle={{ width: '100%', height: '100%' }}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                style={{
                                                    maxWidth: '80vw',
                                                    maxHeight: '80vh',
                                                    objectFit: "contain",
                                                    transform: `
                                                        rotate(${rotation}deg) 
                                                        scaleX(${horizontalFlip ? -1 : 1}) 
                                                        scaleY(${verticalFlip ? -1 : 1})
                                                    `,
                                                    filter: `
                                                        brightness(${brightness / 50})
                                                        contrast(${contrast / 50})
                                                    `
                                                }}
                                            />
                                        </TransformComponent>
                                        {activeTool === "draw" && containerSize.width > 0 && (
                                            <ImageDrawing
                                                containerWidth={containerSize.width}
                                                containerHeight={containerSize.height}
                                                scale={currentScale}
                                                offsetX={currentOffset.x}
                                                offsetY={currentOffset.y}
                                                paths={drawingPaths[image.src] || []}
                                                onDrawingComplete={(path) => handleDrawingComplete(image.src, path)}
                                            />
                                        )}
                                    </TransformWrapper>
                                </div>
                            ) : (
                                // Multi-image layout
                                <div className="w-full h-full flex items-center justify-center">
                                    <TransformWrapper
                                        ref={setMultiImageRef(index)}
                                        initialScale={1.8}
                                        minScale={0.1}
                                        maxScale={5}
                                        centerOnInit
                                    >
                                        <TransformComponent
                                            wrapperStyle={{ width: '100%', height: '100%' }}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
} 