import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import classes from "./card-ingredient.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { Link, useLocation } from "react-router-dom";

const CardIngredient = ({ ingredient }) => {
  const { name, image, price } = ingredient;
  const { ingredientsConstructor } = useSelector(
    getIngredientsConstructorState
  );
  const [ingredientCounter, setIngredientCounter] = useState(0);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  useEffect(() => {
    calculateCount();
  }, [ingredientsConstructor, setIngredientCounter]);

  const location = useLocation();

  const calculateCount = () => {
    const count = ingredientsConstructor.filter(
      (el) => el.name === name
    ).length;

    setIngredientCounter(count);
  };
  return (
    <div
      style={{ opacity }}
      className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}
      ref={dragRef}
    >
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={classes.link}
      >
        <div className={classes.wrapperImage}>
          {ingredientCounter > 0 && (
            <div
              className={`${classes.selectedIcon} text text_type_digits-default`}
            >
              {ingredientCounter}
            </div>
          )}
          <img className="pl-4 pr-4" src={image} alt={name} />
        </div>
        <span
          className={`${classes.price} mt-1 mb-1 text text_type_digits-default`}
        >
          {price} <CurrencyIcon type="primary" />
        </span>
        <div className="text text_type_main-default">{name}</div>
      </Link>
    </div>
  );
};

CardIngredient.propTypes = {
  ingredient: ingredientPropTypes,
  onClick: PropTypes.func,
};

export default CardIngredient;
