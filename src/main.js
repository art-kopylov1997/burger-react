import { Provider } from "react-redux";
import App from "./components/app";
import { store } from "./redux/store";

export const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
