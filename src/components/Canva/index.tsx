import { useRef, useEffect } from "react";
import type { Pixel } from "./config/pixel";

interface PixelGridProps {
    width?: number;
    height?: number;
    cellSize?: number;
    pixels?: Pixel[];
}

export default function Canva({
    width = 800,
    height = 400,
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
        for (let x = 0; x <= width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        pixels.forEach(({ x, y }) => {
            ctx.fillStyle = "blue";
            const canvasX = x * cellSize; 
            const canvasY = height - (y + 1) * cellSize + 5;
            const size = cellSize - 1; 
            ctx.fillRect(canvasX, canvasY, size, size);
        });
    }, [width, height, cellSize, pixels]);

  return <canvas className="flex-1" ref={canvasRef} />;
}
