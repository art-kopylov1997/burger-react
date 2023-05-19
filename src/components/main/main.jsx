import classes from "./main.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";

function Main() {
  return (
    <main className={classes.root}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
