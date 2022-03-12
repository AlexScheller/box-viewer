import type { TStateRoot } from "../typedefs";
import type { TCanvasDimensions, TStateUI } from "./typedefs";

// TODO: Can this be made automatic up in like state/utils or something based on TRootState?
function makeCountsSelector<T>(selector: (uiState: TStateUI) => T) {
  return (state: TStateRoot): T => {
    const uiState = state.ui;
    return selector(uiState);
  };
}

// TODO: Canvas dimensions are unlikely to be decoupled from eachother, so it's probably better to
export const getCanvasDimensions = makeCountsSelector(
  (state: TStateUI): TCanvasDimensions => {
    return state.canvas;
  }
);
