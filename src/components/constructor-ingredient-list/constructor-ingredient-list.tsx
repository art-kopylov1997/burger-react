import { useDispatch } from "react-redux";
import { FC, useCallback } from "react";
import { updateListConstructor } from "../../redux/action-creators/ingredients-constructor-creators";
import ConstructorElementWrapper from "../constructor-element-wrapper";
import { IIngredient } from "../../utils/interfaces";

interface IConstructorIngredientList {
  ingredients: IIngredient[];
  deleteItem: (id: string) => void;
}

const ConstructorIngredientList: FC<IConstructorIngredientList> = ({
  ingredients,
  deleteItem,
}) => {
  const dispatch = useDispatch();

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingredients[dragIndex];
      const newCards = [...ingredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch(updateListConstructor(newCards));
    },
    [ingredients, dispatch]
  );

  return (
    <>
      {ingredients.map((item, index) => (
        <ConstructorElementWrapper
          key={item.dragId}
          index={index}
          item={item}
          moveCard={moveCard}
          deleteItem={deleteItem}
        />
      ))}
    </>
  );
};

export default ConstructorIngredientList;
