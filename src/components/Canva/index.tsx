import { useRef, useEffect } from "react";

export default function CanvasComGrade() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const cellSize = 20;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(width, y + 0.5);
            ctx.stroke();
        }

        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(width / 2 + 0.5, 0);
        ctx.lineTo(width / 2 + 0.5, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height / 2 + 0.5);
        ctx.lineTo(width, height / 2 + 0.5);
        ctx.stroke();

    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: "1px solid black", display: "block", margin: "20px auto" }}
        />
    );
}
