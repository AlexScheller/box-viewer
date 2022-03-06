import type { TStateRoot } from "../typedefs";
import type { TStateNames } from "./typedefs";

function makeNamesSelector<T>(selector: (countsState: TStateNames) => T) {
  return (state: TStateRoot): T => {
    const namesState = state.names;
    return selector(namesState);
  };
}

export const getName = makeNamesSelector((state: TStateNames): string => {
  return state.name;
});
