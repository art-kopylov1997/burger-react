import classes from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={classes.root}>
      <img
        className={classes.ingredientImage}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h2 className="text text_type_main-medium mb-8">{ingredient.name}</h2>

      <div className={classes.nutritionalBlock}>
        <div className={classes.nutritionals}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </span>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={classes.nutritionals}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={classes.nutritionals}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={classes.nutritionals}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  },
};

export default IngredientDetails;
