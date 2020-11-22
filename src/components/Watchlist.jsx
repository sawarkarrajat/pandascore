import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../styles/Dashboard.scss";
import "../styles/Watchlist.scss";
import { useStateValue } from "./../contexts/StateProvider";

function Watchlist() {
  const [{ selectedChampions }, dispatch] = useStateValue();
  const history = useHistory();
  const handleDashboard = (e) => {
    e.preventDefault();
    history.replace("/");
  };
  const handleRemove = (champ) => {
    dispatch({
      type: "REMOVE_CHAMPION_FROM_WATCHLIST",
      payload: champ.id,
    });
  };
  return (
    <>
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
                          variant="danger"
                          onClick={() => handleRemove(_champion)}
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
