import type { TStateRoot } from "../typedefs";
import type { TStateScene, TVanishingPoints } from "./typedefs";

// TODO: Can this be made automatic up in like state/utils or something based on TRootState?
function makeSceneSelector<T>(selector: (sceneState: TStateScene) => T) {
  return (state: TStateRoot): T => {
    const sceneState = state.scene;
    return selector(sceneState);
  };
}

// TODO: Canvas dimensions are unlikely to be decoupled from eachother, so it's probably better to
export const getVanishingPoints = makeSceneSelector(
  (state: TStateScene): TVanishingPoints => {
    return state.vanishingPoints;
  }
);
