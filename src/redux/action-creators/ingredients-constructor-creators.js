export const ADD_BUN_CONSTRUCTOR = "ADD_BUN_CONSTRUCTOR";
export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DEL_INGREDIENT_CONSTRUCTOR = "DEL_INGREDIENT_CONSTRUCTOR";
export const UPDATE_LIST_INGREDIENTS_CONSTRUCTOR =
  "UPDATE_LIST_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_LIST_INGREDIENTS_CONSTRUCTOR =
  "CLEAR_LIST_INGREDIENTS_CONSTRUCTOR";

export const addIngredientConstructor = (payload) => {
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

export const delIngredientConstructor = (id) => ({
  type: DEL_INGREDIENT_CONSTRUCTOR,
  id,
});

export const updateListConstructor = (payload) => ({
  type: UPDATE_LIST_INGREDIENTS_CONSTRUCTOR,
  payload,
});

export const clearListConstructor = () => ({
  type: CLEAR_LIST_INGREDIENTS_CONSTRUCTOR,
});
