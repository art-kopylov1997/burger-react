import classes from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const CardIngredient = ({ ingredient }) => {
  return (
    <div className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}>
      <div className={classes.wrapperImage}>
        {ingredient.name === "Краторная булка N-200i" && (
          <div
            className={`${classes.selectedIcon} text text_type_digits-default`}
          >
            1
          </div>
        )}
        <img
          className="pl-4 pr-4"
          src={ingredient.image}
          alt={ingredient.name}
        />
      </div>
      <span
        className={`${classes.price} mt-1 mb-1 text text_type_digits-default`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </span>
      <div className="text text_type_main-default">{ingredient.name}</div>
    </div>
  );
};

CardIngredient.propTypes = {
  ingredient: {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    selected: PropTypes.bool,
  },
};

export default CardIngredient;
