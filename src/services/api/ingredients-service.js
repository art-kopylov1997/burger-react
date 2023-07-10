import { checkResponse } from "../helpers/check-request";
// import { getRequest, postRequest } from "../repositories";

const BASE_URL = "https://norma.nomoreparties.space/api";

// export function getAllIngredients() {
//   return getRequest(`${BASE_URL}/ingredients`)
//     .then(checkSuccess)
//     .then((result) => result.data);
// }
//
// export function createOrder(elementsIds) {
//   return postRequest(`${BASE_URL}/orders`, { ingredients: elementsIds })
//     .then(checkSuccess)
//     .then((result) => {
//       return result.order.number;
//     });
// }

export const getAllIngredients = async () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const createOrder = async (payload) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
};
