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

function App() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage && !localStorage.getItem("curdAppToken"))
      history.push("/Login");
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {window && window?.location && window?.location?.pathname === "/Login" ? (
        <></>
      ) : (
        <Navbaar />
      )}
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/registrations" component={Registrations} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/view/:id" component={Details} />
      </Switch>
    </>
  );
}

export default App;
