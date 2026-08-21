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

function AccessMonitoringTable() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get("/access-monitoring")
      .then((res) => setEvents(res.data))
      .catch((err) =>
        console.log("Access Monitoring Error:", err)
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
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        🔎 Access Monitoring
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          boxShadow: "none",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Event ID</strong>
              </TableCell>

              <TableCell>
                <strong>Facility</strong>
              </TableCell>

              <TableCell>
                <strong>Person</strong>
              </TableCell>

              <TableCell>
                <strong>Date</strong>
              </TableCell>

              <TableCell>
                <strong>Time</strong>
              </TableCell>

              <TableCell>
                <strong>Access Type</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell>
                <strong>Door</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((event) => (
              <TableRow
                key={event.Event_ID}
                hover
              >
                <TableCell>
                  {event.Event_ID}
                </TableCell>

                <TableCell>
                  {event.Facility_ID}
                </TableCell>

                <TableCell>
                  {event.Person_ID}
                </TableCell>

                <TableCell>
                  {event.Date}
                </TableCell>

                <TableCell>
                  {event.Time}
                </TableCell>

                <TableCell>
                  {event.Access_Type}
                </TableCell>

                <TableCell>
                  <Chip
                    label={event.Access_Status}
                    color={
                      event.Access_Status === "Denied"
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {event.Door_ID}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AccessMonitoringTable;