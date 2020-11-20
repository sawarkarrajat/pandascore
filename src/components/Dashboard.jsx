import React, { useEffect, useState, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { initialFetch } from "../services/apiServices";
import "../styles/Dashboard.scss";
import Userpanel from "./Userpanel";
import { useStateValue } from "./../contexts/StateProvider";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
  const [champions, setChampions] = useState([]);
  const [pageContainer, setPageContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(current_Page);
  const [totalNoOfPages, setTotalNoOfPages] = useState();

  const paginationSequence = useCallback(() => {
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
  }, [champions, totalNoOfPages]);
  const handlePagination = (index) => {
    setCurrentPage(index);
  };

  /**
   * a side effect to trigger pagination sequence to uphold cards changes
   */
  useEffect(() => {
    console.log("in useeffect pagination");
    dispatch({
      type: "UPDATE_CHAMPIONS",
      payload: champions,
    });
    paginationSequence();
  }, [champions, paginationSequence, dispatch]);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      try {
        initialFetch().then((result) => {
          console.log("value in result", result);
          setChampions(result);
          setLoading(false);
        });
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error(err);
      }
    };
    fetchData();
  }, []);

  function handleSearchText(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    console.log(searchText);
  }
  function handleSubmit() {}
  return (
    <>
      <Userpanel />
      <div className="dashboard__mainSection">
        <div className="dashboard__searchPanel">
          <Form.Group
            className="dashboard__searchInput"
            onSubmit={handleSubmit}
          >
            <Form.Control
              type="text"
              onChange={(e) => handleSearchText(e)}
              placeholder="type here to search..."
              value={searchText}
            />
          </Form.Group>
        </div>
        {loading ? (
          <p>loading</p>
        ) : (
          <div className="dashboard__displayTable">
            <table>
              <thead>
                <tr>
                  <th>image</th>
                  <th>name</th>
                  <th>armor</th>
                  <th>attack damage</th>
                  <th>attack range</th>
                  <th>hp / level</th>
                  <th>spell block</th>
                  <th>watchlist</th>
                </tr>
              </thead>
              <tbody>
                {pageContainer?.length > 0 ? (
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
                      <td>{<Button size="sm">add/remove</Button>}</td>
                    </tr>
                  ))
                ) : (
                  <p>{error}</p>
                )}
              </tbody>
            </table>
          </div>
        )}{" "}
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
                  currentPage === index ? { backgroundColor: "#4286F4" } : {}
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
