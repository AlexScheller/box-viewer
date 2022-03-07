import * as React from "react";
import { TAppContext, TAppStore, TStoreContext } from "./typedefs";

function Provider<S>({
  Context,
  store,
  children,
}: {
  Context: TAppContext<S>;
  store: TAppStore<S>;
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(
    store.rootReducer,
    store.defaultState
  );
  const storeContext: TStoreContext<S> = {
    getState: () => state as S,
    dispatch,
  };
  (window as any).store = storeContext; // TODO: Find a less hacky approach?
  return <Context.Provider value={storeContext}>{children}</Context.Provider>;
}

export { Provider };
