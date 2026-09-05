import {
  Box,
  Grid,
  Typography,
  Stack,
  Avatar,
  Chip
} from "@mui/material";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCards from "../components/DashboardCards";
import EnergyChart from "../components/EnergyChart";
import FacilityChart from "../components/FacilityChart";
import TemperatureHumidityChart from "../components/TemperatureHumidityChart";
import RecommendationPanel from "../components/RecommendationPanel";
import FacilityTable from "../components/FacilityTable";

// Icons
import BoltIcon from "@mui/icons-material/Bolt";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BusinessIcon from "@mui/icons-material/Business";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TableChartIcon from "@mui/icons-material/TableChart";


function Energy() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eff6ff 0px, #f8fafc 420px)"
      }}
    >

      {/* ================================ */}
      {/* Sidebar */}
      {/* ================================ */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* ================================ */}
      {/* Main Content */}
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


          {/* ================================ */}
          {/* ENERGY HERO */}
          {/* ================================ */}

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
                "linear-gradient(135deg, #0f3d91 0%, #2563eb 50%, #06b6d4 100%)",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.22)"
            }}
          >

            {/* Decorative Circle */}

            <Box
              sx={{
                position: "absolute",

                width: 230,
                height: 230,

                borderRadius: "50%",

                bgcolor:
                  "rgba(255,255,255,0.08)",

                right: -60,
                top: -100
              }}
            />


            <Box
              sx={{
                position: "absolute",

                width: 140,
                height: 140,

                borderRadius: "50%",

                bgcolor:
                  "rgba(255,255,255,0.05)",

                right: 180,
                bottom: -100
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

                  <BoltIcon
                    sx={{
                      fontSize: 38
                    }}
                  />

                </Avatar>


                <Box>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                  >
                    Energy Intelligence
                  </Typography>


                  <Typography
                    sx={{
                      mt: 0.6,
                      opacity: 0.9,
                      maxWidth: 700
                    }}
                  >
                    AI-powered energy monitoring,
                    facility consumption analytics and
                    intelligent efficiency recommendations.
                  </Typography>

                </Box>

              </Stack>


              {/* Right Status Chips */}

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >

                <Chip
                  icon={
                    <SmartToyIcon />
                  }

                  label="Energy Agent Active"

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
                  icon={
                    <AutoGraphIcon />
                  }

                  label="Live Analytics"

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


          {/* ================================ */}
          {/* ENERGY KPI CARDS */}
          {/* ================================ */}

          <EnergySection
            icon={<BoltIcon />}
            title="Energy Performance Overview"
            subtitle="Real-time energy and environmental performance across all facilities."
          >

            <DashboardCards />

          </EnergySection>


          {/* ================================ */}
          {/* ANALYTICS GRID */}
          {/* ================================ */}

          <Grid
            container
            spacing={3}
            sx={{
              mt: 0.5
            }}
          >

            {/* Energy Trend */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >

              <EnergyPanel
                icon={<AutoGraphIcon />}
                title="Energy Consumption Trend"
                subtitle="Monitor energy consumption patterns over time."
              >

                <EnergyChart />

              </EnergyPanel>

            </Grid>


            {/* Facility Usage */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >

              <EnergyPanel
                icon={<BusinessIcon />}
                title="Facility Energy Analysis"
                subtitle="Compare energy usage across facilities."
              >

                <FacilityChart />

              </EnergyPanel>

            </Grid>


            {/* Temperature Humidity */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >

              <EnergyPanel
                icon={<ThermostatIcon />}
                title="Environmental Monitoring"
                subtitle="Analyze temperature and humidity conditions."
              >

                <TemperatureHumidityChart />

              </EnergyPanel>

            </Grid>


            {/* AI Recommendations */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >

              <EnergyPanel
                icon={<SmartToyIcon />}
                title="AI Energy Recommendations"
                subtitle="Energy optimization suggestions generated by the Energy Agent."
              >

                <RecommendationPanel />

              </EnergyPanel>

            </Grid>

          </Grid>


          {/* ================================ */}
          {/* FACILITY ENERGY TABLE */}
          {/* ================================ */}

          <EnergySection
            icon={<TableChartIcon />}
            title="Facility Energy Intelligence"
            subtitle="Detailed facility-level energy and operational information."
          >

            <FacilityTable />

          </EnergySection>


          <Box sx={{ mb: 6 }} />

        </Box>

      </Box>

    </Box>

  );

}


/* ===================================================== */
/* ENERGY SECTION                                        */
/* ===================================================== */

function EnergySection({
  icon,
  title,
  subtitle,
  children
}) {

  return (

    <Box
      sx={{
        mt: 3.5
      }}
    >

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          mb: 1.8
        }}
      >

        <Avatar
          sx={{
            width: 42,
            height: 42,

            bgcolor: "#dbeafe",
            color: "#2563eb"
          }}
        >
          {icon}
        </Avatar>


        <Box>

          <Typography
            variant="h6"
            fontWeight={700}
            color="#0f172a"
          >
            {title}
          </Typography>


          <Typography
            variant="body2"
            color="text.secondary"
          >
            {subtitle}
          </Typography>

        </Box>

      </Stack>


      <Box
        sx={{
          p: {
            xs: 1.5,
            md: 2
          },

          borderRadius: 4,

          bgcolor:
            "rgba(255,255,255,0.78)",

          border:
            "1px solid #e2e8f0",

          boxShadow:
            "0 4px 20px rgba(15,23,42,0.04)"
        }}
      >
        {children}
      </Box>

    </Box>

  );

}


/* ===================================================== */
/* ENERGY ANALYTICS PANEL                                */
/* ===================================================== */

function EnergyPanel({
  icon,
  title,
  subtitle,
  children
}) {

  return (

    <Box
      sx={{
        mt: 3,

        height: "100%",

        borderRadius: 4,

        bgcolor: "white",

        border:
          "1px solid #e2e8f0",

        boxShadow:
          "0 5px 20px rgba(15,23,42,0.05)",

        overflow: "hidden",

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {

          transform:
            "translateY(-3px)",

          boxShadow:
            "0 12px 30px rgba(37,99,235,0.10)"
        }
      }}
    >

      {/* Panel Header */}

      <Box
        sx={{
          px: 2.5,
          py: 2,

          background:
            "linear-gradient(90deg,#ffffff,#eff6ff)",

          borderBottom:
            "1px solid #e2e8f0"
        }}
      >

        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
        >

          <Box
            sx={{
              display: "flex",
              color: "#2563eb"
            }}
          >
            {icon}
          </Box>


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


export default Energy;