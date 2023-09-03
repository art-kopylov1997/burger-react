import { FC, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

import OrderDetails from "../components/order-details";
import { Loader } from "../components/UI/loader/loader";
import { useAppSelector } from "../hooks/useTypedSelector";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  ACCESS_TOKEN,
  WSS_FOR_ALL_ORDERS,
  WSS_FOR_PROFILE_ORDERS,
} from "../utils/constans";
import { NotFoundPage } from "./not-found-page";

import classes from "./order-details-page.module.css";

export const OrderDetailsPage: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const location = useLocation();
  const feedOrders = useAppSelector(
    (store) => store.wsReducers.wsMessage?.orders
  );

  const { orderId } = useParams();

  const order = useMemo(
    () => feedOrders?.find((item: any) => item._id === orderId),
    [feedOrders]
  );

  const accessToken = useMemo(
    () => localStorage.getItem(ACCESS_TOKEN)?.replace("Bearer ", ""),
    [localStorage.getItem(ACCESS_TOKEN)]
  );

  useEffect(() => {
    if (location.pathname === `/feed/${orderId}`) {
      connect(WSS_FOR_ALL_ORDERS);
    } else if (location.pathname === `/profile/orders/${orderId}`) {
      connect(`${WSS_FOR_PROFILE_ORDERS}?token=${accessToken}`);
    }

    return () => {
      closeWs();
    };
  }, []);

  return !feedOrders?.length ? (
    <Loader size="medium" />
  ) : order ? (
    <section className={classes.root}>
      <OrderDetails orderNumber={order} />
    </section>
  ) : (
    <NotFoundPage />
  );
};
