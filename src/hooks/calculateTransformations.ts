import { useMemo } from "react";

const calculateTransformations = (
  points: { x: number; y: number }[],
  formData: any
) => {
  const transformations = [];

  if (formData.angle !== undefined) {
    transformations.push({
      type: "rotation",
      angle: formData.angle,
      cx: formData.x_pivot ?? 0,
      cy: formData.y_pivot ?? 0,
    });
  }
  if (formData.dx !== undefined || formData.dy !== undefined) {
    transformations.push({
      type: "translation",
      dx: formData.dx ?? 0,
      dy: formData.dy ?? 0,
    });
  }
  if (formData.sx !== undefined || formData.sy !== undefined) {
    transformations.push({
      type: "scaling",
      sx: formData.sx ?? 1,
      sy: formData.sy ?? 1,
      cx: formData.x_fixed ?? 0,
      cy: formData.y_fixed ?? 0,
    });
  }

  let transformedPoints = [...points];

  transformations.forEach((transformation: any) => {
    const type = transformation.type;

    if (type === "translation") {
      const dx = Number(transformation.dx) || 0;
      const dy = Number(transformation.dy) || 0;
      transformedPoints = transformedPoints.map((p) => ({
        x: p.x + dx,
        y: p.y + dy,
      }));
    }

    if (type === "scaling") {
      const sx = Number(transformation.sx) || 1;
      const sy = Number(transformation.sy) || 1;
      const cx = Number(transformation.cx) || 0;
      const cy = Number(transformation.cy) || 0;
      transformedPoints = transformedPoints.map((p) => ({
        x: cx + (p.x - cx) * sx,
        y: cy + (p.y - cy) * sy,
      }));
    }

    if (type === "rotation") {
      const angleDeg = Number(transformation.angle);
      const cx = Number(transformation.cx);
      const cy = Number(transformation.cy);

      if (!points.length || isNaN(angleDeg) || isNaN(cx) || isNaN(cy))
        return transformedPoints;

      const angleRad = (angleDeg * Math.PI) / 180;
      transformedPoints = transformedPoints.map((p) => {
        const x = p.x - cx;
        const y = p.y - cy;
        return {
          x: Math.round(cx + x * Math.cos(angleRad) - y * Math.sin(angleRad)),
          y: Math.round(cy + x * Math.sin(angleRad) + y * Math.cos(angleRad)),
        };
      });
    }
  });

  return transformedPoints;
};

export function useCalculateTransformations(
  points: { x: number; y: number }[],
  formData: any
) {
  return useMemo(() => {
    return calculateTransformations(points, formData);
  }, [points, formData]);
}
