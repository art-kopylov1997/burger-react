import React, { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import { Loader } from "../components/UI/loader/loader";
import { getIngredientsState } from "../redux/selectors/ingredient-selector";
import { getCurrentIngredientState } from "../redux/selectors/current-ingredient-selector";
import { fillCurrentIngredient } from "../redux/actions/current-ingredient";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export const IngredientPage: FC = () => {
  const { ingredientsRequest, ingredientsFailed, ingredients } =
    useAppSelector(getIngredientsState);
  const { name, image, calories, proteins, fat, carbohydrates } =
    useAppSelector(getCurrentIngredientState);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return ingredients.find((el: any) => el._id === id);
  }, [ingredients]);

  useEffect(() => {
    ingredient && dispatch(fillCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  return (
    <>
      {ingredientsRequest ? (
        <Loader size="huge" />
      ) : ingredientsFailed ? (
        <p className="text_type_main-medium ml-5 mt5">
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <IngredientDetails
          name={name}
          image={image}
          calories={calories}
          proteins={proteins}
          fat={fat}
          carbohydrates={carbohydrates}
        />
      )}
    </>
  );
};
