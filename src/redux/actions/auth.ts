import {
  AUTH_CHECKED,
  SET_USER,
  LOGOUT_USER,
  RESET_PASSWORD_FINISHED,
  RESET_PASSWORD_STARTED,
} from "../constants";

import { editUser, login } from "../../services/api/norma-client-service";
import { register } from "../../services/api/norma-client-service";
import { getUser } from "../../services/api/norma-client-service";
import { logout } from "../../services/api/norma-client-service";
import { resetPasswordEmail } from "../../services/api/norma-client-service";
import { resetPassword } from "../../services/api/norma-client-service";

import {
  expireCookie,
  getCookie,
  setCookie,
} from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import { AppDispatch, AppThunk } from "../../index";
import { IUser } from "../../utils/interfaces";

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: IUser;
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
  readonly payload: null;
}

export interface IResetPasswordFinishedAction {
  readonly type: typeof RESET_PASSWORD_FINISHED;
}

export interface IResetPasswordStartedAction {
  readonly type: typeof RESET_PASSWORD_STARTED;
}

export type TAuthActions =
  | IAuthCheckedAction
  | ISetUserAction
  | ILogoutUserAction
  | IResetPasswordFinishedAction
  | IResetPasswordStartedAction;

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
  if (getCookie("token")) dispatch(getUserAuth());

  dispatch({ type: AUTH_CHECKED });
};

export const getUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
  getUser()
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.user });
    })
    .catch((e) => console.error(e));
};

export const editUserAuth: AppThunk = (user) => (dispatch: AppDispatch) => {
  editUser(user)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.user });
    })
    .catch((e) => console.error(e));
};

export const registrationUser: AppThunk =
  (payload) => (dispatch: AppDispatch) => {
    register(payload)
      .then((result) => {
        setCookie("token", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({ type: SET_USER, user: result.user });
      })
      .catch((e) => console.error(e));
  };

export const loginUser: AppThunk =
  (email, password) => (dispatch: AppDispatch) => {
    login(email, password).then((result) => {
      setCookie("token", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      setTokenExpirationDate(15);

      dispatch({ type: SET_USER, payload: result.user });
    });
  };

export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
  logout(localStorage.getItem("refreshToken") as string).finally(() => {
    dispatch({ type: SET_USER, payload: null });

    expireCookie("token");
    localStorage.clear();
  });
};

export const sendPassword: AppThunk =
  (password, emailCode) => (dispatch: AppDispatch) => {
    resetPassword(password, emailCode)
      .then(() => dispatch({ type: RESET_PASSWORD_FINISHED }))
      .catch((e) => console.error(e));
  };

export const sendResetPasswordEmail: AppThunk =
  (email) => (dispatch: AppDispatch) => {
    resetPasswordEmail(email)
      .then(() => dispatch({ type: RESET_PASSWORD_STARTED }))
      .catch((e) => console.error(e));
  };
