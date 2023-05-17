import { useEffect, useState } from "react";
import AppHeader from "../app-header";
import Main from "../main";
import { IngredientsContext } from "../../services/ingredientsContext";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    hasError: false,
    ingredients: [],
  });

  const getIngredients = () => {
    setState({ ...state, hasError: false });
    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) =>
        setState({
          ...state,
          ingredients: data.data,
          hasError: false,
        })
      )
      .catch((e) => {
        setState({ ...state, hasError: true });
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <IngredientsContext.Provider value={state.ingredients}>
      {state.hasError ? (
        <div className="text text_type_main-large p-20">
          Кажется произошла ошибка, попробуйте перезагрузить страницу
        </div>
      ) : (
        <>
          <AppHeader />
          <Main />
        </>
      )}
    </IngredientsContext.Provider>
  );
}

export default App;
