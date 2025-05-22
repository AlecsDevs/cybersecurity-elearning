import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import CodeIcon from "@mui/icons-material/Code";

function CodeInjectionMobile() {
    const [openCybersecurity, setOpenCybersecurity] = useState(true);
    const [openImportance, setOpenImportance] = useState(true);
    const [openDefense, setOpenDefense] = useState(true);  // New state for the defense section
    const { darkMode } = useTheme();

    return (
        <Box sx={{ px: 2, py: 3 }}>
            {/* Title */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: darkMode ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                Code Injection Attacks  <CodeIcon sx={{ ml: 1 }} />
            </Typography>

            {/* First Topic - What Is Code Injection? */}
            <Box
                sx={{
                    backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
                    color: darkMode ? "#FFFFFF" : "#000000",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <List>
                    <ListItem button onClick={() => setOpenCybersecurity(!openCybersecurity)}>
                        <ListItemText
                            primary="What are Code Injection Attacks?"
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
                                Code injection refers to a cyberattack where attackers insert unauthorized code into an application, exploiting weaknesses in input validation to execute the code and manipulate the system.
                            </Typography>
                        </Box>
                    </Collapse>
                </List>
            </Box>

            {/* Second Topic - How Code Injection is Used */}
            <Box
                sx={{
                    backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
                    color: darkMode ? "#FFFFFF" : "#000000",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <List>
                    <ListItem button onClick={() => setOpenImportance(!openImportance)}>
                        <ListItemText
                            primary="How Code Injection Attacks Are Used"
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
                                Code injection is used for various malicious purposes, including:
                            </Typography>
                            <Typography
                                variant="body2"
                                component="ul"
                                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                            >
                                <li>Data theft: Accessing sensitive data like personal and financial information.</li>
                                <li>System takeover: Gaining unauthorized access to a system.</li>
                                <li>Service disruption: Causing issues that impact business continuity.</li>
                                <li>Espionage: Extracting confidential data for corporate or governmental purposes.</li>
                            </Typography>
                        </Box>
                    </Collapse>
                </List>
            </Box>

            {/* Third Topic - Defense Against Code Injection */}
            <Box
                sx={{
                    backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
                    color: darkMode ? "#FFFFFF" : "#000000",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <List>
                    <ListItem button onClick={() => setOpenDefense(!openDefense)}>
                        <ListItemText
                            primary="How to Protect Against Code Injection"
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
                                Defending against code injection requires the following measures:
                            </Typography>
                            <Typography
                                variant="body2"
                                component="ul"
                                sx={{ color: darkMode ? "#bbb" : "#555", pl: 2 }}
                            >
                                <li>Input validation and sanitization: Ensure all user inputs are properly validated and sanitized.</li>
                                <li>Parameterized queries: Use parameterized queries and prepared statements to prevent SQL injection.</li>
                                <li>Avoid eval(): Refrain from using functions like eval() that can execute arbitrary code.</li>
                                <li>Regular updates: Keep software up to date to fix known vulnerabilities.</li>
                            </Typography>
                        </Box>
                    </Collapse>
                </List>
            </Box>
        </Box>
    );
}

export default CodeInjectionMobile;
