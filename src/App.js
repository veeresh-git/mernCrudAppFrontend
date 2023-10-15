import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import Registrations from "./components/Registrations";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "./components/Dashboard";

const NavbarWrapper = (props) => {
  return (
    <div>
      <Navbaar />
      {props?.children}
    </div>
  );
};

function App() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage && !localStorage.getItem("curdAppToken"))
      history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/Dashboard"
        component={() => (
          <NavbarWrapper>
            <Dashboard />
          </NavbarWrapper>
        )}
      />
      <Route
        exact
        path="/registrations"
        component={() => (
          <NavbarWrapper>
            <Registrations />
          </NavbarWrapper>
        )}
      />
      <Route
        exact
        path="/register"
        component={() => (
          <NavbarWrapper>
            <Register />
          </NavbarWrapper>
        )}
      />
      <Route
        exact
        path="/edit/:id"
        component={() => (
          <NavbarWrapper>
            <Edit />
          </NavbarWrapper>
        )}
      />
      <Route
        exact
        path="/view/:id"
        component={() => (
          <NavbarWrapper>
            <Details />
          </NavbarWrapper>
        )}
      />
      <Route path="*" component={Login} />
    </Switch>
  );
}

export default App;
