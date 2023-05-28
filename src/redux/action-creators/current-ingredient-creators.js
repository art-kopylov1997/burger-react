export const FILL_CURRENT_INGREDIENT = "FILL_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const fillCurrentIngredient = (payload) => ({
  type: FILL_CURRENT_INGREDIENT,
  payload,
});

export const clearCurrentIngredient = () => ({
  type: CLEAR_CURRENT_INGREDIENT,
});
