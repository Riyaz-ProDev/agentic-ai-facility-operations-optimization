import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function WorkspaceOptimization() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    api
      .get("/workspace-allocation")
      .then((res) => setRecommendations(res.data))
      .catch((err) =>
        console.log("Workspace Optimization Error:", err)
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
        🏢 Workspace Allocation Optimization
      </Typography>

      {recommendations.length === 0 ? (
        <Typography color="text.secondary">
          No workspace optimization recommendations available.
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: 420,
            overflowY: "auto",
          }}
        >
          {recommendations.slice(0, 15).map((item, index) => (
            <Card
              key={`${item.room_id}-${index}`}
              sx={{
                mb: 2,
                borderLeft:
                  item.priority === "High"
                    ? "6px solid #d32f2f"
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
                    <MeetingRoomIcon />

                    <Typography fontWeight="bold">
                      {item.room_id} — {item.facility_id}
                    </Typography>
                  </Box>

                  <Chip
                    label={item.status}
                    color={
                      item.priority === "High"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>

                <Typography sx={{ mb: 1 }}>
                  {item.recommendation}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Room Type: {item.room_type}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Capacity: {item.capacity}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Average Occupancy: {item.average_occupancy}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Utilization: {item.average_utilization}%
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default WorkspaceOptimization;