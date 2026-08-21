import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BusinessIcon from "@mui/icons-material/Business";

function CCTVSummaryCards() {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get("/cctv-summary")
      .then((res) => setData(res.data))
      .catch((err) => console.log("CCTV Summary Error:", err));
  }, []);

  const cards = [
    {
      title: "Total CCTV Events",
      value: data.total_cctv_events ?? "--",
      icon: <VideocamIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "High/Critical Events",
      value: data.high_severity_events ?? "--",
      icon: <ReportProblemIcon fontSize="large" />,
      color: "#d32f2f",
    },
    {
      title: "Open Events",
      value: data.open_events ?? "--",
      icon: <PendingActionsIcon fontSize="large" />,
      color: "#ed6c02",
    },
    {
      title: "Affected Facilities",
      value: data.affected_facilities ?? "--",
      icon: <BusinessIcon fontSize="large" />,
      color: "#7b1fa2",
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              borderLeft: `6px solid ${card.color}`,
              boxShadow: 2,
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
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {card.title}
                  </Typography>

                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
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

export default CCTVSummaryCards;