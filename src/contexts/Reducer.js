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
export const rAction = {
  updateChampions: "UPDATE_CHAMPIONS",
  updateSearchedTerm: "UPDATE_SEARCHEDTERM",
  updateSortedUsing: "UPDATE_SORTEDUSING",
  updateSortingOrder: "UPDATE_SORTINGORDER",
  updateCurrentPage: "UPDATE_CURRENTPAGE",
  removeChampionFromWatchlist: "REMOVE_CHAMPION_FROM_WATCHLIST",
  addChampionToWatchlist: "ADD_CHAMPION_TO_WATCHLIST",
  logout: "LOGOUT",
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
      return {
        ...state,
        championsArray: action.payload,
      };
    case "UPDATE_SEARCHEDTERM":
      return {
        ...state,
        searchedTerm: action.payload,
      };
    case "UPDATE_SORTEDUSING":
      return {
        ...state,
        sortedUsing: action.payload,
      };
    case "UPDATE_SORTINGORDER":
      return {
        ...state,
        sortingOrder: action.payload,
      };
    case "UPDATE_CURRENTPAGE":
      return {
        ...state,
        current_Page: action.payload,
      };
    case "REMOVE_CHAMPION_FROM_WATCHLIST":
      return {
        ...state,
        selectedChampions: state.selectedChampions.filter(
          (champion) => champion.id !== action.payload
        ),
      };
    case "ADD_CHAMPION_TO_WATCHLIST":
      return {
        ...state,
        selectedChampions: [...state.selectedChampions, action.payload],
      };
    case "LOGOUT":
      return {
        ...initialState,
        selectedChampions: [],
      };

    default:
      return state;
  }
};

export default Reducer;
