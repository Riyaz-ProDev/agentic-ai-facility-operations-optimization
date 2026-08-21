import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import BlockIcon from "@mui/icons-material/Block";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function SecurityCards() {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get("/security-summary")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Security Summary Error:", err));
  }, []);

  const cards = [
    {
      title: "Total Access Events",
      value: data.total_access_events ?? "--",
      icon: <LoginIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Denied Access",
      value: data.denied_access ?? "--",
      icon: <BlockIcon fontSize="large" />,
      color: "#d32f2f",
    },
    {
      title: "Restricted Hour Events",
      value: data.restricted_hour_events ?? "--",
      icon: <AccessTimeIcon fontSize="large" />,
      color: "#ed6c02",
    },
    {
      title: "Affected Facilities",
      value: data.affected_facilities ?? "--",
      icon: <WarningAmberIcon fontSize="large" />,
      color: "#9c27b0",
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

export default SecurityCards;