import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

export default function MaintenancePriorityChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/maintenance-priority"
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>

      <Typography
        variant="h6"
        gutterBottom
      >
        Maintenance Priority
      </Typography>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="priority" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#1976d2"
          />

        </BarChart>

      </ResponsiveContainer>

    </Paper>
  );
}