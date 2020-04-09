import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import * as serviceWorker from './serviceWorker';

import { StateProvider  } from "fe-context";
import "fe-common/styles/index.less";
import "./index.less";

ReactDOM.render(
  <BrowserRouter>
    <StateProvider.Provider>
      <App />
    </StateProvider.Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
