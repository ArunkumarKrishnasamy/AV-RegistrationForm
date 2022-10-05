import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [users, setUsers] = useState([]);
  const [listusers, setlistusers] = useState(false);

  let navigate = useNavigate();
  function handleusers() {
    setlistusers(!listusers);
  }
  let fetchData = async () => {
    try {
      let userData = await axios.get("http://localhost:3001/registration", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setUsers(userData.data);
      console.log(users);
    } catch (error) {
      console.log(error);
      alert("fetchData went wrong");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlelogout = () => {
    window.localStorage.removeItem("myapptoken");
    navigate("/");
  };
  return (
    <div className="container userlist">
      <h1 className="text-center align-middle mt-3 ">
        User Logged in succesfully
      </h1>
      <div className="row">
        <div className="col-10">
          <button
            className="btn btn-primary btn-lg text-center"
            onClick={handleusers}
          >
            {" "}
            See all Registered Users
          </button>
        </div>
        <div className="col-2 justify-content-end">
          <input
            type={"submit"}
            className="btn btn-danger m-2"
            value={"Logout"}
            onClick={handlelogout}
          ></input>
        </div>
      </div>
      {listusers ? (
        <table class="table table-striped table-responsive">
          <thead>
            <tr>
              <th className="col-2" scope="col">
                #
              </th>
              <th className="col-5">Name</th>
              <th className="col-5">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{user.ContactName}</td>
                  <td>{user.Email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Registration;
