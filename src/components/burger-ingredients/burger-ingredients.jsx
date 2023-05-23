import React, { useState, useEffect, useRef } from "react";
import classes from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";
import { useSelector } from "react-redux";
import ListIngredients from "../list-ingredients/list-ingredients";

const BurgerIngredients = () => {
  const { ingredients, isLoading, isError } = useSelector(
    (state) => state.ingredients
  );
  const [currentType, setCurrentType] = useState("bun");

  const setTab = (tab) => {
    setCurrentType(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const listBun = ingredients.filter((el) => el.type === "bun");
  const listMain = ingredients.filter((el) => el.type === "main");
  const listSauce = ingredients.filter((el) => el.type === "sauce");

  const primaryRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleScroll = () => {
    if (
      primaryRef &&
      bunRef &&
      sauceRef &&
      mainRef &&
      primaryRef.current &&
      bunRef.current &&
      sauceRef.current &&
      mainRef.current
    ) {
      const bunDistance = Math.abs(
        primaryRef.current.getBoundingClientRect().top -
          bunRef.current.getBoundingClientRect().top
      );
      const sauceDistance = Math.abs(
        primaryRef.current.getBoundingClientRect().top -
          sauceRef.current.getBoundingClientRect().top
      );
      const mainDistance = Math.abs(
        primaryRef.current.getBoundingClientRect().top -
          mainRef.current.getBoundingClientRect().top
      );
      const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
      const currentHeader =
        minDistance === bunDistance
          ? "bun"
          : minDistance === sauceDistance
          ? "sauce"
          : "main";
      setCurrentType((prevState) =>
        currentHeader === prevState ? prevState : currentHeader
      );
    }
  };

  useEffect(() => {
    document.getElementById(currentType).scrollIntoView();
  }, [currentType]);

  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={classes.tabBlock}>
        <Tab
          value="Булки"
          active={currentType === "bun"}
          onClick={() => setTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={currentType === "sauce"}
          onClick={() => setTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={currentType === "main"}
          onClick={() => setTab("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={classes.content} ref={primaryRef} onScroll={handleScroll}>
        {!isLoading && !isError && (
          <>
            <ListIngredients
              typeTitle={"Булки"}
              ingredients={listBun}
              id={"bun"}
              subRef={bunRef}
            />
            <ListIngredients
              typeTitle={"Соусы"}
              ingredients={listSauce}
              id={"sauce"}
              subRef={sauceRef}
            />
            <ListIngredients
              typeTitle={"Начинки"}
              ingredients={listMain}
              id={"main"}
              subRef={mainRef}
            />
          </>
        )}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
