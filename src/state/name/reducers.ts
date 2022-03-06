import { makeReducer } from "../../minidux/toolkit";
import type { TAction } from "../../minidux/typedefs";
import type { TStateNames } from "./typedefs";

const kDefaultNamesState: TStateNames = {
  name: "Alex",
};

function unsafeNamesHandler(
  state: TStateNames,
  action: TAction<any>
): TStateNames {
  switch (action.type) {
    case "append":
      return { ...state, name: state.name + "a" };
    default:
      return state;
  }
}

const namesReducer = makeReducer<TStateNames>({
  defaultState: kDefaultNamesState,
  unsafeHandler: unsafeNamesHandler,
});

export { namesReducer as names, kDefaultNamesState };
