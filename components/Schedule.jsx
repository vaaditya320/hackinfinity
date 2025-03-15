import React from 'react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Stack, 
  Divider, 
  Chip, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { 
  AccessTime as ClockIcon, 
  EventNote as CalendarIcon,
  FlightTakeoff as RocketIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  '&.Mui-selected': {
    color: "#f44336",
  },
}));

const DayTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: "rgba(30, 30, 35, 0.6)",
  borderRadius: "8px",
  marginBottom: "2rem",
  '& .MuiTabs-indicator': {
    backgroundColor: "#f44336",
    height: "3px",
  },
}));

const EventCard = styled(Card)(({ theme, day }) => ({
  background: "rgba(30, 30, 35, 0.6)",
  borderRadius: "12px",
  border: "1px solid #444",
  marginBottom: "1rem",
  transition: "all 0.3s ease",
  overflow: "hidden",
  color: "#fff", // Add default text color for the card
  '&:hover': {
    borderColor: day === "day1" || day === "day3" ? "rgba(244, 67, 54, 0.5)" : "rgba(255, 193, 7, 0.5)",
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
  },
}));

const TimeChip = styled(Chip)(({ theme, day }) => ({
  backgroundColor: day === "day1" || day === "day3" ? "rgba(244, 67, 54, 0.2)" : "rgba(255, 193, 7, 0.2)",
  color: day === "day1" || day === "day3" ? "#f44336" : "#ffb300",
  fontFamily: "monospace",
  fontWeight: "bold",
  border: `1px solid ${day === "day1" || day === "day3" ? "#f44336" : "#ffb300"}`,
}));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      delay: 0.1
    }
  }
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { 
    width: "100%", 
    transition: { 
      duration: 0.8, 
      ease: "easeInOut"
    }
  }
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const scheduleData = {
  day1: [
    { time: "09:00 AM", title: "Registration & Check-in", description: "Get your badge, swag bag, and find your team area" },
    { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome address, theme introduction, and rules explanation" },
    { time: "11:30 AM", title: "Team Formation", description: "Find teammates or finalize your existing team" },
    { time: "12:00 PM", title: "Hacking Begins!", description: "Start building your innovative solutions" },
    { time: "07:00 PM", title: "Dinner & Networking", description: "Refuel and connect with fellow participants" },
  ],
  day2: [
    { time: "08:00 AM", title: "Breakfast", description: "Start your day with a nutritious meal" },
    { time: "10:00 AM", title: "Technical Workshops", description: "AI, Blockchain, and Web3 workshops to help with your projects" },
    { time: "12:30 PM", title: "Lunch", description: "Refuel for the afternoon hacking session" },
    { time: "03:00 PM", title: "Mentorship Sessions", description: "Get guidance from industry experts" },
    { time: "08:00 PM", title: "Gaming Break", description: "Take a break with some fun tech-themed games" },
  ],
  day3: [
    { time: "08:00 AM", title: "Breakfast", description: "Final day breakfast to power through" },
    { time: "10:00 AM", title: "Submission Preparation", description: "Finalize your projects and prepare for presentations" },
    { time: "12:00 PM", title: "Hacking Ends", description: "All code submissions due" },
    { time: "01:00 PM", title: "Project Presentations", description: "Teams showcase their innovations to judges" },
    { time: "04:00 PM", title: "Awards Ceremony", description: "Winners announced and prizes awarded" },
  ]
};

// Generate consistent particle data
const generateParticleData = () => {
  // Use a seed to generate the same random values
  const particles = [];
  for (let i = 0; i < 15; i++) {
    particles.push({
      width: 2 + (i % 5),
      height: 2 + ((i + 2) % 5),
      left: `${(i * 7) % 100}%`,
      top: `${(i * 6) % 100}%`,
      color: i % 2 === 0 ? "#f44336" : "#ffb300",
      delay: i * 0.2,
      duration: 20 + (i % 10)
    });
  }
  return particles;
};

function Schedule() {
  const [activeTab, setActiveTab] = useState("day1");
  const [particles, setParticles] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Only run particle generation on the client side
  useEffect(() => {
    setParticles(generateParticleData());
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box id="schedule" sx={{ 
      py: 10, 
      px: 4, 
      background: "linear-gradient(to bottom, #121212, #1a1a1a)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background animated particles - Only render on client side to avoid hydration mismatch */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden" }}>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay
            }}
            style={{
              position: "absolute",
              width: particle.width,
              height: particle.height,
              borderRadius: "50%",
              background: particle.color,
              filter: "blur(3px)",
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Title Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
              <motion.div variants={lineVariants} style={{ height: "2px", backgroundColor: "#f44336", marginRight: "1rem" }} />
              <motion.div variants={titleVariants}>
                <Typography variant="h3" component="h2" sx={{ 
                  fontWeight: "bold", 
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff"
                }}>
                  EVENT SCHEDULE
                </Typography>
              </motion.div>
              <motion.div variants={lineVariants} style={{ height: "2px", backgroundColor: "#f44336", marginLeft: "1rem" }} />
            </Box>
            <motion.div variants={itemVariants}>
              <Typography variant="body1" sx={{ color: "#aaa", maxWidth: "700px", mx: "auto" }}>
                Your 48-hour journey to build the next generation of technology solutions.
              </Typography>
            </motion.div>
          </Box>

          {/* Tabs */}
          <DayTabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            component={motion.div}
            variants={itemVariants}
          >
            <StyledTab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarIcon sx={{ color: "#f44336" }} />
                  <Typography sx={{ color: "#fff" }}>DAY 1</Typography>
                </Stack>
              } 
              value="day1" 
            />
            <StyledTab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarIcon sx={{ color: "#ffb300" }} />
                  <Typography sx={{ color: "#fff" }}>DAY 2</Typography>
                </Stack>
              } 
              value="day2" 
            />
            <StyledTab 
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarIcon sx={{ color: "#f44336" }} />
                  <Typography sx={{ color: "#fff" }}>DAY 3</Typography>
                </Stack>
              } 
              value="day3" 
            />
          </DayTabs>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
            >
              <Box sx={{ 
                p: 4, 
                border: "1px solid #444", 
                borderRadius: "12px", 
                backgroundColor: "rgba(30, 30, 35, 0.6)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
              }}>
                <motion.div variants={containerVariants}>
                  {scheduleData[activeTab].map((event, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <EventCard day={activeTab} elevation={4}>
                        <CardContent>
                          <Stack 
                            direction={isMobile ? "column" : "row"} 
                            spacing={3} 
                            alignItems={isMobile ? "flex-start" : "center"}
                          >
                            <Box sx={{ minWidth: isMobile ? "100%" : "25%", mb: isMobile ? 2 : 0 }}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <ClockIcon sx={{ 
                                  color: activeTab === "day1" || activeTab === "day3" ? "#f44336" : "#ffb300"
                                }} />
                                <TimeChip 
                                  day={activeTab} 
                                  label={event.time} 
                                  size="medium"
                                />
                              </Stack>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" component="h3" sx={{ 
                                fontWeight: "bold", 
                                mb: 1, 
                                color: "#fff" // Explicitly set title color to white
                              }}>
                                {event.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#ccc" }}>
                                {event.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </EventCard>
                    </motion.div>
                  ))}
                </motion.div>
              </Box>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Schedule;