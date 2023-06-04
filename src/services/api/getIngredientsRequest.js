const URL = "https://norma.nomoreparties.space/api/ingredients";

const getIngredientsRequest = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getIngredientsRequest;
