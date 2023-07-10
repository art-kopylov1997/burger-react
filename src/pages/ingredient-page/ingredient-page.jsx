import React, { useEffect, useMemo } from "react";
import classes from "./ingredient-page.module.css";
import Detail from "../../components/UI/detaile-ingredient";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/UI/loader/loader";
import { getIngredientsState } from "../../redux/selectors/ingredient-selector";
import { getCurrentIngredientState } from "../../redux/selectors/current-ingredient-selector";
import { fillCurrentIngredient } from "../../redux/action-creators/current-ingredient-creators";

export const IngredientPage = () => {
  const { ingredientsRequest, ingredientsFailed, ingredients } =
    useSelector(getIngredientsState);
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    getCurrentIngredientState
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return ingredients.find((el) => el._id === id);
  }, [ingredients]);

  useEffect(() => {
    ingredient && dispatch(fillCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  return (
    <>
      {ingredientsRequest ? (
        <Loader size="huge" />
      ) : ingredientsFailed ? (
        <p className={classes.errorText}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <div className={`${classes.modalContent} pt-10 pr-10 pl-10 pb-15`}>
          <div className={classes.modalHeader}>
            <p className="text text_type_main-large">{"Детали ингредиента"}</p>
          </div>

          <img className={classes.ingredientImage} src={image} alt={name} />

          <div className="mt-4">
            <p
              className={`${classes.ingredientName} text text_type_main-medium`}
            >
              {name}
            </p>
          </div>

          <div className={`${classes.ingredientDetails} mt-8`}>
            <Detail header="Калории, ккал" value={calories} />
            <Detail header="Белки, г" value={proteins} />
            <Detail header="Жиры, г" value={fat} />
            <Detail header="Углеводы, г" value={carbohydrates} />
          </div>
        </div>
      )}
    </>
  );
};
