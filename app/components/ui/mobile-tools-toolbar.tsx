import React from "react"
import { Button } from "~/components/ui/button"
import {
    Move,
    ZoomIn,
    RotateCw,
    PencilLine,
    Ruler,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Scissors,
    Highlighter,
    Eraser,
    Brush,
    Circle,
    Square,
    ArrowUpRight,
    Type,
    MousePointer,
    X,
    Layers,
    Settings,
    ChevronRight,
    MoreHorizontal,
    PanelRight
} from "lucide-react"
import { cn } from "~/lib/utils"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "~/components/ui/drawer"
import { HerramientasView } from "~/components/ui/navigation-views"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

type ToolCategory = "select" | "draw" | "shapes" | "annotate" | "segment"
type Tool = {
    id: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    name: string;
    category: ToolCategory;
}

export function MobileToolsToolbar() {
    const [activeCategory, setActiveCategory] = React.useState<ToolCategory>("select")
    const [activeTool, setActiveTool] = React.useState<string>("pointer")
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    // Track selected tools for each category
    const [selectedTools, setSelectedTools] = React.useState<Record<ToolCategory, string>>({
        select: "pointer",
        draw: "pen",
        shapes: "rectangle",
        annotate: "annotate",
        segment: "segment"
    })

    const tools: Tool[] = [
        // Select category
        { id: "pointer", icon: MousePointer, name: "Seleccionar", category: "select" },
        { id: "move", icon: Move, name: "Mover", category: "select" },
        { id: "zoom", icon: ZoomIn, name: "Zoom", category: "select" },
        { id: "rotate", icon: RotateCw, name: "Rotar", category: "select" },

        // Draw category
        { id: "pen", icon: PencilLine, name: "Lápiz", category: "draw" },
        { id: "brush", icon: Brush, name: "Pincel", category: "draw" },
        { id: "highlight", icon: Highlighter, name: "Resaltar", category: "draw" },
        { id: "eraser", icon: Eraser, name: "Borrador", category: "draw" },

        // Shapes category
        { id: "rectangle", icon: Square, name: "Rectángulo", category: "shapes" },
        { id: "circle", icon: Circle, name: "Círculo", category: "shapes" },
        { id: "arrow", icon: ArrowUpRight, name: "Flecha", category: "shapes" },
        { id: "text", icon: Type, name: "Texto", category: "shapes" },

        // Annotate category
        { id: "annotate", icon: PencilLine, name: "Anotar", category: "annotate" },
        { id: "measure", icon: Ruler, name: "Medir", category: "annotate" },

        // Segment category
        { id: "segment", icon: Scissors, name: "Segmentar", category: "segment" },
        { id: "paint", icon: Brush, name: "Pintar", category: "segment" }
    ]

    const categoryLabels: Record<ToolCategory, string> = {
        "select": "Selección",
        "draw": "Dibujo",
        "shapes": "Formas",
        "annotate": "Anotación",
        "segment": "Segmentación"
    }

    const handleToolClick = (tool: Tool) => {
        // Update the active tool
        setActiveTool(tool.id)

        // Update the active category
        setActiveCategory(tool.category)

        // Store this selection for this category
        setSelectedTools(prev => ({
            ...prev,
            [tool.category]: tool.id
        }))
    }

    // Get category tools
    const getCategoryTools = (category: ToolCategory) => {
        return tools.filter(tool => tool.category === category)
    }

    // Get current tool
    const getCurrentTool = () => {
        return tools.find(tool => tool.id === activeTool) || tools[0]
    }

    // Get the selected tool for a category
    const getCategorySelectedTool = (category: ToolCategory) => {
        const toolId = selectedTools[category]
        return tools.find(tool => tool.id === toolId) ||
            tools.find(tool => tool.category === category) ||
            tools[0]
    }

    // Toggle drawer
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return (
        <TooltipProvider delayDuration={300}>
            <div className="md:hidden w-full">
                {/* Block Toolbar positioned directly above bottom navigation */}
                <div className="border-t bg-sidebar text-sidebar-foreground p-3">
                    {/* Main Category Toolbar */}
                    <div className="w-full flex items-center justify-center">
                        {/* Category Buttons */}
                        <div className="flex gap-3 justify-center flex-1">
                            {(Object.keys(categoryLabels) as ToolCategory[]).map((category) => {
                                const categoryTools = getCategoryTools(category)
                                const selectedTool = getCategorySelectedTool(category)
                                const ToolIcon = selectedTool.icon

                                return (
                                    <DropdownMenu key={category}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant={activeCategory === category ? "default" : "outline"}
                                                        size="icon"
                                                        className="h-12 w-12 rounded-md"
                                                        onClick={() => setActiveCategory(category)}
                                                    >
                                                        <ToolIcon className="h-6 w-6" />
                                                        <span className="sr-only">{categoryLabels[category]}</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                {categoryLabels[category]}
                                            </TooltipContent>
                                        </Tooltip>
                                        <DropdownMenuContent align="center" className="w-48">
                                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b mb-1">
                                                {categoryLabels[category]}
                                            </div>
                                            {categoryTools.map((tool) => (
                                                <DropdownMenuItem
                                                    key={tool.id}
                                                    className={cn(
                                                        "flex items-center gap-2",
                                                        selectedTools[category] === tool.id && "bg-accent/50"
                                                    )}
                                                    onClick={() => handleToolClick(tool)}
                                                >
                                                    <tool.icon className="h-5 w-5" />
                                                    <span>{tool.name}</span>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            })}
                            {/* Visual separator */}
                            {/* <div className="w-px h-8 bg-border/40"></div> */}

                            {/* Full drawer button with toggle chevron */}

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12"
                                onClick={toggleDrawer}
                            >
                                {isDrawerOpen ? (
                                    <ChevronDown className="h-6 w-6" />
                                ) : (
                                    <ChevronUp className="h-6 w-6" />
                                )}
                                <span className="sr-only">Todas las herramientas</span>
                            </Button>
                        </div>



                    </div>
                </div>

                {/* Full tools drawer */}
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="bottom">
                    <DrawerContent className="h-[70vh] max-h-[calc(100vh-230px)] rounded-t-xl">
                        <DrawerHeader className="border-b sticky top-0 bg-background z-10">
                            <div className="flex items-center justify-between">
                                <DrawerTitle>Todas las herramientas</DrawerTitle>
                                <DrawerClose asChild>
                                    <Button variant="ghost" size="icon">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </DrawerClose>
                            </div>
                        </DrawerHeader>
                        <div className="p-4 overflow-auto h-full">
                            <HerramientasView />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </TooltipProvider>
    )
} 