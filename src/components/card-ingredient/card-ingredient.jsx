import classes from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import {
  addIngredientDetails,
  delIngredientDetails,
} from "../../redux/action-creators/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";

const CardIngredient = ({ ingredient }) => {
  const { name, image, price } = ingredient;
  const { isModalOpen, openModal, closeModal } = useModal();
  const { currentIngredient } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  const handleOpenModal = (ingredient) => {
    openModal();
    dispatch(addIngredientDetails(ingredient));
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(delIngredientDetails());
  };
  return (
    <>
      <div
        className={`${classes.root} mt-6 mb-10 ml-4 mr-6`}
        onClick={() => handleOpenModal(ingredient)}
      >
        <div className={classes.wrapperImage}>
          {name === "Краторная булка N-200i" && (
            <div
              className={`${classes.selectedIcon} text text_type_digits-default`}
            >
              1
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
