import React from "react";
import ReactDOM from "react-dom/client";
import type { ThunkAction } from "redux-thunk";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { Action, ActionCreator } from "redux";
import { TCurrentIngredientActions } from "./redux/actions/current-ingredient";
import { ISetOrderCostAction } from "./redux/actions/ordering";
import { TIngredientConstructorActions } from "./redux/actions/ingredients-constructor";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TCurrentIngredientActions
  | ISetOrderCostAction
  | TIngredientConstructorActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
