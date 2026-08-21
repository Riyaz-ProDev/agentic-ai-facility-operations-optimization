import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function SecurityAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api
      .get("/security-alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) =>
        console.log("Security Alerts Error:", err)
      );
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        🚨 Security Alerts
      </Typography>

      {alerts.length === 0 ? (
        <Typography color="text.secondary">
          No security alerts detected.
        </Typography>
      ) : (
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
                  alert.priority === "High"
                    ? "5px solid #d32f2f"
                    : "5px solid #ed6c02",
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
                    <WarningAmberIcon
                      color={
                        alert.priority === "High"
                          ? "error"
                          : "warning"
                      }
                    />

                    <Typography fontWeight="bold">
                      {alert.facility}
                    </Typography>
                  </Box>

                  <Chip
                    label={`${alert.priority} Priority`}
                    color={
                      alert.priority === "High"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>

                <Typography sx={{ mb: 1 }}>
                  {alert.message}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Event: {alert.event_id}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Person: {alert.person}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Door: {alert.door}
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
      )}
    </Box>
  );
}

export default SecurityAlerts;