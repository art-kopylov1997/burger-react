import { IIngredient } from "../../types/interfaces/IIngredient";

export const checkTotalPrice = (ingredientsArray: IIngredient[]) => {
  let totalPrice = 0;

  totalPrice = ingredientsArray.reduce((sum, item) => (sum += item.price), 0);

  return totalPrice;
};