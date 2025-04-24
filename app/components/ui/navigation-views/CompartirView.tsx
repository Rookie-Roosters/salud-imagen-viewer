import React, { useState } from "react"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"
import {
    ClipboardCopy,
    Mail,
    QrCode,
    Share2,
    ShieldCheck,
    Clock,
    Download,
    Check,
    Smartphone,
    FileImage,
    FileBadge
} from "lucide-react"
import { Separator } from "~/components/ui/separator"
import { toast } from "sonner"

export function CompartirView() {
    const [copySuccess, setCopySuccess] = useState(false);
    const studyLink = "https://saludimagen.rookieroosters.com?patient=1343298";

    // Function to copy link to clipboard
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(studyLink);
            setCopySuccess(true);
            toast.success("Enlace copiado al portapapeles");

            // Reset success state after 2 seconds
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        } catch (err) {
            toast.error("Error al copiar enlace");
            console.error("Copy failed: ", err);
        }
    };

    // Function to share using Web Share API (for mobile)
    const shareWithWebAPI = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Estudio médico - SaludImagen",
                    text: "Compartir estudio médico de SaludImagen",
                    url: studyLink,
                });
                toast.success("Contenido compartido exitosamente");
            } catch (err) {
                console.error("Error al compartir: ", err);
            }
        } else {
            toast.error("Tu navegador no soporta la API de compartir");
        }
    };

    // Function to handle exports
    const handleExport = (format: string) => {
        toast.success(`Exportando estudio en formato ${format}`);
        // Implementation would connect to actual export functionality
    };

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <Label className="text-base font-medium">Compartir estudio</Label>
                <div className="border rounded-md p-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Input
                                readOnly
                                value={studyLink}
                                className="text-sm font-mono"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                onClick={copyToClipboard}
                            >
                                {copySuccess ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ClipboardCopy className="h-4 w-4" />
                                )}
                                <span className="sr-only">Copiar enlace</span>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                className="flex gap-1 w-full justify-center"
                                onClick={shareWithWebAPI}
                            >
                                <Share2 className="h-4 w-4" />
                                <span>Compartir</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-2">
                <Label className="text-base font-medium">Opciones de privacidad</Label>
                <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                        <Checkbox id="password" />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Proteger con contraseña
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Requiere una contraseña para acceder al estudio
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Checkbox id="expiry" defaultChecked />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="expiry" className="text-sm font-medium">
                                Establecer caducidad
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                El enlace expirará después de 7 días
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-2">
                <Label className="text-base font-medium">Exportar estudio</Label>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1"
                        onClick={() => handleExport('DICOM')}
                    >
                        <FileBadge className="h-4 w-4" />
                        <span>Descargar DICOM</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1"
                        onClick={() => handleExport('PDF')}
                    >
                        <Download className="h-4 w-4" />
                        <span>Descargar PDF</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1"
                        onClick={() => handleExport('PNG')}
                    >
                        <FileImage className="h-4 w-4" />
                        <span>Exportar imágenes</span>
                    </Button>
                </div>
            </div>
        </div>
    )
} 