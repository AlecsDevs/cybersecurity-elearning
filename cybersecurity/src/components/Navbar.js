import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, useMediaQuery, Drawer, List, ListItem, Avatar, CircularProgress } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home"; // Added HomeIcon
import SchoolIcon from "@mui/icons-material/School"; // Added SchoolIcon for courses
import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/Logocyber.png";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth-check', {
          credentials: 'include' // Important for sending cookies
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else if (response.status === 401) {
          // If unauthorized and not already on login page, redirect to login
          setUser(null);
          if (!location.pathname.includes('/login')) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, location.pathname]);

  // Handle logout
  const handleLogout = async () => {
    // Set loading state to prevent multiple logout attempts
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        // Clear any user data from local state
        setUser(null);
        // Add a logout message if you're using a notification system
        // e.g., toast.success("Successfully logged out");
        
        // Redirect to login page
        navigate('/login');
      } else {
        console.error("Logout failed with status:", response.status);
        // Optionally show an error notification
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error notification
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: darkMode ? "#212121" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        boxShadow: "none",
        borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}>
        {/* Logo & Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={Logo} alt="Cybersecurity Logo" style={{ width: 40, height: 40 }} />
          <Typography variant="h6" fontWeight="bold">Cybersecurity</Typography>
        </Box>

        {/* Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: darkMode ? "#ffffff" : "#000000",
                  "&:hover": { background: "#2c3199", transform: "scale(1.05)" },
                }}
              >
                Home
              </Button>
            </Link>
            <Link to="/introduction-cybersecurity" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: darkMode ? "#ffffff" : "#000000",
                  "&:hover": { background: "#2c3199", transform: "scale(1.05)" },
                }}
              >
                Topics
              </Button>
            </Link>
          </Box>
        )}

        {/* User account and logout for desktop, dark mode toggle for all, and menu button for mobile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Username display - only visible on desktop */}
          {user && !isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#2c3199" }}>
                <PersonIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2">
                {user.username || "User"}
              </Typography>
            </Box>
          )}

          {/* Logout Button - only visible on desktop */}
          {user && !isMobile && (
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={loading}
              sx={{
                backgroundColor: "#2c3199",
                color: "#ffffff",
                '&:hover': {
                  backgroundColor: "#1a237e",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                },
                transition: "all 0.3s ease",
                fontWeight: "medium",
                textTransform: "none",
                borderRadius: "8px",
                px: 2
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          )}

          {/* Dark Mode Toggle - visible on all devices */}
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{
              "&:hover": { color: "#353cc0" },
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => toggleDrawer(true)}
              sx={{ color: darkMode ? "#ffffff" : "#000000" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 2,
            backgroundColor: darkMode ? "#212121" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          {/* User info in drawer - always visible in drawer when user exists */}
          {user && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1, 
              mb: 2, 
              pb: 2, 
              width: "100%",
              borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd" 
            }}>
              <Avatar sx={{ bgcolor: "#2c3199" }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="body1">{user.username || "User"}</Typography>
            </Box>
          )}
          
          <List sx={{ width: "100%" }}>
            {/* Home with icon */}
            <ListItem 
              button 
              onClick={() => {navigate('/'); setOpenDrawer(false);}}
              sx={{
                "&:hover": { 
                  backgroundColor: "#2c3199", 
                  borderRadius: "4px",
                  "& .MuiTypography-root, & .MuiSvgIcon-root": {
                    color: "#ffffff"
                  }
                },
                transition: "all 0.2s ease",
                mb: 1
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5, width: "100%" }}>
                <HomeIcon fontSize="small" color={darkMode ? "inherit" : "inherit"} />
                <Typography variant="body1" color={darkMode ? "#ffffff" : "#000000"}>Home</Typography>
              </Box>
            </ListItem>
            
            {/* Courses/Topics with icon */}
            <ListItem 
              button 
              onClick={() => {navigate('/introduction-cybersecurity'); setOpenDrawer(false);}}
              sx={{
                "&:hover": { 
                  backgroundColor: "#2c3199", 
                  borderRadius: "4px",
                  "& .MuiTypography-root, & .MuiSvgIcon-root": {
                    color: "#ffffff"
                  }
                },
                transition: "all 0.2s ease",
                mb: 1
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5, width: "100%" }}>
                <SchoolIcon fontSize="small" color={darkMode ? "inherit" : "inherit"} />
                <Typography variant="body1" color={darkMode ? "#ffffff" : "#000000"}>Topics</Typography>
              </Box>
            </ListItem>
            
            {/* Logout option in drawer - only when user exists */}
            {user && (
              <ListItem 
                button 
                onClick={() => {handleLogout(); setOpenDrawer(false);}} 
                disabled={loading}
                sx={{
                  "&:hover": { 
                    backgroundColor: "#2c3199", 
                    borderRadius: "4px",
                    "& .MuiTypography-root, & .MuiSvgIcon-root": {
                      color: "#ffffff"
                    }
                  },
                  transition: "all 0.2s ease",
                  mt: 1,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5, width: "100%" }}>
                  {loading ? 
                    <CircularProgress size={20} color="inherit" /> : 
                    <LogoutIcon fontSize="small" color={darkMode ? "inherit" : "inherit"} />
                  }
                  <Typography variant="body1" color={darkMode ? "#ffffff" : "#000000"}>
                    {loading ? "Logging out..." : "Logout"}
                  </Typography>
                </Box>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}