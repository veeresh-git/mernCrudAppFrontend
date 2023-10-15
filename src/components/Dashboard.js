import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  const history = useHistory("");
  const [getuserdata, setUserdata] = useState([]);

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

  console.log(getuserdata, "getuserdata");

  return (
    <div className="container">
      <div className="fs-3 mt-3 text-center">Welcome to admin panel!</div>
      <div
        className="card bg-success p-3 mt-2 w-20 text-white fw-bold"
        onClick={() => history.push("/registrations")}
      >
        Registrations - {getuserdata?.length || 0}
      </div>
    </div>
  );
};

export default Dashboard;
