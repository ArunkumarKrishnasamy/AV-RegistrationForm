import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "react-google-login";
import Googleauth from "./Googleauth";
// import { refreshTokenSetup } from "../node_modules/utils-merge/";
const clientId =
  "647724450623-kddudgv0vsu0p3ee4hj7u67anps5i2s5.apps.googleusercontent.com";
function Login() {
  let navigate = useNavigate();
  //   function handlecallback(res) {
  //     console.log(res.credential);
  //     navigate("/registration");
  //   }
  //   useEffect(() => {
  //     // global google
  //     window.google.accounts.id.initialize({
  //       client_id:
  //         "647724450623-kddudgv0vsu0p3ee4hj7u67anps5i2s5.apps.googleusercontent.com",
  //       callback: handlecallback,
  //     });
  //   }, []);
  //   window.google.accounts.id.renderButton(
  //     document.getElementById("googlesignin"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //     }
  //   );

  return (
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <div className="right-block container">
        <div id="divLoginLink" className="login-link create-account-step-block">
          Have an account?
          <Link to={"/signin"}>
            Login <i className="icon19-arrow2_right"></i>
          </Link>
        </div>
        <br></br>

        <div className="create-account-step-block">
          <span className="title">Or signup with</span>
          <div className="xero-intuit-sign-in">
            {" "}
            <div className="btn btn-outline btn-block sign-in ">
              <Link to={"signin"}>Sign In</Link>
            </div>
            <div className="g-signin">
              {/* <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              /> */}

              <Googleauth />
            </div>
          </div>
          <p>
            By signing up with a third party service, you agree to accept{" "}
            <a target="_blank" href="#">
              Terms of service
            </a>{" "}
            and{" "}
            <a target="_blank" href="#">
              Privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
