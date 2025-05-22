import React from "react";
import { useMediaQuery } from "@mui/material";
import IntroductionDesktop from "./pages/Desktop/IntroductionDesktop";
import IntroductionMobile from "./pages/Mobile/IntroductionMobile";
function Introduction() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <IntroductionMobile /> : <IntroductionDesktop />;
}

export default Introduction;
