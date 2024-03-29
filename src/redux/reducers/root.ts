import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientsConstructorReducer } from "./ingredients-constructor";
import { currentIngredientReducer } from "./current-ingredient";
import { orderingReducer } from "./ordering";
import { authReducer } from "./auth";
import wsSlice from "../../services/slices/wsSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  currentIngredient: currentIngredientReducer,
  ordering: orderingReducer,
  registry: authReducer,
  wsReducers: wsSlice,
});
