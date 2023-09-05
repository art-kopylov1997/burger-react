import React, { FC, useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Modal from "../modal";
import OrderDetails from "../order-details";
import { useAppSelector } from "../../hooks/useTypedSelector";

const OrderDetailsCard: FC = () => {
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

  const closeModal = useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  return (
    <Modal closeModal={closeModal}>
      <OrderDetails order={order} />
    </Modal>
  );
};

export default OrderDetailsCard;
