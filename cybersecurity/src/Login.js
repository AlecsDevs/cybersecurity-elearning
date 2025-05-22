import React from "react";
import { useMediaQuery } from "@mui/material";
import LoginPageDesktop from "./pages/Desktop/LoginPageDesktop";
import LoginMobile from "./pages/Mobile/LoginMobile";
function Login() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <LoginMobile /> : <LoginPageDesktop />;
}

export default Login;
