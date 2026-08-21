import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FacilityOccupancyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/facility-occupancy")
      .then((res) => {
        // Show top 10 facilities
        setData(res.data.slice(0, 10));
      })
      .catch((err) =>
        console.log("Facility Occupancy Error:", err)
      );
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
      <h2>Top 10 Facilities by Occupancy</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Facility_ID" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="average_occupancy"
            name="Average Occupancy"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FacilityOccupancyChart;