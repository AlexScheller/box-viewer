import { TStateRoot } from "../typedefs";
import { TStateCounts } from "./typedefs";

// TODO: Can this be made automatic up in like state/utils or something based on TRootState?
function makeCountsSelector<T>(selector: (countsState: TStateCounts) => T) {
  return (state: TStateRoot): T => {
    const countsState = state.counts;
    return selector(countsState);
  };
}

export const getCount = makeCountsSelector((state: TStateCounts): number => {
  return state.count;
});
