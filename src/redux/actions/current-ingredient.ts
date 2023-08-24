import {
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from "../constants";
import { IIngredient } from "../../utils/interfaces";

export interface IFillCurrentIngredientAction {
  readonly type: typeof FILL_CURRENT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IClearCurrentIngredientAction {
  readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions =
  | IFillCurrentIngredientAction
  | IClearCurrentIngredientAction;

export const fillCurrentIngredient = (
  payload: IIngredient
): IFillCurrentIngredientAction => ({
  type: FILL_CURRENT_INGREDIENT,
  payload,
});

export const clearCurrentIngredient = (): IClearCurrentIngredientAction => ({
  type: CLEAR_CURRENT_INGREDIENT,
});
