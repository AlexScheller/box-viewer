import { makeReducer } from "minidux/toolkit";
import type { TStateUI } from "./typedefs";

const kDefaultUIState: TStateUI = {
  canvas: {
    width: 500,
    height: 500,
  },
};

const uiReducer = makeReducer<TStateUI>({
  defaultState: kDefaultUIState,
});

export { uiReducer as ui, kDefaultUIState };
