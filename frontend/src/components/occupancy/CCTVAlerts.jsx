import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";

function CCTVAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api
      .get("/cctv-alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.log("CCTV Alerts Error:", err));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        🚨 CCTV Security Alerts
      </Typography>

      <Box
        sx={{
          maxHeight: 420,
          overflowY: "auto",
        }}
      >
        {alerts.slice(0, 15).map((alert) => (
          <Card
            key={alert.event_id}
            sx={{
              mb: 2,
              borderLeft:
                alert.severity === "Critical"
                  ? "6px solid #b71c1c"
                  : "6px solid #f57c00",
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <VideocamIcon />

                  <Typography fontWeight="bold">
                    {alert.facility} - {alert.camera_id}
                  </Typography>
                </Box>

                <Chip
                  label={alert.severity}
                  color={
                    alert.severity === "Critical"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />
              </Box>

              <Typography fontWeight={600}>
                {alert.event_type}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {alert.message}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Location: {alert.location}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Status: {alert.status}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {alert.date} • {alert.time}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CCTVAlerts;