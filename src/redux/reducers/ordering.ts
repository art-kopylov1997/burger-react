import { SET_ORDER_NUMBER } from "../constants";
import { ISetOrderCostAction } from "../actions/ordering";

type TInitialState = {
  orderCost: number;
};

export const initialState: TInitialState = {
  orderCost: 0,
};

export const orderingReducer = (
  state = initialState,
  action: ISetOrderCostAction
): TInitialState => {
  switch (action.type) {
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderCost: action.cost,
      };
    default:
      return state;
  }
};
