import type { TAction, TEmptyPayload } from "../../minidux/typedefs";

// TODO: Create a factory for these
export function increment(): TAction<TEmptyPayload> {
  return {
    type: "counts/increment", // TODO Reify this for type safety
    payload: {}, // TODO: See, this is why I want a factory
  };
}

export function decrement(): TAction<TEmptyPayload> {
  return {
    type: "counts/decrement", // TODO Reify this for type safety
    payload: {}, // TODO: See, this is why I want a factory
  };
}
