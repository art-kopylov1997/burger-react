import { IIngredient, IIngredientDetails } from '../../types/interfaces/IIngredient';

export const sortIngredientsDetails = (ingredientsArray: IIngredient[]) => {
  const array = ingredientsArray.reduce((acc: IIngredientDetails[], item: IIngredient) => {
    if(acc.find(i => i._id === item._id)) {
      return acc.map((value) => (
        value._id === item._id ? {...value, quantity: value.quantity + 1} : value
      ));
    }
    return [...acc, {...item, quantity: 1}];
  }, []);

  return array;
};