import { currentIngredientReducer, initialState } from "./current-ingredient";

import {
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from "../constants";

describe("current-ingredient reducer", () => {
  it("should return the initial state", () => {
    expect(currentIngredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FILL_CURRENT_INGREDIENT", () => {
    const action = {
      type: FILL_CURRENT_INGREDIENT,
      payload: {
        _id: "_id",
        name: "name",
        type: "type",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
        __v: 0,
      },
    };

    expect(currentIngredientReducer(initialState, action)).toEqual({
      ...initialState,
      currentIngredient: action.payload,
    });
  });

  it("should handle CLEAR_CURRENT_INGREDIENT", () => {
    const state = {
      ...initialState,
      currentIngredient: {},
    };
    expect(
      currentIngredientReducer(initialState, { type: CLEAR_CURRENT_INGREDIENT })
    ).toEqual(state);
  });
});
