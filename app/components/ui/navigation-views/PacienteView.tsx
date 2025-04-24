import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"

export function PacienteView() {
    return (
        <div className="p-4 space-y-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Información del Paciente</CardTitle>
                    <CardDescription>Datos del estudio actual</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nombre</Label>
                            <div className="col-span-2 font-medium">MUÑOZ BARRIENTOS, ANTONIO</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="id" className="text-right">ID</Label>
                            <div className="col-span-2 font-medium">49555865</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="access" className="text-right">Acceso</Label>
                            <div className="col-span-2 font-medium">AUN100628</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Fecha</Label>
                            <div className="col-span-2 font-medium">2025-03-22</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="study" className="text-right">Estudio</Label>
                            <div className="col-span-2 font-medium">Thoracic-spine / Patella</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="dob" className="text-right">Fecha de nacimiento</Label>
                            <div className="col-span-2 font-medium">2001-03-11</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="series" className="text-right">Número de serie</Label>
                            <div className="col-span-2 font-medium">9466, 9468</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Historial</CardTitle>
                    <CardDescription>Estudios anteriores</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>Thoracic-spine</div>
                            <div className="text-sm text-muted-foreground">2025-03-22</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Patella</div>
                            <div className="text-sm text-muted-foreground">2025-03-22</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 