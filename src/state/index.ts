import * as React from "react";

import { combineReducers, makeReducer } from "../minidux/toolkit";
import type {
  TAction,
  TAppStore,
  TEmptyPayload,
  TReducerHandlers,
  TStoreContext,
} from "../minidux/typedefs";

// --- Name ---
export type TStateName = {
  readonly name: string;
};
const kDefaultNameState: TStateName = {
  name: "Alex",
};
function unsafeNameHandler(
  state: TStateName,
  action: TAction<any>
): TStateName {
  switch (action.type) {
    case "append":
      return { ...state, name: state.name + "a" };
    default:
      return state;
  }
}
const nameReducer = makeReducer<TStateName>({
  defaultState: kDefaultNameState,
  unsafeHandler: unsafeNameHandler,
});

// --- Count ---
export type TStateCount = {
  readonly count: number;
};
const kDefaultCountState: TStateCount = {
  count: 0,
};
const countHandlers: TReducerHandlers<TStateCount> = {
  increment: (state: TStateCount, action: TAction<TEmptyPayload>) => {
    return {
      ...state,
      count: state.count + 1,
    };
  },
  decrement: (state: TStateCount, action: TAction<TEmptyPayload>) => {
    return {
      ...state,
      count: state.count + 1,
    };
  },
};
const countReducer = makeReducer<TStateCount>({
  defaultState: kDefaultCountState,
  handlers: countHandlers,
});

// --- root ---
export type TRootState = {
  count: ReturnType<typeof countReducer>;
  name: ReturnType<typeof nameReducer>;
};

const rootReducer = combineReducers<TRootState>({
  count: countReducer,
  name: nameReducer,
});

// TODO: Make this more automatic?
const kDefaultRootState: TRootState = {
  count: { ...kDefaultCountState },
  name: { ...kDefaultNameState },
};

// The two big things you must create are the store and AppContext instances.
const store: TAppStore<TRootState> = {
  rootReducer,
  defaultState: kDefaultRootState,
  //   context: React.createContext<TStoreContext<TRootState>>(null as any),
};

const AppContext = React.createContext<TStoreContext<TRootState>>(null as any);

// function Provider();

export { store, AppContext };
