import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import OrderDetailsCard from "../components/order-details-card";
import { Loader } from "../components/UI/loader/loader";
import { useAppSelector } from "../hooks/useTypedSelector";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  ACCESS_TOKEN,
  WSS_FOR_ALL_ORDERS,
  WSS_FOR_PROFILE_ORDERS,
} from "../utils/constans";
import { NotFoundPage } from "./not-found-page";
import Modal from "../components/modal";

import classes from "./order-details-page.module.css";

export const OrderDetailsPage: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const location = useLocation();
  const navigate = useNavigate();
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

  const closeModal = useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

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
      <Modal title="" closeModal={closeModal}>
        <OrderDetailsCard order={order} />
      </Modal>
    </section>
  ) : (
    <NotFoundPage />
  );
};
