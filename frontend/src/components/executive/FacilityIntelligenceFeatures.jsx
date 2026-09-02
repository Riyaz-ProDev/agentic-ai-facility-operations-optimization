import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from "@mui/material";

import HealthAndSafetyIcon
  from "@mui/icons-material/HealthAndSafety";

import AccountBalanceWalletIcon
  from "@mui/icons-material/AccountBalanceWallet";

import SavingsIcon
  from "@mui/icons-material/Savings";

import AnalyticsIcon
  from "@mui/icons-material/Analytics";

import SmartToyIcon
  from "@mui/icons-material/SmartToy";

import BoltIcon
  from "@mui/icons-material/Bolt";


function FacilityIntelligenceFeatures() {

  const features = [
    {
      title: "Facility Health Score",
      description:
        "Monitors overall facility operational health.",
      icon: <HealthAndSafetyIcon />
    },
    {
      title: "Operational Cost Analysis",
      description:
        "Analyzes facility energy and operational costs.",
      icon: <AccountBalanceWalletIcon />
    },
    {
      title: "Cost Saving Recommendations",
      description:
        "Identifies opportunities to reduce facility costs.",
      icon: <SavingsIcon />
    },
    {
      title: "Resource Utilization Analytics",
      description:
        "Analyzes occupancy and resource utilization patterns.",
      icon: <AnalyticsIcon />
    },
    {
      title: "Agent Performance Monitoring",
      description:
        "Tracks operational performance of AI agents.",
      icon: <SmartToyIcon />
    },
    {
      title: "Sustainability Metrics",
      description:
        "Tracks renewable energy and efficiency indicators.",
      icon: <BoltIcon />
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

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🏢 Facility Intelligence Features
        </Typography>


        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Enterprise intelligence capabilities for
          facility monitoring, optimization and
          decision support.
        </Typography>


        <Grid container spacing={2}>

          {features.map((feature) => (

            <Grid
              key={feature.title}
              size={{
                xs: 12,
                sm: 6,
                lg: 4
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

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1.5
                    }}
                  >

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {feature.icon}
                    </Box>


                    <Typography fontWeight="bold">
                      {feature.title}
                    </Typography>

                  </Box>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </CardContent>

    </Card>

  );

}


export default FacilityIntelligenceFeatures;