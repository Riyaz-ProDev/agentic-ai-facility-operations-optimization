import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography
} from "@mui/material";


function AgentPerformancePanel() {

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("http://127.0.0.1:8000/agent-performance")

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch agent performance data"
          );
        }

        return response.json();

      })

      .then((result) => {

        setAgents(result);
        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Agent Performance Error:",
          error
        );

        setLoading(false);

      });

  }, []);


  if (loading) {

    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 180
            }}
          >
            <CircularProgress />
          </Box>

        </CardContent>
      </Card>
    );

  }


  return (

    <Card
      sx={{
        borderRadius: 3
      }}
    >

      <CardContent>

        {/* Heading */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🤖 Agent Performance Monitoring
        </Typography>


        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Operational performance of intelligent agents
          across the facility management platform.
        </Typography>


        {/* Agent Cards */}

        <Grid container spacing={2}>

          {agents.map((agent) => (

            <Grid
              key={agent.agent}
              size={{
                xs: 12,
                sm: 6,
                lg: 4
              }}
            >

              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  height: "100%"
                }}
              >

                <CardContent>

                  {/* Agent Name + Status */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1
                    }}
                  >

                    <Typography
                      fontWeight="bold"
                    >
                      {agent.agent}
                    </Typography>


                    <Chip
                      label={agent.status}
                      size="small"
                      color={
                        agent.status === "Active"
                          ? "success"
                          : "default"
                      }
                    />

                  </Box>


                  {/* Performance Label */}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Performance Score
                  </Typography>


                  {/* Performance Percentage */}

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mt: 0.5 }}
                  >
                    {agent.performance}%
                  </Typography>


                  {/* Progress Bar */}

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(
                      Number(agent.performance || 0),
                      100
                    )}
                    sx={{
                      mt: 1.5,
                      height: 8,
                      borderRadius: 5
                    }}
                  />

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>


        {/* No Data */}

        {agents.length === 0 && (

          <Typography
            color="text.secondary"
            sx={{
              textAlign: "center",
              py: 3
            }}
          >
            No agent performance data available.
          </Typography>

        )}

      </CardContent>

    </Card>

  );

}


export default AgentPerformancePanel;