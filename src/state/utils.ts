import { AppContext } from "./index";
import {
  makeConnect,
  makeUseDispatch,
  makeUseSelector,
} from "../minidux/toolkit";

// TODO: Look into the type inference going on here, this seems like heavy magic to me.
const connect = makeConnect(AppContext);

const useDispatch = makeUseDispatch(AppContext);

const useSelector = makeUseSelector(AppContext);

export { connect, useDispatch, useSelector };
