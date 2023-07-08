import checkResponse from "../helpers/check-response";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const getIngredientsRequest = async () => {
  return fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export default getIngredientsRequest;
