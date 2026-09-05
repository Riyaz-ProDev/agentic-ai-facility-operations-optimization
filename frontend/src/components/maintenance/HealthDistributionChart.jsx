import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Paper,
  Typography
} from "@mui/material";

import { API_BASE_URL } from "../../services/api";


const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#F44336",
  "#9C27B0",
];


export default function HealthDistributionChart() {

  const [data, setData] = useState([]);


  useEffect(() => {
    loadChart();
  }, []);


  const loadChart = async () => {

    try {

      const res = await axios.get(
        `${API_BASE_URL}/health-distribution`
      );

      setData(res.data);

    } catch (error) {

      console.error(
        "Health Distribution Error:",
        error
      );

    }

  };


  return (

    <Paper
      elevation={3}
      sx={{ p: 2 }}
    >

      <Typography
        variant="h6"
        gutterBottom
      >
        Health Distribution
      </Typography>


      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="health_status"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </Paper>

  );

}