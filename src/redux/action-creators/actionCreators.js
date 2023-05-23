import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_DETAILS,
  DEL_INGREDIENTS_DETAILS,
  SET_ORDER_NUMBER,
} from "../action-types/action-types";
import getIngredientsRequest from "../../services/api/getIngredientsRequest";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
}

export function setIngredientsConstructor(payload) {
  return function (dispatch) {
    dispatch({
      type: SET_INGREDIENTS_CONSTRUCTOR,
      payload,
    });
  };
}

export function addIngredientDetails(payload) {
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENTS_DETAILS,
      payload,
    });
  };
}

export function delIngredientDetails() {
  return function (dispatch) {
    dispatch({
      type: DEL_INGREDIENTS_DETAILS,
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
