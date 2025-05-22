import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Box, 
  Button, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  Collapse, 
  Divider, 
  CircularProgress
} from "@mui/material";
import { ExpandLess, ExpandMore, Logout, AccountCircle } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

function AccountDesktop() {
  const [openAccountInfo, setOpenAccountInfo] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          // Redirect to login if no token
          window.location.href = '/login';
          return;
        }

        const response = await fetch('/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          // Token might be expired or invalid
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
          my: 4
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: "bold", 
            mb: 2, 
            color: darkMode ? "#ffffff" : "#000000" 
          }}
        >
          My Account <AccountCircle />
        </Typography>
      </motion.div>

      {/* Account Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Box 
          sx={{ 
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF", 
            color: darkMode ? "#FFFFFF" : "#000000", 
            maxWidth: "800px", 
            ml: 2,
            p: 2, 
            mt: 2, 
            borderRadius: 2, 
          }}
        >
          <List>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem button onClick={() => setOpenAccountInfo(!openAccountInfo)}>
                <ListItemText 
                  primary="Account Information" 
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }} 
                />
                {openAccountInfo ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openAccountInfo} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3 
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      bgcolor: darkMode ? '#3f51b5' : '#2196f3',
                      mr: 2 
                    }}
                  >
                    {userData?.username?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                  >
                    {userData?.username || "Username"}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, bgcolor: darkMode ? "#444" : "#ddd" }} />

                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    mb: 1
                  }}
                >
                  <strong>User ID:</strong> {userData?.id || "N/A"}
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    mb: 1
                  }}
                >
                  <strong>Username:</strong> {userData?.username || "N/A"}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    mt: 3,
                    fontStyle: "italic"
                  }}
                >
                  For security reasons, we don't display sensitive account information.
                  To change your password or update account details, please contact support.
                </Typography>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box 
          sx={{ 
            maxWidth: "800px", 
            ml: 2,
            mt: 4, 
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ 
              fontWeight: "bold",
              px: 3,
              py: 1
            }}
          >
            Logout
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}

export default AccountDesktop;