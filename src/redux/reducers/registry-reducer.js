import {
  AUTH_CHECKED,
  SET_USER,
  LOGOUT_USER,
} from "../action-creators/registry-creators";

export const initialState = {
  user: null,
  authChecked: false,
};

export const registryReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
