import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ApartmentIcon from "@mui/icons-material/Apartment";

function OccupancyCards() {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get("/occupancy-summary")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Occupancy Summary Error:", err);
      });
  }, []);

  const cards = [
    {
      title: "Average Occupancy",
      value: data.average_occupancy ?? "--",
      icon: <GroupsIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Peak Occupancy",
      value: data.peak_occupancy ?? "--",
      icon: <TrendingUpIcon fontSize="large" />,
      color: "#e53935",
    },
    {
      title: "Minimum Occupancy",
      value: data.minimum_occupancy ?? "--",
      icon: <TrendingDownIcon fontSize="large" />,
      color: "#43a047",
    },
    {
      title: "High Occupancy Facilities",
      value: data.high_occupancy_facilities ?? "--",
      icon: <ApartmentIcon fontSize="large" />,
      color: "#ff9800",
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            sx={{
              height: "100%",
              borderLeft: `6px solid ${card.color}`,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box sx={{ color: card.color }}>
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default OccupancyCards;