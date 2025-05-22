import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import PhishingIcon from "@mui/icons-material/BugReport";

function PhishingAttacksMobile() {
  const [openCybersecurity, setOpenCybersecurity] = useState(true);
  const [openImportance, setOpenImportance] = useState(true);
  const [openDefense, setOpenDefense] = useState(true);
  const { darkMode } = useTheme();

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PhishingIcon sx={{ marginRight: 1 }} />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: "bold", 
            color: darkMode ? "#ffffff" : "#000000" 
          }}
        >
          Phishing Attacks
        </Typography>
      </Box>

      {/* First Topic - What Phishing Attacks? */}
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
              primary="What Phishing Attacks?" 
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
                  wordWrap: "break-word" 
                }}
              >
                Phishing refers to a category of cyberattack that employs deceptive emails, text messages, phone calls, or misleading websites to 
                lure individuals into providing sensitive information, installing malware, or otherwise becoming victims of cybercrime. These attacks represent 
                a form of social engineering, wherein perpetrators manipulate people into revealing confidential information.
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>

      {/* Second Topic - How Phishing Attacks Are Being Used */}
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
              primary="How Phishing Attacks Are Being Used" 
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
                  wordWrap: "break-word" 
                }}
              >
                Cybercriminals utilize phishing attacks to accomplish a variety of malicious goals, including the theft of sensitive information, 
                unauthorized system access, or engaging in financial fraud. Below are some typical methods employed in phishing attacks:
              </Typography>
              <Typography 
                variant="body2" 
                component="ul" 
                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
              >
                <li>Email Phishing: Attackers dispatch emails that seem to originate from reputable sources, deceiving recipients into clicking on harmful links or disclosing personal details.</li>
                <li>Spear Phishing: These are focused attacks directed at specific individuals or organizations, often leveraging personalized information to enhance credibility.</li>
                <li>Vishing (Voice Phishing): Criminals make phone calls posing as trustworthy entities to extract sensitive information.</li>
                <li>Smishing (SMS Phishing): Attackers send text messages that look as though they come from legitimate sources, urging recipients to click on malicious links or submit personal details.</li>
                <li>HTTPS Phishing: Attackers create imitation websites that utilize HTTPS to seem secure, tricking victims into entering their login credentials.</li>
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>

      {/* Third Topic - Defense Against Phishing Attacks */}
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
              primary="How to Protect Against Phishing Attacks" 
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
                  wordWrap: "break-word" 
                }}
              >
                Defending against phishing attacks necessitates a mix of awareness, technical strategies, and best practices. Below are some techniques to safeguard against phishing:
              </Typography>
              <Typography 
                variant="body2" 
                component="ul" 
                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
              >
                <li>Identify Phishing Signs: Stay alert to common indicators of phishing, such as unfamiliar salutations, unexpected messages, spelling and grammar mistakes, urgency, dubious links or attachments, and requests for personal information.</li>
                <li>Do Not Reply to Phishing Emails: Steer clear of responding to suspicious messages, as doing so may confirm to attackers that your email address is active.</li>
                <li>Report Suspicious Messages: Notify your email provider or your organization's IT department about potential phishing emails to assist them in monitoring threats.</li>
                <li>Implement Multi-Factor Authentication (MFA): Utilize MFA to add an additional layer of security to your accounts.</li>
              </Typography>
            </Box>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
}

export default PhishingAttacksMobile;
