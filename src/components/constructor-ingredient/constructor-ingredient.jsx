import { useDrag } from "react-dnd";

import classes from "./constructor-ingredient.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorIngredient = ({ elements, deleteItem }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",

    // item: elements.find(el => el.),
    // Не могу придумать решение.
    // В item нужно передать конкретный элемент, но как его вычислить если тут приходит много данных??

    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0.5 : 1;

  return (
    <>
      {elements.map((elem) => (
        <div
          key={elem.generatedId}
          style={{ opacity }}
          className={`${classes.elementWrapper} mt-4 mb-4 mr-2`}
          ref={dragRef}
        >
          <DragIcon type="primary" />
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
