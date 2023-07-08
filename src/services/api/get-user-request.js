import checkResponse from "../helpers/check-response";
import { getCookie } from "../../helpers/cookie-helper";

const URL = "https://norma.nomoreparties.space/api/auth/user";

const getUserRequest = async () => {
  return fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
  }).then(checkResponse);
};

export default getUserRequest;
