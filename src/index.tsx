import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, AppContext, TRootState } from "./state/index";
import { Provider } from "./minidux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider<TRootState> Context={AppContext} store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
