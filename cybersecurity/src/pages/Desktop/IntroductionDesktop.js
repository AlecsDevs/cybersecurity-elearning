import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Collapse, } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

function IntroductionDesktop() {
  const [openCybersecurity, setOpenCybersecurity] = useState(true);
  const [openImportance, setOpenImportance] = useState(true);
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
          Introduction to Cybersecurity
        </Typography>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
  
      </motion.div>

      {/* First Topic - What Is Cybersecurity? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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
            boxShadow: 2
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
                  primary="What Is Cybersecurity?"
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
                      wordWrap: "break-word",
                      mb: 2
                    }}
                  >
                    Cybersecurity is the practice of protecting computers, networks, programs, and data from digital attacks, unauthorized access, and damage.
                    It involves technologies, processes, and practices designed to safeguard sensitive information and ensure the confidentiality, integrity,
                    and availability of digital assets.
                  </Typography>
                </motion.div>

                {/* Embedded Illustration Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
     
                </motion.div>

                {/* YouTube Video Embed */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Box sx={{ mt: 3, mb: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "medium",
                        mb: 1,
                        color: darkMode ? "#ddd" : "#333"
                      }}
                    >
                      Watch: Introduction to Cybersecurity Concepts
                    </Typography>

                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* YouTube iFrame */}
                      <Box
                        sx={{
                          width: '100%',
                          height: 0,
                          paddingBottom: '56.25%', // 16:9 aspect ratio
                          position: 'relative',
                          backgroundColor: '#000'
                        }}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/shQEXpUwaIY?si=Q48LEehG0Vs4xdpP"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none'
                          }}
                        ></iframe>
                      </Box>

                      {/* Video description */}
                      <Box
                        sx={{
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: darkMode ? '#222' : '#f5f5f5'
                        }}
                      >
                        <Typography variant="caption" sx={{ color: darkMode ? '#ddd' : '#333' }}>
                          YouTube: Introduction to Cybersecurity
                        </Typography>
                        <Typography variant="caption" sx={{ color: darkMode ? '#bbb' : '#555' }}>
                          YouTube Video
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>

      {/* Second Topic - Why Is Cybersecurity Important? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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
            boxShadow: 2
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
                  primary="Why Is Cybersecurity Important?"
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
                      wordWrap: "break-word",
                      mb: 2
                    }}
                  >
                    With increasing cyber threats such as hacking, malware, ransomware, and phishing, cybersecurity is essential for:
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="body2"
                    component="ul"
                    sx={{ color: darkMode ? "#bbb" : "#555", pl: 2, mb: 3 }}
                  >
                    <li>Protecting personal and business data from unauthorized access or theft.</li>
                    <li>Preventing financial losses due to cyber fraud or system breaches.</li>
                    <li>Ensuring the security of critical infrastructure like banking systems, healthcare, and government data.</li>
                  </Typography>
                </motion.div>

          
              </Box>
            </Collapse>
          </List>
        </Box>
      </motion.div>
    </Box>
  );
}

export default IntroductionDesktop;