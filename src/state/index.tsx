import * as React from "react";
import { Provider } from "../minidux/provider";
import { combineReducers } from "../minidux/toolkit";
import type { TAppStore, TStoreContext } from "../minidux/typedefs";
import { scene, kDefaultSceneState } from "./scene/reducers";
import type { TStateRoot } from "./typedefs";
import { ui, kDefaultUIState } from "./ui/reducers";

const kDefaultRootState: TStateRoot = {
  ui: { ...kDefaultUIState },
  scene: { ...kDefaultSceneState },
};

const rootReducer = combineReducers<TStateRoot>({
  ui,
  scene,
});

// TODO: Make this more automatic?

// The two big things you must create are the store and AppContext instances.
const store: TAppStore<TStateRoot> = {
  rootReducer,
  defaultState: kDefaultRootState,
};

// It's ok to provide the default value as `null as any` because the context should never be
// accessed except through `Provider`, which will always provided a full instantiated value to the
// context.
const AppContext = React.createContext<TStoreContext<TStateRoot>>(null as any);

function AppStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider<TStateRoot> Context={AppContext} store={store}>
      {children}
    </Provider>
  );
}

export { AppStateProvider, AppContext };
