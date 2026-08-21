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

export default function MaintenanceScheduleTable() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/maintenance-schedule"
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const getPriorityColor = (priority) => {

    switch (priority) {

      case "Low":
        return "success";

      case "Medium":
        return "info";

      case "High":
        return "warning";

      case "Critical":
        return "error";

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
        Maintenance Schedule
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Asset ID</b></TableCell>

              <TableCell><b>Predicted Date</b></TableCell>

              <TableCell><b>Maintenance Type</b></TableCell>

              <TableCell><b>Priority</b></TableCell>

              <TableCell><b>Status</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {data.slice(0,15).map((item) => (

              <TableRow key={item.schedule_id}>

                <TableCell>{item.asset_id}</TableCell>

                <TableCell>{item.predicted_date}</TableCell>

                <TableCell>{item.maintenance_type}</TableCell>

                <TableCell>

                  <Chip
                    label={item.priority}
                    color={getPriorityColor(item.priority)}
                    size="small"
                  />

                </TableCell>

                <TableCell>{item.status}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}