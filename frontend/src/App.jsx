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
// Module 1
// Energy Intelligence
// ==========================================

import Energy from "./pages/Energy";


// ==========================================
// Module 2
// Predictive Maintenance
// ==========================================

import PredictiveMaintenance
  from "./pages/PredictiveMaintenance";


// ==========================================
// Module 3
// Occupancy & Security Monitoring
// ==========================================

import SecurityDashboard
  from "./pages/SecurityDashboard";


// ==========================================
// Module 4
// Cost Optimization
// ==========================================

import ExecutiveDashboard
  from "./pages/ExecutiveDashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* Login - Starting Page */}
        {/* ================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================= */}
        {/* Module 1 */}
        {/* Energy Intelligence */}
        {/* ================================= */}

        <Route
          path="/energy-intelligence"
          element={<Energy />}
        />


        {/* ================================= */}
        {/* Module 2 */}
        {/* Predictive Maintenance */}
        {/* ================================= */}

        <Route
          path="/predictive-maintenance"
          element={<PredictiveMaintenance />}
        />


        {/* ================================= */}
        {/* Module 3 */}
        {/* Occupancy & Security */}
        {/* ================================= */}

        <Route
          path="/occupancy-security"
          element={<SecurityDashboard />}
        />


        {/* ================================= */}
        {/* Module 4 */}
        {/* Cost Optimization */}
        {/* ================================= */}

        <Route
          path="/cost-optimization"
          element={<ExecutiveDashboard />}
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;