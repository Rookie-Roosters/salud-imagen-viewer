import React from "react"
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
    Download
} from "lucide-react"
import { Separator } from "~/components/ui/separator"

export function CompartirView() {
    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <Label className="text-base font-medium">Compartir estudio</Label>
                <div className="border rounded-md p-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Input
                                readOnly
                                value="https://salud-imagen.com/estudio/JPRZ-12345"
                                className="text-sm font-mono"
                            />
                            <Button variant="outline" size="icon" className="shrink-0">
                                <ClipboardCopy className="h-4 w-4" />
                                <span className="sr-only">Copiar enlace</span>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="flex gap-1">
                                <Mail className="h-4 w-4" />
                                <span>Correo</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex gap-1">
                                <QrCode className="h-4 w-4" />
                                <span>Código QR</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex gap-1">
                                <Share2 className="h-4 w-4" />
                                <span>Más opciones</span>
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
                    <Button variant="outline" size="sm" className="flex gap-1">
                        <Download className="h-4 w-4" />
                        <span>Descargar DICOM</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex gap-1">
                        <Download className="h-4 w-4" />
                        <span>Descargar PDF</span>
                    </Button>
                </div>
            </div>
        </div>
    )
} 