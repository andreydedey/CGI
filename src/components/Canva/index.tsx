import { useRef, useEffect } from "react";

interface PixelGridProps {
    width?: number; 
    height?: number;
    cellSize?: number; 
    pixels?: { x: number; y: number; color: string }[]; 
}

export default function PixelGrid({
    width = 800,
    height = 600,
    cellSize = 15,
    pixels = [],
}: PixelGridProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "#ccc";
        for (let x = 0; x < width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        pixels.forEach(({ x, y, color }) => {
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        });
    }, [width, height, cellSize, pixels]);

    return (
        <canvas
            className="w-full"
            ref={canvasRef}
            style={{ border: "1px solid black" }}
        />
    );
}
