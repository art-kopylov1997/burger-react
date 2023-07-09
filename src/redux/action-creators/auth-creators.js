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
import patchUserRequest from "../../services/api/patch-user-request";
import resetPasswordEmailRequest from "../../services/api/reset-password-email-request";
import resetPasswordRequest from "../../services/api/reset-password-request";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RESET_PASSWORD_FINISHED = "RESET_PASSWORD_FINISHED";
export const RESET_PASSWORD_STARTED = "RESET_PASSWORD_STARTED";

export function checkUserAuth() {
  return function (dispatch) {
    if (getCookie("token")) dispatch(getUser());

    dispatch({ type: AUTH_CHECKED });
  };
}

// export const checkUserAuth = () => {
//   return (dispatch) => {
//     if (localStorage.getItem("accessToken")) {
//       dispatch(getUser())
//           .catch(() => {
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             dispatch({ type: SET_USER, payload: null });
//           })
//           .finally(() => dispatch({ type: AUTH_CHECKED }));
//     } else {
//       dispatch({ type: AUTH_CHECKED });
//     }
//   };
// };

export function getUser() {
  return function (dispatch) {
    getUserRequest().then((res) => {
      dispatch({ type: SET_USER, payload: res.user });
    });
  };
}

export function editUser(user) {
  return function (dispatch) {
    patchUserRequest(user).then((res) => {
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

export function resetPassword(password, emailCode) {
  return function (dispatch) {
    resetPasswordRequest(password, emailCode).then(() =>
      dispatch({ type: RESET_PASSWORD_FINISHED })
    );
  };
}

export function sendResetPasswordEmail(email) {
  return function (dispatch) {
    resetPasswordEmailRequest(email).then(() =>
      dispatch({ type: RESET_PASSWORD_STARTED })
    );
  };
}
