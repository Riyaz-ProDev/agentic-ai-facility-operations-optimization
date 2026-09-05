import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Avatar,
  Chip,
  Tooltip
} from "@mui/material";

import { useLocation } from "react-router-dom";

import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import SecurityIcon from "@mui/icons-material/Security";
import SavingsIcon from "@mui/icons-material/Savings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";


export default function Navbar() {

  const location = useLocation();


  // ==========================================
  // Current Module
  // ==========================================

  const getModule = () => {

    switch (location.pathname) {

      case "/energy-intelligence":

        return {
          name: "Energy Intelligence",
          icon: <BoltIcon />,
          color: "#2563eb",
          background: "#dbeafe"
        };


      case "/predictive-maintenance":

        return {
          name: "Predictive Maintenance",
          icon: <BuildIcon />,
          color: "#ea580c",
          background: "#ffedd5"
        };


      case "/occupancy-security":

        return {
          name: "Occupancy & Security",
          icon: <SecurityIcon />,
          color: "#7c3aed",
          background: "#ede9fe"
        };


      case "/cost-optimization":

        return {
          name: "Cost Optimization",
          icon: <SavingsIcon />,
          color: "#059669",
          background: "#d1fae5"
        };


      default:

        return {
          name: "Facility Intelligence",
          icon: <SmartToyIcon />,
          color: "#2563eb",
          background: "#dbeafe"
        };

    }

  };


  const module = getModule();


  // ==========================================
  // Logged User
  // ==========================================

  let user = null;

  try {

    const storedUser =
      localStorage.getItem("facilityUser");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }

  } catch (error) {

    console.error(
      "Unable to read logged user:",
      error
    );

  }


  return (

    <AppBar
      position="static"
      elevation={0}

      sx={{
        bgcolor: "rgba(255,255,255,0.96)",

        color: "#0f172a",

        borderRadius: 3,

        border:
          "1px solid #e2e8f0",

        boxShadow:
          "0 4px 18px rgba(15,23,42,0.05)"
      }}
    >

      <Toolbar
        sx={{
          minHeight: {
            xs: 68,
            md: 76
          },

          px: {
            xs: 2,
            md: 2.5
          },

          display: "flex",

          justifyContent:
            "space-between",

          gap: 2
        }}
      >

        {/* ================================= */}
        {/* LEFT SIDE */}
        {/* ================================= */}

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"

          sx={{
            minWidth: 0
          }}
        >

          {/* Module Icon */}

          <Avatar
            sx={{
              width: 44,
              height: 44,

              bgcolor:
                module.background,

              color:
                module.color
            }}
          >
            {module.icon}
          </Avatar>


          <Box
            sx={{
              minWidth: 0
            }}
          >

            {/* Project Name */}

            <Typography
              fontWeight={800}

              sx={{
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.05rem"
                },

                color:
                  "#0f172a",

                lineHeight: 1.2,

                whiteSpace: {
                  xs: "normal",
                  lg: "nowrap"
                }
              }}
            >
              Agentic AI For Smart Facility Operations And Optimizations
            </Typography>


            {/* Current Module */}

            <Stack
              direction="row"
              spacing={0.7}
              alignItems="center"

              sx={{
                mt: 0.5
              }}
            >

              <Box
                sx={{
                  width: 7,
                  height: 7,

                  borderRadius:
                    "50%",

                  bgcolor:
                    module.color
                }}
              />


              <Typography
                variant="caption"

                sx={{
                  color:
                    module.color,

                  fontWeight:
                    700
                }}
              >
                {module.name}
              </Typography>

            </Stack>

          </Box>

        </Stack>


        {/* ================================= */}
        {/* RIGHT SIDE */}
        {/* ================================= */}

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >

          {/* AI Status */}

          <Chip
            icon={
              <SmartToyIcon />
            }

            label="AI System Online"

            size="small"

            sx={{
              display: {
                xs: "none",
                md: "flex"
              },

              bgcolor:
                "#dcfce7",

              color:
                "#15803d",

              fontWeight:
                700,

              border:
                "1px solid #bbf7d0",

              "& .MuiChip-icon": {
                color:
                  "#16a34a"
              }
            }}
          />


          {/* User */}

          <Tooltip
            title={
              user?.role
                ? `Role: ${user.role}`
                : "Facility Administrator"
            }
            arrow
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"

              sx={{
                px: {
                  xs: 0,
                  sm: 1.2
                },

                py: 0.7,

                borderRadius: 2.5,

                bgcolor:
                  "#f8fafc",

                border:
                  "1px solid #e2e8f0"
              }}
            >

              <Avatar
                sx={{
                  width: 34,
                  height: 34,

                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)"
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: 20
                  }}
                />
              </Avatar>


              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block"
                  }
                }}
              >

                <Typography
                  variant="body2"

                  fontWeight={700}

                  sx={{
                    lineHeight: 1.1
                  }}
                >
                  {user?.name || "Admin"}
                </Typography>


                <Typography
                  variant="caption"

                  color="text.secondary"
                >
                  {user?.role ||
                    "Administrator"}
                </Typography>

              </Box>

            </Stack>

          </Tooltip>

        </Stack>

      </Toolbar>

    </AppBar>

  );

}