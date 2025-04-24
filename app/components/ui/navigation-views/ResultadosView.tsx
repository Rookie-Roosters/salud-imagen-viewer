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
                            <h3 className="font-medium mb-1">Columna Dorsal</h3>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                                <li>Estructuras óseas con radiopacidad normal, las corticales están íntegras.</li>
                                <li>Cifosis dorsal está respetada. No se identifican datos de listesis.</li>
                                <li>No se observan datos de escoliosis.</li>
                                <li>Cuerpos vertebrales con altura normal.</li>
                                <li>Espacios intersomáticos con amplitud regular.</li>
                                <li>Articulaciones facetarias y elementos posteriores sin evidencia de alteraciones.</li>
                                <li>Tejidos blandos tienen características normales.</li>
                            </ul>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Columna Lumbar</h3>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                                <li>Estructuras óseas con radiopacidad normal, las corticales están íntegras.</li>
                                <li>Lordosis lumbar con ángulo de 45°.</li>
                                <li>No se identifican datos de listesis.</li>
                                <li>No se observan datos de escoliosis.</li>
                                <li>Ángulo lumbosacro de 138°.</li>
                                <li>Ángulo sacro horizontal de 37°.</li>
                                <li>Cuerpos vertebrales con altura normal.</li>
                                <li>Espacios intersomáticos con amplitud respetada.</li>
                                <li>Articulaciones facetarias y elementos posteriores sin evidencia de alteraciones.</li>
                                <li>Tejidos blandos tienen características normales.</li>
                                <li>Pelvis ósea con morfología normal y cortical respetada. Se identifica desnivel izquierdo de 12 mm.</li>
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
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Técnica</h3>
                            <p className="text-sm text-muted-foreground">
                                Radiografía anteroposterior y lateral de columna dorsal y lumbar.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Indicación del estudio: Valoración médica
                            </p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="diagnostico" className="pt-4">
                    <div className="border p-4 rounded-md">
                        <h3 className="font-medium text-lg mb-2">Conclusión</h3>
                        <p className="mb-3">
                            Desnivel pélvico izquierdo, resto del estudio con características normales.
                        </p>
                        <div className="text-sm text-muted-foreground">
                            <p className="mb-1">Sugerencias: Correlación clínica.</p>
                            <p>A QUIEN CORRESPONDA</p>
                            <p>AGS UNIVERSIDAD</p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="informes" className="pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Informe columna dorsal y lumbar</h3>
                                <p className="text-sm text-muted-foreground">2025-03-22</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Estudio previo</h3>
                                <p className="text-sm text-muted-foreground">No se cuenta con estudios previos.</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Detalles técnicos</h3>
                                <p className="text-sm text-muted-foreground">COLUMNA DORSAL Y LUMBAR AP Y LATERAL</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 