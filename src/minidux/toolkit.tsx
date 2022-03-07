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

// TODO: This is pretty weakly typed, but I'm not sure of a better way that wouldn't make the api
// really unwieldy.
function combineReducers<RS extends { [key: string]: any }>(
  reducers: Record<keyof RS, TReducer<any>>
): TReducer<RS> {
  return (state: RS, action: TAction<any>): RS => {
    const [reducerKey, ...rest] = action.type.split("/");
    const subAction: TAction<any> = {
      ...action,
      type: rest.join("/") as TActionType,
    };
    if (reducerKey in state) {
      const slice = state[reducerKey];
      const newSlice = reducers[reducerKey](slice, subAction);
      return { ...state, [reducerKey]: { ...newSlice } };
    }
    return state;
  };
}

// Right now `connect/useSelector/useDispatch` have to be created by the library consumer, but the
// following factories make it pretty painless to do so.

function makeConnect<RS>(context: React.Context<TStoreContext<RS>>) {
  return <C, S = {}, D = {}>(
    mapStateToProps: (state: RS) => S,
    mapDispatchToProps?: (dispatch: TDispatch) => D
  ) => {
    return (Component: any) => (props: C) => {
      return (
        <context.Consumer>
          {({ getState, dispatch }) => {
            const stateProps = mapStateToProps(getState());
            const dispatchProps = mapDispatchToProps?.(dispatch);
            return <Component {...props} {...stateProps} {...dispatchProps} />;
          }}
        </context.Consumer>
      );
    };
  };
}

// TODO: Add caching/memoization with equality function
// Note: The trailing comma is required to make the compiler understand this is a generic param, not
// a JSX component.
function makeUseSelector<S>(context: React.Context<TStoreContext<S>>) {
  return <T,>(selector: (state: S) => T): T => {
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

export {
  makeReducer,
  combineReducers,
  makeConnect,
  makeUseSelector,
  makeUseDispatch,
};
