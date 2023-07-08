import checkResponse from "../helpers/check-response";

const URL = "https://norma.nomoreparties.space/api/auth/register";

const registerRequest = async (payload) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
};

export default registerRequest;
