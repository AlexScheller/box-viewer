import type { TAction, TEmptyPayload } from "../../minidux/typedefs";

export function append(): TAction<TEmptyPayload> {
  return {
    type: "names/append", // TODO Reify this for type safety
    payload: {}, // TODO: See, this is why I want a factory
  };
}
