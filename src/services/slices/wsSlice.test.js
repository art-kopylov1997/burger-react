import wsSlice, { wsActions } from "./wsSlice";

const initialState = {
  wsConnected: false,
  wsMessage: null,
};

const mockWsConnected = false;
const mockWsMessage = null;

describe("ws reducer", () => {
  it("should return the initial state", () => {
    expect(wsSlice(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setWsConnected", () => {
    const action = { type: wsActions.setWsConnected, payload: mockWsConnected };
    const result = wsSlice(initialState, action);

    expect(result).toEqual({ ...initialState });
  });

  it("should handle setWSMessage", () => {
    const action = { type: wsActions.setWSMessage, payload: mockWsMessage };
    const result = wsSlice(initialState, action);

    expect(result).toEqual({ ...initialState });
  });
});
