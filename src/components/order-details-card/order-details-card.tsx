import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

import { useAppSelector } from "../../hooks/useTypedSelector";
import { checkTotalPrice } from "../../services/helpers/check-total-price";
import { filterIngredients } from "../../services/helpers/filter-ingredients";
import { sortIngredientsDetails } from "../../services/helpers/sort-ingredients-details";
import { IFeedOrder, IOrderStatus } from "../../types/interfaces/IOrder";
import OrderIngredientItem from "../order-ingredient-item";
import TotalPrice from "../total-price";

import classes from "./order-details-card.module.css";

interface IOrderDetailsProps {
  order: IFeedOrder;
}

const OrderDetailsCard: FC<IOrderDetailsProps> = ({ order }) => {
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientArray = filterIngredients(ingredients, order.ingredients);
  const sortArray = sortIngredientsDetails(ingredientArray);
  const date = new Date(order.createdAt);

  const ingredientList = sortArray.map((item, index) => (
    <li key={index}>
      <OrderIngredientItem ingredient={item} />
    </li>
  ));

  return (
    <div className={classes.OrderDetails}>
      <h2
        className={`text text_type_digits-default ${classes.orderNumber}`}
      >{`#${order.number}`}</h2>
      <h3 className={`mt-10 text text_type_main-medium ${classes.orderName}`}>
        {order.name}
      </h3>
      <p
        className={`text text_type_main-default mt-2 ${classes.status} ${
          order.status === IOrderStatus.done && classes.readyStatus
        }`}
      >
        {order.status === IOrderStatus.done ? "Выполнен" : "Готовится"}
      </p>
      <h4
        className={`mt-15 mb-6 text text_type_main-medium ${classes.composition}`}
      >
        Состав:
      </h4>
      <ul className={`list pr-6 ${classes.compositionContainer}`}>
        {ingredientList}
      </ul>
      <div className={`mt-10 ${classes.totalPrice}`}>
        <FormattedDate
          className={"text text_type_main-default text_color_inactive"}
          date={date}
        />
        <TotalPrice totalPrice={checkTotalPrice(ingredientArray)} />
      </div>
    </div>
  );
};

export default OrderDetailsCard;
