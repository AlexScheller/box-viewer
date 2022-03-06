import { TSelector } from "../minidux/typedefs";
import type { TStateCounts } from "./count/typedefs";
import type { TStateNames } from "./name/typedefs";

export type TStateRoot = {
  counts: TStateCounts;
  names: TStateNames;
};

export type TRootSelector<T> = TSelector<TStateRoot, T>;
