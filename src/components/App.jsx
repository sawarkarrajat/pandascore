import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.scss";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">pandascore</header>
      <AuthProvider>
        <Container
          id="main-container"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <SignUp />
          </div>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
