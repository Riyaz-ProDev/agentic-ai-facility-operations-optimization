import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function CCTVMonitoring() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get("/cctv-monitoring")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("CCTV Monitoring Error:", err));
  }, []);

  const getSeverityColor = (severity) => {
    if (severity === "Critical") return "error";
    if (severity === "High") return "error";
    if (severity === "Medium") return "warning";
    return "success";
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
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        📹 CCTV Event Monitoring
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          overflowX: "auto",
          boxShadow: "none",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 100 }}>
                <strong>Event ID</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 100 }}>
                <strong>Camera</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 100 }}>
                <strong>Facility</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 150 }}>
                <strong>Location</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 180 }}>
                <strong>Event Type</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 110 }}>
                <strong>Severity</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 120 }}>
                <strong>Status</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 120 }}>
                <strong>Date</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 100 }}>
                <strong>Time</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 300 }}>
                <strong>Description</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((event) => (
              <TableRow key={event.Event_ID} hover>
                <TableCell>{event.Event_ID}</TableCell>

                <TableCell>{event.Camera_ID}</TableCell>

                <TableCell>{event.Facility_ID}</TableCell>

                <TableCell>{event.Location}</TableCell>

                <TableCell>{event.Event_Type}</TableCell>

                <TableCell>
                  <Chip
                    label={event.Severity}
                    color={getSeverityColor(event.Severity)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={event.Status}
                    color={
                      event.Status === "Open"
                        ? "error"
                        : event.Status === "Investigating"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{event.Date}</TableCell>

                <TableCell>{event.Time}</TableCell>

                <TableCell>{event.Description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CCTVMonitoring;