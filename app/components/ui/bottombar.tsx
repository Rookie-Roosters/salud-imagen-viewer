import React from "react"
import { cn } from "~/lib/utils"
import { ImageCarousel, type Image } from "./image-carousel"

interface BottombarProps extends React.HTMLAttributes<HTMLDivElement> {
    images: Image[]
    onImageSelect?: (image: Image) => void
    onAddClick?: () => void
}

const Bottombar = React.forwardRef<HTMLDivElement, BottombarProps>(
    ({ className, images, onImageSelect, onAddClick, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-sm",
                    className
                )}
                {...props}
            >
                <ImageCarousel
                    images={images}
                    onImageSelect={onImageSelect}
                    onAddClick={onAddClick}
                />
                {children}
            </div>
        )
    }
)
Bottombar.displayName = "Bottombar"

export { Bottombar } 