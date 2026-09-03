import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// ==========================================
// Authentication
// ==========================================

import Login from "./pages/Login";


// ==========================================
// Previous Milestones
// ==========================================

import Dashboard from "./pages/Dashboard";
import Energy from "./pages/Energy";
import Sensors from "./pages/Sensors";
import Facilities from "./pages/Facilities";
import AIAgent from "./pages/AIAgent";


// ==========================================
// Milestone 3
// Occupancy & Security
// ==========================================

import SecurityDashboard
  from "./pages/SecurityDashboard";


// ==========================================
// Milestone 4
// Executive Intelligence
// ==========================================

import ExecutiveDashboard
  from "./pages/ExecutiveDashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* Login */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================= */}
        {/* Main Dashboard */}
        {/* ================================= */}

        <Route
          path="/"
          element={<Dashboard />}
        />


        {/* ================================= */}
        {/* Energy */}
        {/* ================================= */}

        <Route
          path="/energy"
          element={<Energy />}
        />


        {/* ================================= */}
        {/* Sensors */}
        {/* ================================= */}

        <Route
          path="/sensors"
          element={<Sensors />}
        />


        {/* ================================= */}
        {/* Facilities */}
        {/* ================================= */}

        <Route
          path="/facilities"
          element={<Facilities />}
        />


        {/* ================================= */}
        {/* AI Agent */}
        {/* ================================= */}

        <Route
          path="/ai-agent"
          element={<AIAgent />}
        />


        {/* ================================= */}
        {/* Milestone 3 */}
        {/* Occupancy & Security */}
        {/* ================================= */}

        <Route
          path="/security"
          element={<SecurityDashboard />}
        />


        {/* ================================= */}
        {/* Milestone 4 */}
        {/* Executive Dashboard */}
        {/* ================================= */}

        <Route
          path="/executive"
          element={<ExecutiveDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;