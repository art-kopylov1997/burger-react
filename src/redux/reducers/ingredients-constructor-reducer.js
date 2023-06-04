import {
  ADD_BUN_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
  CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
} from "../action-creators/ingredients-constructor-creators";

export const initialState = {
  bunsConstructor: [],
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN_CONSTRUCTOR: {
      return {
        ...state,
        bunsConstructor: action.payload,
      };
    }
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
            (ingredient) => ingredient.dragId !== action.id
          ),
        ],
      };
    }
    case UPDATE_LIST_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...action.payload],
      };
    }
    case CLEAR_LIST_INGREDIENTS_CONSTRUCTOR: {
      return {
        bunsConstructor: [],
        ingredientsConstructor: [],
      };
    }
    default:
      return state;
  }
};
