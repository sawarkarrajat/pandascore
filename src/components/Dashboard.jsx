import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../styles/Dashboard.scss";
import Userpanel from "./Userpanel";

export default function Dashboard() {
  const [searchText, setSearchText] = useState("");
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
          <Form.Group onSubmit={handleSubmit}>
            <Form.Control
              className="dashboard__searchInput"
              type="text"
              onChange={(e) => handleSearchText(e)}
              placeholder="type here to search..."
              value={searchText}
            />
          </Form.Group>
        </div>
      </div>
    </>
  );
}
