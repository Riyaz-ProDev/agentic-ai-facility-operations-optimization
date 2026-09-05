import { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Typography
} from "@mui/material";

import { API_BASE_URL } from "../../services/api";


export default function MaintenanceDashboardCards() {

  const [data, setData] = useState({
    total_assets: 0,
    healthy_assets: 0,
    warning_assets: 0,
    critical_assets: 0,
    maintenance_count: 0,
    active_alerts: 0,
  });


  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    try {

      const res = await axios.get(
        `${API_BASE_URL}/maintenance-dashboard`
      );

      setData(res.data);

    } catch (error) {

      console.error(
        "Maintenance Dashboard Error:",
        error
      );

    }

  };


  const cards = [

    {
      title: "Total Assets",
      value: data.total_assets,
      color: "#1976d2",
    },

    {
      title: "Healthy Assets",
      value: data.healthy_assets,
      color: "#2e7d32",
    },

    {
      title: "Warning Assets",
      value: data.warning_assets,
      color: "#ed6c02",
    },

    {
      title: "Critical Assets",
      value: data.critical_assets,
      color: "#d32f2f",
    },

    {
      title: "Maintenance",
      value: data.maintenance_count,
      color: "#6a1b9a",
    },

    {
      title: "Active Alerts",
      value: data.active_alerts,
      color: "#455a64",
    },

  ];


  return (

    <Grid
      container
      spacing={2}
      sx={{ mt: 2 }}
    >

      {cards.map((card) => (

        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2
          }}
        >

          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderLeft: `6px solid ${card.color}`,
              borderRadius: 2,
            }}
          >

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {card.title}
            </Typography>


            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: card.color
              }}
            >
              {card.value}
            </Typography>

          </Paper>

        </Grid>

      ))}

    </Grid>

  );

}