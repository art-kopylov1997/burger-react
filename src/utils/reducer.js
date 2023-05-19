import PropTypes from "prop-types";

export const initialState = {
  total: 0,
  bunIngredient: {},
  idsIngredients: { ingredients: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "setTotal":
      return { ...state, total: action.payload };
    case "setBunIngredient":
      return { ...state, bunIngredient: action.payload };
    case "setIdsIngredients":
      return {
        ...state,
        idsIngredients: {
          ingredients: action.payload,
        },
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

reducer.propTypes = {
  initialState: {
    total: PropTypes.number,
    bunIngredient: PropTypes.object,
    idsIngredients: {
      ingredients: PropTypes.arrayOf(PropTypes.string),
    },
  },
};

export default reducer;
