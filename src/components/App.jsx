import { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.scss";
import Dashboard from "./Dashboard";
import Watchlist from "./Watchlist";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { StateProvider } from "../contexts/StateProvider";
import reducer, { initialState } from "../contexts/Reducer";
/**
 * @file App.js is the root file for this app containing all the routes and paths
 * @author Rajat Sawarkar
 */
/**
 * @property {Function} App the root method of the application containing routes and header
 */
function App() {
  useEffect(() => {
    console.log("in effect set intial");
    if (localStorage.getItem("selectedChampions")) {
      initialState.selectedChampions = JSON.parse(
        localStorage.getItem("selectedChampions")
      );
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">pandascore</header>
      <Router>
        <Switch>
          <AuthProvider>
            <StateProvider initialState={initialState} reducer={reducer}>
              <PrivateRoute path="/" exact component={Dashboard} />
              <PrivateRoute path="/Watchlist" component={Watchlist} />
            </StateProvider>
            <PublicRoute path="/signup" component={SignUp} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
