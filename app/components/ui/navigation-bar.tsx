import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, SquareUserRound, Trash2, ChevronLeft, ChevronRight, ClipboardPenLine, PencilRuler, LayoutPanelLeft, Share, Grid2X2, Grid3X3 } from "lucide-react"
import { Label } from "~/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "~/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { cn } from "~/lib/utils"
import {
    ComposicionView,
    PacienteView,
    ResultadosView,
    HerramientasView,
    CompartirView
} from "~/components/ui/navigation-views"

export type LayoutType = "single" | "2x2" | "3x3" | "1x2" | "2x1"

// This is sample data
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Paciente",
            url: "#",
            icon: SquareUserRound,
            isActive: true,
        },
        {
            title: "Resultados",
            url: "#",
            icon: ClipboardPenLine,
            isActive: false,
        },
        {
            title: "Herramientas",
            url: "#",
            icon: PencilRuler,
            isActive: false,
        },
        {
            title: "Composición",
            url: "#",
            icon: LayoutPanelLeft,
            isActive: false,
        },
        {
            title: "Compartir",
            url: "#",
            icon: Share,
            isActive: false,
        },
    ],
}

export function NavigationBar({
    isCollapsedProp,
    setIsCollapsedProp,
    layoutType,
    setLayoutType,
    isMultiSelectMode,
    setIsMultiSelectMode,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    isCollapsedProp?: boolean;
    setIsCollapsedProp?: (isCollapsed: boolean) => void;
    layoutType?: LayoutType;
    setLayoutType?: (layout: LayoutType) => void;
    isMultiSelectMode?: boolean;
    setIsMultiSelectMode?: (mode: boolean) => void;
}) {
    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    const [activeItem, setActiveItem] = useState(data.navMain[0])
    const { setOpen, open } = useSidebar()
    const [isHovering, setIsHovering] = useState(false)
    const [_isCollapsed, _setIsCollapsed] = useState(false)

    // Use either the prop values or the internal state
    const isCollapsed = isCollapsedProp !== undefined ? isCollapsedProp : _isCollapsed
    const setIsCollapsed = setIsCollapsedProp || _setIsCollapsed

    useEffect(() => {
        if (isCollapsed && isHovering) {
            setOpen(true)
        } else if (isCollapsed && !isHovering) {
            setOpen(false)
        }
    }, [isHovering, isCollapsed, setOpen])

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
            default:
                return null;
        }
    };

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...props}
        >
            {/* This is the first sidebar */}
            {/* We disable collapsible and adjust width to icon. */}
            {/* This will make the sidebar appear as icons. */}
            <Sidebar
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <img src="/SaludImagen-Iso.svg" alt="SaludImagen Logo" className="h-8 w-8 mx-auto my-2" />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.title,
                                                hidden: false,
                                            }}
                                            onClick={() => {
                                                setActiveItem(item)
                                                setOpen(true)
                                                setIsCollapsed(false)
                                            }}
                                            isActive={activeItem?.title === item.title}
                                            className="px-2.5 md:px-2"
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>


            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="font-medium text-lg">{activeItem?.title}</div>
                </SidebarHeader>
                <SidebarContent>
                    {renderView()}
                </SidebarContent>

                <SidebarFooter>

                </SidebarFooter>
            </Sidebar>


        </Sidebar>
    )
}
