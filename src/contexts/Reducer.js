/**
 * initial state for reducer
 */
export const initialState = {
  championsArray: [],
  selectedChampions: [],
  searchedTerm: "",
  current_Page: 0,
  sortedUsing: "name",
  sortingOrder: "desc",
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
    case "UPDATE_CHAMPIONS":
      console.log("in update");
      return {
        ...state,
        championsArray: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
