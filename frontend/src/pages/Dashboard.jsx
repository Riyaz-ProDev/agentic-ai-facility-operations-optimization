import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCards from "../components/DashboardCards";
import EnergyChart from "../components/EnergyChart";
import FacilityChart from "../components/FacilityChart";
import TemperatureHumidityChart from "../components/TemperatureHumidityChart";
import RecommendationPanel from "../components/RecommendationPanel";
import FacilityTable from "../components/FacilityTable";

// Predictive Maintenance Components
import MaintenanceDashboardCards from "../components/maintenance/MaintenanceDashboardCards";
import HealthDistributionChart from "../components/maintenance/HealthDistributionChart";
import MaintenancePriorityChart from "../components/maintenance/MaintenancePriorityChart";
import EquipmentHealthTable from "../components/maintenance/EquipmentHealthTable";
import MaintenanceScheduleTable from "../components/maintenance/MaintenanceScheduleTable";
import MaintenanceAlertsTable from "../components/maintenance/MaintenanceAlertsTable";

export default function Dashboard() {

  const [activeSection, setActiveSection] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const drawerWidth = collapsed ? 70 : 220;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {

    const sections = [
      "dashboard",
      "energy",
      "facilities",
      "sensors",
      "maintenance",
      "ai",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();

  }, []);

  return (

    <Box sx={{ display: "flex", bgcolor: "#f5f7fa" }}>

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      <Box
        sx={{
          flex: 1,
          ml: `${drawerWidth}px`,
          transition: "margin 0.3s ease",
          p: 2,
        }}
      >

        <Navbar />

        {/* Dashboard */}

        <Box id="dashboard" sx={{ mt: 2 }}>
          <DashboardCards />
        </Box>

        {/* Energy */}

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, lg: 6 }} id="energy">
            <EnergyChart />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} id="facilities">
            <FacilityChart />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} id="sensors">
            <TemperatureHumidityChart />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} id="ai">
            <RecommendationPanel />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FacilityTable />
          </Grid>

        </Grid>

        {/* ================================================= */}

        {/* Predictive Maintenance */}

        <Box id="maintenance" sx={{ mt: 6 }}>

          <h2>Predictive Maintenance</h2>

          <MaintenanceDashboardCards />

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid size={{ xs: 12, lg: 6 }}>
              <HealthDistributionChart />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <MaintenancePriorityChart />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <EquipmentHealthTable />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <MaintenanceScheduleTable />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <MaintenanceAlertsTable />
            </Grid>

          </Grid>

        </Box>

      </Box>

    </Box>

  );
}