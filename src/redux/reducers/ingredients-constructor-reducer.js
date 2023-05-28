import {
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
} from "../action-creators/ingredients-constructor-creators";

export const initialState = {
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor,
          action.payload,
        ],
      };
    }
    case DEL_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor.filter(
            (ingredient) => ingredient.generatedId !== action.id
          ),
        ],
      };
    }
    default:
      return state;
  }
};
