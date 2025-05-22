import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import IoTIcon from "@mui/icons-material/Devices";

function IotAttackMobile() {
  const [openCybersecurity, setOpenCybersecurity] = useState(true);
  const [openImportance, setOpenImportance] = useState(true);
  const [openDefense, setOpenDefense] = useState(true);  // New state for the defense section
  const { darkMode } = useTheme();

  return (
    <Box>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: darkMode ? "#ffffff" : "#000000",
          textAlign: "center"
        }}
      >
        IoT-based attacks <IoTIcon />
      </Typography>

      {/* First Topic - What Is Cybersecurity? */}
      <Box
        sx={{
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          p: 2,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <List>
          <ListItem button onClick={() => setOpenCybersecurity(!openCybersecurity)}>
            <ListItemText
              primary="What IoT-based attack?"
              sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
            />
            {openCybersecurity ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCybersecurity} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#bbb" : "#555",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                Attacks targeting IoT systems focus on the Internet of Things (IoT), which includes a diverse array of interconnected devices like smart appliances, industrial sensors, and wearable technology. These devices are equipped with software and sensors that allow them to gather, share, and process data autonomously, often without human oversight. Because of their interconnected design and frequently inadequate security protocols, IoT devices are attractive targets for cybercriminals.
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>

      {/* Second Topic - How Attack Targets Are Being Used */}
      <Box
        sx={{
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          p: 2,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <List>
          <ListItem button onClick={() => setOpenImportance(!openImportance)}>
            <ListItemText
              primary="How IoT-based attacks Are Being Used"
              sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
            />
            {openImportance ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openImportance} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#bbb" : "#555",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                Cybercriminals employ IoT-based attacks for several malicious objectives, such as:
              </Typography>
              <Typography
                variant="body2"
                component="ul"
                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
              >
                <li>Data Theft: Acquiring sensitive information, including personal data, financial details, and proprietary information.</li>
                <li>System Takeover: Achieving unauthorized access to systems and possibly taking control over them.</li>
                <li>Service Disruption: Inducing service interruptions and impacting business continuity by breaching IoT devices.</li>
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>

      {/* Third Topic - Defense Against Attack Targets */}
      <Box
        sx={{
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          p: 2,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <List>
          <ListItem button onClick={() => setOpenDefense(!openDefense)}>
            <ListItemText
              primary="How to Protect Against IoT-based attacks?"
              sx={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}
            />
            {openDefense ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDefense} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "#bbb" : "#555",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                Defending against IoT-focused attacks requires a mix of technical strategies, best practices, and ongoing monitoring. Here are several tactics to mitigate IoT-related threats:
              </Typography>
              <Typography
                variant="body2"
                component="ul"
                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
              >
                <li>Change Default Passwords: Make sure all IoT devices utilize strong, unique passwords rather than factory defaults.</li>
                <li>Regular Software Updates: Continuously update all IoT devices and systems to fix known vulnerabilities.</li>
                <li>Network Segmentation: Organize the network into segments to confine the progression of an attack.</li>
                <li>Use Encryption: Encrypt data that is transmitted between IoT devices and servers to safeguard it against interception.</li>
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
}

export default IotAttackMobile;
