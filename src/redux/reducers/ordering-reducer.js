import { SET_ORDER_NUMBER } from "../action-creators/ordering-creators";

export const initialState = {
  orderCost: 0,
};

export const orderingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderCost: action.payload,
      };
    default:
      return state;
  }
};
