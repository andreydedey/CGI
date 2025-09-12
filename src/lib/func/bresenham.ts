import type { Pixel } from "@/components/Canva/config/pixel";

/**
 * Algoritmo de Bresenham para linhas
 * @param x0 ponto inicial x
 * @param y0 ponto inicial y
 * @param x1 ponto final x
 * @param y1 ponto final y
 * @param color cor da linha
 * @returns array de pixels
 */
export function bresenhamLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Pixel[] {
  const pixels: Pixel[] = [];

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    pixels.push({ x: x0, y: y0 });
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  return pixels;
}