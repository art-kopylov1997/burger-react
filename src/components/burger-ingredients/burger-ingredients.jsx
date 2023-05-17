import React, { useState, useContext } from "react";
import classes from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredient from "../card-ingredient";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import { useModal } from "../../hooks/useModal";
import { IngredientsContext } from "../../services/ingredientsContext";

const BurgerIngredients = () => {
  const ingredients = useContext(IngredientsContext);
  const [currentType, setCurrentType] = useState("Булки");
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const typeAdapter = (type) => {
    const isBun = currentType === "Булки" && type === "bun";
    const isSauce = currentType === "Соусы" && type === "sauce";
    const isMain = currentType === "Начинки" && type === "main";

    return isBun || isSauce || isMain;
  };

  const passIngredientToModal = (ingredient) => {
    openModal();
    setCurrentIngredient(ingredient);
  };

  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={classes.tabBlock}>
        <Tab
          value="Булки"
          active={currentType === "Булки"}
          onClick={setCurrentType}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={currentType === "Соусы"}
          onClick={setCurrentType}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={currentType === "Начинки"}
          onClick={setCurrentType}
        >
          Начинки
        </Tab>
      </div>

      <h3 className="text text_type_main-medium mt-10">{currentType}</h3>
      <div className={classes.content}>
        {ingredients
          .filter((ingredient) => typeAdapter(ingredient.type))
          .map((ingredient) => (
            <CardIngredient
              key={ingredient._id}
              ingredient={ingredient}
              onClick={() => passIngredientToModal(ingredient)}
            />
          ))}
      </div>

      {isModalOpen && (
        <Modal title="Детали ингредиента" closeModal={closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
