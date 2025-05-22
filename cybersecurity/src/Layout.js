import React from 'react'
import Navbar from './components/Navbar';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
function Layout() {
  return (
    <Box>
      <Navbar /> {/* Navbar at the top */}
      <Box sx={{ padding: 3 }}>
        <Outlet /> {/* Renders client-specific routes */}
      </Box>
    </Box>
  )
}

export default Layout