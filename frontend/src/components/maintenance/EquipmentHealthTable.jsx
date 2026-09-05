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
  Chip,
  TableContainer,
} from "@mui/material";

import { API_BASE_URL } from "../../services/api";


export default function EquipmentHealthTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/equipment-health`
      );

      setData(res.data);
    } catch (error) {
      console.error(
        "Equipment Health Error:",
        error
      );
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "Excellent":
        return "success";

      case "Good":
        return "primary";

      case "Fair":
        return "warning";

      case "Poor":
        return "warning";

      case "Critical":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>

      <Typography variant="h6" gutterBottom>
        Equipment Health
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <b>Asset ID</b>
              </TableCell>

              <TableCell>
                <b>Health Score</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell>
                <b>Temperature (°C)</b>
              </TableCell>

              <TableCell>
                <b>Vibration</b>
              </TableCell>

              <TableCell>
                <b>Pressure</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {data.slice(0, 15).map((item) => (

              <TableRow key={item.health_id}>

                <TableCell>
                  {item.asset_id}
                </TableCell>

                <TableCell>
                  {item.health_score}
                </TableCell>

                <TableCell>

                  <Chip
                    label={item.health_status}
                    color={getColor(item.health_status)}
                    size="small"
                  />

                </TableCell>

                <TableCell>
                  {item.temperature_c}
                </TableCell>

                <TableCell>
                  {item.vibration_mm_s}
                </TableCell>

                <TableCell>
                  {item.pressure_psi}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>
  );
}