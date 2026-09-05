import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
  Typography,
  Avatar,
  Divider,
  Chip
} from "@mui/material";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import SecurityIcon from "@mui/icons-material/Security";
import SavingsIcon from "@mui/icons-material/Savings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


// ==========================================
// Sidebar Width
// ==========================================

const drawerWidth = 250;
const collapsedWidth = 76;


// ==========================================
// Menu Items
// ==========================================

const menuItems = [
  {
    text: "Energy Intelligence",
    path: "/energy-intelligence",
    icon: <BoltIcon />,
    color: "#38bdf8"
  },

  {
    text: "Predictive Maintenance",
    path: "/predictive-maintenance",
    icon: <BuildIcon />,
    color: "#fb923c"
  },

  {
    text: "Occupancy & Security",
    path: "/occupancy-security",
    icon: <SecurityIcon />,
    color: "#a78bfa"
  },

  {
    text: "Cost Optimization",
    path: "/cost-optimization",
    icon: <SavingsIcon />,
    color: "#34d399"
  }
];


// ==========================================
// Sidebar Component
// ==========================================

export default function Sidebar({
  collapsed = false,
  setCollapsed = () => {}
}) {

  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed
          ? collapsedWidth
          : drawerWidth,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed
            ? collapsedWidth
            : drawerWidth,

          transition: "width 0.3s ease",

          overflowX: "hidden",

          color: "white",

          borderRight:
            "1px solid rgba(255,255,255,0.06)",

          background:
            "linear-gradient(180deg, #0f172a 0%, #111827 55%, #020617 100%)",

          boxShadow:
            "5px 0 25px rgba(15,23,42,0.10)"
        }
      }}
    >

      {/* ========================================== */}
      {/* Header */}
      {/* ========================================== */}

      <Box
        sx={{
          height: 82,

          display: "flex",

          alignItems: "center",

          justifyContent: collapsed
            ? "center"
            : "space-between",

          px: collapsed
            ? 1
            : 2,

          borderBottom:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >

        {/* Logo */}

        {!collapsed && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2
            }}
          >

            <Avatar
              sx={{
                width: 40,
                height: 40,

                background:
                  "linear-gradient(135deg,#2563eb,#06b6d4)",

                boxShadow:
                  "0 4px 12px rgba(37,99,235,0.35)"
              }}
            >
              <SmartToyIcon />
            </Avatar>


            <Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 17,
                  lineHeight: 1.1,
                  color: "#ffffff"
                }}
              >
                FacilityOps
              </Typography>


              <Typography
                variant="caption"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.68rem"
                }}
              >
                Agentic AI Platform
              </Typography>

            </Box>

          </Box>
        )}


        {/* Collapse Button */}

        <Tooltip
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          placement="right"
          arrow
        >

          <IconButton
            onClick={() =>
              setCollapsed(!collapsed)
            }
            sx={{
              color: "#cbd5e1",

              backgroundColor:
                "rgba(255,255,255,0.05)",

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.10)",

                color: "#ffffff"
              }
            }}
          >

            {collapsed
              ? <MenuIcon />
              : <ChevronLeftIcon />
            }

          </IconButton>

        </Tooltip>

      </Box>


      {/* ========================================== */}
      {/* Section Label */}
      {/* ========================================== */}

      {!collapsed && (
        <Typography
          variant="caption"
          sx={{
            display: "block",

            px: 2.5,
            pt: 2.5,
            pb: 1,

            color: "#64748b",

            fontWeight: 700,

            letterSpacing:
              "0.08em"
          }}
        >
          INTELLIGENCE MODULES
        </Typography>
      )}


      {/* ========================================== */}
      {/* Navigation Menu */}
      {/* ========================================== */}

      <List
        sx={{
          px: 1.2,

          pt: collapsed
            ? 2
            : 0.5
        }}
      >

        {menuItems.map((item) => {

          const active =
            location.pathname ===
            item.path;


          return (
            <Tooltip
              key={item.path}

              title={
                collapsed
                  ? item.text
                  : ""
              }

              placement="right"
              arrow
            >

              <ListItemButton
                onClick={() =>
                  navigate(item.path)
                }

                sx={{
                  position: "relative",

                  minHeight: 54,

                  mb: 1,

                  px: collapsed
                    ? 1
                    : 1.5,

                  borderRadius: 3,

                  justifyContent:
                    collapsed
                      ? "center"
                      : "flex-start",

                  backgroundColor:
                    active
                      ? "rgba(255,255,255,0.10)"
                      : "transparent",

                  border:
                    active
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid transparent",

                  transition:
                    "all 0.2s ease",

                  "&::before": active
                    ? {
                        content: '""',

                        position:
                          "absolute",

                        left: -5,

                        top: "20%",

                        height: "60%",

                        width: 4,

                        borderRadius:
                          "0 4px 4px 0",

                        backgroundColor:
                          item.color,

                        boxShadow:
                          `0 0 12px ${item.color}`
                      }
                    : {},

                  "&:hover": {
                    backgroundColor:
                      "rgba(255,255,255,0.08)",

                    transform:
                      collapsed
                        ? "none"
                        : "translateX(3px)"
                  }
                }}
              >

                {/* Icon */}

                <ListItemIcon
                  sx={{
                    minWidth: collapsed
                      ? 0
                      : 44,

                    display: "flex",

                    alignItems: "center",

                    justifyContent:
                      "center",

                    color: active
                      ? item.color
                      : "#94a3b8"
                  }}
                >

                  <Box
                    sx={{
                      width: 36,
                      height: 36,

                      display: "flex",

                      alignItems: "center",

                      justifyContent:
                        "center",

                      borderRadius: 2,

                      backgroundColor:
                        active
                          ? `${item.color}18`
                          : "rgba(255,255,255,0.04)",

                      transition:
                        "all 0.2s ease"
                    }}
                  >
                    {item.icon}
                  </Box>

                </ListItemIcon>


                {/* Text */}

                {!collapsed && (
                  <ListItemText
                    disableTypography

                    primary={
                      <Typography
                        component="span"
                        sx={{
                          fontSize:
                            "0.88rem",

                          fontWeight:
                            active
                              ? 700
                              : 500,

                          color:
                            active
                              ? "#ffffff"
                              : "#cbd5e1",

                          lineHeight: 1.4
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                )}

              </ListItemButton>

            </Tooltip>
          );

        })}

      </List>


      {/* ========================================== */}
      {/* Empty Flexible Space */}
      {/* ========================================== */}

      <Box
        sx={{
          flexGrow: 1
        }}
      />


      {/* ========================================== */}
      {/* Bottom AI Status */}
      {/* ========================================== */}

      <Box
        sx={{
          p: collapsed
            ? 1
            : 2
        }}
      >

        <Divider
          sx={{
            mb: 2,

            borderColor:
              "rgba(255,255,255,0.08)"
          }}
        />


        {!collapsed ? (
          <Box
            sx={{
              p: 1.5,

              borderRadius: 3,

              backgroundColor:
                "rgba(255,255,255,0.05)",

              border:
                "1px solid rgba(255,255,255,0.07)"
            }}
          >

            <AIStatus />

          </Box>
        ) : (

          <Tooltip
            title="AI System Online"
            placement="right"
            arrow
          >

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent:
                  "center"
              }}
            >

              <Box
                sx={{
                  width: 10,
                  height: 10,

                  borderRadius:
                    "50%",

                  backgroundColor:
                    "#22c55e",

                  boxShadow:
                    "0 0 10px #22c55e"
                }}
              />

            </Box>

          </Tooltip>

        )}

      </Box>

    </Drawer>
  );
}


// ==========================================
// AI Status Component
// ==========================================

function AIStatus() {

  return (
    <Box>

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          gap: 1
        }}
      >

        <Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",

              color: "#94a3b8"
            }}
          >
            AI SYSTEM
          </Typography>


          <Typography
            variant="body2"
            sx={{
              color: "#ffffff",

              fontWeight: 600
            }}
          >
            Operational
          </Typography>

        </Box>


        <Chip
          label="LIVE"
          size="small"

          sx={{
            height: 23,

            backgroundColor:
              "rgba(34,197,94,0.15)",

            color: "#4ade80",

            fontSize:
              "0.65rem",

            fontWeight: 700
          }}
        />

      </Box>

    </Box>
  );
}