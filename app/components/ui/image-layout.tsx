import React from "react"
import { cn } from "~/lib/utils"
import { type Image } from "./image-carousel"
import { type LayoutType } from "./navigation-bar"

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

    return (
        <div
            className={cn(
                "w-full h-full grid",
                gridConfig,
                className
            )}
            {...props}
        >
            {cells.map(({ image, index }) => (
                <div
                    key={index}
                    className={cn(
                        "flex items-center justify-center bg-black overflow-hidden",
                        image ? "border-2" : "border border-gray-800"
                    )}
                    style={image?.borderColor ? {
                        borderColor: image.borderColor
                    } : {}}
                >
                    {image && (
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full rounded-md object-contain p-2"
                        />
                    )}
                </div>
            ))}
        </div>
    )
} 