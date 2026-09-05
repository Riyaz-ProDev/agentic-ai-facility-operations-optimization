import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Stack
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
      icon: <HealthAndSafetyIcon />,
      color: "#16a34a",
      background: "#dcfce7"
    },

    {
      title: "Operational Cost Analysis",
      description:
        "Analyzes facility energy and operational costs.",
      icon: <AccountBalanceWalletIcon />,
      color: "#2563eb",
      background: "#dbeafe"
    },

    {
      title: "Cost Saving Recommendations",
      description:
        "Identifies opportunities to reduce facility costs.",
      icon: <SavingsIcon />,
      color: "#059669",
      background: "#d1fae5"
    },

    {
      title: "Resource Utilization Analytics",
      description:
        "Analyzes occupancy and resource utilization patterns.",
      icon: <AnalyticsIcon />,
      color: "#7c3aed",
      background: "#ede9fe"
    },

    {
      title: "Agent Performance Monitoring",
      description:
        "Tracks operational performance of AI agents.",
      icon: <SmartToyIcon />,
      color: "#ea580c",
      background: "#ffedd5"
    },

    {
      title: "Sustainability Metrics",
      description:
        "Tracks renewable energy and efficiency indicators.",
      icon: <BoltIcon />,
      color: "#0891b2",
      background: "#cffafe"
    }
  ];


  return (

    <Box>

      {/* Section intro */}

      <Box
        sx={{
          mb: 2.5
        }}
      >

        <Typography
          variant="h6"
          fontWeight={700}
          color="#0f172a"
        >
          🏢 Facility Intelligence Features
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5
          }}
        >
          Enterprise intelligence capabilities for
          facility monitoring, optimization and
          decision support.
        </Typography>

      </Box>


      <Grid
        container
        spacing={2}
      >

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
              sx={{
                height: "100%",

                borderRadius: 3,

                border:
                  "1px solid #e5e7eb",

                boxShadow:
                  "0 4px 15px rgba(15,23,42,0.05)",

                position: "relative",

                overflow: "hidden",

                transition:
                  "all 0.25s ease",

                "&:hover": {
                  transform:
                    "translateY(-5px)",

                  boxShadow:
                    "0 12px 28px rgba(15,23,42,0.10)",

                  borderColor:
                    feature.color
                },

                "&::before": {
                  content: '""',

                  position: "absolute",

                  left: 0,
                  top: 0,
                  bottom: 0,

                  width: "4px",

                  bgcolor:
                    feature.color
                }
              }}
            >

              <CardContent
                sx={{
                  p: 2.5
                }}
              >

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                >

                  {/* Icon */}

                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,

                      bgcolor:
                        feature.background,

                      color:
                        feature.color
                    }}
                  >
                    {feature.icon}
                  </Avatar>


                  {/* Text */}

                  <Box>

                    <Typography
                      fontWeight={700}
                      color="#0f172a"
                    >
                      {feature.title}
                    </Typography>


                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.7,
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>

                  </Box>

                </Stack>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>

  );

}


export default FacilityIntelligenceFeatures;