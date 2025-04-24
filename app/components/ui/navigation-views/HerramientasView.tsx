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
import { useImageTools, type ImageToolType } from "~/contexts/image-tools-context"

export function HerramientasView() {
    const {
        activeTool,
        setActiveTool,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        rotateCW,
        rotateCCW,
        toggleHorizontalFlip,
        toggleVerticalFlip,
        resetTransform
    } = useImageTools()

    // Helper to set the active tool
    const handleToolClick = (tool: ImageToolType) => {
        setActiveTool(tool === activeTool ? "none" : tool)
    }

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <div>
                    <Label className="text-base font-medium">Anotación</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        <Button
                            variant={activeTool === "annotation" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("annotation")}
                        >
                            <PencilLine className="h-4 w-4" />
                            <span className="text-xs">Anotación</span>
                        </Button>
                        <Button
                            variant={activeTool === "draw" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("draw")}
                        >
                            <Pen className="h-4 w-4" />
                            <span className="text-xs">Dibujar</span>
                        </Button>
                        <Button
                            variant={activeTool === "measure" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("measure")}
                        >
                            <Ruler className="h-4 w-4" />
                            <span className="text-xs">Medición</span>
                        </Button>
                        <Button
                            variant={activeTool === "highlight" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("highlight")}
                        >
                            <Highlighter className="h-4 w-4" />
                            <span className="text-xs">Resaltar</span>
                        </Button>
                    </div>

                    <div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <Button
                                variant={activeTool === "rectangle" ? "default" : "outline"}
                                size="sm"
                                className="flex flex-col gap-1 h-auto py-2"
                                onClick={() => handleToolClick("rectangle")}
                            >
                                <Square className="h-4 w-4" />
                                <span className="text-xs">Rectángulo</span>
                            </Button>
                            <Button
                                variant={activeTool === "circle" ? "default" : "outline"}
                                size="sm"
                                className="flex flex-col gap-1 h-auto py-2"
                                onClick={() => handleToolClick("circle")}
                            >
                                <Circle className="h-4 w-4" />
                                <span className="text-xs">Círculo</span>
                            </Button>
                            <Button
                                variant={activeTool === "arrow" ? "default" : "outline"}
                                size="sm"
                                className="flex flex-col gap-1 h-auto py-2"
                                onClick={() => handleToolClick("arrow")}
                            >
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="text-xs">Flecha</span>
                            </Button>
                            <Button
                                variant={activeTool === "text" ? "default" : "outline"}
                                size="sm"
                                className="flex flex-col gap-1 h-auto py-2"
                                onClick={() => handleToolClick("text")}
                            >
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
                        <Button
                            variant={activeTool === "move" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("move")}
                        >
                            <Move className="h-4 w-4" />
                            <span className="text-xs">Mover</span>
                        </Button>
                        <Button
                            variant={activeTool === "zoom" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={() => handleToolClick("zoom")}
                        >
                            <ZoomIn className="h-4 w-4" />
                            <span className="text-xs">Zoom</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={rotateCW}
                        >
                            <RotateCw className="h-4 w-4" />
                            <span className="text-xs">Rotar CW</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={rotateCCW}
                        >
                            <RotateCcw className="h-4 w-4" />
                            <span className="text-xs">Rotar CCW</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                            variant={activeTool === "flipHorizontal" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={toggleHorizontalFlip}
                        >
                            <FlipHorizontal className="h-4 w-4" />
                            <span className="text-xs">Voltear H</span>
                        </Button>
                        <Button
                            variant={activeTool === "flipVertical" ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={toggleVerticalFlip}
                        >
                            <FlipVertical className="h-4 w-4" />
                            <span className="text-xs">Voltear V</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-2"
                            onClick={resetTransform}
                        >
                            <span className="text-xs">Reset</span>
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
                            <span className="text-sm text-muted-foreground">{brightness}%</span>
                        </div>
                        <Slider
                            value={[brightness]}
                            max={100}
                            step={1}
                            onValueChange={(value) => setBrightness(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-sm">Contraste</Label>
                            <span className="text-sm text-muted-foreground">{contrast}%</span>
                        </div>
                        <Slider
                            value={[contrast]}
                            max={100}
                            step={1}
                            onValueChange={(value) => setContrast(value[0])}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
} 