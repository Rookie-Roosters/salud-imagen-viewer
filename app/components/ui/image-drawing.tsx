import React, { useRef, useState, useEffect } from 'react';

interface DrawPath {
    id: string;
    points: { x: number; y: number }[];
    color: string;
    width: number;
}

interface ImageDrawingProps {
    containerWidth: number;
    containerHeight: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    readOnly?: boolean;
    color?: string;
    strokeWidth?: number;
    onDrawingComplete?: (path: DrawPath) => void;
    paths?: DrawPath[];
}

export const ImageDrawing: React.FC<ImageDrawingProps> = ({
    containerWidth,
    containerHeight,
    scale,
    offsetX,
    offsetY,
    readOnly = false,
    color = '#ff0000',
    strokeWidth = 3,
    onDrawingComplete,
    paths = []
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<DrawPath | null>(null);

    // Generate a unique ID for each drawing path
    const generateId = () => `drawing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Draw all paths on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        // Set canvas size
        if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
            canvas.width = containerWidth;
            canvas.height = containerHeight;
        }

        // Draw all saved paths
        paths.forEach(path => {
            if (path.points.length < 2) return;

            ctx.strokeStyle = path.color;
            ctx.lineWidth = path.width;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.beginPath();

            // Transform coordinates to account for panning and zooming
            const transformX = (x: number) => (x * scale) + offsetX;
            const transformY = (y: number) => (y * scale) + offsetY;

            ctx.moveTo(transformX(path.points[0].x), transformY(path.points[0].y));

            for (let i = 1; i < path.points.length; i++) {
                ctx.lineTo(transformX(path.points[i].x), transformY(path.points[i].y));
            }

            ctx.stroke();
        });

        // Draw current path
        if (isDrawing && currentPath && currentPath.points.length > 0) {
            ctx.strokeStyle = currentPath.color;
            ctx.lineWidth = currentPath.width;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(currentPath.points[0].x, currentPath.points[0].y);

            for (let i = 1; i < currentPath.points.length; i++) {
                ctx.lineTo(currentPath.points[i].x, currentPath.points[i].y);
            }

            ctx.stroke();
        }
    }, [containerWidth, containerHeight, paths, isDrawing, currentPath, scale, offsetX, offsetY]);

    // Handle mouse events for drawing
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (readOnly) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create a new path
        const newPath: DrawPath = {
            id: generateId(),
            points: [{ x, y }],
            color,
            width: strokeWidth
        };

        setCurrentPath(newPath);
        setIsDrawing(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || readOnly || !currentPath) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Add point to current path
        setCurrentPath(prev => {
            if (!prev) return null;
            return {
                ...prev,
                points: [...prev.points, { x, y }]
            };
        });
    };

    const handleMouseUp = () => {
        if (!isDrawing || readOnly || !currentPath) return;

        // Complete the drawing
        if (currentPath.points.length > 1 && onDrawingComplete) {
            // Transform points back to original coordinates
            const transformedPath = {
                ...currentPath,
                points: currentPath.points.map(point => ({
                    x: (point.x - offsetX) / scale,
                    y: (point.y - offsetY) / scale
                }))
            };
            onDrawingComplete(transformedPath);
        }

        setIsDrawing(false);
        setCurrentPath(null);
    };

    const handleMouseLeave = () => {
        handleMouseUp();
    };

    return (
        <canvas
            ref={canvasRef}
            width={containerWidth}
            height={containerHeight}
            className="absolute top-0 left-0 z-40 cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: readOnly ? 'none' : 'auto' }}
        />
    );
};

export default ImageDrawing; 