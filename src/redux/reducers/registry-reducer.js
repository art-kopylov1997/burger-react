import {
  LOGIN_USER,
  REGISTRATION_USER,
} from "../action-creators/registry-creators";

export const initialState = {
  user: null,
};

export const registryReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_USER: {
      return { ...state, user: action.payload };
    }
    case LOGIN_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
