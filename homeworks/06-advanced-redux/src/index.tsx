import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./store/reducer";
import { ActionType, State } from "./types";
import {
  PIZZA_ADDED_INTO_BASKET,
  PIZZA_REMOVED_FROM_BASKET,
  PIZZA_VIEWED,
} from "./store/constants";

const sendEvent = (
  eventName: string,
  pizzaName?: string,
  pizzaPrice?: number
) => {
  fetch("http://localhost:3001/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventName,
      pizzaName,
      pizzaPrice,
    }),
  })
    .then((json) => {
      console.log(json);
    })
    .catch((ex) => {
      console.log(ex);
    });
  return;
};

const logger: ThunkMiddleware = () => {
  return (next) => (action) => {
    switch (action.type) {
      case PIZZA_ADDED_INTO_BASKET: {
        sendEvent(action.type, action.payload.name, action.payload.price);
        break;
      }
      case PIZZA_REMOVED_FROM_BASKET: {
        sendEvent(action.type, action.payload.name, action.payload.price);
        break;
      }
      case PIZZA_VIEWED: {
        sendEvent(action.type);
        break;
      }

      default:
        break;
    }

    next(action);
  };
};

export const store: Store<State, ActionType> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
