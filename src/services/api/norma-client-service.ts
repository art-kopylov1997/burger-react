import { checkSuccess } from "../helpers/check-request";
import {
  getRequest,
  getRequestWithAuth,
  patchRequestWithAuth,
  postRequest,
} from "../repositories";
import { setCookie } from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import {
  TCreateOrderRequest,
  TEditUserRequest,
  TLoginRequest,
  TLogoutRequest,
  TRefreshTokenRequest,
  TRegisterRequest,
  TResetPasswordRequest,
  TSendResetPasswordEmailRequest,
} from "../types/requests";
import {
  TCreateOrderResponse,
  TEditUserResponse,
  TGetIngredientsResponse,
  TGetUserResponse,
  TLoginResponse,
  TLogoutResponse,
  TRefreshTokenResponse,
  TRegisterResponse,
  TResetPasswordResponse,
  TSendResetPasswordEmailResponse,
} from "../types/responses";

const BASE_URL = "https://norma.nomoreparties.space/api";

export function getAllIngredients() {
  return getRequest<TGetIngredientsResponse>(`${BASE_URL}/ingredients`).then(
    checkSuccess
  );
}

export function createOrder(payload: Array<string>): Promise<any> {
  return postRequest<TCreateOrderRequest, TCreateOrderResponse>(
    `${BASE_URL}/orders`,
    { ingredients: payload }
  ).then(checkSuccess);
}

export function register(
  payload: TRegisterRequest
): Promise<TRegisterResponse> {
  return postRequest<TRegisterRequest, TRegisterResponse>(
    `${BASE_URL}/auth/register`,
    payload
  ).then(checkSuccess);
}

export function login(
  email: string,
  password: string
): Promise<TLoginResponse> {
  return postRequest<TLoginRequest, TLoginResponse>(`${BASE_URL}/auth/login`, {
    email,
    password,
  }).then(checkSuccess);
}

export function logout(token: string): Promise<TLogoutResponse> {
  return postRequest<TLogoutRequest, TLogoutResponse>(
    `${BASE_URL}/auth/logout`,
    { token }
  ).then(checkSuccess);
}

export function resetPasswordEmail(
  email: string
): Promise<TSendResetPasswordEmailResponse> {
  return postRequest<
    TSendResetPasswordEmailRequest,
    TSendResetPasswordEmailResponse
  >(`${BASE_URL}/password-reset`, {
    email,
  }).then(checkSuccess);
}

export function resetPassword(
  newPassword: string,
  emailCode: string
): Promise<TResetPasswordResponse> {
  return postRequest<TResetPasswordRequest, TResetPasswordResponse>(
    `${BASE_URL}/password-reset/reset`,
    {
      password: newPassword,
      token: emailCode,
    }
  ).then(checkSuccess);
}

export function getUser(): Promise<TGetUserResponse> {
  return executeWithAuth(
    async () =>
      await getRequestWithAuth<TGetUserResponse>(`${BASE_URL}/auth/user`)
  ).then(checkSuccess);
}

export function editUser(user: TEditUserRequest): Promise<TEditUserResponse> {
  return executeWithAuth(
    async () =>
      await patchRequestWithAuth<TEditUserRequest, TEditUserResponse>(
        `${BASE_URL}/auth/user`,
        user
      )
  ).then(checkSuccess);
}

async function executeWithAuth<T>(request: Function) {
  const expiresAtTicks = localStorage.getItem("expiresAt");
  const currentTicks = new Date().getTime().toString();

  if (!expiresAtTicks || currentTicks >= expiresAtTicks) await refreshToken();

  try {
    return await request();
  } catch (exc) {
    if ((exc as Error).message.includes("jwt expired"))
      return Promise.reject(exc);

    await refreshToken();

    return await request();
  }
}

function refreshToken() {
  const refreshTokenValue = localStorage.getItem("refreshToken");
  if (!refreshTokenValue)
    return Promise.reject("Refresh token is missing in local storage");

  return postRequest<TRefreshTokenRequest, TRefreshTokenResponse>(
    `${BASE_URL}/auth/token`,
    {
      token: refreshTokenValue,
    }
  ).then((result) => {
    if (!result.success) return Promise.reject(`Ошибка ${result}`);

    setCookie("token", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    setTokenExpirationDate(15);
  });
}
