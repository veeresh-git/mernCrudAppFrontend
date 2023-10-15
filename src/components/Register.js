import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {
  const { setUdata } = useContext(adddata);

  const history = useHistory();

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

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, gender, mobile, designation } = inpval;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/register`,
        {
          method: "POST",
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
        console.log("error ", data);
        alert(data);
      } else {
        history.push("/registrations");
        setUdata(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="fs-3 mt-3 text-center">Add User</div>
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
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Gender
            </label>
            <input
              type="text"
              value={inpval.age}
              onChange={setdata}
              name="gender"
              class="form-control"
              id="exampleInputPassword1"
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
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Designation
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="designation"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={addinpdata} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
