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
} from "~/components/ui/sidebar"
import { Topbar } from "~/components/ui/topbar"
import { Bottombar } from "~/components/ui/bottombar"
import { type Image } from "~/components/ui/image-carousel"

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  // Sample images - replace with your actual images
  const sampleImages: Image[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      alt: "Sample Image 1"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1563443806517-a0e11901ce7c",
      alt: "Sample Image 2"
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1625991422664-a922be79529f",
      alt: "Sample Image 3"
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5",
      alt: "Sample Image 4"
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1532186774580-a1af93abddec",
      alt: "Sample Image 5"
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c",
      alt: "Sample Image 6"
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9",
      alt: "Sample Image 7"
    },
  ]

  const handleAddImage = () => {
    // Placeholder for adding a new image
    console.log("Add new image clicked")
    // You would typically show a file picker or form here
    alert("Add image functionality would go here")
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Topbar>
        <h1 className="text-xl font-bold">Medical Image Viewer</h1>
      </Topbar>

      <main className="mt-14 mb-24 flex flex-1 items-center justify-center p-4">
        {selectedImage ? (
          <div className="relative aspect-square max-h-[80vh] max-w-[80vw]">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select an image from the carousel below
          </div>
        )}
      </main>

      <Bottombar
        images={sampleImages}
        onImageSelect={setSelectedImage}
        onAddClick={handleAddImage}
      />
    </div>
  )
}
