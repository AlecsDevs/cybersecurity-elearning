import React from "react";
import { useMediaQuery } from "@mui/material";
import CodeInjectionDesktop from "./pages/Desktop/CodeInjectionDesktop";
import CodeInjectionMobile from "./pages/Mobile/CodeInjectionMobile";
function CodeInjection() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <CodeInjectionMobile /> : <CodeInjectionDesktop />;
}

export default CodeInjection;
