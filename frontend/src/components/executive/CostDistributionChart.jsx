import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { API_BASE_URL } from "../../services/api";


function CostDistributionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cost-distribution`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to fetch cost distribution data"
          );
        }

        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error(
          "Cost Distribution Error:",
          error
        );
      });
  }, []);

  const formatYAxis = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }

    return `₹${value}`;
  };

  const formatTooltip = (value) => {
    return [
      `₹${Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2
      })}`,
      "Operational Cost"
    ];
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%"
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          📊 Operational Cost Analysis
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Distribution of estimated operational costs
          across major facility categories.
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              width={70}
            />

            <Tooltip
              formatter={formatTooltip}
            />

            <Bar
              dataKey="value"
              fill="#1976d2"
              radius={[8, 8, 0, 0]}
              maxBarSize={70}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CostDistributionChart;