import { AppContext, TStateCount, TStateName } from "./index";
import { makeUseDispatch, makeUseSelector } from "../minidux/toolkit";

const useDispatch = makeUseDispatch(AppContext);

// TODO: Actually break these out into the files that will contain state slices.
const useNameSelector = makeUseSelector<TStateName>(AppContext);
const useCountSelector = makeUseSelector<TStateCount>(AppContext);

export { useDispatch, useNameSelector, useCountSelector };
