import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFeedOrder } from "../../types/interfaces/IOrder";

interface IPortalSliceInitialState {
  orderForModal: IFeedOrder | null;
}

const portalSlice = createSlice({
  name: "portalSlice",
  initialState: {
    orderForModal: null,
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenModalWithOrderDetails(state, action: PayloadAction<IFeedOrder>) {
      state.orderForModal = action.payload;
    },
  },
});

export default portalSlice.reducer;
export const modalActions = portalSlice.actions;
