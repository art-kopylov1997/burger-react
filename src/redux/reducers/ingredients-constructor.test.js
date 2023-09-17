import {
  ingredientsConstructorReducer,
  initialState,
} from "./ingredients-constructor";

import {
  ADD_BUN_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
  CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
} from "../constants";

describe("ingredients-constructor reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_BUN_CONSTRUCTOR", () => {
    const action = {
      type: ADD_BUN_CONSTRUCTOR,
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
        elementProperty: "top",
      },
    };

    expect(ingredientsConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      bunsConstructor: action.payload,
    });
  });

  it("should handle ADD_INGREDIENT_CONSTRUCTOR", () => {
    const action = {
      type: ADD_INGREDIENT_CONSTRUCTOR,
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
        elementProperty: "top",
      },
    };

    expect(ingredientsConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsConstructor: [action.payload],
    });
  });

  it("should handle DEL_INGREDIENT_CONSTRUCTOR", () => {
    const state = {
      ...initialState,
      ingredientsConstructor: [],
    };
    expect(
      ingredientsConstructorReducer(initialState, {
        type: DEL_INGREDIENT_CONSTRUCTOR,
        id: "",
      })
    ).toEqual(state);
  });

  it("should handle UPDATE_LIST_INGREDIENTS_CONSTRUCTOR", () => {
    const state = {
      ...initialState,
      ingredientsConstructor: [
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
          elementProperty: "top",
        },
      ],
    };
    expect(
      ingredientsConstructorReducer(initialState, {
        type: UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
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
            elementProperty: "top",
          },
        ],
      })
    ).toEqual(state);
  });

  it("should handle CLEAR_LIST_INGREDIENTS_CONSTRUCTOR", () => {
    const state = {
      ...initialState,
      bunsConstructor: [],
      ingredientsConstructor: [],
    };
    expect(
      ingredientsConstructorReducer(initialState, {
        type: CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
      })
    ).toEqual(state);
  });
});
