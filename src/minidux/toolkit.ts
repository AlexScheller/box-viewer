import * as React from "react";
import type {
  TReducerIngredients,
  TReducer,
  TAction,
  TActionType,
  TStoreContext,
  TDispatch,
} from "./typedefs";

function makeReducer<S>({
  defaultState,
  handlers,
  unsafeHandler,
}: TReducerIngredients<S>): TReducer<S> {
  return (state: S, action: TAction<any>): S => {
    if (handlers && action.type in handlers)
      return handlers[action.type](state, action);
    if (unsafeHandler) return unsafeHandler(state, action);
    return defaultState;
  };
}

function combineReducers<R>(
  reducers: Record<keyof R, TReducer<any>>
): TReducer<R> {
  return (state: R, action: TAction<any>): R => {
    const [reducerKey, ...rest] = action.type.split("/");
    const subAction: TAction<any> = {
      ...action,
      type: rest.join("/") as TActionType,
    };
    console.log(reducerKey);
    console.log(subAction);
    return reducers[reducerKey as keyof R](state, subAction);
  };
}

// TODO: Add caching/memoization with equality function
// function useSelector<T, S>(selector: (state: S) => T): T {
//   const { getState } = React.useContext(AppContext);
//   return selector(getState());
// }

// function useDispatch() {
//   const { dispatch } = React.useContext(AppContext);
//   return dispatch;
// }

// function makeConnect();

// function makeUseDispatch();

// Right now `connect/useSelector/useDispatch` have to be created by the library consumer, but the
// following factories make it pretty painless to do so.

// TODO: Add caching/memoization with equality function
function makeUseSelector<S>(context: React.Context<TStoreContext<S>>) {
  return <T>(selector: (state: S) => T): T => {
    const { getState } = React.useContext(context);
    return selector(getState());
  };
}

function makeUseDispatch<S>(context: React.Context<TStoreContext<S>>) {
  return (): TDispatch => {
    const { dispatch } = React.useContext(context);
    return dispatch;
  };
}

export { makeReducer, combineReducers, makeUseSelector, makeUseDispatch };
