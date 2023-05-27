import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_CONSTRUCTOR,
  DEL_INGREDIENT_CONSTRUCTOR,
  FILL_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  SET_ORDER_NUMBER,
} from "../action-types/action-types";
import getIngredientsRequest from "../../services/api/getIngredientsRequest";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest().then((res) => {
      const productId = 0;
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
          productId,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
}

export function addIngredientConstructor(payload) {
  return function (dispatch) {
    if (payload.type === "bun") {
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          ...payload,
          elementProperty: "top",
        },
      });
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: {
          ...payload,
          elementProperty: "bottom",
        },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: { ...payload, elementProperty: "draggable" },
      });
    }
  };
}

export function delIngredientConstructor(id) {
  return function (dispatch) {
    dispatch({
      type: DEL_INGREDIENT_CONSTRUCTOR,
      id,
    });
  };
}

export function fillCurrentIngredient(payload) {
  return function (dispatch) {
    dispatch({
      type: FILL_CURRENT_INGREDIENT,
      payload,
    });
  };
}

export function clearCurrentIngredient() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_CURRENT_INGREDIENT,
    });
  };
}

export function setOrderNumber(payload) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER_NUMBER,
      payload,
    });
  };
}
