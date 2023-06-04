import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { ingredientsConstructorReducer } from "./ingredients-constructor-reducer";
import { currentIngredientReducer } from "./current-ingredient-reducer";
import { orderingReducer } from "./ordering-reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  currentIngredient: currentIngredientReducer,
  ordering: orderingReducer,
});
