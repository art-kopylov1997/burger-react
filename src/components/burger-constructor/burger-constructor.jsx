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
import {
  addIngredientConstructor,
  delIngredientConstructor,
  setOrderNumber,
} from "../../redux/action-creators/action-creators";
import ConstructorIngredient from "../constructor-ingredient";

const BurgerConstructor = () => {
  const { ingredientsConstructor, orderNumber } = useSelector(
    (state) => state.ingredients
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const [bunsConstructor, setBunsConstructor] = useState([{}]);
  // const [bunsConstructor, setBunsConstructor] = useState({});
  const [notBuns, setNotBuns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setCountOrder();
    bunsFromConstructor();
    notBunsArray();
  }, [ingredientsConstructor]);

  const bunsFromConstructor = () => {
    const bunsForConstructor = ingredientsConstructor.filter((el) => {
      return el.type === "bun";
    });

    setBunsConstructor(bunsForConstructor);
  };

  const notBunsArray = () => {
    const notBunsArr = ingredientsConstructor.filter((el) => {
      return el.type !== "bun";
    });
    setNotBuns(notBunsArr);
  };

  const createNewOrder = async (payload) => {
    const data = await createOrderRequest(payload);
    const result = data.order.number;
    dispatch(setOrderNumber(result));
    openModal();
  };

  const setCountOrder = () => {
    const prices = ingredientsConstructor.map((el) => el.price);
    const newCount = prices.reduce((acc, number) => acc + number, 0);
    dispatch(setOrderNumber(newCount));
  };

  const onDropHandler = (payload) => {
    dispatch(addIngredientConstructor(payload));
  };

  const deleteConstructorElement = (index) => {
    dispatch(delIngredientConstructor(index));
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

  return (
    <section className={classes.section}>
      <div className="mt-25">
        <div className={classes.contentMain}>
          <div
            className={classes.contentIngredients}
            ref={dropTarget}
            style={{ borderColor }}
          >
            {/*{Object.keys(bunsConstructor).length !== 0 && (*/}
            {bunsConstructor.length !== 0 && (
              <div className="ml-5">
                <ConstructorElement
                  text={bunsConstructor[0].name + " (Верх)"}
                  isLocked={true}
                  price={bunsConstructor[0].price}
                  thumbnail={bunsConstructor[0].image}
                  type="top"
                />
              </div>
            )}
            <ConstructorIngredient
              elements={notBuns}
              deleteItem={deleteConstructorElement}
            />
            {/*{Object.keys(bunsConstructor).length !== 0 && (*/}
            {bunsConstructor.length !== 0 && (
                <div className="ml-5">
                <ConstructorElement
                  text={bunsConstructor[0].name + " (Верх)"}
                  isLocked={true}
                  price={bunsConstructor[0].price}
                  thumbnail={bunsConstructor[0].image}
                  type="bottom"
                />
              </div>
            )}
          </div>
        </div>
        <div className={`${classes.checkoutBlock} mt-10`}>
          <div className={`${classes.price} text text_type_main-large mr-10`}>
            {orderNumber}
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => createNewOrder(ingredientsConstructor)}
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
