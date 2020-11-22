/**
 * initial state for reducer
 */
export const initialState = {
  championsArray: [],
  selectedChampions: [],
  searchedTerm: "",
  current_Page: 0,
  sortedUsing: "",
  sortingOrder: "asc",
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
      console.log("in update champions");
      return {
        ...state,
        championsArray: action.payload,
      };
    case "UPDATE_SEARCHEDTERM":
      console.log("in searchedTerm");
      return {
        ...state,
        searchedTerm: action.payload,
      };
    case "UPDATE_SORTEDUSING":
      console.log("in UPDATE_SORTEDUSING");
      return {
        ...state,
        sortedUsing: action.payload,
      };
    case "UPDATE_SORTINGORDER":
      console.log("in UPDATE_SORTINGORDER");
      return {
        ...state,
        sortingOrder: action.payload,
      };
    case "UPDATE_CURRENTPAGE":
      console.log("in UPDATE_CURRENTPAGE");
      return {
        ...state,
        current_Page: action.payload,
      };
    case "REMOVE_CHAMPION_FROM_WATCHLIST":
      console.log("in REMOVE_CHAMPION_FROM_WATCHLIST");
      return {
        ...state,
        selectedChampions: state.selectedChampions.filter(
          (champion) => champion.id !== action.payload
        ),
      };
    case "ADD_CHAMPION_TO_WATCHLIST":
      console.log("in ADD_CHAMPION_TO_WATCHLIST");
      return {
        ...state,
        selectedChampions: [...state.selectedChampions, action.payload],
      };

    default:
      return state;
  }
};

export default Reducer;
