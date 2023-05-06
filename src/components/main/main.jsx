import classes from "./main.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
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
  ingredient: PropTypes.object,
};

export default Main;
