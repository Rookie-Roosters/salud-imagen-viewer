import React from "react"
import { cn } from "~/lib/utils"
import { Button } from "./button"

export interface Image {
    src: string
    alt: string
    selected?: boolean
    borderColor?: string
}

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    images: Image[]
    onImageSelect?: (image: Image) => void
    multiSelectMode?: boolean
    onMultiSelect?: (image: Image, index: number) => void
    selectedImages?: Image[]
}

const ImageCarousel = React.forwardRef<HTMLDivElement, ImageCarouselProps>(
    ({ className, images, onImageSelect, multiSelectMode = false, onMultiSelect, selectedImages = [], ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex items-center justify-center gap-4 overflow-x-auto py-4 no-scrollbar", className)}
                {...props}
            >
                {images.map((image, index) => {
                    // Find if this image is in selectedImages array
                    const selectedImageMatch = multiSelectMode
                        ? selectedImages.find(img => img.src === image.src)
                        : null;

                    const isSelected = !!selectedImageMatch;
                    // Use the borderColor from the matched selected image
                    const borderColor = selectedImageMatch?.borderColor;

                    return (
                        <div
                            key={index}
                            className="relative flex-shrink-0 cursor-pointer"
                            onClick={() => {
                                if (multiSelectMode && onMultiSelect) {
                                    onMultiSelect(image, index);
                                } else if (onImageSelect) {
                                    onImageSelect(image);
                                }
                            }}
                        >
                            <div
                                className={cn(
                                    "h-24 w-24 p-px bg-black rounded-md overflow-hidden",
                                    isSelected ? "border-2" : "border border-gray-700"
                                )}
                                style={borderColor ? { borderColor } : {}}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="h-full w-full object-cover rounded-sm"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
)
ImageCarousel.displayName = "ImageCarousel"

export { ImageCarousel } 