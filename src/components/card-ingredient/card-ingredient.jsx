import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { useModal } from "../../hooks/useModal";

import classes from "./card-ingredient.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import {
  clearCurrentIngredient,
  fillCurrentIngredient,
} from "../../redux/action-creators/current-ingredient-creators";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { getCurrentIngredientState } from "../../redux/selectors/current-ingredient-selector";

const CardIngredient = ({ ingredient }) => {
  const { name, image, price } = ingredient;
  const { isModalOpen, openModal, closeModal } = useModal();
  const { currentIngredient } = useSelector(getCurrentIngredientState);
  const { ingredientsConstructor } = useSelector(
    getIngredientsConstructorState
  );
  const [ingredientCounter, setIngredientCounter] = useState(0);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    calculateCount();
  }, [ingredientsConstructor, setIngredientCounter]);

  const opacity = isDrag ? 0.5 : 1;

  const dispatch = useDispatch();

  const calculateCount = () => {
    const count = ingredientsConstructor.filter(
      (el) => el.name === name
    ).length;

    setIngredientCounter(count);
  };

  const handleOpenModal = (ingredient) => {
    openModal();
    dispatch(fillCurrentIngredient(ingredient));
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearCurrentIngredient());
  };
  return (
    <>
      <div
        style={{ opacity }}
        className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}
        onClick={() => handleOpenModal(ingredient)}
        ref={dragRef}
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
      </div>

      {isModalOpen && (
        <Modal title="Детали ингредиента" closeModal={() => handleCloseModal()}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

CardIngredient.propTypes = {
  ingredient: ingredientPropTypes,
  onClick: PropTypes.func,
};

export default CardIngredient;
