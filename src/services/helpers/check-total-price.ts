import { IIngredient } from "../../types/interfaces/IIngredient";

export const checkTotalPrice = (ingredientsArray: IIngredient[]) => {
  let totalPrice = 0;

  const ingredientsArrayFiltered = ingredientsArray.filter(
    (el) => el !== undefined
  );

  totalPrice = ingredientsArrayFiltered.reduce(
    (sum, item) => (sum += item.price),
    0
  );

  return totalPrice;
};
