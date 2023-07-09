import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classes from "./home-page.module.css";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";

function HomePage() {
  return (
    <main className={classes.root}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default HomePage;
