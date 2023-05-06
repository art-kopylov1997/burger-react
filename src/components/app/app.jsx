import { useEffect, useState } from "react";
import AppHeader from "../app-header";
import Main from "../main";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    hasError: false,
    ingredients: [],
  });

  const getIngredients = async () => {
    setState({ ...state, hasError: false });
    const res = await fetch(URL);
    const data = await res.json();
    setState({
      ...state,
      ingredients: data.data,
      hasError: false,
    });
  };

  useEffect(() => {
    getIngredients().catch((e) => {
      setState({ ...state, hasError: true });
    });
  }, []);

  return (
    <>
      {state.hasError ? (
        <div className="text text_type_main-large p-20">
          Кажется произошла ошибка, попробуйте перезагрузить страницу
        </div>
      ) : (
        <>
          <AppHeader />
          <Main ingredients={state.ingredients} />
        </>
      )}
    </>
  );
}

export default App;
