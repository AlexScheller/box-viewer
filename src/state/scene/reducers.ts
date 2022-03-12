import { Point } from "geometry/utils";
import { makeReducer } from "minidux/toolkit";
import type { TStateScene } from "./typedefs";

const kDefaultSceneState: TStateScene = {
  vanishingPoints: {
    vp1: Point.new(5, 5),
    vp2: Point.new(-5, 5),
    vp3: Point.new(0, -5),
  },
};

const sceneReducer = makeReducer<TStateScene>({
  defaultState: kDefaultSceneState,
});

export { sceneReducer as scene, kDefaultSceneState };
