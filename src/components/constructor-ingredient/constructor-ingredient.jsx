import classes from "./constructor-ingredient.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorIngredient = ({ elements, deleteItem }) => {
  return (
    <>
      {elements
        // .filter((el) => el.type !== "bun")
        .map((elem, index) => (
          <div
            key={index}
            className={`${classes.elementWrapper} mt-4 mb-4 mr-2`}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              thumbnail={elem.image}
              price={elem.price}
              text={elem.name}
              handleClose={() => deleteItem(index)}
            />
          </div>
        ))}
    </>
  );
};

export default ConstructorIngredient;
