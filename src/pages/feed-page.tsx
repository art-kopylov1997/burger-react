import React, { FC, useEffect } from "react";

import classes from "./feed-page.module.css";

import Orders from "../components/orders";
import { Loader } from "../components/UI/loader/loader";
import { useWebSocket } from "../hooks/useWebSocket";
import { useAppSelector } from "../hooks/useTypedSelector";
import { WSS_FOR_ALL_ORDERS } from "../utils/constans";
import OrderStatistics from "../components/order-statistics/order-statistics";

export const FeedPage: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(
    (store) => store.wsReducers.wsMessage?.orders
  );

  useEffect(() => {
    connect(WSS_FOR_ALL_ORDERS);

    return () => {
      closeWs();
    };
  }, []);

  return !feedOrders ? (
    <Loader size="huge" />
  ) : (
    <section className={classes.feed}>
      <h2 className={`text text_type_main-medium ${classes.title}`}>
        Лента заказов
      </h2>
      <div className={classes.feedContainer}>
        <Orders feedOrders={feedOrders} />
        <OrderStatistics />
      </div>
    </section>
  );
};
