import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [wrongcred, setWrongcred] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(
          "http://localhost:3001/signin",
          values
        );
        window.localStorage.setItem("myapptoken", loginData.data.token);
        navigate("/registration");
      } catch (error) {
        console.log(error);
        setWrongcred(true);
      }
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col d-none d-lg-block form-label-top big">
          <div className="col text-md-start align-self-center">
            <div className="content row">
              <div className="col-6">
                {" "}
                <h2 className="h2cls mt-3 text-primary bold">Sign In</h2>
              </div>
              <div className="col-6 mt-3 text-right">
                {" "}
                <span className="bold">If You are New user </span>
                <Link to={"/"}>
                  {" "}
                  <button className="btn btn-primary m-2">
                    {" "}
                    Register here
                  </button>
                </Link>
              </div>
              <hr className="seprator left" />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="row gy-3">
                <div className="form-group">
                  <div className="form-control email">
                    <label>
                      Email
                      <span
                        aria-required="true"
                        className="required"
                        title="Required"
                      >
                        *
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      required="required"
                      tabindex="3"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control password">
                    <label>
                      Password
                      <span
                        aria-required="true"
                        className="required"
                        title="Required"
                      >
                        *
                      </span>
                    </label>
                    <input
                      data-val="true"
                      data-val-length="The Password must be at least 8 characters long."
                      data-val-length-max="200"
                      data-val-length-min="8"
                      data-val-required="The Password field is required."
                      id="password"
                      name="password"
                      required="required"
                      tabindex="3"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div>
                  {wrongcred ? (
                    <p className="text-center" style={{ color: "red" }}>
                      Please Enter valid Credentials
                    </p>
                  ) : null}
                  <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-success">
                      Sign in
                    </button>
                  </div>
                  <div className="col-md-12 text-center py-3">
                    <a href="/Recovery">Forgot Password?</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
