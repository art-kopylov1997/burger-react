import { FC, useMemo } from "react";

import { useAppSelector } from "../../hooks/useTypedSelector";

import { IFeedOrder, IOrderStatus } from "../../types/interfaces/IOrder";

import classes from "./order-statistics.module.css";

const getListNumberOrder = (array: IFeedOrder[], status: IOrderStatus) => {
  const orderStatusArray = array?.filter((item) => item.status === status);
  return orderStatusArray
    ?.slice(0, 15)
    .map((item) => <li key={item._id}>{item.number}</li>);
};

const OrderStatistics: FC = () => {
  const total = useAppSelector((store) => store.wsReducers.wsMessage?.total);
  const totalToday = useAppSelector(
    (store) => store.wsReducers.wsMessage?.totalToday
  );
  const orders = useAppSelector((store) => store.wsReducers.wsMessage?.orders);
  const readyOrders = useMemo(() => {
    if (orders) {
      return getListNumberOrder(orders, IOrderStatus.done);
    }
    return null;
  }, [orders]);

  const pendingOrders = useMemo(() => {
    if (orders) {
      return getListNumberOrder(orders, IOrderStatus.pending);
    }
    return null;
  }, [orders]);

  return (
    <div className={classes.container}>
      <div className={classes.ordersNumber}>
        <h3 className={"text text_type_main-medium"}>Готовы:</h3>
        <h3 className={"text text_type_main-medium"}>В работе:</h3>
        <ul
          className={`list text text_type_digits-default ${classes.orders} ${classes.orders_ready}`}
        >
          {readyOrders}
        </ul>

        <ul className={`list text text_type_digits-default ${classes.orders}`}>
          {pendingOrders}
        </ul>
      </div>

      <h3 className={"mt-15 text text_type_main-medium"}>
        Выполнено за все время:
      </h3>
      <p className={`text text_type_digits-large ${classes.number}`}>
        {total || ""}
      </p>

      <h3 className={"mt-15 text text_type_main-medium"}>
        Выполнено за сегодня:
      </h3>
      <p className={`text text_type_digits-large ${classes.number}`}>
        {totalToday || ""}
      </p>
    </div>
  );
};

export default OrderStatistics;
