import registryRequest from "../../services/api/register-request";
import loginRequest from "../../services/api/login-request";
import {
  expireCookie,
  getCookie,
  setCookie,
} from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import updateTokenRequest from "../../services/api/update-token-request";
import getUserRequest from "../../services/api/get-user-request";
import logoutRequest from "../../services/api/logout-request";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function checkUserAuth() {
  return function (dispatch) {
    if (getCookie("token")) dispatch(getUser());

    dispatch({ type: AUTH_CHECKED });
  };
}

export function getUser() {
  return function (dispatch) {
    getUserRequest().then((res) => {
      dispatch({ type: SET_USER, payload: res.user });
    });
  };
}

export function registrationUser(payload) {
  return function (dispatch) {
    registryRequest(payload).then((res) => {
      if (res && res.success) {
        setCookie("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        setTokenExpirationDate(15);

        dispatch({
          type: SET_USER,
          payload: res.user,
        });
      } else {
        console.error("error: ", res);
      }
    });
  };
}

export function loginUser(payload) {
  return function (dispatch) {
    loginRequest(payload).then(async (res) => {
      if (res && res.success) {
        setCookie("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        setTokenExpirationDate(15);

        const tokenPayload = { token: res.refreshToken };
        await updateTokenRequest(tokenPayload);

        dispatch({
          type: SET_USER,
          payload: res.user,
        });
      } else {
        console.error("error: ", res);
      }
    });
  };
}

export function logoutUser() {
  return function (dispatch) {
    const logoutToken = { token: localStorage.getItem("refreshToken") };
    logoutRequest(logoutToken).finally(() => {
      dispatch({
        type: LOGOUT_USER,
      });

      expireCookie("token");
      localStorage.clear();
    });
  };
}
