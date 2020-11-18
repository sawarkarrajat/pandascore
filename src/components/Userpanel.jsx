import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../styles/Dashboard.scss";

export default function Userpanel() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="dashboard__userInfo d-flex align-items-center justify-content-center">
        <strong>{currentUser.email}</strong>
        <Link to="/update-profile" className="btn btn-light btn-sm ml-2 mr-2">
          Update Profile
        </Link>
        <Button variant="light" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
