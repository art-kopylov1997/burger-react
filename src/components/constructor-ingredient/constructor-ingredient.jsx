import classes from "./constructor-ingredient.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorIngredient = ({ elements, deleteItem }) => {
  return (
    <>
      {elements.map((elem) => (
        <div
          key={elem.generatedId}
          className={`${classes.elementWrapper} mt-4 mb-4 mr-2`}
        >
          {elem.elementProperty === "draggable" && <DragIcon type="primary" />}
          <ConstructorElement
            thumbnail={elem.image}
            price={elem.price}
            text={elem.name}
            type={elem.elementProperty}
            handleClose={() => deleteItem(elem.generatedId)}
          />
        </div>
      ))}
    </>
  );
};

export default ConstructorIngredient;
