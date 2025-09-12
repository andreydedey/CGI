import type { Point } from "./bezier";

export function translate(polygon: Point[], dx: number, dy: number): Point[] {
    return polygon.map(p => ({
        x: p.x + dx,
        y: p.y + dy
    }));
}


export function rotate(polygon: Point[], angleDeg: number, cx: number, cy: number): Point[] {
    const angleRad = (Math.PI / 180) * angleDeg;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    return polygon.map(p => {
        const x = p.x - cx;
        const y = p.y - cy;
        return {
            x: Math.round(x * cos - y * sin + cx),
            y: Math.round(x * sin + y * cos + cy)
        };
    });
}

export function scale(polygon: Point[], sx: number, sy: number, fx: number, fy: number): Point[] {
    return polygon.map(p => ({
        x: Math.round(fx + (p.x - fx) * sx),
        y: Math.round(fy + (p.y - fy) * sy)
    }));
}
