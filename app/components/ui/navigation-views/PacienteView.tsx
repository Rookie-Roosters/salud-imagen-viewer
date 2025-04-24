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
                            <div className="col-span-2 font-medium">Juan Pérez Rodríguez</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="id" className="text-right">ID</Label>
                            <div className="col-span-2 font-medium">JPRZ-12345</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Fecha</Label>
                            <div className="col-span-2 font-medium">15/06/2023</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="study" className="text-right">Estudio</Label>
                            <div className="col-span-2 font-medium">Resonancia Magnética - Cerebro</div>
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
                            <div>Radiografía - Tórax</div>
                            <div className="text-sm text-muted-foreground">10/05/2023</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Ecografía - Abdomen</div>
                            <div className="text-sm text-muted-foreground">02/03/2023</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Tomografía - Cerebro</div>
                            <div className="text-sm text-muted-foreground">15/12/2022</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 