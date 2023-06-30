import { REGISTRATION_USER } from "../action-creators/registry-creators";

export const initialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },
};

export const registryReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_USER: {
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
