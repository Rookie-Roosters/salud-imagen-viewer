import React from "react"
import { cn } from "~/lib/utils"
import { Button } from "./button"
import { Plus } from "lucide-react"

interface Image {
    id: string
    src: string
    alt: string
}

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    images: Image[]
    onImageSelect?: (image: Image) => void
    onAddClick?: () => void
}

const ImageCarousel = React.forwardRef<HTMLDivElement, ImageCarouselProps>(
    ({ className, images, onImageSelect, onAddClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("relative flex justify-center overflow-x-auto gap-3 p-4 no-scrollbar", className)}
                {...props}
            >
                <div className="flex gap-3">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => onImageSelect?.(image)}
                        >
                            <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {onAddClick && (
                    <div className="sticky right-4 flex-shrink-0">
                        <Button
                            variant="secondary"
                            className="aspect-square h-24 w-24 rounded-lg border"
                            onClick={onAddClick}
                        >
                            <Plus className="h-10 w-10" />
                        </Button>
                    </div>
                )}
            </div>
        )
    }
)
ImageCarousel.displayName = "ImageCarousel"

export { ImageCarousel, type Image } 