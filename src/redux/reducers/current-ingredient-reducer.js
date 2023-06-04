import {
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from "../action-creators/current-ingredient-creators";

export const initialState = {
  currentIngredient: {},
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload,
      };
    case CLEAR_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: {},
      };
    default:
      return state;
  }
};
