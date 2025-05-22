import React from "react";
import { useMediaQuery } from "@mui/material";
import IotAttackDesktop from "./pages/Desktop/IotAttackDesktop";
import IotAttackMobile from "./pages/Mobile/IotAttackMobile";
function IotAttack() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <IotAttackMobile /> : <IotAttackDesktop />;
}

export default IotAttack;
