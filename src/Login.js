import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import axios from "./axios";

function Login() {
  const navigate = useNavigate();
  const responseGoogle = (resp) => {
    localStorage.setItem("token", resp.tokenId);
    axios.defaults.headers.common["Authorization"] = `Bearer ${resp.tokenId}`;
    navigate("/invoice");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/invoice");
  }, []);

  return (
    <div className="content">
      <GoogleLogin
        jsSrc="https://accounts.google.com/gsi/client"
        clientId="974366590750-nnfji4ash7bpagdvrccbul5q1g7mdqh1.apps.googleusercontent.com"
        buttonText="Sign In with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
