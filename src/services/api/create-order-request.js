import checkResponse from "../helpers/check-response";

const URL = "https://norma.nomoreparties.space/api/orders";

const createOrderRequest = async (payload) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
};

export default createOrderRequest;
