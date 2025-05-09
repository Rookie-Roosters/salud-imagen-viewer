import { useState } from "react"
import { AppSidebar } from "~/components/ui/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar"
import { Topbar } from "~/components/ui/topbar"
import { Bottombar } from "~/components/ui/bottombar"
import { ImageCarousel, type Image } from "~/components/ui/image-carousel"
import { NavigationBar, type LayoutType } from "~/components/ui/navigation-bar"
import { MobileNavigation } from "~/components/ui/mobile-navigation"
import { MobileToolsToolbar } from "~/components/ui/mobile-tools-toolbar"
import { Activity, ArrowLeftToLine, ArrowRightToLine, User, UserCog } from "lucide-react"
import { Button } from "~/components/ui/button"
import { ImageLayout } from "~/components/ui/image-layout"
import { useIsMobile } from "~/hooks/use-mobile"
import { StudyTitle } from "~/components/ui/study-title"
import { ImageToolsProvider } from "~/contexts/image-tools-context"
import { useUser } from "~/contexts/user-context"
import { Badge } from "~/components/ui/badge"
//I want a nested collapsible sidebar. Each view must live on its own component. On mobile, the icon button navbar must work as a bottom navbar and the secondary navbar as a drawer. Use shadcn components

// Set of border colors for selected images with more distinct colors
const BORDER_COLORS = [
  "#ff3030", // Bright Red
  "#30c030", // Bright Green
  "#3030ff", // Bright Blue
  "#e040e0", // Magenta
  "#e0e030", // Yellow
  "#30e0e0", // Cyan
  "#ff8000", // Orange
  "#8030ff", // Purple
  "#00a0ff", // Light Blue
  "#ff4080", // Rose
  "#00c080", // Teal
  "#c04000", // Rust
  "#8000c0", // Indigo
  "#c08000", // Amber
  "#0080c0", // Cerulean
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false)
  const [layoutType, setLayoutType] = useState<LayoutType>("single")
  const isMobile = useIsMobile()
  const { isPatient, isDoctor } = useUser();

  // Example study name - in a real application, this would come from a context or prop
  const studyName = "Thoracic-spine / Patella"

  const [sampleImages, setSampleImages] = useState<Image[]>([
    {
      src: "/images/serie_1.png",
      alt: "Sample Image 1",
      seriesName: "Chest X-Ray",
      picturesCount: 12
    },
    {
      src: "/images/serie_2.png",
      alt: "Sample Image 2",
      seriesName: "Abdominal CT",
      picturesCount: 24
    },
    {
      src: "/images/serie_3.png",
      alt: "Sample Image 3",
      seriesName: "Brain MRI",
      picturesCount: 18
    },
    {
      src: "/images/serie_4.png",
      alt: "Sample Image 4",
      seriesName: "Spine X-Ray",
      picturesCount: 8
    },
    {
      src: "/images/serie_5.png",
      alt: "Sample Image 5",
      seriesName: "Knee MRI",
      picturesCount: 16
    }
  ])

  // Custom sidebar trigger with collapse functionality
  const CustomSidebarTrigger = () => {
    const { toggleSidebar, open, setOpen } = useSidebar()

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed)
      setOpen(!isCollapsed ? false : true)
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={handleToggleCollapse}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ArrowRightToLine className="size-4" /> : <ArrowLeftToLine className="size-4" />}
        <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
      </Button>
    )
  }

  // Handle multi-select image functionality
  const handleMultiSelectImage = (image: Image, index: number) => {
    setSelectedImages(prev => {
      // Check if the image is already selected
      const existingIndex = prev.findIndex(img => img.src === image.src);

      // If already selected, remove it
      if (existingIndex >= 0) {
        return prev.filter(img => img.src !== image.src);
      }

      // If not selected, add it with a color
      const newImage = {
        ...image,
        borderColor: BORDER_COLORS[prev.length % BORDER_COLORS.length]
      };

      return [...prev, newImage];
    });
  }

  // Handle single image selection
  const handleSingleImageSelect = (image: Image) => {
    setSelectedImage(image);

    // Update the sample images to mark the selected one
    setSampleImages(prev => prev.map(img => ({
      ...img,
      selected: img.src === image.src
    })));

    // Just add the image to selectedImages without the selected flag
    setSelectedImages([{ ...image }]);
  }

  return (
    <ImageToolsProvider>
      <SidebarProvider>
        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:block">
          <NavigationBar
            isCollapsedProp={isCollapsed}
            setIsCollapsedProp={setIsCollapsed}
            layoutType={layoutType}
            setLayoutType={setLayoutType}
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
          />
        </div>

        {/* Mobile Navigation - Shown only on Mobile */}
        <div className="md:hidden">
          <MobileNavigation
            layoutType={layoutType}
            setLayoutType={setLayoutType}
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
            studyName={studyName}
          />
        </div>

        <SidebarInset>
          <div className="flex flex-col h-screen overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 z-10">
              <div className="flex items-center gap-2 px-4">
                {/* Only show sidebar trigger on desktop */}
                <div className="hidden md:block">
                  <CustomSidebarTrigger />
                </div>

                {/* Study title for desktop view */}
                <div className="hidden md:flex items-center gap-2 border-l-2 pl-3">
                  <StudyTitle title={studyName} className="text-base" />
                  <Badge variant={isPatient ? "secondary" : "default"} className="ml-2">
                    {isPatient ? (
                      <><User className="h-3 w-3 mr-1" /> Paciente</>
                    ) : (
                      <><Activity className="h-3 w-3 mr-1" /> Doctor</>
                    )}
                  </Badge>
                </div>

                {/* Breadcrumb - only shows Serie now */}
                <Breadcrumb className="md:ml-2">
                  <BreadcrumbList>

                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-black">
              {layoutType === "single" && selectedImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <ImageLayout
                    selectedImages={selectedImages}
                    layoutType={layoutType}
                    className="w-full h-full"
                    onImageSelect={handleSingleImageSelect}
                  />
                </div>
              ) : layoutType !== "single" && selectedImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <ImageLayout
                    selectedImages={selectedImages}
                    layoutType={layoutType}
                    className="w-full h-full"
                    onImageSelect={handleSingleImageSelect}
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Selecciona una serie del estudio
                </div>
              )}
            </main>

            <div className="border-t border-gray-800 sticky bottom-0 z-20 shrink-0 bg-black pb-16 md:pb-0">
              <ImageCarousel
                images={sampleImages}
                onImageSelect={layoutType === "single" ? handleSingleImageSelect : undefined}
                multiSelectMode={layoutType !== "single"}
                onMultiSelect={handleMultiSelectImage}
                selectedImages={selectedImages}
              />

              {/* Mobile Tools Toolbar - shown only on mobile devices */}
              {!isPatient && (
                <div className="md:hidden">
                  <MobileToolsToolbar />
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ImageToolsProvider>
  )
}
