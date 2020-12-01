import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { rAction } from "../contexts/Reducer";
import "../styles/Dashboard.scss";
import "../styles/Watchlist.scss";
import { useStateValue } from "./../contexts/StateProvider";
import ChampionDetails from "./ChampionDetails";
import Userpanel from "./Userpanel";
/**
 * watchlist component
 * @property {Function}
 */
function Watchlist() {
  const [{ selectedChampions }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [clickedChampion, setClickedChampion] = useState();

  const history = useHistory();
  /**
   * toggle button to switch between dashboard and watchlist
   * @param {Event} e event
   */
  const handleDashboard = (e) => {
    e.preventDefault();
    history.push("/");
  };

  /**
   *method to remove champion from selected and watchlist
   * @param {String} id
   */
  const handleRemove = (id) => {
    dispatch({
      type: rAction.removeChampionFromWatchlist,
      payload: id,
    });
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
          <Button variant="dark" onClick={(e) => handleDashboard(e)}>
            go to Dashboard
          </Button>
        </div>
        {selectedChampions.length > 0 ? (
          <div className="dashboard__displayTable watchlist__table">
            <table>
              <thead>
                <tr>
                  <th>avatar</th>
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
                {selectedChampions.map((_champion) => (
                  <tr key={_champion.id}>
                    <td>
                      <img
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
                          variant="danger"
                          onClick={() => handleRemove(_champion.id)}
                        >
                          Remove
                        </Button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2>please select a champion from dashboard...</h2>
        )}
      </div>
    </>
  );
}

export default Watchlist;
