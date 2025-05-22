import React from "react";
import { useMediaQuery } from "@mui/material";
import PhishingAttacksMobile from "./pages/Mobile/PhishingAttacksMobile";
import PhishingAttacksDesktop from "./pages/Desktop/PhishingAttacksDesktop";
function Introduction() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <PhishingAttacksMobile /> : <PhishingAttacksDesktop />;
}

export default Introduction;
