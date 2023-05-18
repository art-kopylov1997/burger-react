import React, { useContext, useEffect, useReducer } from "react";
import { useModal } from "../../hooks/useModal";
import classes from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import OrderDetails from "../order-details";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import { IngredientsContext } from "../../services/ingredientsContext";
import post from "../../services/api/post";
import { initialState } from "../../utils/reducer";
import reducer from "../../utils/reducer";

const BurgerConstructor = () => {
  const ingredients = useContext(IngredientsContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [state, dispatch] = useReducer(reducer, initialState, undefined);

  useEffect(() => {
    if (ingredients.length > 0) {
      getTotalPrice();
      getIdsIngredients();
    }
  }, [ingredients]);

  const getTotalPrice = () => {
    const priceNotBuns = ingredients
      .filter((el) => el.type !== "bun")
      .map((el) => el.price)
      .reduce((a, b) => a + b);

    const priceBunCrator = ingredients.find(
      (el) => el.name === "Краторная булка N-200i"
    ).price;

    dispatch({
      type: "setTotal",
      payload: priceNotBuns + priceBunCrator * 2,
    });
  };

  const getIdsIngredients = () => {
    const idsNotBuns = ingredients
      .filter((el) => el.type !== "bun")
      .map((el) => el._id);

    const idsBuns = ingredients
      .filter((el) => el.name === "Краторная булка N-200i")
      .map((el) => el._id);

    dispatch({
      type: "setIdsIngredients",
      payload: [...idsNotBuns, ...idsBuns],
    });
  };

  const newOrder = async (payload) => {
    openModal();
    await post(payload);
  };

  return (
    <section>
      <div className="mt-25">
        <div>
          {ingredients
            .filter(
              (ingredient) => ingredient.name === "Краторная булка N-200i"
            )
            .map((bun) => (
              <ConstructorElement
                key={bun._id}
                extraClass="ml-5 mb-1"
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ))}
          <div className={classes.content}>
            {ingredients
              .filter((ingredient) => ingredient.type !== "bun")
              .map((ingredient) => (
                <div
                  key={ingredient._id}
                  className={`${classes.elementWrapper} mt-4 mb-4 mr-2`}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    thumbnail={ingredient.image}
                    price={ingredient.price}
                    text={ingredient.name}
                  />
                </div>
              ))}
          </div>
          {ingredients
            .filter(
              (ingredient) => ingredient.name === "Краторная булка N-200i"
            )
            .map((bun) => (
              <ConstructorElement
                key={bun._id}
                extraClass="ml-5 mb-1"
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ))}
        </div>
        <div className={`${classes.checkoutBlock} mt-10`}>
          <div className={`${classes.price} text text_type_main-large mr-10`}>
            {state.total}
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => newOrder(state.idsIngredients)}
          >
            Оформить заказ
          </Button>
          {isModalOpen && (
            <Modal headerText="" closeModal={closeModal}>
              {/* Тут надо передать номер заказа из post запроса, не пойму как получить  */}
              <OrderDetails numberOrder={1231} />
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
