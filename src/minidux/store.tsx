import * as React from "react";
import { TAppContext, TAppStore, TStoreContext } from "./typedefs";

// export type TAction<P> = {
//   readonly type: TActionType;
//   readonly payload?: P; // TODO: Can this be typed?
// };

// type TReducer = (state: TAppState, action: TAction) => TAppState;

// function configureStore(reducers: any);

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
  (window as any).store = store; // TODO: Find a less hacky approach?
  return <Context.Provider value={storeContext}>{children}</Context.Provider>;
}

// It's ok to provide the default value as `null as any` because the context should never be
// accessed except through `Provider`, which will always provided a full instantiated value to the
// context.

// I don't think it's possible if we are going to use React.Context, but try and find a way to
// make this whole thing either type agnostic, or use generic types to supply it... Because I'm
// currently treating AppContext as a script-level variable, this will be tricky.
// Maybe if I pass the context to the store, rather than the other way around?

// const AppContext = React.createContext<TStoreContext<TRootState>>(null as any);

// function connect<C, S, SP = {}, D = {}>(
//   mapStateToProps: (state: S) => SP,
//   mapDispatchToProps?: (dispatch: TDispatch) => D
// ) {
//   return (Component: any) => (props: C) => {
//     return (
//       <AppContext.Consumer>
//         {({ getState, dispatch }) => {
//           const stateProps = mapStateToProps(getState());
//           const dispatchProps = mapDispatchToProps?.(dispatch);
//           return <Component {...props} {...stateProps} {...dispatchProps} />;
//         }}
//       </AppContext.Consumer>
//     );
//   };
// }

// // TODO: Add caching/memoization with equality function
// function useSelector<T, S>(selector: (state: S) => T): T {
//   const { getState } = React.useContext(AppContext);
//   return selector(getState());
// }

// function useDispatch() {
//   const { dispatch } = React.useContext(AppContext);
//   return dispatch;
// }

// export { Provider, connect, useSelector, useDispatch };

export { Provider };
