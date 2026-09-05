import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Avatar,
  Chip,
  Alert
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


// Icons

import SavingsIcon
  from "@mui/icons-material/Savings";

import AutoGraphIcon
  from "@mui/icons-material/AutoGraph";

import SmartToyIcon
  from "@mui/icons-material/SmartToy";

import AnalyticsIcon
  from "@mui/icons-material/Analytics";

import DescriptionIcon
  from "@mui/icons-material/Description";

import AccountBalanceWalletIcon
  from "@mui/icons-material/AccountBalanceWallet";

import EnergySavingsLeafIcon
  from "@mui/icons-material/EnergySavingsLeaf";


function ExecutiveDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [collapsed, setCollapsed] =
    useState(false);


  // ==========================================
  // Fetch Executive Intelligence
  // ==========================================

  useEffect(() => {

    fetch(
      `${API_BASE_URL}/enterprise-intelligence`
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

        setError(
          "Unable to load cost optimization intelligence."
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
          minHeight: "100vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",

          gap: 2,

          background:
            "linear-gradient(135deg, #f0fdf4, #f8fafc)"
        }}
      >

        <CircularProgress
          size={48}
          thickness={4}
          color="success"
        />

        <Typography
          fontWeight={600}
          color="text.secondary"
        >
          Loading Cost Optimization Intelligence...
        </Typography>

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

        background:
          "linear-gradient(180deg, #f0fdf4 0px, #f8fafc 380px)"
      }}
    >

      {/* Sidebar */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* Main */}

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


          {/* Cost Optimization Hero */}

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
                "linear-gradient(135deg, #064e3b 0%, #047857 48%, #10b981 100%)",

              boxShadow:
                "0 12px 30px rgba(5, 150, 105, 0.20)"
            }}
          >

            <Box
              sx={{
                position: "absolute",

                width: 230,
                height: 230,

                borderRadius: "50%",

                bgcolor:
                  "rgba(255,255,255,0.07)",

                right: -60,
                top: -90
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

                right: 130,
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

                  <SavingsIcon
                    sx={{
                      fontSize: 34
                    }}
                  />

                </Avatar>


                <Box>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    Cost Optimization
                  </Typography>


                  <Typography
                    sx={{
                      mt: 0.6,

                      opacity: 0.9,

                      maxWidth: 720
                    }}
                  >
                    AI-driven operational cost
                    intelligence, resource
                    optimization and executive
                    facility insights.
                  </Typography>

                </Box>

              </Stack>


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
                  icon={
                    <AutoGraphIcon />
                  }

                  label="Live Intelligence"

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


          {/* Error */}

          {error && (

            <Alert
              severity="error"
              sx={{
                mt: 3,
                borderRadius: 3
              }}
            >
              {error}
            </Alert>

          )}


          {/* Intelligence Features */}

          <SectionContainer
            icon={
              <AnalyticsIcon />
            }

            title="Facility Intelligence"

            subtitle={
              "Enterprise-level intelligence generated across facility operations."
            }
          >

            <FacilityIntelligenceFeatures />

          </SectionContainer>


          {/* Executive KPI Cards */}

          <SectionContainer
            icon={
              <AutoGraphIcon />
            }

            title="Executive Performance Overview"

            subtitle={
              "Key financial and operational indicators from the optimization engine."
            }
          >

            <ExecutiveKpiCards
              data={data}
            />

          </SectionContainer>


          {/* Cost + Sustainability */}

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
                lg: 8
              }}
            >

              <DashboardPanel
                icon={
                  <AccountBalanceWalletIcon />
                }

                title="Operational Cost Analysis"

                subtitle={
                  "Analyze facility operating cost distribution."
                }
              >

                <CostDistributionChart />

              </DashboardPanel>

            </Grid>


            <Grid
              size={{
                xs: 12,
                lg: 4
              }}
            >

              <DashboardPanel
                icon={
                  <EnergySavingsLeafIcon />
                }

                title="Sustainability Intelligence"

                subtitle={
                  "Energy efficiency and sustainability indicators."
                }
              >

                <SustainabilityMetrics
                  data={data}
                />

              </DashboardPanel>

            </Grid>

          </Grid>


          {/* Resource Utilization */}

          <SectionContainer
            icon={
              <AnalyticsIcon />
            }

            title="Resource Utilization Analytics"

            subtitle={
              "Combined intelligence from occupancy, rooms, security and asset operations."
            }
          >

            <ResourceUtilizationSummary
              data={data}
            />

          </SectionContainer>


          {/* AI Agent Performance */}

          <SectionContainer
            icon={
              <SmartToyIcon />
            }

            title="AI Agent Performance Monitoring"

            subtitle={
              "Operational performance of the agents coordinating FacilityOps intelligence."
            }
          >

            <AgentPerformancePanel />

          </SectionContainer>


          {/* Cost Recommendations */}

          <SectionContainer
            icon={
              <SavingsIcon />
            }

            title="AI Cost Saving Recommendations"

            subtitle={
              "Prioritized opportunities identified by the Cost Optimization Agent."
            }
          >

            <CostSavingRecommendations />

          </SectionContainer>


          {/* Intelligence Report */}

          <SectionContainer
            icon={
              <DescriptionIcon />
            }

            title="Facility Intelligence Report"

            subtitle={
              "Generate and download consolidated executive facility intelligence."
            }
          >

            <FacilityIntelligenceReport />

          </SectionContainer>


          <Box sx={{ mb: 6 }} />

        </Box>

      </Box>

    </Box>

  );

}


// ==========================================
// Reusable Section Container
// ==========================================

function SectionContainer({
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
            width: 40,
            height: 40,

            bgcolor: "#dcfce7",
            color: "#047857"
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
            "rgba(255,255,255,0.72)",

          border:
            "1px solid #e7eee9",

          boxShadow:
            "0 4px 20px rgba(15,23,42,0.04)"
        }}
      >
        {children}
      </Box>

    </Box>

  );

}


// ==========================================
// Chart / Dashboard Panel
// ==========================================

function DashboardPanel({
  icon,
  title,
  subtitle,
  children
}) {

  return (

    <Box
      sx={{
        height: "100%",

        mt: 3,

        borderRadius: 4,

        bgcolor: "white",

        border:
          "1px solid #e7eee9",

        boxShadow:
          "0 5px 20px rgba(15,23,42,0.05)",

        overflow: "hidden",

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform:
            "translateY(-3px)",

          boxShadow:
            "0 12px 30px rgba(15,23,42,0.08)"
        }
      }}
    >

      <Box
        sx={{
          px: 2.5,
          py: 2,

          background:
            "linear-gradient(90deg,#ffffff,#f0fdf4)",

          borderBottom:
            "1px solid #eef2f0"
        }}
      >

        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
        >

          <Box
            sx={{
              color: "#059669",

              display: "flex"
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


export default ExecutiveDashboard;