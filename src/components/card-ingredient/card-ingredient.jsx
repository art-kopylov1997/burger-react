import classes from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const CardIngredient = ({ name, price, image }) => {
  return (
    <div className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}>
      <img className="pl-4 pr-4" src={image} alt="ingredient" />
      <span
        className={`${classes.price} mt-1 mb-1 text text_type_digits-default`}
      >
        {price} <CurrencyIcon type="primary" />
      </span>
      <div className="text text_type_main-default">{name}</div>
    </div>
  );
};

export default CardIngredient;
