import { Box, Grid } from "@mui/material";

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

function SecurityDashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          px: { xs: 2, md: 3 },
          py: 2,
        }}
      >
        {/* Centered Content Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1500px",
            mx: "auto",
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* ========================================
              OCCUPANCY INTELLIGENCE
          ======================================== */}

          <Box sx={{ mt: 3, mb: 2 }}>
            <h2>👥 Occupancy Intelligence</h2>
          </Box>

          {/* Occupancy KPI Cards */}
          <OccupancyCards />

          {/* Occupancy Charts */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OccupancyTrend />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FacilityOccupancyChart />
            </Grid>
          </Grid>

          {/* Overcrowding Alerts */}
          <Box sx={{ mt: 3 }}>
            <OvercrowdingAlerts />
          </Box>

          {/* Workspace Optimization */}
          <Box sx={{ mt: 3 }}>
            <WorkspaceOptimization />
          </Box>

          {/* Occupancy Heatmap */}
          <Box sx={{ mt: 3 }}>
            <OccupancyHeatmap />
          </Box>

          {/* ========================================
              SECURITY INTELLIGENCE
          ======================================== */}

          <Box sx={{ mt: 5, mb: 2 }}>
            <h2>🔐 Security Intelligence</h2>
          </Box>

          {/* Security KPI Cards */}
          <SecurityCards />

          {/* Security Alerts */}
          <Box sx={{ mt: 3 }}>
            <SecurityAlerts />
          </Box>

          {/* Access Monitoring */}
          <Box sx={{ mt: 3 }}>
            <AccessMonitoringTable />
          </Box>

          {/* ========================================
              CCTV INTELLIGENCE
          ======================================== */}

          <Box sx={{ mt: 5, mb: 2 }}>
            <h2>📹 CCTV Intelligence</h2>
          </Box>

          {/* CCTV KPI Cards */}
          <CCTVSummaryCards />

          {/* CCTV Alerts + Monitoring */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <CCTVAlerts />
            </Grid>

            <Grid size={{ xs: 12, lg: 7 }}>
              <CCTVMonitoring />
            </Grid>
          </Grid>

          {/* Bottom spacing */}
          <Box sx={{ mb: 5 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default SecurityDashboard;