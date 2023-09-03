import { IIngredient } from '../../types/interfaces/IIngredient';

export const filterIngredients = (ingredients: IIngredient[], array: string[]): IIngredient[] => {
  return array.map((item) => ingredients.find(i => i._id === item)) as IIngredient[];
};