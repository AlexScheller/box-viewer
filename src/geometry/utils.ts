import { TPoint } from "./typedefs";

// TODO: Split this into separate files if it gets large enough

// ---| Generic Math |---

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// ---| Points |---

function newPoint(x: number, y: number): TPoint {
  return { x, y };
}

const Point = {
  new: newPoint,
};

export { Point };
