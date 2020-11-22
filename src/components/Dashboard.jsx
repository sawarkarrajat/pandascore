import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Badge, InputGroup } from "react-bootstrap";
import { initialFetch, searchFetch } from "../services/apiServices";
import "../styles/Dashboard.scss";
import Userpanel from "./Userpanel";
import { useStateValue } from "./../contexts/StateProvider";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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

  const paginationSequence = useCallback(() => {
    dispatch({
      type: "UPDATE_CHAMPIONS",
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

  const handlePagination = (index) => {
    setCurrentPage(index);
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: index,
    });
  };

  /**
   * a side effect to trigger pagination sequence
   */
  useEffect(() => {
    console.log("in useeffect pagination");
    paginationSequence();
  }, [champions, paginationSequence]);

  useEffect(() => {
    const fetchData = () => {
      setError("");
      setLoading(true);
      try {
        initialFetch().then((result) => {
          console.log("value in result", result);
          setChampions(result);
        });
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (championsArray.length === 0) fetchData();
  }, []);

  function handleSearchText(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    searchSequence(e.target.value);
    console.log("handle search method", searchText);
  }
  const searchSequence = (searchedText) => {
    dispatch({
      type: "UPDATE_SEARCHEDTERM",
      payload: searchedText,
    });
    try {
      setError("");
      setLoading(true);
      searchFetch(searchedText).then((results) => {
        console.log("search results", results);
        setChampions(results);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSort = (key_to_sort_by) => {
    setLoading(true);
    console.log("handlesort called", key_to_sort_by);
    const sortByKey = (a, b) => {
      let x = a[key_to_sort_by];
      let y = b[key_to_sort_by];
      if (sortingOrder === "asc") {
        console.log("sorting in asc order");
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        console.log("sorting in desc order");
        return x > y ? -1 : x < y ? 1 : 0;
      }
    };
    let sortedChampions = champions.sort(sortByKey);
    setChampions(sortedChampions);
    if (sortingOrder === "asc") {
      dispatch({
        type: "UPDATE_SORTINGORDER",
        payload: "desc",
      });
    } else {
      dispatch({
        type: "UPDATE_SORTINGORDER",
        payload: "asc",
      });
    }
    paginationSequence();
    dispatch({
      type: "UPDATE_SORTEDUSING",
      payload: key_to_sort_by,
    });
    console.log(sortedChampions);
    setLoading(false);
  };
  const handleWatchlist = () => {
    history.replace("/watchlist");
  };
  const checkAddRemove = (id) => {
    if (selectedChampions.some((item) => item.id === id)) {
      return "remove";
    } else {
      return "add";
    }
  };
  const handleAddRemove = (champ) => {
    if (selectedChampions.some((item) => item.id === champ.id)) {
      dispatch({
        type: "REMOVE_CHAMPION_FROM_WATCHLIST",
        payload: champ.id,
      });
    } else {
      dispatch({
        type: "ADD_CHAMPION_TO_WATCHLIST",
        payload: champ,
      });
    }
  };
  const handleClearText = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_SEARCHEDTERM",
      payload: "",
    });
    setSearchText("");
  };
  return (
    <>
      <Userpanel />
      <div className="dashboard__mainSection">
        <div className="dashboard__searchPanel">
          <Button variant="dark" onClick={handleWatchlist}>
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
                <Button
                  variant="outline-secondary"
                  onClick={(e) => handleClearText(e)}
                >
                  clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
        {loading ? (
          <h2>loading...</h2>
        ) : pageContainer.length > 0 ? (
          <div className="dashboard__displayTable">
            <table>
              <thead>
                <tr>
                  <th>avatar</th>
                  <th
                    style={{ color: sortedUsing === "name" ? "#002bff" : "" }}
                    onClick={() => handleSort("name")}
                  >
                    name
                  </th>
                  <th
                    style={{ color: sortedUsing === "armor" ? "#002bff" : "" }}
                    onClick={() => handleSort("armor")}
                  >
                    armor
                  </th>
                  <th
                    style={{
                      color: sortedUsing === "attackdamage" ? "#002bff" : "",
                    }}
                    onClick={() => handleSort("attackdamage")}
                  >
                    attack damage
                  </th>
                  <th
                    style={{
                      color: sortedUsing === "attackrange" ? "#002bff" : "",
                    }}
                    onClick={() => handleSort("attackrange")}
                  >
                    attack range
                  </th>
                  <th
                    style={{
                      color: sortedUsing === "hpperlevel" ? "#002bff" : "",
                    }}
                    onClick={() => handleSort("hpperlevel")}
                  >
                    hp / level
                  </th>
                  <th
                    style={{
                      color: sortedUsing === "spellblock" ? "#002bff" : "",
                    }}
                    onClick={() => handleSort("spellblock")}
                  >
                    spell block
                  </th>
                  <th>watchlist</th>
                </tr>
              </thead>
              <tbody>
                {pageContainer[currentPage]?.length > 0 ? (
                  pageContainer[currentPage].map((_champion) => (
                    <tr key={_champion.id}>
                      <td>
                        <img
                          src={_champion.image_url}
                          alt={_champion.name}
                          width="20px"
                          height="20px"
                        />
                      </td>
                      <td>{_champion.name}</td>
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
          <h2>nothing found...</h2>
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
