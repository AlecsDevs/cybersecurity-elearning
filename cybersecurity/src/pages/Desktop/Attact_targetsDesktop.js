import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import SecurityIcon from "@mui/icons-material/Security";
import { motion } from "framer-motion"; // Import motion

function Attact_targetsDesktop() {
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
          Attack Targets <SecurityIcon />
        </Typography>
      </motion.div>

      {/* First Topic - What Attack Targets? */}
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
                  primary="What Attack Targets?" 
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }} 
                />
                {openCybersecurity ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openCybersecurity} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    whiteSpace: "normal", 
                    wordWrap: "break-word" 
                  }}
                >
                  Attack targets refer to particular systems, networks, or data that cybercriminals seek to compromise. These targets 
                  can range significantly, from personal devices to entire organizational frameworks. The MITRE ATT&CK® 
                  framework serves as a detailed knowledge repository that outlines various tactics and techniques used by 
                  adversaries based on real-world observations. This framework assists organizations in identifying potential attack 
                  vectors and formulating effective defense strategies.
                </Typography>
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
                  primary="How Attack Targets Are Being Used" 
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }} 
                />
                {openImportance ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openImportance} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    whiteSpace: "normal", 
                    wordWrap: "break-word" 
                  }}
                >
                  Cybercriminals exploit attack targets to fulfill different malicious goals, such as stealing confidential information, 
                  disrupting operations, or gaining unauthorized system access. Here are some prevalent methods used to exploit attack targets:
                </Typography>
                <Typography 
                  variant="body2" 
                  component="ul" 
                  sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                >
                  <li>Reconnaissance: Attackers collect information about their targets, including network configurations, employee information, and software weaknesses.</li>
                  <li>Initial Access: Attackers employ techniques like phishing, exploiting publicly accessible applications, or hijacking accounts to secure initial access to the target.</li>
                  <li>Lateral Movement: After infiltrating the network, attackers navigate laterally to reach additional systems and data.</li>
                  <li>Exfiltration: Attackers extract sensitive information and transfer it outside the target network.</li>
                  <li>Impact: Attackers may disrupt operations, encrypt data for ransom, or inflict other types of damage.</li>
                </Typography>
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
                  primary="Defending Against Attack Targets" 
                  sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }} 
                />
                {openDefense ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </motion.div>

            <Collapse in={openDefense} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: darkMode ? "#bbb" : "#555", 
                    whiteSpace: "normal", 
                    wordWrap: "break-word" 
                  }}
                >
                  Defending against attack targets requires the implementation of a mix of technical measures, best practices, and ongoing monitoring. Here are several strategies to safeguard against common attack vectors:
                </Typography>
                <Typography 
                  variant="body2" 
                  component="ul" 
                  sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                >
                  <li>Endpoint Detection and Response (EDR): Utilize EDR solutions to identify and react to suspicious activities occurring on endpoints.</li>
                  <li>Regular Software Updates: Ensure all software and systems are current to fix known vulnerabilities.</li>
                  <li>Security Awareness Training: Train employees about prevalent attack techniques, such as phishing, and how to identify and evade them.</li>
                  <li>Network Segmentation: Split the network into segments to restrict the propagation of an attack.</li>
                  <li>Multi-Factor Authentication (MFA): Enforce MFA to introduce an additional layer of security to user accounts.</li>
                  <li>Regular Backups: Conduct routine backups of essential data and store them securely to enable recovery from ransomware incidents.</li>
                  <li>Intrusion Detection Systems (IDS): Implement IDS to oversee network traffic for indications of malicious activity.</li>
                </Typography>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Attact_targetsDesktop;