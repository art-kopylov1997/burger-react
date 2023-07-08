import checkResponse from "../helpers/check-response";
import { getCookie } from "../../helpers/cookie-helper";

const URL = "https://norma.nomoreparties.space/api/auth/user";

const patchUserRequest = async (body) => {
  return fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
      body: JSON.stringify(body),
    },
  }).then(checkResponse);
};

export default patchUserRequest;
