import { useMemo } from "react";
import { bresenhamLine } from "@/lib/func/bresenham";
import { generateCircleOutlinePixels } from "@/lib/func/circulo";
// Importe outros algoritmos conforme necessário

export function useCalculatePoints(formData: any) {
  return useMemo(() => {
    const algorithm = formData?.algorithm;
    let points: { x: number; y: number }[] = [];

    if (algorithm === "bresenham") {
      if (
        formData.x_start !== undefined &&
        formData.y_start !== undefined &&
        formData.x_final !== undefined &&
        formData.y_final !== undefined
      ) {
        points = bresenhamLine(
          Number(formData.x_start),
          Number(formData.y_start),
          Number(formData.x_final),
          Number(formData.y_final)
        );
      }
    }

    if (algorithm === "circle") {
      if (
        formData.centroX !== undefined &&
        formData.centroY !== undefined &&
        formData.raio !== undefined
      ) {
        points = generateCircleOutlinePixels(
          Number(formData.centroX),
          Number(formData.centroY),
          Number(formData.raio)
        ).map((p) => ({ x: p.x, y: p.y }));
      }
    }

    // Adicione outros algoritmos aqui...

    return points;
  }, [formData]);
}
