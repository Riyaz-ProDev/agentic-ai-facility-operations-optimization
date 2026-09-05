import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Avatar,
  Chip
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import OccupancyHeatmap from "../components/occupancy/OccupancyHeatmap";

// ========================
// Occupancy Components
// ========================

import OccupancyCards from "../components/occupancy/OccupancyCards";
import OccupancyTrend from "../components/occupancy/OccupancyTrend";
import FacilityOccupancyChart from "../components/occupancy/FacilityOccupancyChart";
import OvercrowdingAlerts from "../components/occupancy/OvercrowdingAlerts";
import WorkspaceOptimization from "../components/occupancy/WorkspaceOptimization";

// ========================
// Security Components
// ========================

import SecurityCards from "../components/occupancy/SecurityCards";
import SecurityAlerts from "../components/occupancy/SecurityAlerts";
import AccessMonitoringTable from "../components/occupancy/AccessMonitoringTable";

// ========================
// CCTV Components
// ========================

import CCTVSummaryCards from "../components/occupancy/CCTVSummaryCards";
import CCTVAlerts from "../components/occupancy/CCTVAlerts";
import CCTVMonitoring from "../components/occupancy/CCTVMonitoring";

// ========================
// Icons
// ========================

import GroupsIcon from "@mui/icons-material/Groups";
import SecurityIcon from "@mui/icons-material/Security";
import VideocamIcon from "@mui/icons-material/Videocam";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SensorsIcon from "@mui/icons-material/Sensors";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GridViewIcon from "@mui/icons-material/GridView";
import ShieldIcon from "@mui/icons-material/Shield";
import LoginIcon from "@mui/icons-material/Login";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


function SecurityDashboard() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",

        background:
          "linear-gradient(180deg, #f5f3ff 0px, #f8fafc 500px)"
      }}
    >

      {/* ================================ */}
      {/* SIDEBAR */}
      {/* ================================ */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* ================================ */}
      {/* MAIN */}
      {/* ================================ */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,

          px: {
            xs: 2,
            md: 3
          },

          py: 2
        }}
      >

        <Box
          sx={{
            width: "100%",
            maxWidth: "1500px",
            mx: "auto"
          }}
        >

          <Navbar />


          {/* ====================================== */}
          {/* HERO HEADER */}
          {/* ====================================== */}

          <Box
            sx={{
              mt: 3,

              p: {
                xs: 2.5,
                md: 4
              },

              borderRadius: 4,

              position: "relative",
              overflow: "hidden",

              color: "white",

              background:
                "linear-gradient(135deg, #312e81 0%, #6d28d9 50%, #8b5cf6 100%)",

              boxShadow:
                "0 12px 30px rgba(109,40,217,0.22)"
            }}
          >

            {/* Decoration */}

            <Box
              sx={{
                position: "absolute",

                width: 240,
                height: 240,

                borderRadius: "50%",

                bgcolor:
                  "rgba(255,255,255,0.07)",

                right: -70,
                top: -100
              }}
            />

            <Box
              sx={{
                position: "absolute",

                width: 150,
                height: 150,

                borderRadius: "50%",

                bgcolor:
                  "rgba(255,255,255,0.05)",

                right: 170,
                bottom: -110
              }}
            />


            <Stack
              direction={{
                xs: "column",
                md: "row"
              }}

              justifyContent="space-between"

              alignItems={{
                xs: "flex-start",
                md: "center"
              }}

              spacing={3}

              sx={{
                position: "relative",
                zIndex: 1
              }}
            >

              {/* Left */}

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >

                <Avatar
                  sx={{
                    width: 64,
                    height: 64,

                    bgcolor:
                      "rgba(255,255,255,0.18)",

                    color: "white",

                    border:
                      "1px solid rgba(255,255,255,0.25)"
                  }}
                >

                  <ShieldIcon
                    sx={{
                      fontSize: 36
                    }}
                  />

                </Avatar>


                <Box>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                  >
                    Occupancy & Security Intelligence
                  </Typography>


                  <Typography
                    sx={{
                      mt: 0.6,
                      opacity: 0.9,
                      maxWidth: 760
                    }}
                  >
                    AI-powered occupancy monitoring,
                    security intelligence, workspace
                    optimization and CCTV surveillance.
                  </Typography>

                </Box>

              </Stack>


              {/* Agent Status */}

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
              >

                <Chip
                  icon={<SmartToyIcon />}
                  label="AI Agents Active"

                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.16)",

                    color: "white",
                    fontWeight: 600,

                    "& .MuiChip-icon": {
                      color: "white"
                    }
                  }}
                />


                <Chip
                  icon={<SensorsIcon />}
                  label="Live Monitoring"

                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.16)",

                    color: "white",
                    fontWeight: 600,

                    "& .MuiChip-icon": {
                      color: "white"
                    }
                  }}
                />

              </Stack>

            </Stack>

          </Box>


          {/* ================================================= */}
          {/* OCCUPANCY INTELLIGENCE */}
          {/* ================================================= */}

          <IntelligenceHeading
            icon={<GroupsIcon />}
            title="Occupancy Intelligence"
            subtitle="Monitor facility occupancy, crowd levels and workspace utilization."
            color="#4f46e5"
            background="#e0e7ff"
          />


          {/* Occupancy KPI Cards */}

          <DashboardContainer color="#4f46e5">

            <OccupancyCards />

          </DashboardContainer>


          {/* Occupancy Charts */}

          <Grid
            container
            spacing={3}
            sx={{
              mt: 0.5
            }}
          >

            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <IntelligencePanel
                icon={<TrendingUpIcon />}
                title="Occupancy Trend"
                subtitle="Analyze occupancy patterns over time."
                color="#4f46e5"
                background="#eef2ff"
              >

                <OccupancyTrend />

              </IntelligencePanel>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <IntelligencePanel
                icon={<BusinessIcon />}
                title="Facility Occupancy Analysis"
                subtitle="Compare occupancy levels across facilities."
                color="#4f46e5"
                background="#eef2ff"
              >

                <FacilityOccupancyChart />

              </IntelligencePanel>

            </Grid>

          </Grid>


          {/* Overcrowding */}

          <IntelligencePanel
            icon={<WarningAmberIcon />}
            title="Overcrowding Intelligence"
            subtitle="Detect facilities approaching unsafe or inefficient occupancy levels."
            color="#ea580c"
            background="#fff7ed"
          >

            <OvercrowdingAlerts />

          </IntelligencePanel>


          {/* Workspace Optimization */}

          <IntelligencePanel
            icon={<AutoAwesomeIcon />}
            title="AI Workspace Optimization"
            subtitle="AI-generated recommendations for better workspace utilization."
            color="#7c3aed"
            background="#f5f3ff"
          >

            <WorkspaceOptimization />

          </IntelligencePanel>


          {/* Heatmap */}

          <IntelligencePanel
            icon={<GridViewIcon />}
            title="Occupancy Heatmap"
            subtitle="Visualize occupancy intensity across monitored rooms and facilities."
            color="#4f46e5"
            background="#eef2ff"
          >

            <OccupancyHeatmap />

          </IntelligencePanel>


          {/* ================================================= */}
          {/* SECURITY INTELLIGENCE */}
          {/* ================================================= */}

          <IntelligenceHeading
            icon={<SecurityIcon />}
            title="Security Intelligence"
            subtitle="Monitor access activity, security events and potential facility threats."
            color="#7c3aed"
            background="#ede9fe"
          />


          <DashboardContainer color="#7c3aed">

            <SecurityCards />

          </DashboardContainer>


          {/* Security Alerts */}

          <IntelligencePanel
            icon={<NotificationsActiveIcon />}
            title="Security Alerts"
            subtitle="Important security events identified by the Security Agent."
            color="#dc2626"
            background="#fef2f2"
          >

            <SecurityAlerts />

          </IntelligencePanel>


          {/* Access Monitoring */}

          <IntelligencePanel
            icon={<LoginIcon />}
            title="Access Monitoring"
            subtitle="Monitor entry, exit and access activity across facilities."
            color="#7c3aed"
            background="#f5f3ff"
          >

            <AccessMonitoringTable />

          </IntelligencePanel>


          {/* ================================================= */}
          {/* CCTV INTELLIGENCE */}
          {/* ================================================= */}

          <IntelligenceHeading
            icon={<VideocamIcon />}
            title="CCTV Intelligence"
            subtitle="AI-assisted surveillance monitoring and CCTV event intelligence."
            color="#8b5cf6"
            background="#f3e8ff"
          />


          <DashboardContainer color="#8b5cf6">

            <CCTVSummaryCards />

          </DashboardContainer>


          {/* CCTV Grid */}

          <Grid
            container
            spacing={3}
            sx={{
              mt: 0.5
            }}
          >

            <Grid
              size={{
                xs: 12,
                lg: 5
              }}
            >

              <IntelligencePanel
                icon={<NotificationsActiveIcon />}
                title="CCTV Alerts"
                subtitle="Suspicious and important surveillance events."
                color="#dc2626"
                background="#fef2f2"
              >

                <CCTVAlerts />

              </IntelligencePanel>

            </Grid>


            <Grid
              size={{
                xs: 12,
                lg: 7
              }}
            >

              <IntelligencePanel
                icon={<VideocamIcon />}
                title="CCTV Monitoring"
                subtitle="Live monitoring status of surveillance cameras."
                color="#8b5cf6"
                background="#f5f3ff"
              >

                <CCTVMonitoring />

              </IntelligencePanel>

            </Grid>

          </Grid>


          <Box sx={{ mb: 6 }} />

        </Box>

      </Box>

    </Box>

  );

}


/* ================================================= */
/* SECTION HEADING */
/* ================================================= */

function IntelligenceHeading({
  icon,
  title,
  subtitle,
  color,
  background
}) {

  return (

    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"

      sx={{
        mt: 5,
        mb: 2
      }}
    >

      <Avatar
        sx={{
          width: 46,
          height: 46,

          bgcolor: background,
          color: color
        }}
      >
        {icon}
      </Avatar>


      <Box>

        <Typography
          variant="h5"
          fontWeight={800}
          color="#0f172a"
        >
          {title}
        </Typography>


        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.3
          }}
        >
          {subtitle}
        </Typography>

      </Box>

    </Stack>

  );

}


/* ================================================= */
/* KPI CONTAINER */
/* ================================================= */

function DashboardContainer({
  children,
  color
}) {

  return (

    <Box
      sx={{
        p: {
          xs: 1.5,
          md: 2
        },

        borderRadius: 4,

        bgcolor:
          "rgba(255,255,255,0.80)",

        border:
          "1px solid #e5e7eb",

        borderTop:
          `3px solid ${color}`,

        boxShadow:
          "0 5px 20px rgba(15,23,42,0.05)"
      }}
    >
      {children}
    </Box>

  );

}


/* ================================================= */
/* CONTENT PANEL */
/* ================================================= */

function IntelligencePanel({
  icon,
  title,
  subtitle,
  children,
  color,
  background
}) {

  return (

    <Box
      sx={{
        mt: 3,

        height: "100%",

        borderRadius: 4,

        bgcolor: "white",

        border:
          "1px solid #e5e7eb",

        boxShadow:
          "0 5px 20px rgba(15,23,42,0.05)",

        overflow: "hidden",

        transition:
          "all 0.25s ease",

        "&:hover": {

          transform:
            "translateY(-3px)",

          boxShadow:
            "0 12px 30px rgba(15,23,42,0.09)"
        }
      }}
    >

      {/* Header */}

      <Box
        sx={{
          px: 2.5,
          py: 2,

          bgcolor: background,

          borderBottom:
            "1px solid #e5e7eb"
        }}
      >

        <Stack
          direction="row"
          spacing={1.3}
          alignItems="center"
        >

          <Avatar
            sx={{
              width: 38,
              height: 38,

              bgcolor: "white",
              color: color,

              boxShadow:
                "0 2px 8px rgba(15,23,42,0.08)"
            }}
          >
            {icon}
          </Avatar>


          <Box>

            <Typography
              fontWeight={700}
              color="#0f172a"
            >
              {title}
            </Typography>


            <Typography
              variant="caption"
              color="text.secondary"
            >
              {subtitle}
            </Typography>

          </Box>

        </Stack>

      </Box>


      {/* Content */}

      <Box
        sx={{
          p: 1.5
        }}
      >
        {children}
      </Box>

    </Box>

  );

}


export default SecurityDashboard;