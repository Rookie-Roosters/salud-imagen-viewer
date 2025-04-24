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
                            <h3 className="font-medium mb-1">Región frontal</h3>
                            <p className="text-sm text-muted-foreground">
                                No se observan anomalías estructurales en la región frontal del cerebro.
                            </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Región parietal</h3>
                            <p className="text-sm text-muted-foreground">
                                Sin cambios patológicos visibles en la sustancia gris o blanca.
                            </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                            <h3 className="font-medium mb-1">Región occipital</h3>
                            <p className="text-sm text-muted-foreground">
                                Estructuras normales sin evidencia de lesiones focales.
                            </p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="diagnostico" className="pt-4">
                    <div className="border p-4 rounded-md">
                        <h3 className="font-medium text-lg mb-2">Diagnóstico preliminar</h3>
                        <p className="mb-3">
                            Estudio de resonancia magnética cerebral dentro de parámetros normales para la edad del paciente.
                        </p>
                        <div className="text-sm text-muted-foreground">
                            <p className="mb-1">Dr. María González</p>
                            <p>Radiología, Hospital Central</p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="informes" className="pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Informe preliminar</h3>
                                <p className="text-sm text-muted-foreground">15/06/2023</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h3 className="font-medium">Comparativa con estudio previo</h3>
                                <p className="text-sm text-muted-foreground">16/06/2023</p>
                            </div>
                            <button className="text-primary text-sm">Descargar</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Informe final</h3>
                                <p className="text-sm text-muted-foreground">Pendiente</p>
                            </div>
                            <button disabled className="text-muted-foreground text-sm opacity-50">Descargar</button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 