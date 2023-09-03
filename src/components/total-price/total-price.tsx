import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

import classes from "./total-price.module.css";

interface ITotalPriceProps {
  totalPrice: number;
}

const TotalPrice: FC<ITotalPriceProps> = ({ totalPrice }) => {
  return (
    <div className={classes.flexContainer}>
      <div
        className={`text text_type_digits-default ${classes.burgerConstructor__price}`}
      >
        {totalPrice}
      </div>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
