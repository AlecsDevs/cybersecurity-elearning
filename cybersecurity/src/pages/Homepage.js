import { useMediaQuery } from "@mui/material";
import DesktopHomepage from "./Desktop/DesktopHomepage";
import MobileHomepage from "./Mobile/MobileHomepage";
export default function Homepage() {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen

  return isMobile ? <MobileHomepage /> : <DesktopHomepage />;
}
