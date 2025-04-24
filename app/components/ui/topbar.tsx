import React from "react"
import { cn } from "~/lib/utils"

interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> { }

const Topbar = React.forwardRef<HTMLDivElement, TopbarProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4 shadow-sm",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)
Topbar.displayName = "Topbar"

export { Topbar } 