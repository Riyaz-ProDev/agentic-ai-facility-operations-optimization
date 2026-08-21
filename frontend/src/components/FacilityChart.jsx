import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FacilityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/facility-energy")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    height: "100%"
}}
    >
      <h2>Top 10 Facilities by Energy Usage</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Facility_ID" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="energy" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FacilityChart;