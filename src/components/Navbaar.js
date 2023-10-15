import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbaar = () => {
  const history = useHistory();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/Dashboard">
            CRUD APP
          </NavLink>
          <div className="d-flex">
            <div className="mx-4">
              <NavLink className="navbar-item" to="/Dashboard">
                Home
              </NavLink>
            </div>
            <div>
              <NavLink className="navbar-item" to="/registrations">
                Registrations
              </NavLink>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div> */}
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;
