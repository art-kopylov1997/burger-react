import { SET_ORDER_NUMBER } from "../constants";

export interface ISetOrderCostAction {
  readonly type: typeof SET_ORDER_NUMBER;
  readonly cost: number;
}

export const setOrderCost = (cost: number): ISetOrderCostAction => ({
  type: SET_ORDER_NUMBER,
  cost,
});
