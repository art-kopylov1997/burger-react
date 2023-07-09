import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

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
import createOrderRequest from "../../services/api/create-order-request";
import ConstructorIngredientList from "../constructor-ingredient-list";
import {
  addIngredientConstructor,
  clearListConstructor,
  delIngredientConstructor,
} from "../../redux/action-creators/ingredients-constructor-creators";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { getOrderingState } from "../../redux/selectors/ordering-selector";
import { setOrderCost } from "../../redux/action-creators/ordering-creators";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthUserState } from "../../redux/selectors/auth-selector";

const BurgerConstructor = () => {
  const { ingredientsConstructor, bunsConstructor } = useSelector(
    getIngredientsConstructorState
  );
  const user = useSelector(getAuthUserState);
  const { orderCost } = useSelector(getOrderingState);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [orderNumber, setOrderNumber] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCountOrder();
  }, [ingredientsConstructor, bunsConstructor]);

  const createNewOrder = async () => {
    const payload = { ingredients: [] };
    const idsIngredientsConstructor = ingredientsConstructor.map(
      (el) => el._id
    );
    const idsBunsConstructor = bunsConstructor.map((el) => el._id);
    const idsIngredients = [
      ...idsIngredientsConstructor,
      ...idsBunsConstructor,
    ];
    payload.ingredients.push(...idsIngredients);

    if (!user) {
      navigate("/login", { state: location, replace: true });
    } else {
      const data = await createOrderRequest(payload);
      const result = data.order.number;
      setOrderNumber(result);
      dispatch(clearListConstructor());
      openModal();
    }
  };

  const setCountOrder = () => {
    const pricesIngredientsConstructor = ingredientsConstructor.map(
      (el) => el.price
    );
    const pricesBunsConstructor = bunsConstructor.map((el) => el.price);
    const prices = [...pricesIngredientsConstructor, ...pricesBunsConstructor];
    const newCount = prices.reduce((acc, number) => acc + number, 0);
    dispatch(setOrderCost(newCount));
  };

  const onDropHandler = (payload) => {
    const dragId = uuidv4();
    dispatch(addIngredientConstructor({ ...payload, dragId }));
  };

  const deleteConstructorElement = (id) => {
    dispatch(delIngredientConstructor(id));
  };

  const [{ borderColor }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      borderColor: monitor.isOver() ? "lightgreen" : "transparent",
    }),
  });

  const BUN = bunsConstructor.find((ingredient) => ingredient.type === "bun");

  const DRAGGABLE_INGREDIENTS = ingredientsConstructor.filter(
    (ingredient) => ingredient.elementProperty === "draggable"
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
            {BUN && (
              <div className="ml-5">
                <ConstructorElement
                  text={BUN.name + " (Верх)"}
                  isLocked={true}
                  price={BUN.price}
                  thumbnail={BUN.image}
                  type={"top"}
                />
              </div>
            )}

            <ConstructorIngredientList
              ingredients={DRAGGABLE_INGREDIENTS}
              deleteItem={deleteConstructorElement}
            />

            {BUN && (
              <div className="ml-5">
                <ConstructorElement
                  text={BUN.name + " (Низ)"}
                  isLocked={true}
                  price={BUN.price}
                  thumbnail={BUN.image}
                  type={"bottom"}
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
            disabled={!BUN}
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
