import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from "@mui/material";

function ExecutiveKpiCards({ data }) {

  const cards = [
    {
      title: "Cost Reduction",
      value: `${data?.cost_reduction_percentage || 0}%`,
      subtitle: "Potential operational cost reduction"
    },
    {
      title: "Estimated Savings",
      value: `₹${Number(
        data?.estimated_savings || 0
      ).toLocaleString("en-IN", {
        maximumFractionDigits: 2
      })}`,
      subtitle: "Estimated savings from optimization"
    },
    {
      title: "Facility Health",
      value: `${data?.facility_health_score || 0}/100`,
      subtitle: "Overall facility operational health"
    },
    {
      title: "Optimizations",
      value: data?.optimization_opportunities || 0,
      subtitle: "Available optimization opportunities"
    }
  ];

  return (
    <Grid container spacing={2}>

      {cards.map((card) => (

        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: 2,
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: 5
              }
            }}
          >

            <CardContent>

              <Box>

                <Typography
                  color="text.secondary"
                  fontSize={14}
                  fontWeight={500}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    mb: 1
                  }}
                >
                  {card.value}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.subtitle}
                </Typography>

              </Box>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>
  );
}

export default ExecutiveKpiCards;