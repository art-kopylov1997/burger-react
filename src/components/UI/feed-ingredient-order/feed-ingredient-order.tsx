import { FC } from "react";

import { IIngredient } from "../../../types/interfaces/IIngredient";

import classes from "./feed-ingredient-order.module.css";

interface IFeedIngredientOrder {
  item: IIngredient;
  index?: number;
  leftIngredients?: number;
}

const FeedIngredientOrder: FC<IFeedIngredientOrder> = ({
  item,
  index,
  leftIngredients,
}) => {
  return (
    item && (
      <div>
        <img
          className={`${classes.image} ${
            index === 5 && leftIngredients !== 0 && classes.imageLast
          }`}
          src={item.image}
          alt="Ингредиет"
        />
        {index === 5 && leftIngredients !== 0 && (
          <p
            className={`text text_type_digits-default ${classes.leftIngredients}`}
          >
            +{leftIngredients}
          </p>
        )}
      </div>
    )
  );
};

export default FeedIngredientOrder;
