import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [inpval, setINP] = useState({
    userName: "",
    password: "",
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

    const { userName, password } = inpval;
    if(!userName||!password) alert("Please enter both Username and Password!")
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        alert("error");
      } else {
        localStorage.setItem("curdAppToken", data?.data?.token);
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="fs-3 mt-3 text-center">Admin Login</div>
      <form className="mt-4 d-flex justify-content-center">
        <div className="w-50">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Username
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="userName"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="password"
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
export default Login;
