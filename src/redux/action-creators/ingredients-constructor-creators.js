export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DEL_INGREDIENT_CONSTRUCTOR = "DEL_INGREDIENT_CONSTRUCTOR";

export function addIngredientConstructor(payload) {
  return function (dispatch) {
    if (payload.type === "bun") {
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          ...payload,
          elementProperty: "top",
        },
      });
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          ...payload,
          elementProperty: "bottom",
        },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: { ...payload, elementProperty: "draggable" },
      });
    }
  };
}

export const delIngredientConstructor = (id) => ({
  type: DEL_INGREDIENT_CONSTRUCTOR,
  id,
});
