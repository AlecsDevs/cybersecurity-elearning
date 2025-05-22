import React, { useState } from "react";
import { List, ListItem, Box, IconButton, ListItemText } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import PhishingIcon from "@mui/icons-material/BugReport";
import VirusIcon from "@mui/icons-material/Warning";
import CodeIcon from "@mui/icons-material/Code";
import IoTIcon from "@mui/icons-material/Devices";

const menuItems = [
  { text: "Introduction", icon: <HomeIcon />, to: "/introduction-cybersecurity" },
  { text: "Attack Targets", icon: <SecurityIcon />, to: "/attack-targets-cybersecurity" },
  { text: "Phishing Attacks", icon: <PhishingIcon />, to: "/phishing-attacks-cybersecurity" },
  { text: "Malware Infections", icon: <VirusIcon />, to: "/malware-infections-cybersecurity" },
  { text: "Code Injection Attacks", icon: <CodeIcon />, to: "/code-injection-cybersecurity" },
  { text: "IoT-Based Attacks", icon: <IoTIcon />, to: "/iot-attacks-cybersecurity" },
];

const Sidebar = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button (Mobile Only) */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          top: 10,
          left: 10,
          color: darkMode ? "#fff" : "#000",
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Desktop Sidebar with Text */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: 250,
          height: "100vh",
          bgcolor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#000",
          p: 2,
          mt: 1,
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link to={item.to} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ color: darkMode ? "#fff" : "#000", display: "flex", gap: 2 }}>
                  {item.icon}
                  <ListItemText primary={item.text} /> {/* ✅ Now showing text */}
                </ListItem>
              </Link>
            </motion.div>
          ))}
        </List>
      </Box>

      {/* Mobile Sidebar (Icons Only) */}
      <Box
        sx={{
          display: { xs: open ? "flex" : "none", sm: "none" },
          flexDirection: "column",
          alignItems: "center",
          width: 60,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 55,
          bgcolor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#000",
          p: 1,
          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 999,
        }}
      >
        <List sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          {menuItems.map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link to={item.to} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ justifyContent: "center", p: 1 }}>
                  {item.icon}
                </ListItem>
              </Link>
            </motion.div>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
