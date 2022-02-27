import * as React from "react";
import { useReducer } from "react";

// TODO Create these by combining slices
export type TAppState = Readonly<{
  name: string;
  count: number;
}>;

export enum ActionType {
  increment = "increment",
  decrement = "decprement",
}

type TAction = {
  readonly kind: ActionType;
};

// TODO: Make this not all defined here
function reducer(state: TAppState, action: TAction): TAppState {
  switch (action.kind) {
    case ActionType.increment:
      return { ...state, count: state.count + 1 };
    case ActionType.decrement:
      return { ...state, count: state.count - 1 };
    default:
      const _exhaustive: never = action.kind;
      return _exhaustive;
  }
}

const kDefaultAppState: TAppState = {
  name: "Alex",
  count: 0,
};

export type TDispatch = (action: TAction) => void;

type TAppStore = {
  readonly getState: () => TAppState;
  readonly dispatch: TDispatch;
};

function AppStore({ children }: { children: React.ReactNode }) {
  const rootReducer = reducer; // TODO Combined reducers
  const [state, dispatch] = useReducer(rootReducer, kDefaultAppState);
  const store: TAppStore = { getState: () => state, dispatch };
  (window as any).store = store; // TODO: Find a less hacky approach?
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

// It's ok to provide the default value as `null as any` because the context should never be
// accessed except through `Provider`, which will always provided a full instantiated value to the
// context.
const AppContext = React.createContext<TAppStore>(null as any);

function connect<C, S, D>(
  mapStateToProps: (state: TAppState) => S,
  mapDispatchToProps?: (dispatch: TDispatch) => D
) {
  // TODO: Can this be explicitly typed?
  return (Component: any) => (props: C) => {
    return (
      <AppContext.Consumer>
        {({ getState, dispatch }) => {
          const stateProps = mapStateToProps(getState());
          const dispatchProps = mapDispatchToProps?.(dispatch);
          return <Component {...props} {...stateProps} {...dispatchProps} />;
        }}
      </AppContext.Consumer>
    );
  };
}

export { AppStore, connect };
