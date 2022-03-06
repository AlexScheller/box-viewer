import React from "react";

// --- Dispatch ---
export type TDispatch = (action: TAction<any>) => void;

// --- Actions ---
export type TActionType = string;
export type TEmptyPayload = {};
export type TAction<P> = {
  readonly type: TActionType;
  readonly payload: P;
};

// --- reducers ---
export type TReducer<S> = (state: S, action: TAction<any>) => S;
export type TReducerHandler<S> = (state: S, action: TAction<any>) => S;
export type TReducerHandlers<S> = Record<TActionType, TReducerHandler<S>>;
export type TReducerIngredients<S> = {
  readonly defaultState: S;
  readonly handlers?: TReducerHandlers<S>;
  readonly unsafeHandler?: TReducer<S>;
};

// --- selectors ---
export type TSelector<S, T> = (state: S) => T;

// --- store ---
export type TStoreContext<S> = {
  readonly getState: () => S;
  readonly dispatch: TDispatch;
};

export type TAppStore<S> = {
  readonly rootReducer: TReducer<S>;
  readonly defaultState: S;
};

// React
export type TAppContext<S> = React.Context<TStoreContext<S>>;
