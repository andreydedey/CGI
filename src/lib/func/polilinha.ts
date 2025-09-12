interface Point {
    x: number;
    y: number;
}

function bresenham(x0: number, y0: number, x1: number, y1: number): Point[] {
    const pixels: Point[] = [];
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        pixels.push({ x: x0, y: y0 });
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }

    return pixels;
}

export function rasterizePolyline(points: Point[]): Point[] {
    if (points.length < 2) throw new Error("É necessário pelo menos 2 pontos.");

    const rasterPixels: Point[] = [];

    for (let i = 0; i < points.length - 1; i++) {
        const segmentPixels = bresenham(
            points[i].x, points[i].y,
            points[i + 1].x, points[i + 1].y
        );
        rasterPixels.push(...segmentPixels);
    }

    const uniquePixels = Array.from(new Set(rasterPixels.map(p => `${p.x},${p.y}`)))
        .map(s => {
            const [x, y] = s.split(',').map(Number);
            return { x, y };
        });

    return uniquePixels;
}
