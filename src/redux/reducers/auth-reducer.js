import {
  AUTH_CHECKED,
  SET_USER,
  LOGOUT_USER,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_FINISHED,
} from "../action-creators/auth-creators";

export const initialState = {
  user: null,
  authChecked: false,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
};

export const authReducer = (state = initialState, action) => {
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
