import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  SET_ORDER_NUMBER,
} from "../action-types/action-types";

export const initialState = {
  // список всех полученных ингредиентов и флаги для API
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
        // ingredients: [...action.payload],
        ingredients: [...action.payload].map((el) => {
          el.productId = ++action.productId;
          return el;
        }),
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
            (ingredient, index) => index !== action.index
          ),
        ],
      };
    }
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
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    default:
      return state;
  }
};
