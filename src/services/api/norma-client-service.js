import { checkResponse, checkSuccess } from "../helpers/check-request";
import {
  getRequest,
  getRequestWithAuth,
  patchRequestWithAuth,
  postRequest,
} from "../repositories";
import { setCookie } from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";

const BASE_URL = "https://norma.nomoreparties.space/api";

export function getAllIngredients() {
  return getRequest(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(checkSuccess);
}

export function createOrder(payload) {
  return postRequest(`${BASE_URL}/orders`, { ingredients: payload })
    .then(checkResponse)
    .then(checkSuccess);
}

export function register(payload) {
  return postRequest(`${BASE_URL}/auth/register`, payload)
    .then(checkResponse)
    .then(checkSuccess);
}

export function login(email, password) {
  return postRequest(`${BASE_URL}/auth/login`, { email, password })
    .then(checkResponse)
    .then(checkSuccess);
}

export function logout(token) {
  return postRequest(`${BASE_URL}/auth/logout`, { token })
    .then(checkResponse)
    .then(checkSuccess);
}

export function resetPasswordEmail(email) {
  return postRequest(`${BASE_URL}/password-reset`, {
    email,
  })
    .then(checkResponse)
    .then(checkSuccess);
}

export function resetPassword(newPassword, emailCode) {
  return postRequest(`${BASE_URL}/password-reset/reset`, {
    password: newPassword,
    token: emailCode,
  })
    .then(checkResponse)
    .then(checkSuccess);
}

export function getUser() {
  return executeWithAuth(
    async () => await getRequestWithAuth(`${BASE_URL}/auth/user`)
  )
    .then(checkResponse)
    .then(checkSuccess);
}

export function editUser(user) {
  return executeWithAuth(
    async () => await patchRequestWithAuth(`${BASE_URL}/auth/user`, user)
  )
    .then(checkResponse)
    .then(checkSuccess);
}

async function executeWithAuth(request) {
  const expiresAtTicks = localStorage.getItem("expiresAt");
  const currentTicks = new Date().getTime().toString();

  if (!expiresAtTicks || currentTicks >= expiresAtTicks) await refreshToken();

  try {
    return await request();
  } catch (exc) {
    if (exc.message.includes("jwt expired")) return Promise.reject(exc);

    await refreshToken();

    return await request();
  }
}

function refreshToken() {
  const refreshTokenValue = localStorage.getItem("refreshToken");
  if (!refreshTokenValue)
    return Promise.reject("Refresh token is missing in local storage");

  return postRequest(`${BASE_URL}/auth/token`, {
    token: refreshTokenValue,
  }).then((result) => {
    if (!result.success) return Promise.reject(`Ошибка ${result}`);

    setCookie("token", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    setTokenExpirationDate(15);
  });
}
