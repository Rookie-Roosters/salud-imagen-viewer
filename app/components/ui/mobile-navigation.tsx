import * as React from "react";
import { useEffect, useState } from "react";
import {
    SquareUserRound,
    ClipboardPenLine,
    PencilRuler,
    LayoutPanelLeft,
    Share,
    LifeBuoy,
    X,
    User,
    UserCog
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
import { StudyTitle } from "~/components/ui/study-title";
import { useUser } from "~/contexts/user-context";
import { Badge } from "~/components/ui/badge";

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
        doctorOnly: true, // Only doctors can access tools
    },
    {
        title: "Composición",
        icon: LayoutPanelLeft,
        doctorOnly: true, // Only doctors can access layout
    },
    {
        title: "Compartir",
        icon: Share,
    },
];

// Accessibility item (moved to floating button)
const accessibilityItem = {
    title: "Accesibilidad",
    icon: LifeBuoy,
};

interface MobileNavigationProps {
    layoutType?: LayoutType;
    setLayoutType?: (layout: LayoutType) => void;
    isMultiSelectMode?: boolean;
    setIsMultiSelectMode?: (mode: boolean) => void;
    studyName?: string;
}

export function MobileNavigation({
    layoutType,
    setLayoutType,
    isMultiSelectMode,
    setIsMultiSelectMode,
    studyName = "Estudio RX Tórax", // Default value as fallback
}: MobileNavigationProps) {
    const { isPatient } = useUser();
    const [activeItem, setActiveItem] = useState(navItems[0]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Filter nav items based on user type
    const filteredNavItems = navItems.filter(item => !isPatient || !item.doctorOnly);

    // Reset active item if it's a patient-restricted item
    useEffect(() => {
        if (isPatient && activeItem?.doctorOnly) {
            setActiveItem(filteredNavItems[0]);
        }
    }, [isPatient, activeItem]);

    // Render the appropriate view based on the active item
    const renderView = () => {
        if (!layoutType || !setLayoutType || !setIsMultiSelectMode) {
            return null;
        }

        // If user is a patient and tries to access doctor-only views, return null
        if (isPatient && activeItem.doctorOnly) {
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

    const handleNavItemClick = (item: typeof navItems[0] | typeof accessibilityItem) => {
        setActiveItem(item);
        setIsDrawerOpen(true);
    };

    return (
        <>
            {/* Logo and Study Name at Top Left */}
            <div className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-2">
                <img
                    src="/SaludImagen-Iso.svg"
                    alt="SaludImagen Logo"
                    width="40"
                    height="40"
                />
                <div className="flex flex-col">
                    <StudyTitle title={studyName} className="text-sm max-w-[150px]" />
                    <Badge variant={isPatient ? "secondary" : "default"} className="mt-1 text-[0.65rem] py-0 px-1.5">
                        {isPatient ? (
                            <><User className="h-2 w-2 mr-0.5" /> Paciente</>
                        ) : (
                            <><UserCog className="h-2 w-2 mr-0.5" /> Doctor</>
                        )}
                    </Badge>
                </div>
            </div>

            {/* Floating Accessibility Button (Top Right) */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background shadow-md border"
                    onClick={() => handleNavItemClick(accessibilityItem)}
                    aria-label="Accesibilidad"
                >
                    <accessibilityItem.icon className="h-5 w-5" />
                </Button>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-sidebar text-sidebar-foreground">
                <div className="flex justify-around items-center h-16">
                    {filteredNavItems.map((item) => (
                        <Button
                            key={item.title}
                            variant="ghost"
                            size="sm"
                            className="flex flex-col items-center justify-center h-full rounded-none px-1 text-muted-foreground"
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