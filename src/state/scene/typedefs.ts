import { TPoint } from "geometry/typedefs";

// Eventually a horizon-line should be established, with the vanishing points as scalars?
export type TVanishingPoints = Readonly<{
  vp1: TPoint;
  vp2: TPoint;
  vp3: TPoint;
}>;

export type TStateScene = Readonly<{
  vanishingPoints: TVanishingPoints;
}>;
