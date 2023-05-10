import classes from "./main.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import ingredientPropTypes from "../../utils/types";
import PropTypes from "prop-types";

function Main({ ingredients }) {
  return (
    <main className={classes.root}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor ingredients={ingredients} />
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default Main;
