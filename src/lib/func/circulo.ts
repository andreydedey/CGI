interface PixelCircle {
    x: number;
    y: number;
    cx: number;
    cy: number;
    r: number;
}

export function generateCircleOutlinePixels(cx: number, cy: number, r: number): PixelCircle[] {
    const pixels: PixelCircle[] = [];
    let x = r;
    let y = 0;
    let decision = 1 - x;

    while (y <= x) {
        const points = [
            { x: cx + x, y: cy + y },
            { x: cx + y, y: cy + x },
            { x: cx - x, y: cy + y },
            { x: cx - y, y: cy + x },
            { x: cx - x, y: cy - y },
            { x: cx - y, y: cy - x },
            { x: cx + x, y: cy - y },
            { x: cx + y, y: cy - x },
        ];

        points.forEach(p =>
            pixels.push({ x: p.x, y: p.y, cx, cy, r })
        );

        y++;
        if (decision <= 0) {
            decision += 2 * y + 1;
        } else {
            x--;
            decision += 2 * (y - x) + 1;
        }
    }

    const uniquePixels = Array.from(
        new Map(pixels.map(p => [`${p.x},${p.y}`, p])).values()
    );

    return uniquePixels;
}
