import classes from "./ingredient-details.module.css";
import ingredientPropTypes from "../../utils/types";
import { useSelector } from "react-redux";
import { getCurrentIngredientState } from "../../redux/selectors/current-ingredient-selector";

const IngredientDetails = () => {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    getCurrentIngredientState
  );

  return (
    <div className={classes.root}>
      {name && (
        <>
          <img className={classes.ingredientImage} src={image} alt={name} />
          <h2 className="text text_type_main-medium mb-8">{name}</h2>

          <div className={classes.nutritionalBlock}>
            <div className={classes.nutritionals}>
              <span className="text text_type_main-default text_color_inactive">
                Калории, ккал
              </span>
              <p className="text text_type_digits-default text_color_inactive">
                {calories}
              </p>
            </div>
            <div className={classes.nutritionals}>
              <span className="text text_type_main-default text_color_inactive">
                Белки, г
              </span>
              <p className="text text_type_digits-default text_color_inactive">
                {proteins}
              </p>
            </div>
            <div className={classes.nutritionals}>
              <span className="text text_type_main-default text_color_inactive">
                Жиры, г
              </span>
              <p className="text text_type_digits-default text_color_inactive">
                {fat}
              </p>
            </div>
            <div className={classes.nutritionals}>
              <span className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </span>
              <p className="text text_type_digits-default text_color_inactive">
                {carbohydrates}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

export default IngredientDetails;
