import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Badge, InputGroup, Spinner } from "react-bootstrap";
import { initialFetch, searchFetch } from "../services/apiServices";
import "../styles/Dashboard.scss";
import Userpanel from "./Userpanel";
import { useStateValue } from "./../contexts/StateProvider";
import ChampionDetails from "./ChampionDetails";
import { rAction } from "../contexts/Reducer";
import upIcon from "../assets/up.svg";
import downIcon from "../assets/down.svg";
import sortIcon from "../assets/sort.svg";
export default function Dashboard() {
  const [initialResult, setInitialResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [clickedChampion, setClickedChampion] = useState();
  const [
    {
      championsArray,
      selectedChampions,
      searchedTerm,
      current_Page,
      sortedUsing,
      sortingOrder,
    },
    dispatch,
  ] = useStateValue();
  const [searchText, setSearchText] = useState(searchedTerm);
  const [champions, setChampions] = useState(championsArray);
  const [pageContainer, setPageContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(current_Page);
  const [totalNoOfPages, setTotalNoOfPages] = useState();
  const tableHeaders = {
    name: "name",
    armor: "armor",
    attackdamage: "attack damage",
    attackrange: "attack range",
    hpperlevel: " hp / level",
    spellblock: "spell block",
  };
  /**
   * a method which updates the champions in context as well as
   * calculates pagination and puts data in container
   */
  const paginationSequence = useCallback(() => {
    dispatch({
      type: rAction.updateChampions,
      payload: champions,
    });
    setTotalNoOfPages(Math.ceil(champions.length / 10));
    let itemsArray = [];
    var cursor = 0;
    let tempContainer = [];
    setPageContainer([]);
    for (let index = 0; index < totalNoOfPages; index++) {
      for (let item = 0; item < 10; item++) {
        if (champions[cursor] !== undefined) {
          itemsArray.push(champions[cursor]);
          cursor++;
        } else {
          continue;
        }
      }
      tempContainer.push(itemsArray);
      itemsArray = [];
    }
    setPageContainer(tempContainer);
  }, [champions, totalNoOfPages, dispatch]);

  /**
   * a method to switch page number and also switches container
   * current array and updates current page in context.
   * @param {Number} index page index in container
   */
  const handlePagination = (index) => {
    setCurrentPage(index);
    dispatch({
      type: rAction.updateCurrentPage,
      payload: index,
    });
  };

  /**
   * used to fetch data on initial load
   * @property {Function}
   */
  const fetchData = useCallback(() => {
    if (championsArray.length === 0) {
      setError("");
      setLoading(true);
      try {
        initialFetch().then((result) => {
          setChampions(result);
          setInitialResult(result);
        });
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [championsArray.length]);

  /**
   * a side effect to trigger pagination sequence on
   * champion data alteration
   */
  useEffect(() => {
    paginationSequence();
  }, [champions, paginationSequence]);

  /**
   * a side effect used to fetch data on initial app load.
   */
  useEffect(() => {
    //initial fetch to display champions in app
    fetchData();
  }, [fetchData]);

  /**
   * updater function for search input and initiates side effect
   * for fetching champions data.
   * @param {Event} e
   */
  function handleSearchText(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    searchSequence(e.target.value);
  }

  /**
   * sequence method triggered to perform search sequence leading to
   * updation of data in context and calling fetch for current search text.
   * @param {String} searchedText -searched text in search input
   */
  const searchSequence = (searchedText) => {
    dispatch({
      type: rAction.updateSearchedTerm,
      payload: searchedText,
    });
    try {
      setError("");
      setLoading(true);
      searchFetch(searchedText).then((results) => {
        setChampions(results);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * a sorting method that takes json object key as string to
   * sort the json object array on basis of sort order.
   * @param {String} key_to_sort_by -json key to sort by
   * @returns {Array} championsArray - a json array of champions
   */
  const handleSort = (key_to_sort_by) => {
    setLoading(true);
    //method that sorts champions
    const sortByKey = (a, b) => {
      let x = a[key_to_sort_by];
      let y = b[key_to_sort_by];
      if (sortingOrder === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    };
    const sortedChampions = champions.sort(sortByKey);
    setChampions(sortedChampions);
    if (sortingOrder === "asc") {
      dispatch({
        type: rAction.updateSortingOrder,
        payload: "desc",
      });
    } else {
      dispatch({
        type: rAction.updateSortingOrder,
        payload: "asc",
      });
    }
    paginationSequence();
    dispatch({
      type: rAction.updateSortedUsing,
      payload: key_to_sort_by,
    });
    setLoading(false);
  };

  /**
   * used to switch between dashboard to watchlist.
   */
  const handleWatchlist = () => {
    history.push("/watchlist");
  };

  /**
   * checks if the champion exists in the context of selected champions.
   * @param {String} id - champion id
   * @returns {string} -add/remove
   */
  const checkAddRemove = (id) => {
    if (selectedChampions.some((item) => item.id === id)) {
      return "remove";
    } else {
      return "add";
    }
  };

  /**
   * adds or removes champion on the basis of its status in context.
   * @param {Object} champ -champion object with champion details in json
   */
  const handleAddRemove = (champ) => {
    if (selectedChampions.some((item) => item.id === champ.id)) {
      dispatch({
        type: rAction.removeChampionFromWatchlist,
        payload: champ.id,
      });
    } else {
      dispatch({
        type: rAction.addChampionToWatchlist,
        payload: champ,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "selectedChampions",
      JSON.stringify(selectedChampions)
    );
  }, [selectedChampions]);

  /**
   * handles clearing of text search input and dispatches
   * an action to clear context state of searched text.
   * @param {Event} e -event object
   */
  const handleClearText = (e) => {
    e.preventDefault();
    dispatch({
      type: rAction.updateSearchedTerm,
      payload: "",
    });
    setChampions(initialResult);
    setSearchText("");
  };

  /**
   * method to open dialogue and push champions details as prop
   * @param {Event} e
   * @param {Object} champ champion with details in json
   */
  const handleChampionDetails = (e, champ) => {
    e.preventDefault();
    setOpen(true);
    setClickedChampion(champ);
  };
  /**
   * decorates table header according to its state
   * @param {String} tag header tag
   * @returns {Object} style
   */
  const checkSortedUsing = (tag) => {
    let style = { color: null };
    if (sortedUsing === tag) {
      style.color = "#002bff";
      return style;
    } else {
      return style;
    }
  };
  const showIcon = (tag) => {
    if (sortedUsing === tag) {
      if (sortingOrder === "asc") {
        return <img src={downIcon} alt="downicon" width="10px" />;
      } else {
        return <img src={upIcon} alt="upicon" width="10px" />;
      }
    } else {
      return <img src={sortIcon} alt="sorticon" width="10px" />;
    }
  };
  return (
    <>
      <ChampionDetails
        open={open}
        onClose={() => {
          setOpen(false);
          setClickedChampion({});
        }}
        champion={clickedChampion}
      />
      <Userpanel />
      <div className="dashboard__mainSection">
        <div className="dashboard__searchPanel">
          <Button
            variant="dark"
            onClick={handleWatchlist}
            disabled={selectedChampions?.length === 0}
          >
            go to Watchlist&nbsp;
            <Badge variant="light">{selectedChampions.length}</Badge>
          </Button>
          <Form.Group className="dashboard__searchInput">
            <InputGroup>
              <Form.Control
                type="text"
                onChange={(e) => handleSearchText(e)}
                placeholder="type here to search..."
                value={searchText}
              />
              <InputGroup.Append>
                <Button variant="dark" onClick={(e) => handleClearText(e)}>
                  clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
        {loading ? (
          <h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            loading...
          </h2>
        ) : pageContainer.length > 0 ? (
          <div className="dashboard__displayTable">
            <table>
              <thead>
                <tr>
                  <th>avatar</th>
                  {Object.entries(tableHeaders).map(([key, value]) => (
                    <th
                      key={key}
                      style={checkSortedUsing(key)}
                      onClick={() => handleSort(key)}
                    >
                      {value} {showIcon(key)}
                    </th>
                  ))}
                  <th>watchlist</th>
                </tr>
              </thead>
              <tbody>
                {pageContainer[currentPage]?.length > 0 ? (
                  pageContainer[currentPage].map((_champion) => (
                    <tr key={_champion.id}>
                      <td>
                        <img
                          onClick={(e) => handleChampionDetails(e, _champion)}
                          src={_champion.image_url}
                          alt={_champion.name}
                          width="30px"
                          height="30px"
                        />
                      </td>
                      <td onClick={(e) => handleChampionDetails(e, _champion)}>
                        {_champion.name}
                      </td>
                      <td>{_champion.armor}</td>
                      <td>{_champion.attackdamage}</td>
                      <td>{_champion.attackrange}</td>
                      <td>{_champion.hpperlevel}</td>
                      <td>{_champion.spellblock}</td>
                      <td>
                        {
                          <Button
                            size="sm"
                            variant={
                              checkAddRemove(_champion.id) === "add"
                                ? "primary"
                                : "danger"
                            }
                            onClick={() => handleAddRemove(_champion)}
                          >
                            {checkAddRemove(_champion.id)}
                          </Button>
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{error}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {pageContainer.length > 1 && (
          <div className="dashboard__pagination">
            <Button
              id="btn_first"
              variant="primary"
              size="sm"
              onClick={() => {
                handlePagination(0);
              }}
            >
              first
            </Button>

            {pageContainer.map((item, index) => (
              <Button
                className="pagination__button"
                key={index}
                id={"btn_" + index}
                variant="light"
                size="sm"
                onClick={() => {
                  handlePagination(index);
                }}
                style={
                  currentPage === index ? { backgroundColor: "#b9dfff" } : {}
                }
              >
                {index + 1}
              </Button>
            ))}

            <Button
              id="btn_last"
              variant="primary"
              size="sm"
              onClick={() => {
                handlePagination(totalNoOfPages - 1);
              }}
            >
              last
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
