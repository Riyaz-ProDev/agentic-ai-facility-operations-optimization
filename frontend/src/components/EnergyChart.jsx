import { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EnergyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/energy-chart")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
   style={{
    background:"#fff",
    padding:"20px",
    borderRadius:"12px",
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)",
    height:"100%"
}}
    >
      <h2>Energy Consumption Trend</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EnergyChart;