import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";

import { checkTotalPrice } from "../../services/helpers/check-total-price";
import { modalActions } from "../../services/slices/portal-slice";
import { IIngredient } from "../../types/interfaces/IIngredient";
import { IFeedOrder } from "../../types/interfaces/IOrder";
import TotalPrice from "../total-price";
import FeedIngredientOrder from "../UI/feed-ingredient-order";

import classes from "./order.module.css";

import OrderStatus from "./order-status/order-status";

interface IOrderProps {
  order: IFeedOrder;
}

const Order: FC<IOrderProps> = ({ order }) => {
  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const date = new Date(order.createdAt);

  const ingredientsOfTheOrders = order.ingredients.map((i) => {
    return ingredients.find((item: any) => item._id === i);
  });

  const ingredientsOrder = useMemo(
    () =>
      order.ingredients.slice(0, 6).map((item, index) => {
        const ingredientsItem = ingredients.find((i: any) => i._id === item);
        return (
          ingredientsItem && (
            <li
              style={{
                transform: `translateX(calc(-16px * ${index}))`,
                zIndex: `calc(-1 * ${index})`,
              }}
              key={index}
            >
              <FeedIngredientOrder
                item={ingredientsItem}
                index={index}
                leftIngredients={order.ingredients.slice(6).length}
              />
            </li>
          )
        );
      }),
    [order, ingredients]
  );

  const handleOpenOrderDetails = () => {
    dispatch(modalActions.setIsOpenModalWithOrderDetails(order));

    navigate(`${location.pathname}/${order._id}`, {
      state: { background: location },
    });
  };

  return (
    <button
      className={`button p-6 ${classes.container}`}
      onClick={handleOpenOrderDetails}
    >
      <div className={classes.numberOrder}>
        <span
          className={`text text_type_digits-default ${classes.number}`}
        >{`#${order.number}`}</span>
        <FormattedDate
          className={"text text_type_main-default text_color_inactive"}
          date={date}
        />
      </div>
      <h3 className={`mt-6 text text_type_main-medium ${classes.titleBurger}`}>
        {order.name}
      </h3>

      {location.pathname.includes("profile") && (
        <OrderStatus orderStatus={order.status} />
      )}

      <div className={`mt-4 ${classes.ingredientsContainer}`}>
        <ul className={`list ${classes.items}`}>{ingredientsOrder}</ul>
        <TotalPrice
          totalPrice={checkTotalPrice(ingredientsOfTheOrders as IIngredient[])}
        />
      </div>
    </button>
  );
};

export default Order;
