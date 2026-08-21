import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function OccupancyTrend() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/occupancy-trend")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Occupancy Trend Error:", err));
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <h2>Occupancy Trend</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="average_occupancy"
            name="Average Occupancy"
            stroke="#1976d2"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="peak_occupancy"
            name="Peak Occupancy"
            stroke="#e53935"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OccupancyTrend;