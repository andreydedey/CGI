import type { Pixel } from "@/components/Canva/config/pixel";

interface Point {
    x: number;
    y: number;
}

export interface Rect {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

const INSIDE = 0;  // 0000
const LEFT = 1;  // 0001
const RIGHT = 2;  // 0010
const BOTTOM = 4;  // 0100
const TOP = 8;  // 1000

function computeOutCode(p: Point, rect: Rect): number {
    let code = INSIDE;

    if (p.x < rect.xmin) code |= LEFT;
    else if (p.x > rect.xmax) code |= RIGHT;

    if (p.y < rect.ymin) code |= BOTTOM;
    else if (p.y > rect.ymax) code |= TOP;

    return code;
}

export function cohenSutherlandClip(
    p0: Point,
    p1: Point,
    rect: Rect
): Pixel[] | undefined {
    let x0 = p0.x, y0 = p0.y;
    let x1 = p1.x, y1 = p1.y;

    let outcode0 = computeOutCode(p0, rect);
    let outcode1 = computeOutCode(p1, rect);
    let accept = false;

    while (true) {
        if (!(outcode0 | outcode1)) {
            accept = true;
            break;
        } else if (outcode0 & outcode1) {
            break;
        } else {
            let outcodeOut = outcode0 ? outcode0 : outcode1;
            let x = 0, y = 0;

            if (outcodeOut & TOP) {
                x = x0 + (x1 - x0) * (rect.ymax - y0) / (y1 - y0);
                y = rect.ymax;
            } else if (outcodeOut & BOTTOM) {
                x = x0 + (x1 - x0) * (rect.ymin - y0) / (y1 - y0);
                y = rect.ymin;
            } else if (outcodeOut & RIGHT) {
                y = y0 + (y1 - y0) * (rect.xmax - x0) / (x1 - x0);
                x = rect.xmax;
            } else if (outcodeOut & LEFT) {
                y = y0 + (y1 - y0) * (rect.xmin - x0) / (x1 - x0);
                x = rect.xmin;
            }

            if (outcodeOut === outcode0) {
                x0 = x; y0 = y;
                outcode0 = computeOutCode({ x, y }, rect);
            } else {
                x1 = x; y1 = y;
                outcode1 = computeOutCode({ x, y }, rect);
            }
        }
    }

    if (accept) {
        return [{ x: Math.round(x0), y: Math.round(y0) }, { x: Math.round(x1), y: Math.round(y1) }];
    }
    return undefined;
}
