import { orderingReducer, initialState } from "./ordering";

import { SET_ORDER_NUMBER } from "../constants";

describe("ordering reducer", () => {
  it("should return the initial state", () => {
    expect(orderingReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_ORDER_NUMBER", () => {
    const state = {
      ...initialState,
      orderCost: 0,
    };
    expect(
      orderingReducer(initialState, { type: SET_ORDER_NUMBER, cost: 0 })
    ).toEqual(state);
  });
});
