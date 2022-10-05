import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import "./Form.css";
import { useFormik } from "formik";
function Form() {
  const [isChecked, setisChecked] = useState(false);
  const navigate = useNavigate();
  let handleCheckbox = () => {
    setisChecked(!isChecked);
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      ContactName: "",
      Password: "",
      ConfirmPassword: "",
      checkbox: isChecked,
    },
    validate: async (values) => {
      let errors = {};

      if (!values.Email) {
        errors.Email = "Email Address field is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
      ) {
        errors.Email = "Please Enter a valid Email Address";
      }

      if (!values.ContactName) {
        errors.ContactName = "Please Enter Your Full Name";
      }

      if (!values.Password) {
        errors.Password = "Please Enter valid Password";
      } else if (values.Password !== values.ConfirmPassword) {
        errors.ConfirmPassword = "Password and Confirm Password does not match";
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "Please Re-Enter your Password";
      }
      // if (values.checkbox) {
      //   errors.checkbox = "Please tick the checkbox";
      // }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        // let values = Object.entries(data).filter(
        //   ([key, value]) => key !== "ConfirmPassword"
        // );
        await axios.post("http://localhost:3001/registration", values);
        // fetchData();
        alert("Account created succesfully");
        formik.resetForm();
        navigate("/signin");
      } catch (error) {
        console.log(error);
        alert("postData went wrong");
      }
    },
  });
  return (
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <div className="left-block container m-3 ">
        <img src="" className="logo mb-3" alt="ADEPT-VIEW" />
        <div
          className="content-container main-content container create-account-step-block"
          id="divCreateAccountForm"
        >
          <div className="main-content-wrapper">
            <h4 className="title mb-3 fw-bold">Create your account</h4>
          </div>
        </div>
        <div className="form-label-top big">
          <form
            className="registration-form"
            action="/registration"
            noValidate="noValidate"
            onSubmit={formik.handleSubmit}
          >
            {" "}
            <div className="form-group">
              <div className="form-control">
                <input
                  id="Email"
                  name="Email"
                  required="required"
                  tabIndex="1"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                  onBlur={formik.handleBlur}
                />
                <label>
                  Email Address
                  <span
                    aria-required="true"
                    className="required"
                    title="Required"
                  >
                    *
                  </span>
                </label>
                <span style={{ color: "red" }}>
                  {formik.touched.Email && formik.errors.Email ? (
                    <div>{formik.errors.Email}</div>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <input
                  id="ContactName"
                  name="ContactName"
                  required="required"
                  tabindex="2"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.ContactName}
                  onBlur={formik.handleBlur}
                />
                <label>
                  Your Full Name
                  <span
                    aria-required="true"
                    className="required"
                    title="Required"
                  >
                    *
                  </span>
                </label>
                <span style={{ color: "red" }}>
                  {" "}
                  {formik.touched.ContactName && formik.errors.ContactName ? (
                    <div>{formik.errors.ContactName}</div>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control password">
                <input
                  data-val="true"
                  data-val-length="The Password must be at least 8 characters long."
                  data-val-length-max="200"
                  data-val-length-min="8"
                  data-val-required="The Password field is required."
                  id="Password"
                  name="Password"
                  required="required"
                  tabindex="3"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.Password}
                  onBlur={formik.handleBlur}
                />
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
                <span style={{ color: "red" }}>
                  {" "}
                  {formik.touched.Password && formik.errors.Password ? (
                    <div>{formik.errors.Password}</div>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control password">
                <input
                  data-val="true"
                  data-val-equalto="The password and confirmation password do not match."
                  data-val-equalto-other="*.Password"
                  data-val-required="The Confirm password field is required."
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  required="required"
                  tabindex="4"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.ConfirmPassword}
                  onBlur={formik.handleBlur}
                />
                <label>
                  Confirm password
                  <span
                    aria-required="true"
                    className="required"
                    title="Required"
                  >
                    *
                  </span>
                </label>
                <span style={{ color: "red" }}>
                  {" "}
                  {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword ? (
                    <div>{formik.errors.ConfirmPassword}</div>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  tabindex="5"
                  required
                  checked={isChecked}
                  onChange={handleCheckbox}
                />
                <label for="checkbox">
                  I accept the &nbsp;
                  <a target="_blank" className="text-primary" href="#">
                    T&amp;C
                  </a>
                  &nbsp; and &nbsp;
                  <a target="_blank" className="text-primary" href="#">
                    Privacy Policy
                  </a>
                  &nbsp;
                </label>
              </div>
            </div>
            <div className="form-actions">
              <div className="form-group">
                <button
                  type="submit"
                  id="btnSubmit"
                  className="btn btn-primary btn-block btn-big"
                  disabled={!Object.keys(formik.errors).length == 0}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
