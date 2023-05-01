import React, { useState } from "react";
import classes from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredient from "../card-ingredient";
import data from "../../utils/data";

const BurgerIngredients = () => {
  const [currentType, setCurrentType] = useState("Булки");

  return (
    <section className={classes.root}>
      <div style={{ position: "absolute" }}>
        <div className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </div>
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
        <div className="text text_type_main-medium mt-10">{currentType}</div>
        <div className={classes.content}>
          {currentType === "Булки" &&
            data
              .filter((el) => el.type === "bun")
              .map((el) => (
                <CardIngredient
                  key={el._id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                />
              ))}
          {currentType === "Соусы" &&
            data
              .filter((el) => el.type === "sauce")
              .map((el) => (
                <CardIngredient
                  key={el._id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                />
              ))}
          {currentType === "Начинки" &&
            data
              .filter((el) => el.type === "main")
              .map((el) => (
                <CardIngredient
                  key={el._id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
