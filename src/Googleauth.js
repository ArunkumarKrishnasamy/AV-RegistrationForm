import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
function Googleauth() {
  const clientId =
    "647724450623-kddudgv0vsu0p3ee4hj7u67anps5i2s5.apps.googleusercontent.com";
  const [showlogin, setShowlogin] = useState(true);
  const [showlogout, setShowlogout] = useState(false);
  let navigate = useNavigate();
  const onLoginSuccess = (res) => {
    console.log("Login Success", res.profileObj);
    setShowlogin(false);
    setShowlogout(true);
    var id_token = res.getAuthResponse().id_token;
    console.log(id_token);
    // navigate("/registration");
  };
  const onLoginFailure = (res) => {
    console.log("Login Failed", res);
  };
  const onSignoutSuccess = () => {
    alert("You have been logged out");
    setShowlogin(true);
    setShowlogout(false);
  };
  return (
    <div>
      {showlogin ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : null}

      {showlogout ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}

export default Googleauth;
