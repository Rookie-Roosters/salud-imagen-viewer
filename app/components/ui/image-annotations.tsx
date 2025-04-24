import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';

export interface Annotation {
    id: string;
    type: 'text' | 'arrow' | 'rectangle' | 'circle';
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    color: string;
    points?: { x: number; y: number }[];
}

interface ImageAnnotationsProps {
    annotations: Annotation[];
    onAnnotationChange?: (annotations: Annotation[]) => void;
    onAnnotationAdd?: (annotation: Annotation) => void;
    onAnnotationDelete?: (id: string) => void;
    containerWidth: number;
    containerHeight: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    readOnly?: boolean;
}

export const ImageAnnotations: React.FC<ImageAnnotationsProps> = ({
    annotations = [],
    onAnnotationChange,
    onAnnotationAdd,
    onAnnotationDelete,
    containerWidth,
    containerHeight,
    scale,
    offsetX,
    offsetY,
    readOnly = false
}) => {
    const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
    const [annotationMode, setAnnotationMode] = useState<Annotation['type'] | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0 });
    const [textInput, setTextInput] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Generate a unique ID for new annotations
    const generateId = () => `annotation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Colors for annotations
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    const [activeColor, setActiveColor] = useState(colors[0]);

    // Draw annotations on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        // Draw each annotation
        annotations.forEach(annotation => {
            const isActive = annotation.id === activeAnnotation;
            ctx.strokeStyle = annotation.color;
            ctx.fillStyle = annotation.color;
            ctx.lineWidth = isActive ? 3 : 2;

            // Transform coordinates to account for panning and zooming
            const transformX = (x: number) => (x * scale) + offsetX;
            const transformY = (y: number) => (y * scale) + offsetY;

            switch (annotation.type) {
                case 'text':
                    if (annotation.text) {
                        ctx.font = `${14 * scale}px Arial`;
                        ctx.fillText(
                            annotation.text,
                            transformX(annotation.x),
                            transformY(annotation.y)
                        );

                        if (isActive) {
                            // Draw selection box around text
                            const textMetrics = ctx.measureText(annotation.text);
                            ctx.strokeRect(
                                transformX(annotation.x) - 2,
                                transformY(annotation.y) - (14 * scale) + 2,
                                textMetrics.width + 4,
                                (14 * scale) + 4
                            );
                        }
                    }
                    break;

                case 'arrow':
                    if (annotation.points && annotation.points.length >= 2) {
                        const start = annotation.points[0];
                        const end = annotation.points[1];

                        // Draw line
                        ctx.beginPath();
                        ctx.moveTo(transformX(start.x), transformY(start.y));
                        ctx.lineTo(transformX(end.x), transformY(end.y));
                        ctx.stroke();

                        // Draw arrowhead
                        const angle = Math.atan2(end.y - start.y, end.x - start.x);
                        const arrowSize = 10 * scale;

                        ctx.beginPath();
                        ctx.moveTo(transformX(end.x), transformY(end.y));
                        ctx.lineTo(
                            transformX(end.x) - arrowSize * Math.cos(angle - Math.PI / 6),
                            transformY(end.y) - arrowSize * Math.sin(angle - Math.PI / 6)
                        );
                        ctx.lineTo(
                            transformX(end.x) - arrowSize * Math.cos(angle + Math.PI / 6),
                            transformY(end.y) - arrowSize * Math.sin(angle + Math.PI / 6)
                        );
                        ctx.closePath();
                        ctx.fill();
                    }
                    break;

                case 'rectangle':
                    if (annotation.width && annotation.height) {
                        ctx.strokeRect(
                            transformX(annotation.x),
                            transformY(annotation.y),
                            annotation.width * scale,
                            annotation.height * scale
                        );

                        if (isActive) {
                            // Draw control points at corners
                            const points = [
                                { x: annotation.x, y: annotation.y },
                                { x: annotation.x + annotation.width, y: annotation.y },
                                { x: annotation.x + annotation.width, y: annotation.y + annotation.height },
                                { x: annotation.x, y: annotation.y + annotation.height }
                            ];

                            points.forEach(point => {
                                ctx.fillRect(
                                    transformX(point.x) - 5,
                                    transformY(point.y) - 5,
                                    10,
                                    10
                                );
                            });
                        }
                    }
                    break;

                case 'circle':
                    if (annotation.width) { // Using width as radius
                        const radius = annotation.width * scale;
                        ctx.beginPath();
                        ctx.arc(
                            transformX(annotation.x),
                            transformY(annotation.y),
                            radius,
                            0,
                            2 * Math.PI
                        );
                        ctx.stroke();

                        if (isActive) {
                            // Draw control points
                            const points = [
                                { x: annotation.x - annotation.width, y: annotation.y },
                                { x: annotation.x + annotation.width, y: annotation.y },
                                { x: annotation.x, y: annotation.y - annotation.width },
                                { x: annotation.x, y: annotation.y + annotation.width }
                            ];

                            points.forEach(point => {
                                ctx.fillRect(
                                    transformX(point.x) - 5,
                                    transformY(point.y) - 5,
                                    10,
                                    10
                                );
                            });
                        }
                    }
                    break;
            }
        });

        // Draw current annotation being created
        if (isDrawing && annotationMode) {
            ctx.strokeStyle = activeColor;
            ctx.fillStyle = activeColor;
            ctx.lineWidth = 2;

            const sx = startPoint.x;
            const sy = startPoint.y;
            const cx = currentPoint.x;
            const cy = currentPoint.y;

            switch (annotationMode) {
                case 'text':
                    // Just show a cursor
                    ctx.fillRect(sx - 1, sy - 1, 2, 2);
                    break;

                case 'arrow':
                    // Draw line
                    ctx.beginPath();
                    ctx.moveTo(sx, sy);
                    ctx.lineTo(cx, cy);
                    ctx.stroke();

                    // Draw arrowhead
                    const angle = Math.atan2(cy - sy, cx - sx);
                    const arrowSize = 10;

                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(
                        cx - arrowSize * Math.cos(angle - Math.PI / 6),
                        cy - arrowSize * Math.sin(angle - Math.PI / 6)
                    );
                    ctx.lineTo(
                        cx - arrowSize * Math.cos(angle + Math.PI / 6),
                        cy - arrowSize * Math.sin(angle + Math.PI / 6)
                    );
                    ctx.closePath();
                    ctx.fill();
                    break;

                case 'rectangle':
                    const width = cx - sx;
                    const height = cy - sy;
                    ctx.strokeRect(sx, sy, width, height);
                    break;

                case 'circle':
                    const radius = Math.sqrt(Math.pow(cx - sx, 2) + Math.pow(cy - sy, 2));
                    ctx.beginPath();
                    ctx.arc(sx, sy, radius, 0, 2 * Math.PI);
                    ctx.stroke();
                    break;
            }
        }
    }, [annotations, activeAnnotation, isDrawing, startPoint, currentPoint,
        containerWidth, containerHeight, annotationMode, activeColor, scale, offsetX, offsetY]);

    // Reset annotation mode when annotation is added
    useEffect(() => {
        if (showTextInput) {
            const handleOutsideClick = (e: MouseEvent) => {
                if (e.target !== canvasRef.current) {
                    setShowTextInput(false);
                    if (textInput.trim()) {
                        const newAnnotation: Annotation = {
                            id: generateId(),
                            type: 'text',
                            x: (textPosition.x - offsetX) / scale,
                            y: (textPosition.y - offsetY) / scale,
                            text: textInput,
                            color: activeColor
                        };

                        if (onAnnotationAdd) {
                            onAnnotationAdd(newAnnotation);
                        }
                    }
                    setTextInput('');
                }
            };

            document.addEventListener('mousedown', handleOutsideClick);
            return () => document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [showTextInput, textInput, textPosition, onAnnotationAdd, activeColor, scale, offsetX, offsetY]);

    // Handle mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (readOnly || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (annotationMode) {
            setIsDrawing(true);
            setStartPoint({ x, y });
            setCurrentPoint({ x, y });

            if (annotationMode === 'text') {
                setShowTextInput(true);
                setTextPosition({ x, y });
            }
        } else {
            // Check if clicked on an annotation
            const clicked = annotations.find(annotation => {
                // Implement hit testing for each annotation type
                const tx = (annotation.x * scale) + offsetX;
                const ty = (annotation.y * scale) + offsetY;

                switch (annotation.type) {
                    case 'text':
                        if (!annotation.text) return false;
                        const ctx = canvasRef.current?.getContext('2d');
                        if (!ctx) return false;

                        ctx.font = `${14 * scale}px Arial`;
                        const textMetrics = ctx.measureText(annotation.text);

                        return (
                            x >= tx - 2 &&
                            x <= tx + textMetrics.width + 4 &&
                            y >= ty - (14 * scale) + 2 &&
                            y <= ty + 4
                        );

                    case 'rectangle':
                        if (!annotation.width || !annotation.height) return false;

                        return (
                            x >= tx &&
                            x <= tx + (annotation.width * scale) &&
                            y >= ty &&
                            y <= ty + (annotation.height * scale)
                        );

                    case 'circle':
                        if (!annotation.width) return false; // Using width as radius

                        const distanceToCenter = Math.sqrt(Math.pow(x - tx, 2) + Math.pow(y - ty, 2));
                        return distanceToCenter <= annotation.width * scale;

                    case 'arrow':
                        if (!annotation.points || annotation.points.length < 2) return false;

                        const p1 = {
                            x: (annotation.points[0].x * scale) + offsetX,
                            y: (annotation.points[0].y * scale) + offsetY
                        };
                        const p2 = {
                            x: (annotation.points[1].x * scale) + offsetX,
                            y: (annotation.points[1].y * scale) + offsetY
                        };

                        // Calculate distance from point to line segment
                        const lineLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                        if (lineLength === 0) return false;

                        const projection = (
                            ((x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y)) /
                            (lineLength * lineLength)
                        );

                        if (projection < 0 || projection > 1) return false;

                        const projectionX = p1.x + projection * (p2.x - p1.x);
                        const projectionY = p1.y + projection * (p2.y - p1.y);

                        const distanceToLine = Math.sqrt(Math.pow(x - projectionX, 2) + Math.pow(y - projectionY, 2));
                        return distanceToLine <= 5; // 5px tolerance

                    default:
                        return false;
                }
            });

            setActiveAnnotation(clicked ? clicked.id : null);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (readOnly || !canvasRef.current || !isDrawing || !annotationMode) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCurrentPoint({ x, y });
    };

    const handleMouseUp = () => {
        if (readOnly || !isDrawing || !annotationMode || annotationMode === 'text') {
            setIsDrawing(false);
            return;
        }

        // Create new annotation
        let newAnnotation: Annotation | null = null;

        const sx = (startPoint.x - offsetX) / scale;
        const sy = (startPoint.y - offsetY) / scale;
        const cx = (currentPoint.x - offsetX) / scale;
        const cy = (currentPoint.y - offsetY) / scale;

        switch (annotationMode) {
            case 'arrow':
                newAnnotation = {
                    id: generateId(),
                    type: 'arrow',
                    x: sx,
                    y: sy,
                    color: activeColor,
                    points: [{ x: sx, y: sy }, { x: cx, y: cy }]
                };
                break;

            case 'rectangle':
                const width = cx - sx;
                const height = cy - sy;

                // Ensure minimum size
                if (Math.abs(width) < 5 / scale || Math.abs(height) < 5 / scale) {
                    setIsDrawing(false);
                    return;
                }

                newAnnotation = {
                    id: generateId(),
                    type: 'rectangle',
                    x: width > 0 ? sx : cx,
                    y: height > 0 ? sy : cy,
                    width: Math.abs(width),
                    height: Math.abs(height),
                    color: activeColor
                };
                break;

            case 'circle':
                const radius = Math.sqrt(Math.pow(cx - sx, 2) + Math.pow(cy - sy, 2));

                // Ensure minimum size
                if (radius < 5 / scale) {
                    setIsDrawing(false);
                    return;
                }

                newAnnotation = {
                    id: generateId(),
                    type: 'circle',
                    x: sx,
                    y: sy,
                    width: radius, // Using width as radius
                    color: activeColor
                };
                break;
        }

        if (newAnnotation && onAnnotationAdd) {
            onAnnotationAdd(newAnnotation);
        }

        setIsDrawing(false);
        // Don't reset annotation mode to allow creating multiple annotations of the same type
    };

    const handleDeleteAnnotation = () => {
        if (activeAnnotation && onAnnotationDelete) {
            onAnnotationDelete(activeAnnotation);
            setActiveAnnotation(null);
        }
    };

    return (
        <div className="relative" style={{ width: containerWidth, height: containerHeight }}>
            <canvas
                ref={canvasRef}
                width={containerWidth}
                height={containerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute top-0 left-0 pointer-events-auto"
                style={{
                    cursor: annotationMode ? 'crosshair' : 'default',
                    touchAction: 'none'
                }}
            />

            {/* Input for text annotation */}
            {showTextInput && (
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    autoFocus
                    className="absolute border border-gray-300 px-1 py-0.5 text-sm"
                    style={{
                        top: textPosition.y,
                        left: textPosition.x,
                        transform: 'translateY(-100%)',
                        width: '150px',
                        background: 'white',
                        zIndex: 10
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            setShowTextInput(false);

                            if (textInput.trim()) {
                                const newAnnotation: Annotation = {
                                    id: generateId(),
                                    type: 'text',
                                    x: (textPosition.x - offsetX) / scale,
                                    y: (textPosition.y - offsetY) / scale,
                                    text: textInput,
                                    color: activeColor
                                };

                                if (onAnnotationAdd) {
                                    onAnnotationAdd(newAnnotation);
                                }
                            }

                            setTextInput('');
                        }
                    }}
                />
            )}

            {/* Annotation toolbar */}
            {!readOnly && (
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white bg-opacity-75 p-1 rounded shadow">
                    <Button
                        variant={annotationMode === 'text' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAnnotationMode('text')}
                    >
                        Text
                    </Button>
                    <Button
                        variant={annotationMode === 'arrow' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAnnotationMode('arrow')}
                    >
                        Arrow
                    </Button>
                    <Button
                        variant={annotationMode === 'rectangle' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAnnotationMode('rectangle')}
                    >
                        Rectangle
                    </Button>
                    <Button
                        variant={annotationMode === 'circle' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAnnotationMode('circle')}
                    >
                        Circle
                    </Button>

                    {activeAnnotation && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDeleteAnnotation}
                        >
                            Delete
                        </Button>
                    )}

                    <div className="ml-2 flex gap-1">
                        {colors.map(color => (
                            <div
                                key={color}
                                className="w-4 h-4 rounded-full cursor-pointer"
                                style={{
                                    backgroundColor: color,
                                    border: color === activeColor ? '2px solid black' : '1px solid #ccc'
                                }}
                                onClick={() => setActiveColor(color)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageAnnotations; 