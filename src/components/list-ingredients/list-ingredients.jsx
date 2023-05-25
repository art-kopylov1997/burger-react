import classes from "./list-ingredients.module.css";

import CardIngredient from "../card-ingredient";

export const ListIngredients = (props) => {
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
