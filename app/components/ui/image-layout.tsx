import React, { useRef, useEffect } from "react"
import { cn } from "~/lib/utils"
import { type Image } from "./image-carousel"
import { type LayoutType } from "./navigation-bar"
import {
    TransformWrapper,
    TransformComponent,
    type ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch'
import { useImageTools } from "~/contexts/image-tools-context"

interface ImageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedImages: Image[]
    layoutType: LayoutType
}

const layoutGridConfigs = {
    "single": "grid-cols-1 grid-rows-1",
    "2x2": "grid-cols-2 grid-rows-2",
    "3x3": "grid-cols-3 grid-rows-3",
    "1x2": "grid-cols-1 grid-rows-2",
    "2x1": "grid-cols-2 grid-rows-1",
}

export function ImageLayout({ selectedImages, layoutType, className, ...props }: ImageLayoutProps) {
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

    // Apply tool behaviors based on active tool
    useEffect(() => {
        // These behaviors are handled by the TransformWrapper component
        // based on the current activeTool value
    }, [activeTool])

    return (
        <div
            className={cn(
                "w-full h-full grid gap-1",
                gridConfig,
                className
            )}
            {...props}
        >
            {cells.map(({ image, index }) => (
                <div
                    key={index}
                    className={cn(
                        "relative flex flex-col items-center justify-center bg-black overflow-hidden",
                        image ? "border-2" : "border border-gray-800"
                    )}
                    style={image?.borderColor ? {
                        borderColor: image.borderColor
                    } : {}}
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
                                <TransformWrapper
                                    ref={transformRef}
                                    initialScale={1}
                                    minScale={0.2}
                                    maxScale={8}
                                    centerOnInit
                                    limitToBounds
                                    wheel={{
                                        disabled: activeTool !== "zoom" && activeTool !== "none",
                                        step: 0.2
                                    }}
                                    panning={{ disabled: activeTool !== "move" && activeTool !== "none" }}
                                    pinch={{
                                        disabled: activeTool !== "zoom" && activeTool !== "none",
                                        step: 5
                                    }}
                                    doubleClick={{
                                        disabled: activeTool !== "zoom" && activeTool !== "none",
                                        step: 0.5
                                    }}
                                    zoomAnimation={{
                                        size: 0.2,
                                        animationTime: 0.2,
                                        animationType: "easeOut"
                                    }}
                                >
                                    <TransformComponent
                                        wrapperClass="w-full h-full"
                                        contentClass="h-full w-full"
                                    >
                                        <div
                                            className="h-full w-full flex items-center justify-center"
                                            style={{
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
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="h-full w-full rounded-md object-contain max-h-full max-w-full"
                                            />
                                        </div>
                                    </TransformComponent>
                                </TransformWrapper>
                            ) : (
                                // Multi-image layout with simple zoom/pan
                                <TransformWrapper
                                    ref={setMultiImageRef(index)}
                                    initialScale={1}
                                    minScale={0.2}
                                    maxScale={8}
                                    centerOnInit
                                    limitToBounds
                                    wheel={{ step: 0.2 }}
                                    doubleClick={{ step: 0.5 }}
                                    zoomAnimation={{
                                        size: 0.2,
                                        animationTime: 0.2,
                                        animationType: "easeOut"
                                    }}
                                >
                                    <TransformComponent
                                        wrapperClass="w-full h-full"
                                        contentClass="h-full w-full"
                                    >
                                        <div className="h-full w-full flex items-center justify-center">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="h-full w-full rounded-md object-contain max-h-full max-w-full"
                                            />
                                        </div>
                                    </TransformComponent>
                                </TransformWrapper>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
} 