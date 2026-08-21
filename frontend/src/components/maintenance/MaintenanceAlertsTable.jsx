import { useEffect, useState } from "react";
import axios from "axios";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
} from "@mui/material";

export default function MaintenanceAlertsTable() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/recent-maintenance-alerts"
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const getSeverityColor = (severity) => {

    switch (severity) {

      case "Critical":
        return "error";

      case "Warning":
        return "warning";

      case "Medium":
        return "info";

      case "Low":
        return "success";

      default:
        return "default";

    }

  };

  return (

    <Paper elevation={3} sx={{ p: 2 }}>

      <Typography
        variant="h6"
        gutterBottom
      >
        Recent Maintenance Alerts
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Asset ID</b></TableCell>

              <TableCell><b>Alert Type</b></TableCell>

              <TableCell><b>Severity</b></TableCell>

              <TableCell><b>Message</b></TableCell>

              <TableCell><b>Status</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {data.map((item) => (

              <TableRow key={item.alert_id}>

                <TableCell>{item.asset_id}</TableCell>

                <TableCell>{item.alert_type}</TableCell>

                <TableCell>

                  <Chip
                    label={item.severity}
                    color={getSeverityColor(item.severity)}
                    size="small"
                  />

                </TableCell>

                <TableCell>{item.message}</TableCell>

                <TableCell>{item.status}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}