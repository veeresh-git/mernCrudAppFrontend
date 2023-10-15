import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { NavLink, useParams, useHistory } from "react-router-dom";

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const history = useHistory();

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
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteuser = async (id) => {
    try {
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
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
        console.log("error");
      } else {
        console.log("user deleted");
        history.push("/registrations");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-3">
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn mt-2">
            <NavLink to={`/edit/${getuserdata._id}`}>
              {" "}
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Gender: <span>{getuserdata.gender}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Designation: <span>{getuserdata.designation}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                mobile: <span>+91 {getuserdata.mobile}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
