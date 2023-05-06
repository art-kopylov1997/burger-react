import React, { useState } from "react";
import classes from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredient from "../card-ingredient";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients }) => {
  const [currentType, setCurrentType] = useState("Булки");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div style={{ display: "flex" }}>
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
        {currentType === "Булки" &&
          ingredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <>
                <CardIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  onClick={openModal}
                />
                {isOpenModal && (
                  <Modal title="Детали ингредиента" closeModal={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                  </Modal>
                )}
              </>
            ))}
        {currentType === "Соусы" &&
          ingredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient) => (
              <>
                <CardIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  onClick={openModal}
                />
                {isOpenModal && (
                  <Modal title="Детали ингредиента" closeModal={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                  </Modal>
                )}
              </>
            ))}
        {currentType === "Начинки" &&
          ingredients
            .filter((ingredient) => ingredient.type === "main")
            .map((ingredient) => (
              <>
                <CardIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  onClick={openModal}
                />
                {isOpenModal && (
                  <Modal title="Детали ингредиента" closeModal={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                  </Modal>
                )}
              </>
            ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: {
    type: PropTypes.string,
    _id: PropTypes.string,
  },
};

export default BurgerIngredients;
