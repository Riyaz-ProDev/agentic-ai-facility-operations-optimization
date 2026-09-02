import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography
} from "@mui/material";

function SustainabilityMetrics({ data }) {

  const renewable =
    Number(data?.renewable_percentage || 0);

  const healthScore =
    Number(data?.facility_health_score || 0);

  const costReduction =
    Number(data?.cost_reduction_percentage || 0);

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        boxShadow: 2
      }}
    >
      <CardContent>

        {/* Heading */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🌱 Sustainability Metrics
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Tracks renewable energy usage,
          facility health and efficiency improvements.
        </Typography>


        {/* Renewable Energy */}

        <Box sx={{ mb: 3 }}>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
            >
              Renewable Energy
            </Typography>

            <Typography
              fontWeight="bold"
            >
              {renewable}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={Math.min(renewable, 100)}
            sx={{
              height: 9,
              borderRadius: 5
            }}
          />

        </Box>


        {/* Facility Health */}

        <Box sx={{ mb: 3 }}>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
            >
              Facility Health
            </Typography>

            <Typography
              fontWeight="bold"
            >
              {healthScore}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={Math.min(healthScore, 100)}
            sx={{
              height: 9,
              borderRadius: 5
            }}
          />

        </Box>


        {/* Cost Efficiency */}

        <Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
            >
              Cost Efficiency Improvement
            </Typography>

            <Typography
              fontWeight="bold"
            >
              {costReduction}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={Math.min(costReduction, 100)}
            sx={{
              height: 9,
              borderRadius: 5
            }}
          />

        </Box>


        {/* Footer */}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mt: 3
          }}
        >
          Sustainability indicators are calculated from
          facility energy and operational intelligence data.
        </Typography>

      </CardContent>
    </Card>
  );
}

export default SustainabilityMetrics;