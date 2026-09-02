import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  CircularProgress
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ExecutiveKpiCards
  from "../components/executive/ExecutiveKpiCards";

import CostDistributionChart
  from "../components/executive/CostDistributionChart";

import AgentPerformancePanel
  from "../components/executive/AgentPerformancePanel";

import CostSavingRecommendations
  from "../components/executive/CostSavingRecommendations";

import FacilityIntelligenceFeatures
  from "../components/executive/FacilityIntelligenceFeatures";

import SustainabilityMetrics
  from "../components/executive/SustainabilityMetrics";

import ResourceUtilizationSummary
  from "../components/executive/ResourceUtilizationSummary";

import FacilityIntelligenceReport
  from "../components/executive/FacilityIntelligenceReport";


function ExecutiveDashboard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // Fetch Executive Intelligence Data
  // ==========================================

  useEffect(() => {

    fetch(
      "http://127.0.0.1:8000/enterprise-intelligence"
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to load executive intelligence data"
          );
        }

        return response.json();

      })

      .then((result) => {

        setData(result);
        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Executive Dashboard Error:",
          error
        );

        setLoading(false);

      });

  }, []);


  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <CircularProgress />
      </Box>

    );

  }


  // ==========================================
  // Executive Dashboard
  // ==========================================

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa"
      }}
    >

      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

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

          {/* ===================================== */}
          {/* Navbar */}
          {/* ===================================== */}

          <Navbar />


          {/* ===================================== */}
          {/* Facility Intelligence Features */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <FacilityIntelligenceFeatures />

          </Box>


          {/* ===================================== */}
          {/* Executive KPI Cards */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <ExecutiveKpiCards
              data={data}
            />

          </Box>


          {/* ===================================== */}
          {/* Cost Distribution + Sustainability */}
          {/* ===================================== */}

          <Grid
            container
            spacing={3}
            sx={{ mt: 1 }}
          >

            {/* Operational Cost Analysis */}

            <Grid
              size={{
                xs: 12,
                lg: 8
              }}
            >

              <CostDistributionChart />

            </Grid>


            {/* Sustainability Metrics */}

            <Grid
              size={{
                xs: 12,
                lg: 4
              }}
            >

              <SustainabilityMetrics
                data={data}
              />

            </Grid>

          </Grid>


          {/* ===================================== */}
          {/* Resource Utilization Analytics */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <ResourceUtilizationSummary
              data={data}
            />

          </Box>


          {/* ===================================== */}
          {/* Agent Performance Monitoring */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <AgentPerformancePanel />

          </Box>


          {/* ===================================== */}
          {/* Cost Saving Recommendations */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <CostSavingRecommendations />

          </Box>


          {/* ===================================== */}
          {/* Facility Intelligence Report */}
          {/* ===================================== */}

          <Box sx={{ mt: 3 }}>

            <FacilityIntelligenceReport />

          </Box>


          {/* ===================================== */}
          {/* Bottom Space */}
          {/* ===================================== */}

          <Box sx={{ mb: 5 }} />

        </Box>

      </Box>

    </Box>

  );

}


export default ExecutiveDashboard;