import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.scss";
import Dashboard from "./Dashboard";
import Watchlist from "./Watchlist";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { StateProvider } from "../contexts/StateProvider";
import reducer, { initialState } from "../contexts/Reducer";

function App() {
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
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
