import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppStore } from "./Store";

ReactDOM.render(
  <React.StrictMode>
    <AppStore>
      <App />
    </AppStore>
  </React.StrictMode>,
  document.getElementById("root")
);
