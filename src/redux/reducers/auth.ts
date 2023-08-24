import {
  AUTH_CHECKED,
  SET_USER,
  LOGOUT_USER,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_FINISHED,
} from "../constants";
import { IUser } from "../../utils/interfaces";
import { TAuthActions } from "../actions/auth";

type TInitialState = {
  user: IUser | null;

  authChecked: boolean;

  resetPasswordStarted: boolean;
  resetPasswordFinished: boolean;
};

export const initialState: TInitialState = {
  user: null,
  authChecked: false,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
};

export const authReducer = (
  state = initialState,
  action: TAuthActions
): TInitialState => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return { ...state, authChecked: true };
    }
    case SET_USER: {
      return { ...state, user: action.payload };
    }
    case LOGOUT_USER: {
      return { ...state, user: null };
    }
    case RESET_PASSWORD_STARTED: {
      return { ...state, resetPasswordStarted: true };
    }
    case RESET_PASSWORD_FINISHED: {
      return { ...state, resetPasswordFinished: true };
    }
    default:
      return state;
  }
};
