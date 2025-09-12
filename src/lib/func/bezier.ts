export interface Point {
    x: number;
    y: number;
}

function cubicBezier(P0: Point, P1: Point, P2: Point, P3: Point, steps: number = 100): Point[] {
    const points: Point[] = [];

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.pow(1 - t, 3) * P0.x +
            3 * Math.pow(1 - t, 2) * t * P1.x +
            3 * (1 - t) * Math.pow(t, 2) * P2.x +
            Math.pow(t, 3) * P3.x;

        const y = Math.pow(1 - t, 3) * P0.y +
            3 * Math.pow(1 - t, 2) * t * P1.y +
            3 * (1 - t) * Math.pow(t, 2) * P2.y +
            Math.pow(t, 3) * P3.y;

        points.push({ x: Math.round(x), y: Math.round(y) });
    }

    return points;
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

export function rasterizeBezier(P0: Point, P1: Point, P2: Point, P3: Point, steps: number = 100): Point[] {
    const bezierPoints = cubicBezier(P0, P1, P2, P3, steps);
    const rasterPixels: Point[] = [];

    for (let i = 0; i < bezierPoints.length - 1; i++) {
        const linePixels = bresenham(
            bezierPoints[i].x, bezierPoints[i].y,
            bezierPoints[i + 1].x, bezierPoints[i + 1].y
        );
        rasterPixels.push(...linePixels);
    }

    // remover duplicados
    const uniquePixels = Array.from(new Set(rasterPixels.map(p => `${p.x},${p.y}`)))
        .map(s => {
            const [x, y] = s.split(',').map(Number);
            return { x, y };
        });

    return uniquePixels;
}
