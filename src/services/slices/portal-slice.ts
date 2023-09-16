import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IIngredient } from "../../types/interfaces/IIngredient";
import { IFeedOrder } from "../../types/interfaces/IOrder";
import { TLocationState } from "../../utils/types";

interface IPortalSliceInitialState {
  orderForModal: IFeedOrder | null;
  ingredientForModal: IIngredient | null;
  isOpenModalWithMessage: string | null;
  location: TLocationState | null;
}

const portalSlice = createSlice({
  name: "portalSlice",
  initialState: {
    orderForModal: null,
    ingredientForModal: null,
    isOpenModalWithMessage: null,
    location: null,
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenModalWithOrderDetails(state, action: PayloadAction<IFeedOrder>) {
      state.orderForModal = action.payload;
    },
    setIsOpenIngredientDetail(state, action: PayloadAction<IIngredient>) {
      state.ingredientForModal = action.payload;
    },
    setIsOpenModalWithMessage(state, action: PayloadAction<string>) {
      state.isOpenModalWithMessage = action.payload;
    },

    closeAllModal(state) {
      state.ingredientForModal = null;
      state.orderForModal = null;
      state.isOpenModalWithMessage = "";
    },
  },
});

export default portalSlice.reducer;
export const modalActions = portalSlice.actions;
