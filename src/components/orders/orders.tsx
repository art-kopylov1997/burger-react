import { FC, useMemo } from "react";

import { IFeedOrder } from "../../types/interfaces/IOrder";
import Order from "../order";

import classes from "./orders.module.css";

interface IOrdersProps {
  feedOrders: IFeedOrder[];
}

const Orders: FC<IOrdersProps> = ({ feedOrders }) => {
  const orders = useMemo(
    () =>
      feedOrders?.map((item) => (
        <li key={item._id}>
          <Order order={item} />{" "}
        </li>
      )),
    [feedOrders]
  );

  return orders?.length ? (
    <ul className={`list pr-2 ${classes.orders}`}>{orders}</ul>
  ) : (
    <p className={`text text_type_main-large ${classes.subtitle}`}>
      Заказовы отсутствуют
    </p>
  );
};

export default Orders;
