import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

function OccupancyHeatmap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/occupancy-heatmap")
      .then((res) => setData(res.data))
      .catch((err) =>
        console.log("Occupancy Heatmap Error:", err)
      );
  }, []);

  const getColor = (level) => {
    switch (level) {
      case "Critical":
        return "#d32f2f";

      case "High":
        return "#f57c00";

      case "Normal":
        return "#43a047";

      case "Low":
        return "#1976d2";

      default:
        return "#9e9e9e";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        🗺️ Occupancy Heatmap
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Room utilization across facilities
      </Typography>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {[
          ["Low", "#1976d2"],
          ["Normal", "#43a047"],
          ["High", "#f57c00"],
          ["Critical", "#d32f2f"],
        ].map(([label, color]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: color,
                borderRadius: "3px",
              }}
            />

            <Typography variant="body2">
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Heatmap */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(95px, 1fr))",
          gap: 1.5,
        }}
      >
        {data.map((room) => (
          <Tooltip
            key={room.room_id}
            arrow
            title={
              <Box>
                <div>
                  Room: {room.room_id}
                </div>

                <div>
                  Facility: {room.facility_id}
                </div>

                <div>
                  Type: {room.room_type}
                </div>

                <div>
                  Utilization: {room.utilization}%
                </div>

                <div>
                  Level: {room.level}
                </div>
              </Box>
            }
          >
            <Box
              sx={{
                backgroundColor: getColor(room.level),
                color: "#fff",
                borderRadius: 2,
                p: 1.5,
                textAlign: "center",
                cursor: "pointer",
                transition: "0.2s",

                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
              >
                {room.room_id}
              </Typography>

              <Typography variant="caption">
                {room.utilization}%
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

export default OccupancyHeatmap;