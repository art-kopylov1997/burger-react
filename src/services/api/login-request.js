import checkResponse from "../helpers/check-response";

const URL = "https://norma.nomoreparties.space/api/auth/login";

const loginRequest = async (payload) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
};

export default loginRequest;