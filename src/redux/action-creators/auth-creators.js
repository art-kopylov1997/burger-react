import { editUser, login } from "../../services/api/auth-service";
import { register } from "../../services/api/auth-service";
import { getUser } from "../../services/api/auth-service";
import { logout } from "../../services/api/auth-service";
import { resetPasswordEmail } from "../../services/api/auth-service";
import { resetPassword } from "../../services/api/auth-service";

import {
  expireCookie,
  getCookie,
  setCookie,
} from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RESET_PASSWORD_FINISHED = "RESET_PASSWORD_FINISHED";
export const RESET_PASSWORD_STARTED = "RESET_PASSWORD_STARTED";

export function checkUserAuth() {
  return function (dispatch) {
    if (getCookie("token")) dispatch(getUserAuth());

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

export function getUserAuth() {
  return function (dispatch) {
    getUser()
      .then((res) => {
        dispatch({ type: SET_USER, payload: res.user });
      })
      .catch((e) => console.error(e));
  };
}

export function editUserAuth(user) {
  return function (dispatch) {
    editUser(user)
      .then((res) => {
        dispatch({ type: SET_USER, payload: res.user });
      })
      .catch((e) => console.error(e));
  };
}

export function registrationUser(payload) {
  return function (dispatch) {
    register(payload)
      .then((result) => {
        setCookie("token", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({ type: SET_USER, user: result.user });
      })
      .catch((e) => console.error(e));
  };
}

export function loginUser(email, password) {
  return function (dispatch) {
    login(email, password).then((result) => {
      setCookie("token", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      setTokenExpirationDate(15);

      dispatch({ type: SET_USER, payload: result.user });
    });
  };
}

export function logoutUser() {
  return function (dispatch) {
    logout(localStorage.getItem("refreshToken")).finally(() => {
      dispatch({ type: SET_USER, payload: null });

      expireCookie("token");
      localStorage.clear();
    });
  };
}

export function sendPassword(password, emailCode) {
  return function (dispatch) {
    resetPassword(password, emailCode)
      .then(() => dispatch({ type: RESET_PASSWORD_FINISHED }))
      .catch((e) => console.error(e));
  };
}

export function sendResetPasswordEmail(email) {
  return function (dispatch) {
    resetPasswordEmail(email)
      .then(() => dispatch({ type: RESET_PASSWORD_STARTED }))
      .catch((e) => console.error(e));
  };
}
