import { BrowserRouter, Routes, Route } from "react-router-dom";

// Previous Milestones
import Dashboard from "./pages/Dashboard";
import Energy from "./pages/Energy";
import Sensors from "./pages/Sensors";
import Facilities from "./pages/Facilities";
import AIAgent from "./pages/AIAgent";

// Milestone 3
import SecurityDashboard from "./pages/SecurityDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Previous Milestones */}
        <Route
          path="/energy"
          element={<Energy />}
        />

        <Route
          path="/sensors"
          element={<Sensors />}
        />

        <Route
          path="/facilities"
          element={<Facilities />}
        />

        <Route
          path="/ai-agent"
          element={<AIAgent />}
        />

        {/* Milestone 3 - Occupancy & Security */}
        <Route
          path="/security"
          element={<SecurityDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;