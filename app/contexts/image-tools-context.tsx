import React, { createContext, useContext, useState, useRef } from "react"
import { type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'

export type ImageToolType =
    | "move"
    | "zoom"
    | "rotate"
    | "flipHorizontal"
    | "flipVertical"
    | "annotation"
    | "measure"
    | "highlight"
    | "rectangle"
    | "circle"
    | "arrow"
    | "text"
    | "draw"
    | "brightness"
    | "contrast"
    | "none"

interface ImageToolsContextType {
    activeTool: ImageToolType
    setActiveTool: (tool: ImageToolType) => void
    zoomLevel: number
    setZoomLevel: (level: number) => void
    brightness: number
    setBrightness: (level: number) => void
    contrast: number
    setContrast: (level: number) => void
    rotation: number
    setRotation: (degree: number) => void
    horizontalFlip: boolean
    setHorizontalFlip: (flipped: boolean) => void
    verticalFlip: boolean
    setVerticalFlip: (flipped: boolean) => void
    transformRef: React.MutableRefObject<ReactZoomPanPinchRef | null>
    resetTransform: () => void
    rotateCW: () => void
    rotateCCW: () => void
    toggleHorizontalFlip: () => void
    toggleVerticalFlip: () => void
}

const defaultContext: ImageToolsContextType = {
    activeTool: "none",
    setActiveTool: () => { },
    zoomLevel: 1,
    setZoomLevel: () => { },
    brightness: 50,
    setBrightness: () => { },
    contrast: 75,
    setContrast: () => { },
    rotation: 0,
    setRotation: () => { },
    horizontalFlip: false,
    setHorizontalFlip: () => { },
    verticalFlip: false,
    setVerticalFlip: () => { },
    transformRef: { current: null },
    resetTransform: () => { },
    rotateCW: () => { },
    rotateCCW: () => { },
    toggleHorizontalFlip: () => { },
    toggleVerticalFlip: () => { }
}

export const ImageToolsContext = createContext<ImageToolsContextType>(defaultContext)

export const useImageTools = () => useContext(ImageToolsContext)

export function ImageToolsProvider({ children }: { children: React.ReactNode }) {
    const [activeTool, setActiveTool] = useState<ImageToolType>("none")
    const [zoomLevel, setZoomLevel] = useState(1)
    const [brightness, setBrightness] = useState(50)
    const [contrast, setContrast] = useState(75)
    const [rotation, setRotation] = useState(0)
    const [horizontalFlip, setHorizontalFlip] = useState(false)
    const [verticalFlip, setVerticalFlip] = useState(false)
    const transformRef = useRef<ReactZoomPanPinchRef | null>(null)

    const resetTransform = () => {
        if (transformRef.current) {
            transformRef.current.resetTransform()
        }
        setRotation(0)
        setHorizontalFlip(false)
        setVerticalFlip(false)
        setBrightness(50)
        setContrast(75)
    }

    const rotateCW = () => {
        setRotation((prev) => prev + 90)
    }

    const rotateCCW = () => {
        setRotation((prev) => prev - 90)
    }

    const toggleHorizontalFlip = () => {
        setHorizontalFlip((prev) => !prev)
    }

    const toggleVerticalFlip = () => {
        setVerticalFlip((prev) => !prev)
    }

    return (
        <ImageToolsContext.Provider
            value={{
                activeTool,
                setActiveTool,
                zoomLevel,
                setZoomLevel,
                brightness,
                setBrightness,
                contrast,
                setContrast,
                rotation,
                setRotation,
                horizontalFlip,
                setHorizontalFlip,
                verticalFlip,
                setVerticalFlip,
                transformRef,
                resetTransform,
                rotateCW,
                rotateCCW,
                toggleHorizontalFlip,
                toggleVerticalFlip
            }}
        >
            {children}
        </ImageToolsContext.Provider>
    )
} 