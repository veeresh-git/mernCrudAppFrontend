import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const { setUPdata } = useContext(updatedata);

  const history = useHistory("");

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    gender: "",
    mobile: "",
    designation: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("curdAppToken"),
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, gender, mobile, designation } = inpval;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/updateuser/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("curdAppToken"),
          },
          body: JSON.stringify({
            name,
            email,
            gender,
            mobile,
            designation,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 422) {
        alert(data);
      } else {
        history.push("/registrations");
        setUPdata(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Gender
            </label>
            <input
              type="text"
              value={inpval.gender}
              onChange={setdata}
              name="gender"
              class="form-control"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              class="form-control"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Designation
            </label>
            <input
              type="text"
              value={inpval.designation}
              onChange={setdata}
              name="designation"
              class="form-control"
            />
          </div>

          <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
