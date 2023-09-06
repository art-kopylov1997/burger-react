import React, { FC, useEffect } from "react";

import Orders from "../../../components/orders";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { WSS_FOR_PROFILE_ORDERS } from "../../../utils/constans";
import { Loader } from "../../../components/UI/loader/loader";
import { getCookie } from "../../../helpers/cookie-helper";

import classes from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(
    (store) => store.wsReducers.wsMessage?.orders
  );
  const accessToken = getCookie("token")?.replace("Bearer ", "");

  useEffect(() => {
    connect(
      `${WSS_FOR_PROFILE_ORDERS}?token=${accessToken?.replace("Bearer ", "")}`
    );

    return () => {
      closeWs();
    };
  }, [accessToken]);

  return (
    <div className={classes.root}>
      {feedOrders ? (
        <Orders feedOrders={[...feedOrders].reverse()} />
      ) : (
        <Loader size="huge" />
      )}
    </div>
  );
};

export default ProfileOrders;
