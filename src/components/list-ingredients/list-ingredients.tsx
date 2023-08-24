import classes from "./list-ingredients.module.css";

import CardIngredient from "../card-ingredient";
import { FC, LegacyRef } from "react";
import { IIngredient } from "../../utils/interfaces";

interface IListIngredients {
  id: string;
  subRef: LegacyRef<HTMLDivElement> | undefined;
  ingredients: IIngredient[];
  typeTitle: string;
}

export const ListIngredients: FC<IListIngredients> = (props) => {
  const { id, subRef, ingredients, typeTitle } = props;

  return (
    <div id={id} className={classes.root}>
      <div className="text text_type_main-medium mt-10" ref={subRef}>
        {typeTitle}
      </div>
      <div className={classes.blockLists}>
        {ingredients.map((ingredient) => {
          return (
            <CardIngredient key={ingredient._id} ingredient={ingredient} />
          );
        })}
      </div>
    </div>
  );
};

export default ListIngredients;
