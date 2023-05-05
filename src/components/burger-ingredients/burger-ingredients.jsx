import React, { useState } from "react";
import classes from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredient from "../card-ingredient";
import data from "../../utils/data";

const BurgerIngredients = () => {
  const [currentType, setCurrentType] = useState("Булки");

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
          data
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <CardIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
        {currentType === "Соусы" &&
          data
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient) => (
              <CardIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
        {currentType === "Начинки" &&
          data
            .filter((ingredient) => ingredient.type === "main")
            .map((ingredient) => (
              <CardIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
