import {
  ADD_BUN_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
  CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
} from "../constants";
import { IIngredient } from "../../utils/interfaces";

export interface IAddIngredientConstructorAction {
  readonly type: typeof ADD_BUN_CONSTRUCTOR | typeof ADD_INGREDIENT_CONSTRUCTOR;
  readonly payload: any;
}

export interface IDelIngredientConstructorAction {
  readonly type: typeof DEL_INGREDIENT_CONSTRUCTOR;
  readonly id: string;
}

export interface IUpdateListConstructorAction {
  readonly type: typeof UPDATE_LIST_INGREDIENTS_CONSTRUCTOR;
  readonly payload: Array<IIngredient>;
}

export interface IClearListConstructorAction {
  readonly type: typeof CLEAR_LIST_INGREDIENTS_CONSTRUCTOR;
}

export type TIngredientConstructorActions =
  | IAddIngredientConstructorAction
  | IDelIngredientConstructorAction
  | IUpdateListConstructorAction
  | IClearListConstructorAction;

export const addIngredientConstructor = (
  payload: IIngredient
): IAddIngredientConstructorAction => {
  if (payload.type === "bun") {
    return {
      type: ADD_BUN_CONSTRUCTOR,
      payload: [payload, payload],
    };
  } else {
    return {
      type: ADD_INGREDIENT_CONSTRUCTOR,
      payload: { ...payload, elementProperty: "draggable" },
    };
  }
};

export const delIngredientConstructor = (
  id: string
): IDelIngredientConstructorAction => ({
  type: DEL_INGREDIENT_CONSTRUCTOR,
  id,
});

export const updateListConstructor = (
  payload: Array<IIngredient>
): IUpdateListConstructorAction => ({
  type: UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
  payload,
});

export const clearListConstructor = (): IClearListConstructorAction => ({
  type: CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
});
