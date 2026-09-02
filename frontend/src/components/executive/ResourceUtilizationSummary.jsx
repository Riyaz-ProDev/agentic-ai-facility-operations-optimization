import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from "@mui/material";

function ResourceUtilizationSummary({ data }) {

  const items = [
    {
      title: "Occupancy Insights",
      value: data?.occupancy_insights || 0,
      description: "Occupancy patterns detected"
    },
    {
      title: "Room Insights",
      value: data?.room_insights || 0,
      description: "Room utilization records analyzed"
    },
    {
      title: "Security Alerts",
      value: data?.security_alerts || 0,
      description: "Access-related alerts identified"
    },
    {
      title: "CCTV Alerts",
      value: data?.cctv_alerts || 0,
      description: "CCTV events requiring attention"
    },
    {
      title: "Critical Assets",
      value: data?.critical_assets || 0,
      description: "Assets with critical health status"
    },
    {
      title: "High Cost Facilities",
      value: data?.high_cost_facilities || 0,
      description: "Facilities requiring cost optimization"
    }
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
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
          🏢 Resource Utilization Analytics
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Consolidated operational insights from occupancy,
          security, maintenance and cost optimization agents.
        </Typography>

        {/* Analytics Cards */}

        <Grid container spacing={2}>

          {items.map((item) => (

            <Grid
              key={item.title}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >

              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 3
                  }
                }}
              >

                <CardContent>

                  <Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        mt: 1,
                        mb: 1
                      }}
                    >
                      {item.value}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>

                  </Box>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </CardContent>
    </Card>
  );
}

export default ResourceUtilizationSummary;