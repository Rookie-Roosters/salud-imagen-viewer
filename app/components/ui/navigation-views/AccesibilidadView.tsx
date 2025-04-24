import * as React from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { LifeBuoyIcon, Link, Type, Heading2, BoldIcon, MousePointerSquareDashed, Book, Pause, MousePointer, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export function AccesibilidadView() {
    // List of all accessibility class names that can be applied
    const accessibilityClasses = [
        'font-dyslexic',
        'highlight-headings',
        'highlight-links',
        'letter-spacing',
        'font-bold',
        'dark-contrast',
        'light-contrast',
        'high-contrast',
        'high-saturation',
        'low-saturation',
        'monochrome',
        'reading-guide',
        'no-animations',
        'large-cursor'
    ];

    // State to track which accessibility features are active
    const [activeSettings, setActiveSettings] = useState<Record<string, boolean>>({});

    // Check initial state
    useEffect(() => {
        const initialState: Record<string, boolean> = {};
        accessibilityClasses.forEach(className => {
            initialState[className] = document.documentElement.classList.contains(className);
        });
        setActiveSettings(initialState);
    }, []);

    // Function to toggle a setting
    const toggleSetting = (className: string) => {
        document.documentElement.classList.toggle(className);
        setActiveSettings(prev => ({
            ...prev,
            [className]: !prev[className]
        }));
    };

    // Function to reset all accessibility settings
    const resetAccessibilitySettings = () => {
        accessibilityClasses.forEach(className => {
            document.documentElement.classList.remove(className);
        });
        setActiveSettings(Object.fromEntries(accessibilityClasses.map(className => [className, false])));
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <Button
                variant="outline"
                className="mb-4 flex items-center justify-center gap-2"
                onClick={resetAccessibilitySettings}
            >
                <RotateCcw className="h-4 w-4" />
                <span>Restablecer ajustes</span>
            </Button>

            <h2 className="text-lg font-semibold mb-2">Ajustes de contenido</h2>
            <div className="grid grid-cols-2 gap-2">
                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['font-dyslexic'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('font-dyslexic')}
                >
                    <div className="text-3xl font-bold h-8 w-8 mb-1 flex items-center justify-center">A<span className="text-xs">v</span></div>
                    <span className="text-sm">Fuente para dislexia</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['highlight-headings'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('highlight-headings')}
                >
                    <Heading2 className="h-8 w-8 mb-1" />
                    <span className="text-sm">Destacar título</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['highlight-links'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('highlight-links')}
                >
                    <Link className="h-8 w-8 mb-1" />
                    <span className="text-sm">Destacar enlaces</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['letter-spacing'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('letter-spacing')}
                >
                    <div className="h-8 w-8 mb-1 flex items-center justify-center text-2xl">A<span className="text-xl">V</span></div>
                    <span className="text-sm">Espaciado entre letras</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['font-bold'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('font-bold')}
                >
                    <BoldIcon className="h-8 w-8 mb-1" />
                    <span className="text-sm">Grosor de fuente</span>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-2 mt-4">Ajustes de color</h2>
            <div className="grid grid-cols-2 gap-2">
                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['dark-contrast'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('dark-contrast')}
                >
                    <div className="h-8 w-8 mb-1 bg-black rounded-full flex items-center justify-center" />
                    <span className="text-sm">Contraste oscuro</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['light-contrast'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('light-contrast')}
                >
                    <div className="h-8 w-8 mb-1 bg-white rounded-full border border-gray-300 flex items-center justify-center" />
                    <span className="text-sm">Contraste claro</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['high-contrast'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('high-contrast')}
                >
                    <div className="h-8 w-8 mb-1 rounded-full bg-gradient-to-r from-black to-white flex items-center justify-center" />
                    <span className="text-sm">Alto contraste</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['high-saturation'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('high-saturation')}
                >
                    <div className="h-8 w-8 mb-1 rounded-full bg-black overflow-hidden flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-black border-2 border-white"></div>
                    </div>
                    <span className="text-sm">Alta saturación</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['low-saturation'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('low-saturation')}
                >
                    <div className="h-8 w-8 mb-1 rounded-full bg-white overflow-hidden flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-white border-2 border-black"></div>
                    </div>
                    <span className="text-sm">Baja saturación</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['monochrome'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('monochrome')}
                >
                    <div className="h-8 w-8 mb-1 rounded-full overflow-hidden flex items-center justify-center">
                        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-100"></div>
                    </div>
                    <span className="text-sm">Monocromo</span>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-2 mt-4">Herramientas</h2>
            <div className="grid grid-cols-2 gap-2">
                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['reading-guide'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('reading-guide')}
                >
                    <Book className="h-8 w-8 mb-1" />
                    <span className="text-sm">Guía de lectura</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['no-animations'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('no-animations')}
                >
                    <Pause className="h-8 w-8 mb-1" />
                    <span className="text-sm">Detener animaciones</span>
                </div>

                <div
                    className={cn(
                        "flex flex-col items-center border rounded-lg p-3 cursor-pointer",
                        activeSettings['large-cursor'] ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => toggleSetting('large-cursor')}
                >
                    <MousePointer className="h-8 w-8 mb-1" />
                    <span className="text-sm">Cursor grande</span>
                </div>
            </div>
        </div>
    );
}