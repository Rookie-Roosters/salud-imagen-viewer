import { Box, Separator } from "@radix-ui/themes";

export default function LeftSidebar() {
    // Sample image data - this could be fetched from an API
    const sampleImages = [
        { id: 1, src: "/images/bombardino.jpeg", alt: "Sample 1" },
        { id: 2, src: "/images/bombardino.jpeg", alt: "Sample 2" },
        { id: 3, src: "/images/bombardino.jpeg", alt: "Sample 3" },
        { id: 4, src: "/images/bombardino.jpeg", alt: "Sample 4" },
        { id: 5, src: "/images/bombardino.jpeg", alt: "Sample 5" },
        { id: 6, src: "/images/bombardino.jpeg", alt: "Sample 6" },
    ];

    return (
        <Box className="h-full overflow-auto p-2">
            <div className="flex justify-center mb-6">
                <img
                    src="/images/SaludImagen-Logo.svg"
                    alt="Salud Imagen Logo"
                    className="w-32"
                />
            </div>
            <Separator size="4" />
            <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                    {sampleImages.map((image) => (
                        <div key={image.id} className="aspect-square overflow-hidden border border-blue-7">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    )
}