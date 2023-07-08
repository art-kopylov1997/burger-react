import checkResponse from "../helpers/check-response";

const URL = "https://norma.nomoreparties.space/api/password-reset";

const createNewEmailRequest = async (payload) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
};

export default createNewEmailRequest;
