import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_DETAILS,
  DEL_INGREDIENTS_DETAILS,
  SET_ORDER_NUMBER,
} from "../action-types/action-types";

export const initialState = {
  // список всех полученных ингредиентов
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  // список всех ингредиентов в текущем конструкторе бургера
  ingredientsConstructor: [],

  // объект текущего просматриваемого ингредиента
  currentIngredient: {},

  // номер созданного заказа
  orderNumber: 0,

  isLoading: false,
  isError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        isLoading: true,
        isError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: [...action.payload],
        ingredientsRequest: false,
        isLoading: false,
        isError: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
        isLoading: false,
        isError: true,
      };
    }
    case SET_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...action.payload],
      };
    }
    case ADD_INGREDIENTS_DETAILS:
      return {
        ...state,
        currentIngredient: action.payload,
      };
    case DEL_INGREDIENTS_DETAILS:
      return {
        ...state,
        currentIngredient: {},
      };
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    default:
      return state;
  }
};
