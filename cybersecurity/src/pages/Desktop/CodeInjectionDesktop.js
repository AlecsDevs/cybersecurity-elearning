import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import CodeIcon from "@mui/icons-material/Code";
import { motion } from "framer-motion";

function CodeInjectionDesktop() {
  const [openCybersecurity, setOpenCybersecurity] = useState(true);
  const [openImportance, setOpenImportance] = useState(true);
  const [openDefense, setOpenDefense] = useState(true);  // New state for the defense section
  const { darkMode } = useTheme();

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
          Code Injection Attacks <CodeIcon />
        </Typography>
      </motion.div>

      {/* First Topic - What Is Cybersecurity? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
              <ListItem button onClick={() => setOpenCybersecurity(!openCybersecurity)}>
                <ListItemText
                  primary="What Is Code Injection?"
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
                />
                {openCybersecurity ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openCybersecurity} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#bbb" : "#555",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                  >
                    Code injection refers to a cyberattack in which malicious actors take advantage of weaknesses in an application to insert and execute unauthorized code. This type of attack leverages inadequate input validation and insecure coding methodologies, allowing attackers to operate outside the intended scope of an application.
                  </Typography>
                </motion.div>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>

      {/* Second Topic - How Attack Targets Are Being Used */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
              <ListItem button onClick={() => setOpenImportance(!openImportance)}>
                <ListItemText
                  primary="How Code Injection Attacks Are Being Used"
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
                />
                {openImportance ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openImportance} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#bbb" : "#555",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                  >
                    Cybercriminals employ code injection attacks for various nefarious purposes, including:
                  </Typography>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="body2"
                      component="ul"
                      sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                    >
                      <li>Data Theft: Obtaining sensitive data such as personal information, financial records, and trade secrets.</li>
                      <li>System Takeover: Gaining unwarranted access to systems and potentially seizing control.</li>
                      <li>Service Disruption: Creating service interruptions and issues with business continuity by compromising servers or systems.</li>
                      <li>Espionage: Engaging in corporate or governmental espionage to extract confidential data.</li>
                    </Typography>
                  </motion.div>
                </motion.div>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>

      {/* Third Topic - Defense Against Attack Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
              <ListItem button onClick={() => setOpenDefense(!openDefense)}>
                <ListItemText
                  primary="How to Protect Against Code Injection Attacks"
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
                />
                {openDefense ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openDefense} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#bbb" : "#555",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                  >
                    To defend against code injection attacks, a combination of technical solutions, best practices, and ongoing monitoring should be employed. Here are some methods to safeguard against code injection:
                  </Typography>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="body2"
                      component="ul"
                      sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                    >
                      <li>Input Validation and Sanitization: Ensure that all user input is validated and sanitized to conform to expected formats and to eliminate malicious code.</li>
                      <li>Use Parameterized Queries: Implement parameterized queries and prepared statements to mitigate the risk of SQL injection attacks.</li>
                      <li>Avoid Using eval(): Refrain from using functions such as eval() that can execute arbitrary code, as these may be vulnerable to exploitation.</li>
                      <li>Regular Software Updates: Keep all software and systems current to fix known vulnerabilities.</li>
                    </Typography>
                  </motion.div>
                </motion.div>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>
    </Box>
  );
}

export default CodeInjectionDesktop;
