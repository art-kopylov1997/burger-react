import React, {useCallback, useMemo} from "react";
import classes from "./ingredient-details.module.css";
import ingredientPropTypes from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentIngredientState} from "../../redux/selectors/current-ingredient-selector";
import Detail from "../UI/detaile-ingredient";
import Modal from "../modal";
import {Loader} from "../UI/loader/loader";
import {getIngredientsState} from "../../redux/selectors/ingredient-selector";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {clearCurrentIngredient, fillCurrentIngredient,} from "../../redux/action-creators/current-ingredient-creators";

const IngredientDetails = () => {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    getCurrentIngredientState
  );
  const { ingredientsRequest, ingredientsFailed, ingredients } =
    useSelector(getIngredientsState);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return ingredients.find((el) => el._id === id);
  }, [ingredients]);

  React.useEffect(() => {
    ingredient && dispatch(fillCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  const closeModal = useCallback(() => {
    location?.state?.background && navigate(location.state.background);
    dispatch(clearCurrentIngredient());
  }, [location.state, navigate]);

  return (
    <Modal title="Детали ингредиента" closeModal={closeModal}>
      {ingredientsRequest ? (
        <Loader size="huge" />
      ) : ingredientsFailed ? (
        <p className={classes.errorText}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <>
          <div className={classes.wrapperIngredientImage}>
            <img className={classes.ingredientImage} src={image} alt={name} />
          </div>

          <div className="mt-4">
            <p
              className={`${classes.ingredientName} text text_type_main-medium`}
            >
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
      )}
    </Modal>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

export default IngredientDetails;
