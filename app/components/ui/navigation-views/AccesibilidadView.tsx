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

    // Button active state styling
    const activeButtonClass = "border-2 border-primary bg-primary/25 ring-2 ring-primary ring-offset-2 text-primary-foreground";

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
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['font-dyslexic'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('font-dyslexic')}
                >
                    <div className="text-3xl font-bold">A<span className="text-sm">v</span></div>
                    <span className="text-center text-xs">Fuente para dislexia</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['highlight-headings'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('highlight-headings')}
                >
                    <Heading2 className="h-8 w-8" />
                    <span className="text-center text-xs">Destacar título</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['highlight-links'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('highlight-links')}
                >
                    <Link className="h-8 w-8" />
                    <span className="text-center text-xs">Destacar enlaces</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['letter-spacing'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('letter-spacing')}
                >
                    <div className="text-2xl font-bold">A<span className="text-xl">V</span></div>
                    <span className="text-center text-xs">Espaciado entre letras</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['font-bold'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('font-bold')}
                >
                    <BoldIcon className="h-8 w-8" />
                    <span className="text-center text-xs">Grosor de fuente</span>
                </Button>
            </div>

            <h2 className="text-lg font-semibold mb-2 mt-4">Ajustes de color</h2>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['dark-contrast'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('dark-contrast')}
                >
                    <div className="h-8 w-8 bg-black rounded-full" />
                    <span className="text-center text-xs">Contraste oscuro</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['light-contrast'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('light-contrast')}
                >
                    <div className="h-8 w-8 bg-white rounded-full border border-gray-300" />
                    <span className="text-center text-xs">Contraste claro</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['high-contrast'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('high-contrast')}
                >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-black to-white" />
                    <span className="text-center text-xs">Alto contraste</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['high-saturation'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('high-saturation')}
                >
                    <div className="h-8 w-8 rounded-full bg-black overflow-hidden flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-black border-2 border-white"></div>
                    </div>
                    <span className="text-center text-xs">Alta saturación</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['low-saturation'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('low-saturation')}
                >
                    <div className="h-8 w-8 rounded-full bg-white overflow-hidden flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-white border-2 border-black"></div>
                    </div>
                    <span className="text-center text-xs">Baja saturación</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['monochrome'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('monochrome')}
                >
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-100"></div>
                    </div>
                    <span className="text-center text-xs">Monocromo</span>
                </Button>
            </div>

            <h2 className="text-lg font-semibold mb-2 mt-4">Herramientas</h2>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['reading-guide'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('reading-guide')}
                >
                    <Book className="h-8 w-8" />
                    <span className="text-center text-xs">Guía de lectura</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['no-animations'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('no-animations')}
                >
                    <Pause className="h-8 w-8" />
                    <span className="text-center text-xs">Detener animaciones</span>
                </Button>

                <Button
                    variant="outline"
                    className={cn(
                        "h-auto flex flex-col items-center justify-center gap-2 p-4",
                        activeSettings['large-cursor'] && activeButtonClass
                    )}
                    onClick={() => toggleSetting('large-cursor')}
                >
                    <MousePointer className="h-8 w-8" />
                    <span className="text-center text-xs">Cursor grande</span>
                </Button>
            </div>
        </div>
    );
}