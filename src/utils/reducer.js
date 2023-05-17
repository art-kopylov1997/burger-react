import PropTypes from "prop-types";

export const initialState = {
  total: 0,
  idsIngredients: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setTotal":
      return { ...state, total: action.payload };
    case "setIdsIngredients":
      return { ...state, idsIngredients: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

reducer.propTypes = {
  initialState: {
    total: PropTypes.number,
    idsIngredients: PropTypes.arrayOf(PropTypes.string),
  },
};

export default reducer;
