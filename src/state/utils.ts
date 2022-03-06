import { AppContext } from "./index";
import { makeUseDispatch, makeUseSelector } from "../minidux/toolkit";

// TODO: Look into the type inference going on here, this seems like heavy magic to me.
const useDispatch = makeUseDispatch(AppContext);

const useSelector = makeUseSelector(AppContext);

export { useDispatch, useSelector };
