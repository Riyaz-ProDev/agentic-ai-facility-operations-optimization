import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BoltIcon from "@mui/icons-material/Bolt";
import SensorsIcon from "@mui/icons-material/Sensors";
import BusinessIcon from "@mui/icons-material/Business";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BuildIcon from "@mui/icons-material/Build";
import SecurityIcon from "@mui/icons-material/Security";

const drawerWidth = 220;
const collapsedWidth = 70;

const menuItems = [
  {
    id: "dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: "energy",
    text: "Energy",
    icon: <BoltIcon />,
  },
  {
    id: "sensors",
    text: "Sensors",
    icon: <SensorsIcon />,
  },
  {
    id: "facilities",
    text: "Facilities",
    icon: <BusinessIcon />,
  },
  {
    id: "maintenance",
    text: "Predictive Maintenance",
    icon: <BuildIcon />,
  },
  {
    id: "ai",
    text: "AI Agent",
    icon: <SmartToyIcon />,
  },
];

export default function Sidebar({
  collapsed = false,
  setCollapsed = () => {},
  scrollToSection = () => {},
  activeSection = "",
}) {
  const navigate = useNavigate();

  const handleSectionClick = (id) => {
    // If we are on another page, return to dashboard first.
    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 200);

      return;
    }

    // Existing dashboard scrolling
    scrollToSection(id);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          background: "#1e293b",
          color: "white",
          borderRight: "none",
        },
      }}
    >
      {/* Collapse Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      >
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "white" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {/* Previous Milestone Sections */}

        {menuItems.map((item) => (
          <Tooltip
            key={item.id}
            title={collapsed ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              onClick={() => handleSectionClick(item.id)}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,

                justifyContent: collapsed
                  ? "center"
                  : "flex-start",

                backgroundColor:
                  activeSection === item.id &&
                  window.location.pathname === "/"
                    ? "#2563eb"
                    : "transparent",

                "&:hover": {
                  backgroundColor: "#334155",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: collapsed ? 0 : 40,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText primary={item.text} />
              )}
            </ListItemButton>
          </Tooltip>
        ))}

        {/* Milestone 3 */}

        <Tooltip
          title={collapsed ? "Occupancy & Security" : ""}
          placement="right"
        >
          <ListItemButton
            onClick={() => navigate("/security")}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,

              justifyContent: collapsed
                ? "center"
                : "flex-start",

              backgroundColor:
                window.location.pathname === "/security"
                  ? "#2563eb"
                  : "transparent",

              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: collapsed ? 0 : 40,
                justifyContent: "center",
              }}
            >
              <SecurityIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText primary="Occupancy & Security" />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}