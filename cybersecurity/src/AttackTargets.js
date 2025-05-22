import React from "react";
import { useMediaQuery } from "@mui/material";
import AttackTargetsMobile from "./pages/Mobile/AttackTargetsMobile";
import Attact_targetsDesktop from "./pages/Desktop/Attact_targetsDesktop";
function AttackTargets() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <AttackTargetsMobile /> : <Attact_targetsDesktop />;
}

export default AttackTargets;
