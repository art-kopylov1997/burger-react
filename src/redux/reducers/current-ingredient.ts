import {
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from "../constants";
import { TCurrentIngredientActions } from "../actions/current-ingredient";
import { IIngredient } from "../../utils/interfaces";

type TInitialState = {
  currentIngredient: IIngredient | {};
};

export const initialState: TInitialState = {
  currentIngredient: {},
};

export const currentIngredientReducer = (
  state = initialState,
  action: TCurrentIngredientActions
): TInitialState => {
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
