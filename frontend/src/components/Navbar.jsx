import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        ml:0,
mr:0
      }}
    >
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
          ⚡ Agentic AI For Smart Facility Operations And Optimizations
        </Typography>
      </Toolbar>
    </AppBar>
  );
}