import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import Form from "./Form";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Signin from "./Signin";
import Home from "./Home";
import { gapi } from "gapi-script";

function App() {
  gapi.load("client: auth2", () => {
    gapi.client.init({
      clientId:
        "process.env.647724450623-kddudgv0vsu0p3ee4hj7u67anps5i2s5.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
