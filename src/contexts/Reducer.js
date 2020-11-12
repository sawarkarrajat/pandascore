/**
 * initial state for reducer
 */
export const initialState = {
  brandFiltersArray: [],
  tagFiltersArray: [],
  clearFilter: false,
  priceMin: null,
  priceMax: null,
  rating: null,
  clicked: {},
};
/**
 * a Reducer to maintain global state with the help of
 * actions
 *
 * @param {Object} state - a global state
 * @param {Object} action - an action declaring the type of process to perform
 */
const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BRAND_FILTER":
      return {
        ...state,
        brandFiltersArray: [...state.brandFiltersArray, action.item.label],
      };

    case "REMOVE_FROM_BRAND_FILTER":
      return {
        ...state,
        brandFiltersArray: [
          ...state.brandFiltersArray.filter(
            (element) => element !== action.item.label
          ),
        ],
      };
    default:
      return state;
  }
};

export default Reducer;
