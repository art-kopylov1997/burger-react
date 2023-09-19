import portalSlice, { modalActions } from "./portal-slice";

const initialState = {
  orderForModal: null,
};

const mockOrderForModal = null;

describe("portal reducer", () => {
  it("should return the initial state", () => {
    expect(portalSlice(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setIsOpenModalWithOrderDetails", () => {
    const action = {
      type: modalActions.setIsOpenModalWithOrderDetails,
      payload: mockOrderForModal,
    };
    const result = portalSlice(initialState, action);

    expect(result).toEqual({ ...initialState });
  });
});
