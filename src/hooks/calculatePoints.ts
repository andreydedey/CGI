import { useMemo } from "react";
import { bresenhamLine } from "@/lib/func/bresenham";
import { generateCircleOutlinePixels } from "@/lib/func/circulo";
import { rasterizePolyline } from "@/lib/func/polilinha";
import { rasterizeBezier } from "@/lib/func/bezier";

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

    if (algorithm === "polilinha") {
      if (Array.isArray(formData.polilinha) && formData.polilinha.length >= 2) {
        points = rasterizePolyline(formData.polilinha);
      }
    }

    if (algorithm === "bezier") {
      if (
        formData.x_inicial !== undefined &&
        formData.y_inicial !== undefined &&
        formData.x_controle1 !== undefined &&
        formData.y_controle1 !== undefined &&
        formData.x_controle2 !== undefined &&
        formData.y_controle2 !== undefined &&
        formData.x_final !== undefined &&
        formData.y_final !== undefined
      ) {
        points = rasterizeBezier(
          { x: Number(formData.x_inicial), y: Number(formData.y_inicial) },
          { x: Number(formData.x_controle1), y: Number(formData.y_controle1) },
          { x: Number(formData.x_controle2), y: Number(formData.y_controle2) },
          { x: Number(formData.x_final), y: Number(formData.y_final) }
        );
      }
    }

    // Adicione outros algoritmos aqui...

    return points;
  }, [formData]);
}
