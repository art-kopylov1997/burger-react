import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import classes from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import OrderDetails from "../order-details";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import createOrderRequest from "../../services/api/createOrderRequest";
import ConstructorIngredient from "../constructor-ingredient";
import {
  addIngredientConstructor,
  delIngredientConstructor,
} from "../../redux/action-creators/ingredients-constructor-creators";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { getOrderingState } from "../../redux/selectors/ordering-selector";
import { setOrderCost } from "../../redux/action-creators/ordering-creators";

const BurgerConstructor = () => {
  const { ingredientsConstructor } = useSelector(
    getIngredientsConstructorState
  );
  const { orderCost } = useSelector(getOrderingState);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [orderNumber, setOrderNumber] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setCountOrder();
  }, [ingredientsConstructor]);

  const createNewOrder = async () => {
    const payload = { ingredients: [] };
    const idsIngredients = ingredientsConstructor.map((el) => el._id);
    payload.ingredients.push(...idsIngredients);

    const data = await createOrderRequest(payload);
    const result = data.order.number;
    setOrderNumber(result);
    dispatch(setOrderCost(result));
    openModal();
  };

  const setCountOrder = () => {
    const prices = ingredientsConstructor.map((el) => el.price);
    const newCount = prices.reduce((acc, number) => acc + number, 0);
    dispatch(setOrderCost(newCount));
  };

  const onDropHandler = (payload) => {
    if (payload.type === "bun") {
      ingredientsConstructor
        .filter((ingredient) => ingredient.type === "bun")
        .forEach((ingredient) =>
          deleteConstructorElement(ingredient.generatedId)
        );
    }

    const generatedId = "id" + Math.random().toString(16).slice(2);

    dispatch(addIngredientConstructor({ ...payload, generatedId }));
  };

  const deleteConstructorElement = (id) => {
    dispatch(delIngredientConstructor(id));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgreen" : "transparent";

  const TOP_BUN = ingredientsConstructor.find(
    (ingredient) => ingredient.elementProperty === "top"
  );

  const DRAGGABLE_INGREDIENTS = ingredientsConstructor.filter(
    (ingredient) => ingredient.elementProperty === "draggable"
  );

  const BOTTOM_BUN = ingredientsConstructor.find(
    (ingredient) => ingredient.elementProperty === "bottom"
  );

  return (
    <section className={classes.section}>
      <div className="mt-25">
        <div>
          <div
            className={classes.contentIngredients}
            ref={dropTarget}
            style={{ borderColor }}
          >
            {TOP_BUN && (
              <div className="ml-5">
                <ConstructorElement
                  text={TOP_BUN.name + " (Верх)"}
                  isLocked={true}
                  price={TOP_BUN.price}
                  thumbnail={TOP_BUN.image}
                  type={TOP_BUN.elementProperty}
                />
              </div>
            )}

            <ConstructorIngredient
              elements={DRAGGABLE_INGREDIENTS}
              deleteItem={deleteConstructorElement}
            />

            {BOTTOM_BUN && (
              <div className="ml-5">
                <ConstructorElement
                  text={BOTTOM_BUN.name + " (Низ)"}
                  isLocked={true}
                  price={BOTTOM_BUN.price}
                  thumbnail={BOTTOM_BUN.image}
                  type={BOTTOM_BUN.elementProperty}
                />
              </div>
            )}
          </div>
        </div>
        <div className={`${classes.checkoutBlock} mt-10`}>
          <div className={`${classes.price} text text_type_main-large mr-10`}>
            {orderCost}
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={createNewOrder}
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
