import React from "react";
import Sidebar from "./components/sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar"
function MainLayout() {
  return (
    <Box>
    <Navbar/>
    <Box sx={{ display: "flex" }}>
      <Sidebar /> 
      <Box sx={{ flexGrow: 1 }}>
        
                <Box sx={{ padding: 5}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    </Box>

  );
}

export default MainLayout;
