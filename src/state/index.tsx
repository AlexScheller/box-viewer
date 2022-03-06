import * as React from "react";
import { Provider } from "../minidux/store";
import { combineReducers } from "../minidux/toolkit";
import type { TAppStore, TStoreContext } from "../minidux/typedefs";
import { counts, kDefaultCountsState } from "./count/reducers";
import { names, kDefaultNamesState } from "./name/reducers";
import type { TStateRoot } from "./typedefs";

const kDefaultRootState: TStateRoot = {
  counts: { ...kDefaultCountsState },
  names: { ...kDefaultNamesState },
};

const rootReducer = combineReducers<TStateRoot>({
  counts,
  names,
});

// TODO: Make this more automatic?

// The two big things you must create are the store and AppContext instances.
const store: TAppStore<TStateRoot> = {
  rootReducer,
  defaultState: kDefaultRootState,
  //   context: React.createContext<TStoreContext<TRootState>>(null as any),
};

const AppContext = React.createContext<TStoreContext<TStateRoot>>(null as any);

// This is the only reason this file has to be `.tsx`. There's not really any downside to this
// other than it "feels" nicer to have all of the state files be plain `.ts` I guess...
// Basically the choice is either composing this up in `index.tsx` purely from imported stuff, or
// just doing that here so that `index.tsx` can import and use a single thing. Not sure which I
// prefer right now.
function AppStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider<TStateRoot> Context={AppContext} store={store}>
      {children}
    </Provider>
  );
}

export { AppStateProvider, AppContext };
