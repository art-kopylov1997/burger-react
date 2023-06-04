import AppHeader from "../app-header";
import Main from "../main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../redux/action-creators/ingredients-creators";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Main />
    </>
  );
}

export default App;
