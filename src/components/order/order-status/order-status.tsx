import { FC } from "react";

import { IOrderStatus } from "../../../types/interfaces/IOrder";

import classes from "./order-status.module.css";

interface IOrderStatusProps {
  orderStatus: IOrderStatus;
}

const OrderStatus: FC<IOrderStatusProps> = ({ orderStatus }) => {
  return (
    <p className={`text text_type_main-default mt-2 ${classes.status}`}>
      Готовится
    </p>
  );
};

export default OrderStatus;
