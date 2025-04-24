import React from "react"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Grid2X2, Grid3X3 } from "lucide-react"
import { cn } from "~/lib/utils"
import { type LayoutType } from "~/components/ui/navigation-bar"

interface ComposicionViewProps {
    layoutType: LayoutType;
    setLayoutType: (layout: LayoutType) => void;
    setIsMultiSelectMode: (mode: boolean) => void;
}

export function ComposicionView({
    layoutType,
    setLayoutType,
    setIsMultiSelectMode
}: ComposicionViewProps) {
    // Function to handle layout selection directly
    const handleLayoutSelect = (value: LayoutType) => {
        setLayoutType(value);
        setIsMultiSelectMode(value !== "single");
    };

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <Label className="text-base font-medium">Tipo de Diseño</Label>
                <RadioGroup
                    value={layoutType}
                    onValueChange={(value: string) => {
                        setLayoutType(value as LayoutType);
                        // Set multi-select mode based on layout type
                        setIsMultiSelectMode(value !== "single");
                    }}
                    className="grid grid-cols-2 gap-2"
                >
                    <div
                        className={cn(
                            "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                            layoutType === "single" ? "border-primary bg-primary/10" : "hover:border-primary/50"
                        )}
                        onClick={() => handleLayoutSelect("single")}
                    >
                        <div className="h-8 w-8 mb-1 border-2 flex items-center justify-center">
                            <div className="w-3/4 h-3/4 border border-current"></div>
                        </div>
                        <RadioGroupItem value="single" id="single" className="sr-only" />
                        <label htmlFor="single" className="text-sm cursor-pointer">Individual</label>
                    </div>

                    <div
                        className={cn(
                            "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                            layoutType === "2x2" ? "border-primary bg-primary/10" : "hover:border-primary/50"
                        )}
                        onClick={() => handleLayoutSelect("2x2")}
                    >
                        <Grid2X2 className="h-8 w-8 mb-1" />
                        <RadioGroupItem value="2x2" id="2x2" className="sr-only" />
                        <label htmlFor="2x2" className="text-sm cursor-pointer">2×2 Cuadrícula</label>
                    </div>

                    <div
                        className={cn(
                            "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                            layoutType === "3x3" ? "border-primary bg-primary/10" : "hover:border-primary/50"
                        )}
                        onClick={() => handleLayoutSelect("3x3")}
                    >
                        <Grid3X3 className="h-8 w-8 mb-1" />
                        <RadioGroupItem value="3x3" id="3x3" className="sr-only" />
                        <label htmlFor="3x3" className="text-sm cursor-pointer">3×3 Cuadrícula</label>
                    </div>

                    <div
                        className={cn(
                            "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                            layoutType === "1x2" ? "border-primary bg-primary/10" : "hover:border-primary/50"
                        )}
                        onClick={() => handleLayoutSelect("1x2")}
                    >
                        <div className="h-8 w-8 mb-1 border-2 grid grid-rows-2 grid-cols-1">
                            <div className="border border-current"></div>
                            <div className="border border-current"></div>
                        </div>
                        <RadioGroupItem value="1x2" id="1x2" className="sr-only" />
                        <label htmlFor="1x2" className="text-sm cursor-pointer">División Vertical</label>
                    </div>

                    <div
                        className={cn(
                            "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                            layoutType === "2x1" ? "border-primary bg-primary/10" : "hover:border-primary/50"
                        )}
                        onClick={() => handleLayoutSelect("2x1")}
                    >
                        <div className="h-8 w-8 mb-1 border-2 grid grid-rows-1 grid-cols-2">
                            <div className="border border-current"></div>
                            <div className="border border-current"></div>
                        </div>
                        <RadioGroupItem value="2x1" id="2x1" className="sr-only" />
                        <label htmlFor="2x1" className="text-sm cursor-pointer">División Horizontal</label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
} 