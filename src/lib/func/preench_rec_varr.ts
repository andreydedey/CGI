import type { Point } from "./bezier";

export function floodFill(
    grid: number[][], // 0 = vazio, 1 = borda, 2 = preenchido
    x: number,
    y: number
): void {
    // Checa limites da matriz
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) return;

    // Se não é área vazia, para
    if (grid[y][x] !== 0) return;

    // Preenche pixel
    grid[y][x] = 2;

    // Chama recursivamente nos 4 vizinhos
    floodFill(grid, x + 1, y);
    floodFill(grid, x - 1, y);
    floodFill(grid, x, y + 1);
    floodFill(grid, x, y - 1);
}

export function scanlineFill(polygon: Point[], width: number, height: number): Point[] {
    const filledPixels: Point[] = [];

    // Descobre Y min e Y max do polígono
    const ymin = Math.min(...polygon.map(p => p.y));
    const ymax = Math.max(...polygon.map(p => p.y));

    for (let y = ymin; y <= ymax; y++) {
        const intersections: number[] = [];

        // Para cada aresta do polígono
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];

            // Verifica se a linha de varredura cruza a aresta
            if ((p1.y <= y && p2.y > y) || (p2.y <= y && p1.y > y)) {
                const x = p1.x + ((y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y);
                intersections.push(Math.round(x));
            }
        }

        // Ordena interseções da esquerda p/ direita
        intersections.sort((a, b) => a - b);

        // Preenche entre pares de interseções
        for (let i = 0; i < intersections.length; i += 2) {
            const xStart = intersections[i];
            const xEnd = intersections[i + 1];
            for (let x = xStart; x <= xEnd; x++) {
                if (x >= 0 && x < width && y >= 0 && y < height) {
                    filledPixels.push({ x, y });
                }
            }
        }
    }

    return filledPixels;
}
