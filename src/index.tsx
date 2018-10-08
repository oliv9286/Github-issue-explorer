import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import {State} from './types'
import App from './components/App'
import thunk from "redux-thunk";
import reducer from "./reducer";

const initialState: State = {
  filter: "all",
  query: null,
  issues: [],
  isSearchInProgress: false,
  searchError: null
};

const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
      <Provider store={store}>
<App/>
      </Provider>,
  document.getElementById("root")
);
