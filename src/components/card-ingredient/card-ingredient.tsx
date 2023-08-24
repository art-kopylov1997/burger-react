import React from "react";
import { FC, useEffect, useState } from "react";
import { useSelector } from "../../hooks/typedHooksRedux";
import { useDrag } from "react-dnd";

import classes from "./card-ingredient.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { Link, useLocation } from "react-router-dom";

interface ICardIngredient {
  ingredient: {
    name: string;
    image: string;
    _id: string;
    price: number;
  };
}

const CardIngredient: FC<ICardIngredient> = ({ ingredient }) => {
  const { name, image, price } = ingredient;
  const { ingredientsConstructor, bunsConstructor } = useSelector(
    getIngredientsConstructorState
  );
  const [ingredientCounter, setIngredientCounter] = useState(0);
  const [bunCounter, setBunCounter] = useState(0);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  useEffect(() => {
    calculateCount();
  }, [ingredientsConstructor, bunsConstructor, setIngredientCounter]);

  const location = useLocation();

  const calculateCount = () => {
    const countIngredient = ingredientsConstructor.filter(
      (el: any) => el.name === name
    ).length;

    const countBun = bunsConstructor.filter(
      (el: any) => el.name === name
    ).length;

    setIngredientCounter(countIngredient);
    setBunCounter(countBun);
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
          {bunCounter > 0 && (
            <div
              className={`${classes.selectedIcon} text text_type_digits-default`}
            >
              {bunCounter}
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

export default CardIngredient;
