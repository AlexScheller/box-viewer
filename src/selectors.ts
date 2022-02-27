// TODO: Make these per slice

import { TAppState } from "./Store";

export function getName(state: TAppState): string {
  return state.name;
}

export function getCount(state: TAppState): number {
  return state.count;
}

// const selectors = {
//   getName,
//   getCount,
// };

// export default selectors;
