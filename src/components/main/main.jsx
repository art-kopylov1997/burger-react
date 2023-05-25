import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import classes from "./main.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import {addIngredientsConstructor, setOrderNumber} from "../../redux/action-creators/action-creators";

function Main() {
  const dispatch = useDispatch();

  // const handleDrop = (payload) => {
  //   dispatch(addIngredientsConstructor(payload));
  //   // dispatch(setOrderNumber(payload));
  // };

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
