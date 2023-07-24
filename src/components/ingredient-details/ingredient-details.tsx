import classes from "./ingredient-details.module.css";
import Detail from "../UI/detaile-ingredient";
import { FC } from "react";

interface IIngredientDetails {
  name: string;
  image: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

const IngredientDetails: FC<IIngredientDetails> = ({
  name,
  image,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <>
      <div className={classes.wrapperIngredientImage}>
        <img className={classes.ingredientImage} src={image} alt={name} />
      </div>

      <div className="mt-4">
        <p className={`${classes.ingredientName} text text_type_main-medium`}>
          {name}
        </p>
      </div>

      <div className={`${classes.blockDetails} mt-8`}>
        <Detail header="Калории, ккал" value={calories} />
        <Detail header="Белки, г" value={proteins} />
        <Detail header="Жиры, г" value={fat} />
        <Detail header="Углеводы, г" value={carbohydrates} />
      </div>
    </>
  );
};

export default IngredientDetails;
