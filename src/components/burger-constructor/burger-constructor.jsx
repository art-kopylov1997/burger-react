import { useModal } from "../../hooks/useModal";
import classes from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import Modal from "../modal";
import OrderDetails from "../order-details";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";

const BurgerConstructor = ({ ingredients }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const getCratorBunImage = () => {
    const typeImage = data.find((el) => el.name === "Краторная булка N-200i");
    return typeImage.image;
  };

  return (
    <section>
      <div className="mt-25">
        <div>
          <ConstructorElement
            extraClass="ml-5 mb-1"
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={getCratorBunImage()}
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
                    price={ingredients.price}
                    text={ingredient.name}
                  />
                </div>
              ))}
          </div>
          <ConstructorElement
            extraClass="ml-5 mt-1"
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={getCratorBunImage()}
          />
        </div>
        <div className={`${classes.checkoutBlock} mt-10`}>
          <div className={`${classes.price} text text_type_main-large mr-10`}>
            310
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
          {isModalOpen && (
            <Modal headerText="" closeModal={closeModal}>
              <OrderDetails />
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
