import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";

const Registrations = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [sort, setSort] = useState(false);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("curdAppToken"),
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setUserdata(data);
        console.log("get data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("curdAppToken"),
        },
      }
    );

    const deletedata = await res2.json();

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      setDLTdata(deletedata);
      getdata();
    }
  };

  console.log(
    getuserdata
      .filter((item) => {
        if (searchText.trim()) {
          return item.name.includes(searchText);
        }
        return true;
      })
      .sort((a, b) => a.name.toUpperCase() - b.name.toUpperCase()),
    sort
  );

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div class="">
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setsearchText(e.target.value);
                }}
                class="form-control"
                placeholder="Search By Name..!"
              />
            </div>
            <div class="">
              <input
                type="checkbox"
                checked={sort}
                onChange={(e) => {
                  setSort(e.target.checked);
                }}
                class="form-check-input mx-2"
              />
              Sort by Name?
            </div>
            <div className="add_btn mt-2 mb-2">
              <NavLink to="/register" className="btn btn-primary">
                Add data
              </NavLink>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata
                .filter((item) => {
                  if (searchText.trim()) {
                    return item.name.includes(searchText);
                  }
                  return true;
                })
                .sort((a, b) => {
                  if (sort) {
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  }

                  // names must be equal
                  return 0;
                })
                .map((element) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{element._id}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.designation}</td>
                        <td>{element.mobile}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`view/${element._id}`}>
                            {" "}
                            <button className="btn btn-success">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>
                          <NavLink to={`edit/${element._id}`}>
                            {" "}
                            <button className="btn btn-primary">
                              <CreateIcon />
                            </button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteuser(element._id)}
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Registrations;
