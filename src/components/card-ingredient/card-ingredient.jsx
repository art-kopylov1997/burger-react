import classes from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const CardIngredient = ({ name, price, image, selected }) => {
  return (
    <div className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}>
      <div className={classes.wrapperImage}>
        {selected && (
          <div
            className={`${classes.selectedIcon} text text_type_digits-default`}
          >
            1
          </div>
        )}
        <img className="pl-4 pr-4" src={image} alt="ingredient" />
      </div>
      <span
        className={`${classes.price} mt-1 mb-1 text text_type_digits-default`}
      >
        {price} <CurrencyIcon type="primary" />
      </span>
      <div className="text text_type_main-default">{name}</div>
    </div>
  );
};

CardIngredient.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  selected: PropTypes.bool,
};

export default CardIngredient;
