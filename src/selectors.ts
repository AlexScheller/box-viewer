// TODO: Make these per slice

import type { TStateName, TStateCount } from "./state";

export function getName(state: TStateName): string {
  return state.name;
}

export function getCount(state: TStateCount): number {
  return state.count;
}

// const selectors = {
//   getName,
//   getCount,
// };

// export default selectors;
