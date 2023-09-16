import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

import { IIngredientDetails } from "../../types/interfaces/IIngredient";
import FeedIngredientOrder from "../UI/feed-ingredient-order";

import classes from "./order-ingredient-item.module.css";

interface IOrderIngredientItemProps {
  ingredient: IIngredientDetails;
}

const OrderIngredientItem: FC<IOrderIngredientItemProps> = ({ ingredient }) => {
  return (
    <div className={classes.item}>
      <FeedIngredientOrder item={ingredient} />
      <p className={`text text_type_main-default ${classes.title}`}>
        {ingredient.name}
      </p>
      <div className={classes.price}>
        <p className={"text text_type_digits-default"}>
          {ingredient.quantity}&#160;x&#160;{ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderIngredientItem;
