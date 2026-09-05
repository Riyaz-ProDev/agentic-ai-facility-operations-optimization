import {
  Box,
  Grid,
  Typography
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


export default function EnergyIntelligence() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f7fa"
      }}
    >

      {/* ============================== */}
      {/* Sidebar */}
      {/* ============================== */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* ============================== */}
      {/* Main Content */}
      {/* ============================== */}

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


          {/* ============================== */}
          {/* Page Heading */}
          {/* ============================== */}

          <Box sx={{ mt: 3, mb: 3 }}>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              ⚡ Energy Intelligence
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Monitor energy consumption,
              facility performance,
              environmental conditions and
              AI-powered energy recommendations.
            </Typography>

          </Box>


          {/* ============================== */}
          {/* Energy KPI Cards */}
          {/* ============================== */}

          <DashboardCards />


          {/* ============================== */}
          {/* Energy Analytics */}
          {/* ============================== */}

          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
          >

            {/* Energy Consumption Trend */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >
              <EnergyChart />
            </Grid>


            {/* Facility Energy Usage */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >
              <FacilityChart />
            </Grid>


            {/* Temperature & Humidity */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >
              <TemperatureHumidityChart />
            </Grid>


            {/* AI Recommendations */}

            <Grid
              size={{
                xs: 12,
                lg: 6
              }}
            >
              <RecommendationPanel />
            </Grid>


            {/* Facility Details */}

            <Grid
              size={{
                xs: 12
              }}
            >
              <FacilityTable />
            </Grid>

          </Grid>

        </Box>

      </Box>

    </Box>

  );

}