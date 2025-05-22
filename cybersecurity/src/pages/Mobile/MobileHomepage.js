import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function MobileHomepage() {
  const { darkMode } = useTheme();
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStartedClick = () => {
    navigate("/introduction-cybersecurity"); // Navigate to the Get Started page
  };

  const handleExploreCoursesClick = () => {
    navigate("/introduction-cybersecurity"); // Navigate to the Explore Courses page
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "left",
        color: darkMode ? "#ffffff" : "#000000",
        padding: { xs: "10%", md: "5%" },
        flexWrap: "wrap",
        transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    >
      {/* Left Section */}
      <Box sx={{ maxWidth: "550px", textAlign: { xs: "center", md: "left" } }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" fontWeight="bold" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            Learn to <span style={{ color: "#353cc0" }}>Secure</span> in the Digital Age
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              fontSize: { xs: "1rem", md: "1.3rem" },
              maxWidth: "500px",
              color: darkMode ? "#b0b0b0" : "#5c5c5c",
            }}
          >
            Cybersecurity protects data and systems. Learn, practice, and stay updated to build skills.
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, marginTop: 3 }}>
            <Button
              variant="contained"
              sx={{
                background: "#353cc0",
                fontSize: "1.1rem",
                padding: "12px 24px",
                borderRadius: "8px",
                "&:hover": { background: "#2c3199", transform: "scale(1.05)" },
              }}
              onClick={handleGetStartedClick} // On click navigate to the Get Started page
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
              onClick={handleExploreCoursesClick} // On click navigate to the Explore Courses page
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
            padding: { xs: 2, md: 3 },
            width: "100%",
            maxWidth: "350px",
            color: darkMode ? "#ffffff" : "#000000",
            position: "relative",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            marginTop: { xs: 4, md: 0 },
          }}
        >
          <Typography variant="h6" fontWeight="bold">Introduction to Cybersecurity</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2 }}>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} /> Cybersecurity Importance
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} /> Common cybersecurity threats
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              <CheckCircleIcon sx={{ color: "#353cc0", fontSize: "18px" }} /> Protect against attacks
            </Typography>
          </Box>
          <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: darkMode ? "#b0b0b0" : "#5c5c5c" }}>
              Basic Level <br /> <strong>5 Topics</strong>
            </Typography>
      
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}
