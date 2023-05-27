import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classes from "./main.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";

function Main() {
  return (
    <main className={classes.root}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default Main;
