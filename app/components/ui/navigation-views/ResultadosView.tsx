import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export function ResultadosView() {
    return (
        <div className="p-4">
            <Tabs defaultValue="hallazgos" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hallazgos">Hallazgos</TabsTrigger>
                    <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
                    <TabsTrigger value="informes">Informes</TabsTrigger>
                </TabsList>
                <TabsContent value="hallazgos" className="pt-4">
                    <div className="space-y-4">
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Columna Torácica (Thoracic-spine)</h3>
                            <p className="text-sm text-muted-foreground">
                                Mediciones relevantes en la columna torácica:
                            </p>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                                <li>Media: 5063,3</li>
                                <li>Desviación estándar: 1260,1</li>
                                <li>Área: 10591,6 mm²</li>
                                <li>Distancia: 145,67 mm</li>
                                <li>Ángulos: 23,1°, 36,8°, 30,4°, 45,4°</li>
                            </ul>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Patella</h3>
                            <p className="text-sm text-muted-foreground">
                                Estudio de la patella con lateralidad R (derecha).
                            </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Equipo de imagen</h3>
                            <p className="text-sm text-muted-foreground">
                                GE Healthcare Brivo XR118
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Calidad JPEG: 85
                            </p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="diagnostico" className="pt-4">
                    <div className="border p-4 rounded-md">
                        <h3 className="font-medium text-lg mb-2">Diagnóstico preliminar</h3>
                        <p className="mb-3">
                            Estudio de imagen de columna torácica y patella. Se observan mediciones para valoración clínica.
                        </p>
                        <div className="text-sm text-muted-foreground">
                            <p className="mb-1">Dr. Médico remitente</p>
                            <p>Radiología, Salud Digna Aguascalientes Universidad</p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="informes" className="pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Informe columna torácica</h3>
                                <p className="text-sm text-muted-foreground">2025-03-22</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Informe patella</h3>
                                <p className="text-sm text-muted-foreground">2025-03-22</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Detalles técnicos</h3>
                                <p className="text-sm text-muted-foreground">Columna: 2120x1539 | Patella: 2006x1605</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 