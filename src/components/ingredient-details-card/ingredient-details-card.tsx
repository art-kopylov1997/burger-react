import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentIngredientState } from "../../redux/selectors/current-ingredient-selector";
import Modal from "../modal";
import { getIngredientsState } from "../../redux/selectors/ingredient-selector";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearCurrentIngredient,
  fillCurrentIngredient,
} from "../../redux/actions/current-ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientDetailsCard = () => {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    getCurrentIngredientState
  );

  const { ingredients } = useSelector(getIngredientsState);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return ingredients.find((el: any) => el._id === id);
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
      <IngredientDetails
        name={name}
        image={image}
        calories={calories}
        proteins={proteins}
        fat={fat}
        carbohydrates={carbohydrates}
      />
    </Modal>
  );
};

export default IngredientDetailsCard;
