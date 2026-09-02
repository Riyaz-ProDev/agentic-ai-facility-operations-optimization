import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material";


function CostSavingRecommendations() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("http://127.0.0.1:8000/cost-optimization")

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch cost optimization data"
          );
        }

        return response.json();

      })

      .then((result) => {

        setData(result);
        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Cost Optimization Error:",
          error
        );

        setLoading(false);

      });

  }, []);


  // ------------------------------------------------
  // Select recommendations from each priority
  // ------------------------------------------------

  const highRecommendations = data
    .filter(
      (item) => item.priority === "High"
    )
    .slice(0, 3);


  const mediumRecommendations = data
    .filter(
      (item) => item.priority === "Medium"
    )
    .slice(0, 3);


  const lowRecommendations = data
    .filter(
      (item) => item.priority === "Low"
    )
    .slice(0, 3);


  // ------------------------------------------------
  // Combine High + Medium + Low
  // ------------------------------------------------

  const displayedRecommendations = [
    ...highRecommendations,
    ...mediumRecommendations,
    ...lowRecommendations
  ];


  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (loading) {

    return (

      <Card sx={{ borderRadius: 3 }}>

        <CardContent>

          <Typography>
            Loading cost recommendations...
          </Typography>

        </CardContent>

      </Card>

    );

  }


  return (

    <Card sx={{ borderRadius: 3 }}>

      <CardContent>

        {/* Heading */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          💰 Cost Saving Recommendations
        </Typography>


        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          AI-generated facility recommendations based on
          operational cost and energy utilization.
        </Typography>


        {/* No recommendations */}

        {displayedRecommendations.length === 0 && (

          <Typography color="text.secondary">

            No cost optimization recommendations found.

          </Typography>

        )}


        {/* Recommendation Cards */}

        {displayedRecommendations.map(
          (item, index) => (

            <Box

              key={`${item.facility_id}-${index}`}

              sx={{

                py: 2,

                borderBottom:
                  index !==
                  displayedRecommendations.length - 1
                    ? "1px solid #e0e0e0"
                    : "none"

              }}

            >

              {/* Facility + Priority */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap"
                }}
              >

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  {item.facility_id}
                </Typography>


                <Chip

                  label={item.priority}

                  size="small"

                  color={
                    item.priority === "High"
                      ? "error"
                      : item.priority === "Medium"
                      ? "warning"
                      : "success"
                  }

                />

              </Box>


              {/* Issue */}

              <Typography
                fontWeight="bold"
                sx={{ mt: 1.5 }}
              >
                {item.issue}
              </Typography>


              {/* Recommendation */}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.7,
                  lineHeight: 1.6
                }}
              >
                {item.recommendation}
              </Typography>


              {/* Metrics */}

              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap"
                }}
              >

                <Typography variant="body2">

                  Saving Potential:{" "}

                  <strong>
                    {item.saving_percentage}%
                  </strong>

                </Typography>


                <Typography variant="body2">

                  Renewable:{" "}

                  <strong>
                    {item.renewable_percentage}%
                  </strong>

                </Typography>


                <Typography variant="body2">

                  Peak Demand:{" "}

                  <strong>
                    {item.average_peak_demand} kW
                  </strong>

                </Typography>

              </Box>


              {/* Estimated Saving */}

              <Typography
                fontWeight="bold"
                sx={{ mt: 1.5 }}
              >

                Estimated Saving: ₹
                {Number(
                  item.estimated_saving || 0
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })}

              </Typography>

            </Box>

          )
        )}

      </CardContent>

    </Card>

  );

}


export default CostSavingRecommendations;