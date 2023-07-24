import classes from "./order-details.module.css";
import DoneImg from "../../images/done.png";
import { FC } from "react";

interface IOrderDetails {
  orderNumber: number;
}

const OrderDetails: FC<IOrderDetails> = ({ orderNumber }) => {
  return (
    <div className={classes.root}>
      <p className="text text_type_digits-large mb-8">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={DoneImg} alt="done" />
      <p className="text text_type_main-small mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-5">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
