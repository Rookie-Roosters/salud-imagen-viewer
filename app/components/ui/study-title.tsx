import * as React from "react";
import { cn } from "~/lib/utils";

interface StudyTitleProps {
    title: string;
    className?: string;
}

export function StudyTitle({ title, className }: StudyTitleProps) {
    return (
        <span className={cn("font-medium truncate", className)}>
            {title}
        </span>
    );
} 