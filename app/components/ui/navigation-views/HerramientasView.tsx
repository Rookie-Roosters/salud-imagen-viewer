import React from "react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Slider } from "~/components/ui/slider"
import { Label } from "~/components/ui/label"
import {
    Move,
    ZoomIn,
    Contrast,
    PencilLine,
    Ruler,
    RotateCcw,
    RotateCw,
    FlipHorizontal,
    FlipVertical,
    Scissors,
    Highlighter,
    Eraser,
    Brush,
    Pipette,
    Circle,
    Square,
    ArrowUpRight,
    Type,
    Pen
} from "lucide-react"

export function HerramientasView() {
    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <div>
                    <Label className="text-base font-medium">Anotación</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <PencilLine className="h-4 w-4" />
                            <span className="text-xs">Anotación</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Pen className="h-4 w-4" />
                            <span className="text-xs">Dibujar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Ruler className="h-4 w-4" />
                            <span className="text-xs">Medición</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Highlighter className="h-4 w-4" />
                            <span className="text-xs">Resaltar</span>
                        </Button>
                    </div>

                    <div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                                <Square className="h-4 w-4" />
                                <span className="text-xs">Rectángulo</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                                <Circle className="h-4 w-4" />
                                <span className="text-xs">Círculo</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="text-xs">Flecha</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                                <Type className="h-4 w-4" />
                                <span className="text-xs">Texto</span>
                            </Button>
                        </div>
                    </div>

                </div>

                <Separator />

                <div className="space-y-2">
                    <Label className="text-base font-medium">Navegación</Label>
                    <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Move className="h-4 w-4" />
                            <span className="text-xs">Mover</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <ZoomIn className="h-4 w-4" />
                            <span className="text-xs">Zoom</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <RotateCw className="h-4 w-4" />
                            <span className="text-xs">Rotar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <FlipHorizontal className="h-4 w-4" />
                            <span className="text-xs">Voltear</span>
                        </Button>
                    </div>
                </div>


                <Separator />

                <div className="space-y-2">
                    <Label className="text-base font-medium">Segmentación</Label>
                    <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Scissors className="h-4 w-4" />
                            <span className="text-xs">Segmentar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Brush className="h-4 w-4" />
                            <span className="text-xs">Pintar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Pipette className="h-4 w-4" />
                            <span className="text-xs">Muestra</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2">
                            <Eraser className="h-4 w-4" />
                            <span className="text-xs">Borrar</span>
                        </Button>
                    </div>
                </div>


            </div>


            <Separator />

            <div className="space-y-2">
                <Label className="text-base font-medium">Ajustes de imagen</Label>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-sm">Brillo</Label>
                            <span className="text-sm text-muted-foreground">50%</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-sm">Contraste</Label>
                            <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <Slider defaultValue={[75]} max={100} step={1} />
                    </div>
                </div>
            </div>


        </div>
    )
} 