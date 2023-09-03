import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IWSMessage } from '../../types/interfaces/IWebSocket';

interface IWsSlice {
  wsConnected: boolean;
  wsMessage: null | IWSMessage;
}

const wsSlice = createSlice({
  name: 'wsSlice',
  initialState: {
    wsConnected: false,
    wsMessage: null,
  } as IWsSlice,
  reducers: {
    setWsConnected(state, action: PayloadAction<boolean>) {
      state.wsConnected = action.payload;
    },
    setWSMessage(state, action: PayloadAction<IWSMessage | null>) {
      state.wsMessage = action.payload;
    },
  },
});

export default wsSlice.reducer;
export const wsActions = wsSlice.actions;