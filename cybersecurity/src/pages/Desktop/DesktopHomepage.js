import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function DesktopHomepage() {
  const { darkMode } = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigation functions
  const handleGetStarted = () => {
    navigate("/introduction-cybersecurity"); // Replace with the actual route
  };

  const handleExploreCourses = () => {
    navigate("/introduction-cybersecurity"); // Replace with the actual route
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "left",
        color: darkMode ? "#ffffff" : "#000000",
        paddingX: "5%",
        flexWrap: "wrap",
        transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    >
      {/* Left Section */}
      <Box sx={{ maxWidth: "550px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" fontWeight="bold" sx={{ fontSize: "3.5rem" }}>
            Learn to <span style={{ color: "#353cc0" }}>Secure</span> in the Digital Age
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Typography variant="body1" sx={{ marginTop: 2, fontSize: "1.3rem", maxWidth: "500px", color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
            Cybersecurity protects data and systems. Learn, practice, and stay updated to build skills. 
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
            <Button
              variant="contained"
              sx={{
                background: "#353cc0",
                fontSize: "1.1rem",
                padding: "12px 24px",
                borderRadius: "8px",
                "&:hover": { background: "#2c3199", transform: "scale(1.05)" },
              }}
              onClick={handleGetStarted} // Call handleGetStarted on button click
            >
              Get Started →
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#353cc0",
                color: "#353cc0",
                fontSize: "1.1rem",
                padding: "12px 24px",
                borderRadius: "8px",
                "&:hover": { borderColor: "#2c3199", color: "#2c3199" },
              }}
              onClick={handleExploreCourses} // Call handleExploreCourses on button click
            >
              Explore Courses
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Course Card */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
        <Paper
          elevation={8}
          sx={{
            background: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: 3,
            width: "350px",
            color: darkMode ? "#ffffff" : "#000000",
            position: "relative",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Introduction to Cybersecurity
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2 }}>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} />Cybersecurity Important         
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} /> Common cybersecurity threats and attacks     
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} /> Common cybersecurity Protect agains attacts 
            </Typography>
          </Box>
          <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              Basic Level <br />
              <strong>5 topic</strong>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}
