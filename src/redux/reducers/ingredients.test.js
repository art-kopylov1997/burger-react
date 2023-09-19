import { ingredientsReducer, initialState } from "./ingredients";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    const state = {
      ...initialState,
      ingredientsRequest: true,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual(state);
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const state = {
      ...initialState,
      ingredients: [
        {
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
      ],
      ingredientsRequest: false,
      ingredientsFailed: false,
    };
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: [
          {
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
        ],
      })
    ).toEqual(state);
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    const state = {
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })
    ).toEqual(state);
  });
});
