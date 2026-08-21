import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";

function OvercrowdingAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api
      .get("/overcrowding-alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) =>
        console.log("Overcrowding Alerts Error:", err)
      );
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
        👥 Overcrowding Alerts
      </Typography>

      {alerts.length === 0 ? (
        <Typography color="text.secondary">
          No overcrowding conditions detected.
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: 420,
            overflowY: "auto",
          }}
        >
          {alerts.slice(0, 15).map((alert, index) => (
            <Card
              key={`${alert.room_id}-${alert.date}-${alert.time}-${index}`}
              sx={{
                mb: 2,
                borderLeft:
                  alert.priority === "Critical"
                    ? "6px solid #b71c1c"
                    : "6px solid #ed6c02",
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
                    <GroupsIcon />

                    <Typography fontWeight="bold">
                      {alert.room_id} — {alert.facility_id}
                    </Typography>
                  </Box>

                  <Chip
                    label={alert.priority}
                    color={
                      alert.priority === "Critical"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>

                <Typography>
                  {alert.message}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Room Type: {alert.room_type}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Occupancy: {alert.occupancy} / {alert.capacity}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Utilization: {alert.utilization}%
                </Typography>

                <Typography variant="body2" color="text.secondary">
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

export default OvercrowdingAlerts;