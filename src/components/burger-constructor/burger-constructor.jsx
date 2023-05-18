import React, { useContext, useEffect, useReducer, useState } from "react";
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
import createOrder from "../../services/api/createOrder";
import { initialState } from "../../utils/reducer";
import reducer from "../../utils/reducer";

const BurgerConstructor = () => {
  const ingredients = useContext(IngredientsContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [state, dispatch] = useReducer(reducer, initialState, undefined);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    if (ingredients.length > 0) {
      getTotalPrice();
      getIdsIngredients();
      getBunIngredients();
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
      payload: [...idsBuns, ...idsNotBuns, ...idsBuns],
    });
  };

  const getBunIngredients = () => {
    const bunIngredient = ingredients.find(
      (ingredient) => ingredient.name === "Краторная булка N-200i"
    );

    dispatch({
      type: "setBunIngredient",
      payload: { ...bunIngredient },
    });
  };

  const newOrder = async (payload) => {
    const data = await createOrder(payload);
    setOrderNumber(data.order.number);
    openModal();
  };

  return (
    <section>
      <div className="mt-25">
        <div>
          <ConstructorElement
            extraClass="ml-5 mb-1"
            type="top"
            isLocked={true}
            text={`${state.bunIngredient.name} (верх)`}
            price={state.bunIngredient.price}
            thumbnail={state.bunIngredient.image}
          />
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
          <ConstructorElement
            extraClass="ml-5 mb-1"
            type="bottom"
            isLocked={true}
            text={`${state.bunIngredient.name} (низ)`}
            price={state.bunIngredient.price}
            thumbnail={state.bunIngredient.image}
          />
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
              <OrderDetails orderNumber={orderNumber} />
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
