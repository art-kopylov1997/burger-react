import classes from "./with-burgers-components.module.css";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";

function WithBurgersComponents() {
  return (
    <main className={classes.root}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default WithBurgersComponents;
