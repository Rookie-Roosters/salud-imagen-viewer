import * as React from "react";
import { useEffect, useState } from "react";
import {
    SquareUserRound,
    ClipboardPenLine,
    PencilRuler,
    LayoutPanelLeft,
    Share,
    LifeBuoy,
    X
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose
} from "~/components/ui/drawer";
import {
    ComposicionView,
    PacienteView,
    ResultadosView,
    HerramientasView,
    CompartirView,
    AccesibilidadView
} from "~/components/ui/navigation-views";

export type LayoutType = "single" | "2x2" | "3x3" | "1x2" | "2x1";

// Navigation data
const navItems = [
    {
        title: "Paciente",
        icon: SquareUserRound,
    },
    {
        title: "Resultados",
        icon: ClipboardPenLine,
    },
    {
        title: "Herramientas",
        icon: PencilRuler,
    },
    {
        title: "Composición",
        icon: LayoutPanelLeft,
    },
    {
        title: "Compartir",
        icon: Share,
    },
    {
        title: "Accesibilidad",
        icon: LifeBuoy,
    },
];

interface MobileNavigationProps {
    layoutType?: LayoutType;
    setLayoutType?: (layout: LayoutType) => void;
    isMultiSelectMode?: boolean;
    setIsMultiSelectMode?: (mode: boolean) => void;
}

export function MobileNavigation({
    layoutType,
    setLayoutType,
    isMultiSelectMode,
    setIsMultiSelectMode,
}: MobileNavigationProps) {
    const [activeItem, setActiveItem] = useState(navItems[0]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Render the appropriate view based on the active item
    const renderView = () => {
        if (!layoutType || !setLayoutType || !setIsMultiSelectMode) {
            return null;
        }

        switch (activeItem.title) {
            case "Paciente":
                return <PacienteView />;
            case "Resultados":
                return <ResultadosView />;
            case "Herramientas":
                return <HerramientasView />;
            case "Composición":
                return (
                    <ComposicionView
                        layoutType={layoutType}
                        setLayoutType={setLayoutType}
                        setIsMultiSelectMode={setIsMultiSelectMode}
                    />
                );
            case "Compartir":
                return <CompartirView />;
            case "Accesibilidad":
                return <AccesibilidadView />;
            default:
                return null;
        }
    };

    const handleNavItemClick = (item: typeof navItems[0]) => {
        setActiveItem(item);
        setIsDrawerOpen(true);
    };

    return (
        <>
            {/* Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-sm">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <Button
                            key={item.title}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "flex flex-col items-center justify-center h-full rounded-none px-1",
                                activeItem.title === item.title ? "text-primary" : "text-muted-foreground"
                            )}
                            onClick={() => handleNavItemClick(item)}
                        >
                            <item.icon className="h-5 w-5 mb-1" />
                            <span className="text-xs">{item.title}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Drawer for Content */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="bottom">
                <DrawerContent className="h-[70vh] max-h-[calc(100vh-230px)] rounded-t-xl">
                    <DrawerHeader className="border-b sticky top-0 bg-background z-10">
                        <div className="flex items-center justify-between">
                            <DrawerTitle>{activeItem.title}</DrawerTitle>
                            <DrawerClose asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-4 w-4" />
                                </Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>
                    <div className="p-4 overflow-auto h-full">
                        {renderView()}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
} 