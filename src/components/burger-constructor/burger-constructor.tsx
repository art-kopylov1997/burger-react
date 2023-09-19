import { FC, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import classes from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import OrderIdentifier from "../order-identifier";
import { createOrder } from "../../services/api/norma-client-service";
import ConstructorIngredientList from "../constructor-ingredient-list";
import {
  addIngredientConstructor,
  clearListConstructor,
  delIngredientConstructor,
} from "../../redux/actions/ingredients-constructor";
import { getIngredientsConstructorState } from "../../redux/selectors/ingredients-constructor-selector";
import { getOrderingState } from "../../redux/selectors/ordering-selector";
import { setOrderCost } from "../../redux/actions/ordering";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthUserState } from "../../redux/selectors/auth-selector";
import { IIngredient } from "../../utils/interfaces";

const BurgerConstructor: FC = () => {
  const { ingredientsConstructor, bunsConstructor } = useAppSelector(
    getIngredientsConstructorState
  );
  const user = useAppSelector(getAuthUserState);
  const { orderCost } = useAppSelector(getOrderingState);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [orderNumber, setOrderNumber] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCountOrder();
  }, [ingredientsConstructor, bunsConstructor]);

  const createNewOrder = async () => {
    const idsIngredientsConstructor = ingredientsConstructor.map(
      (el: any) => el._id
    );
    const idsBunsConstructor = bunsConstructor.map((el: any) => el._id);
    const idsIngredients = [
      ...idsIngredientsConstructor,
      ...idsBunsConstructor,
    ];

    if (!user) {
      navigate("/login", { state: location, replace: true });
    } else {
      const data = await createOrder(idsIngredients);
      const result = data.order.number;
      setOrderNumber(result);
      dispatch(clearListConstructor());
      openModal();
    }
  };

  const setCountOrder = () => {
    const pricesIngredientsConstructor = ingredientsConstructor.map(
      (el: any) => el.price
    );
    const pricesBunsConstructor = bunsConstructor.map((el: any) => el.price);
    const prices = [...pricesIngredientsConstructor, ...pricesBunsConstructor];
    const newCount = prices.reduce((acc, number) => acc + number, 0);
    dispatch(setOrderCost(newCount));
  };

  const onDropHandler = (payload: IIngredient) => {
    const dragId = uuidv4();
    dispatch(addIngredientConstructor({ ...payload, dragId }));
  };

  const deleteConstructorElement = (id: string) => {
    dispatch(delIngredientConstructor(id));
  };

  const [{ borderColor }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item as IIngredient);
    },
    collect: (monitor) => ({
      borderColor: monitor.isOver() ? "lightgreen" : "transparent",
    }),
  });

  const BUN = bunsConstructor.find(
    (ingredient: any) => ingredient.type === "bun"
  );

  const DRAGGABLE_INGREDIENTS = ingredientsConstructor.filter(
    (ingredient: any) => ingredient.elementProperty === "draggable"
  );

  return (
    <section className={classes.section}>
      <div className="mt-25">
        <div>
          <div
            className={classes.contentIngredients}
            ref={dropTarget}
            style={{ borderColor }}
            data-testid="constructor"
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
            data-testid="submit-order-button"
          >
            Оформить заказ
          </Button>
          {isModalOpen && (
            <Modal closeModal={closeModal}>
              <OrderIdentifier orderNumber={orderNumber} />
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
