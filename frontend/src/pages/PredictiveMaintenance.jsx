import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  Stack
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { API_BASE_URL } from "../services/api";

import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsightsIcon from "@mui/icons-material/Insights";


function PredictiveMaintenance() {

  const [collapsed, setCollapsed] = useState(false);

  const [dashboard, setDashboard] = useState({});
  const [health, setHealth] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        dashboardRes,
        healthRes,
        scheduleRes,
        alertRes
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/maintenance-dashboard`),
        axios.get(`${API_BASE_URL}/equipment-health`),
        axios.get(`${API_BASE_URL}/maintenance-schedule`),
        axios.get(`${API_BASE_URL}/recent-maintenance-alerts`)
      ]);

      setDashboard(dashboardRes.data);
      setHealth(healthRes.data);
      setSchedule(scheduleRes.data);
      setAlerts(alertRes.data);

    } catch (err) {

      console.error(
        "Predictive Maintenance Error:",
        err
      );

      setError(
        "Unable to load predictive maintenance data."
      );

    } finally {

      setLoading(false);

    }

  };


  const getStatusColor = (status) => {

    const value = String(
      status || ""
    ).toLowerCase();

    if (value.includes("healthy")) {
      return "success";
    }

    if (value.includes("critical")) {
      return "error";
    }

    if (value.includes("high")) {
      return "error";
    }

    if (value.includes("warning")) {
      return "warning";
    }

    if (value.includes("medium")) {
      return "warning";
    }

    return "default";

  };


  const getScoreColor = (score) => {

    if (score >= 80) {
      return "#16a34a";
    }

    if (score >= 50) {
      return "#f59e0b";
    }

    return "#dc2626";

  };


  const cards = [

    {
      title: "Total Assets",
      value: dashboard.total_assets ?? 0,
      subtitle: "Monitored equipment",
      icon: <PrecisionManufacturingIcon />,
      color: "#2563eb",
      bg: "#dbeafe"
    },

    {
      title: "Healthy Assets",
      value: dashboard.healthy_assets ?? 0,
      subtitle: "Operating normally",
      icon: <HealthAndSafetyIcon />,
      color: "#16a34a",
      bg: "#dcfce7"
    },

    {
      title: "Critical Assets",
      value: dashboard.critical_assets ?? 0,
      subtitle: "Immediate attention",
      icon: <WarningAmberIcon />,
      color: "#dc2626",
      bg: "#fee2e2"
    },

    {
      title: "Active Alerts",
      value: dashboard.active_alerts ?? 0,
      subtitle: "Live maintenance alerts",
      icon: <NotificationsActiveIcon />,
      color: "#ea580c",
      bg: "#ffedd5"
    }

  ];


  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f4f7fb"
      }}
    >

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          px: {
            xs: 2,
            md: 3
          },
          py: 2
        }}
      >

        <Box
          sx={{
            maxWidth: "1500px",
            mx: "auto"
          }}
        >

          <Navbar />


          {/* HERO HEADER */}

          <Box
            sx={{
              mt: 3,
              mb: 3,
              p: {
                xs: 2.5,
                md: 4
              },
              borderRadius: 4,
              background:
                "linear-gradient(135deg,#7c2d12,#ea580c)",
              color: "white",
              position: "relative",
              overflow: "hidden"
            }}
          >

            <Box
              sx={{
                position: "absolute",
                right: -30,
                top: -30,
                width: 180,
                height: 180,
                borderRadius: "50%",
                bgcolor:
                  "rgba(255,255,255,0.08)"
              }}
            />


            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.18)",
                  width: 60,
                  height: 60
                }}
              >
                <BuildCircleIcon fontSize="large" />
              </Avatar>


              <Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  Predictive Maintenance
                </Typography>


                <Typography
                  sx={{
                    opacity: 0.9,
                    mt: 0.5
                  }}
                >
                  AI-powered equipment health monitoring
                  and intelligent maintenance planning.
                </Typography>

              </Box>

            </Stack>

          </Box>


          {/* ERROR */}

          {error && (

            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>

          )}


          {/* LOADING */}

          {loading ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 12
              }}
            >
              <CircularProgress size={45} />
            </Box>

          ) : (

            <>

              {/* KPI CARDS */}

              <Grid container spacing={3}>

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
                        borderRadius: 4,
                        height: "100%",
                        border:
                          "1px solid #eef2f7",
                        transition: "0.25s",

                        "&:hover": {
                          transform:
                            "translateY(-6px)",
                          boxShadow: 6
                        }
                      }}
                    >

                      <CardContent>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >

                          <Box>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {card.title}
                            </Typography>


                            <Typography
                              variant="h4"
                              fontWeight="bold"
                              sx={{
                                mt: 1,
                                color: card.color
                              }}
                            >
                              {card.value}
                            </Typography>

                          </Box>


                          <Avatar
                            sx={{
                              bgcolor: card.bg,
                              color: card.color,
                              width: 52,
                              height: 52
                            }}
                          >
                            {card.icon}
                          </Avatar>

                        </Stack>


                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mt: 2
                          }}
                        >
                          {card.subtitle}
                        </Typography>

                      </CardContent>

                    </Card>

                  </Grid>

                ))}

              </Grid>


              {/* EQUIPMENT HEALTH */}

              <Card
                sx={{
                  mt: 3,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
              >

                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background:
                      "linear-gradient(90deg,#ffffff,#fff7ed)",
                    borderBottom:
                      "1px solid #eee"
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <InsightsIcon color="warning" />


                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Equipment Health Intelligence
                    </Typography>

                  </Stack>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Real-time AI assessment of
                    equipment condition.
                  </Typography>

                </Box>


                <TableContainer>

                  <Table>

                    <TableHead>

                      <TableRow
                        sx={{
                          bgcolor: "#f8fafc"
                        }}
                      >

                        <TableCell>
                          <b>Asset ID</b>
                        </TableCell>

                        <TableCell>
                          <b>Health Score</b>
                        </TableCell>

                        <TableCell>
                          <b>Condition</b>
                        </TableCell>

                      </TableRow>

                    </TableHead>


                    <TableBody>

                      {health
                        .slice(0, 10)
                        .map((item) => (

                          <TableRow
                            key={item.health_id}
                            hover
                          >

                            <TableCell>

                              <Typography
                                fontWeight={600}
                              >
                                {item.asset_id}
                              </Typography>

                            </TableCell>


                            <TableCell
                              sx={{
                                minWidth: 180
                              }}
                            >

                              <Stack spacing={0.7}>

                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >

                                  <Typography
                                    fontWeight={600}
                                  >
                                    {item.health_score}
                                  </Typography>


                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    /100
                                  </Typography>

                                </Stack>


                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(
                                    Number(
                                      item.health_score || 0
                                    ),
                                    100
                                  )}
                                  sx={{
                                    height: 8,
                                    borderRadius: 5,
                                    bgcolor: "#e5e7eb",

                                    "& .MuiLinearProgress-bar":
                                      {
                                        bgcolor:
                                          getScoreColor(
                                            item.health_score
                                          ),
                                        borderRadius: 5
                                      }
                                  }}
                                />

                              </Stack>

                            </TableCell>


                            <TableCell>

                              <Chip
                                label={
                                  item.health_status
                                }
                                color={getStatusColor(
                                  item.health_status
                                )}
                                size="small"
                                sx={{
                                  fontWeight: 600
                                }}
                              />

                            </TableCell>

                          </TableRow>

                        ))}

                    </TableBody>

                  </Table>

                </TableContainer>

              </Card>


              {/* MAINTENANCE SCHEDULE */}

              <Card
                sx={{
                  mt: 3,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
              >

                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background:
                      "linear-gradient(90deg,#ffffff,#eff6ff)",
                    borderBottom:
                      "1px solid #eee"
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <CalendarMonthIcon color="primary" />


                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Intelligent Maintenance Schedule
                    </Typography>

                  </Stack>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    AI predicted maintenance planning
                    for critical assets.
                  </Typography>

                </Box>


                <TableContainer>

                  <Table>

                    <TableHead>

                      <TableRow
                        sx={{
                          bgcolor: "#f8fafc"
                        }}
                      >

                        <TableCell>
                          <b>Asset</b>
                        </TableCell>

                        <TableCell>
                          <b>Predicted Date</b>
                        </TableCell>

                        <TableCell>
                          <b>Priority</b>
                        </TableCell>

                      </TableRow>

                    </TableHead>


                    <TableBody>

                      {schedule
                        .slice(0, 10)
                        .map((item) => (

                          <TableRow
                            key={item.schedule_id}
                            hover
                          >

                            <TableCell>

                              <Typography
                                fontWeight={600}
                              >
                                {item.asset_id}
                              </Typography>

                            </TableCell>


                            <TableCell>
                              {item.predicted_date}
                            </TableCell>


                            <TableCell>

                              <Chip
                                label={item.priority}
                                color={getStatusColor(
                                  item.priority
                                )}
                                size="small"
                                sx={{
                                  fontWeight: 600
                                }}
                              />

                            </TableCell>

                          </TableRow>

                        ))}

                    </TableBody>

                  </Table>

                </TableContainer>

              </Card>


              {/* ALERTS */}

              <Card
                sx={{
                  mt: 3,
                  mb: 5,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
              >

                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background:
                      "linear-gradient(90deg,#ffffff,#fef2f2)",
                    borderBottom:
                      "1px solid #eee"
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <NotificationsActiveIcon color="error" />


                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Recent Maintenance Alerts
                    </Typography>

                  </Stack>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Live alerts generated from
                    predictive monitoring agents.
                  </Typography>

                </Box>


                <TableContainer>

                  <Table>

                    <TableHead>

                      <TableRow
                        sx={{
                          bgcolor: "#f8fafc"
                        }}
                      >

                        <TableCell>
                          <b>Asset</b>
                        </TableCell>

                        <TableCell>
                          <b>Severity</b>
                        </TableCell>

                        <TableCell>
                          <b>Alert Message</b>
                        </TableCell>

                      </TableRow>

                    </TableHead>


                    <TableBody>

                      {alerts.map((item) => (

                        <TableRow
                          key={item.alert_id}
                          hover
                        >

                          <TableCell>

                            <Typography
                              fontWeight={600}
                            >
                              {item.asset_id}
                            </Typography>

                          </TableCell>


                          <TableCell>

                            <Chip
                              label={item.severity}
                              color={getStatusColor(
                                item.severity
                              )}
                              size="small"
                              sx={{
                                fontWeight: 600
                              }}
                            />

                          </TableCell>


                          <TableCell>
                            {item.message}
                          </TableCell>

                        </TableRow>

                      ))}

                    </TableBody>

                  </Table>

                </TableContainer>

              </Card>

            </>

          )}

        </Box>

      </Box>

    </Box>

  );

}


export default PredictiveMaintenance;