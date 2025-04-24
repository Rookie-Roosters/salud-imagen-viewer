import React, { useState, useEffect, useRef } from 'react';

interface MinimapProps {
    sourceImage: string | HTMLImageElement | HTMLCanvasElement | null;
    viewportWidth: number;
    viewportHeight: number;
    scale: number;
    positionX: number;
    positionY: number;
    minimapWidth?: number;
    minimapHeight?: number;
    onPositionChange?: (x: number, y: number) => void;
}

export const Minimap: React.FC<MinimapProps> = ({
    sourceImage,
    viewportWidth,
    viewportHeight,
    scale,
    positionX,
    positionY,
    minimapWidth = 150,
    minimapHeight = 150,
    onPositionChange
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraggingRef = useRef(false);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    // Calculate the minimap scale (ratio between minimap and full image)
    const miniMapScale = Math.min(
        minimapWidth / (imageWidth || 1),
        minimapHeight / (imageHeight || 1)
    );

    // Calculate the visible area rectangle dimensions and position
    const rectWidth = Math.min(viewportWidth / scale, imageWidth) * miniMapScale;
    const rectHeight = Math.min(viewportHeight / scale, imageHeight) * miniMapScale;

    // Calculate the position of the rectangle (adjusted for scale and center position)
    const rectX = (-positionX / scale) * miniMapScale;
    const rectY = (-positionY / scale) * miniMapScale;

    // Load the image if provided as a string
    useEffect(() => {
        if (!sourceImage) return;

        if (typeof sourceImage === 'string') {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                setImageWidth(img.width);
                setImageHeight(img.height);
            };
            img.src = sourceImage;
        } else if (sourceImage instanceof HTMLImageElement) {
            setImage(sourceImage);
            setImageWidth(sourceImage.width);
            setImageHeight(sourceImage.height);
        } else if (sourceImage instanceof HTMLCanvasElement) {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                setImageWidth(img.width);
                setImageHeight(img.height);
            };
            img.src = sourceImage.toDataURL();
        }
    }, [sourceImage]);

    // Draw the minimap
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the scaled image dimensions to fit the minimap
        const scaledWidth = imageWidth * miniMapScale;
        const scaledHeight = imageHeight * miniMapScale;

        // Calculate centering offsets
        const offsetX = (minimapWidth - scaledWidth) / 2;
        const offsetY = (minimapHeight - scaledHeight) / 2;

        // Draw the image
        ctx.drawImage(
            image,
            offsetX,
            offsetY,
            scaledWidth,
            scaledHeight
        );

        // Draw the viewport rectangle
        ctx.strokeStyle = 'rgba(0, 123, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            offsetX + rectX,
            offsetY + rectY,
            rectWidth,
            rectHeight
        );

        // Fill the rectangle with a semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
        ctx.fillRect(
            offsetX + rectX,
            offsetY + rectY,
            rectWidth,
            rectHeight
        );
    }, [image, imageWidth, imageHeight, miniMapScale, rectX, rectY, rectWidth, rectHeight, minimapWidth, minimapHeight]);

    // Handle mouse events for dragging
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        isDraggingRef.current = true;

        // Calculate the center of the viewport directly
        if (onPositionChange) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate the scaled image dimensions
            const scaledWidth = imageWidth * miniMapScale;
            const scaledHeight = imageHeight * miniMapScale;

            // Calculate centering offsets
            const offsetX = (minimapWidth - scaledWidth) / 2;
            const offsetY = (minimapHeight - scaledHeight) / 2;

            // Calculate the new center position in the original image coordinates
            const imageX = (mouseX - offsetX) / miniMapScale;
            const imageY = (mouseY - offsetY) / miniMapScale;

            // Convert to the expected position format (centered)
            const newPositionX = -(imageX * scale - viewportWidth / 2);
            const newPositionY = -(imageY * scale - viewportHeight / 2);

            onPositionChange(newPositionX, newPositionY);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDraggingRef.current || !onPositionChange) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the scaled image dimensions
        const scaledWidth = imageWidth * miniMapScale;
        const scaledHeight = imageHeight * miniMapScale;

        // Calculate centering offsets
        const offsetX = (minimapWidth - scaledWidth) / 2;
        const offsetY = (minimapHeight - scaledHeight) / 2;

        // Calculate the new center position in the original image coordinates
        const imageX = (mouseX - offsetX) / miniMapScale;
        const imageY = (mouseY - offsetY) / miniMapScale;

        // Convert to the expected position format (centered)
        const newPositionX = -(imageX * scale - viewportWidth / 2);
        const newPositionY = -(imageY * scale - viewportHeight / 2);

        onPositionChange(newPositionX, newPositionY);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    return (
        <div className="minimap-container bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
            <canvas
                ref={canvasRef}
                width={minimapWidth}
                height={minimapHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default Minimap; 