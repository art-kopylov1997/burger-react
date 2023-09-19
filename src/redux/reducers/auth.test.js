import { authReducer, initialState } from "./auth";

import {
  AUTH_CHECKED,
  SET_USER,
  LOGOUT_USER,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_FINISHED,
} from "../constants";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle AUTH_CHECKED", () => {
    const state = {
      ...initialState,
      authChecked: true,
    };
    expect(authReducer(initialState, { type: AUTH_CHECKED })).toEqual(state);
  });

  it("should handle SET_USER", () => {
    const action = {
      type: SET_USER,
      payload: {
        email: "email",
        name: "name",
      },
    };

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload,
    });
  });

  it("should handle LOGOUT_USER", () => {
    const state = {
      ...initialState,
      user: null,
    };
    expect(authReducer(initialState, { type: LOGOUT_USER })).toEqual(state);
  });

  it("should handle RESET_PASSWORD_STARTED", () => {
    const state = {
      ...initialState,
      resetPasswordStarted: true,
    };
    expect(authReducer(initialState, { type: RESET_PASSWORD_STARTED })).toEqual(
      state
    );
  });

  it("should handle RESET_PASSWORD_FINISHED", () => {
    const state = {
      ...initialState,
      resetPasswordFinished: true,
    };
    expect(
      authReducer(initialState, { type: RESET_PASSWORD_FINISHED })
    ).toEqual(state);
  });
});
