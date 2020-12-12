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
  removeAllChampionsFromWatchlist: "REMOVE_ALL_CHAMPIONS_FROM_WATCHLIST",
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
    case rAction.updateChampions:
      return {
        ...state,
        championsArray: action.payload,
      };
    case rAction.updateSearchedTerm:
      return {
        ...state,
        searchedTerm: action.payload,
      };
    case rAction.updateSortedUsing:
      return {
        ...state,
        sortedUsing: action.payload,
      };
    case rAction.updateSortingOrder:
      return {
        ...state,
        sortingOrder: action.payload,
      };
    case rAction.updateCurrentPage:
      return {
        ...state,
        current_Page: action.payload,
      };
    case rAction.removeChampionFromWatchlist:
      return {
        ...state,
        selectedChampions: state.selectedChampions.filter(
          (champion) => champion.id !== action.payload
        ),
      };
    case rAction.removeAllChampionsFromWatchlist:
      return {
        ...state,
        selectedChampions:[],
      };
    case rAction.addChampionToWatchlist:
      return {
        ...state,
        selectedChampions: [...state.selectedChampions, action.payload],
      };
    case rAction.logout:
      return {
        ...initialState,
        selectedChampions: [],
      };

    default:
      return state;
  }
};

export default Reducer;
