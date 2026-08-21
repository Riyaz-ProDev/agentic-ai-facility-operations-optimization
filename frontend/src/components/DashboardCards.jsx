import { useEffect, useState } from "react";
import api from "../services/api";

import { Grid, Card, CardContent, Typography } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import BoltIcon from "@mui/icons-material/Bolt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

function DashboardCards() {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    {
      title: "Facilities",
      value: data.total_facilities,
      icon: <BusinessIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Energy (kWh)",
      value: data.total_energy,
      icon: <BoltIcon fontSize="large" />,
      color: "#ff9800",
    },
    {
      title: "Total Cost",
      value: `₹${data.total_cost}`,
      icon: <CurrencyRupeeIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Renewable",
      value: data.renewable_energy,
      icon: <EnergySavingsLeafIcon fontSize="large" />,
      color: "#43a047",
    },
    {
      title: "Temperature",
      value: `${data.avg_temperature} °C`,
      icon: <ThermostatIcon fontSize="large" />,
      color: "#e53935",
    },
    {
      title: "Humidity",
      value: `${data.avg_humidity}%`,
      icon: <WaterDropIcon fontSize="large" />,
      color: "#0288d1",
    },
    {
      title: "Air Quality",
      value: data.avg_air_quality,
      icon: <AirIcon fontSize="large" />,
      color: "#8e24aa",
    },
    {
      title: "Peak Demand",
      value: `${data.avg_peak_demand} kW`,
      icon: <ElectricBoltIcon fontSize="large" />,
      color: "#6d4c41",
    },
  ];

  return (
   <Grid
container
spacing={2}
sx={{
mt:0,
mb:2
}}
>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            sx={{
              borderLeft: `6px solid ${card.color}`,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {card.value}
                  </Typography>
                </div>

                <div style={{ color: card.color }}>{card.icon}</div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;