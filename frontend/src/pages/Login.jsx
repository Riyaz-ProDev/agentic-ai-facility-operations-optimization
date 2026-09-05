import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../services/api";


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const features = [
    "Energy Intelligence",
    "Predictive Maintenance",
    "Occupancy & Security Monitoring",
    "Cost Optimization"
  ];


  const handleLogin = async () => {

    if (!username.trim() || !password.trim()) {

      setError(
        "Please enter username and password."
      );

      return;
    }


    try {

      setLoading(true);
      setError("");


      const response = await fetch(
        `${API_BASE_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: username.trim(),
            password: password
          })
        }
      );


      if (!response.ok) {

        throw new Error(
          "Login request failed"
        );

      }


      const data = await response.json();

      console.log(
        "Login response:",
        data
      );


      if (data.success === true) {

        localStorage.setItem(
          "facilityUser",
          JSON.stringify(data.user)
        );


        // Redirect after successful login

        navigate(
          "/energy-intelligence"
        );

      } else {

        setError(
          data.message ||
          "Invalid username or password."
        );

      }

    } catch (err) {

      console.error(
        "Login Error:",
        err
      );

      setError(
        "Unable to connect to FacilityOps server."
      );

    } finally {

      setLoading(false);

    }

  };


  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      handleLogin();

    }

  };


  return (

    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",
        justifyContent: "center",

        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1d4ed8 100%)",

        px: 2,
        py: 4
      }}
    >

      <Card
        sx={{
          width: "100%",

          maxWidth: 1050,

          borderRadius: 4,

          overflow: "hidden",

          boxShadow: 12
        }}
      >

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr"
            }
          }}
        >

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <Box
            sx={{
              p: {
                xs: 4,
                md: 6
              },

              background:
                "linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)",

              color: "white",

              display: "flex",

              flexDirection: "column",

              justifyContent: "center"
            }}
          >

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1,

                mb: 3
              }}
            >

              <BoltIcon
                sx={{
                  fontSize: 40
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                FacilityOps
              </Typography>

            </Box>


            <Typography
              variant="h4"
              fontWeight="bold"

              sx={{
                lineHeight: 1.3,
                mb: 2
              }}
            >
              Agentic AI For Smart Facility Operations
            </Typography>


            <Typography
              variant="body1"

              sx={{
                color:
                  "rgba(255,255,255,0.78)",

                mb: 4,

                lineHeight: 1.8
              }}
            >
              Intelligent facility monitoring,
              predictive maintenance,
              occupancy security and
              operational cost optimization
              in one centralized platform.
            </Typography>


            <Stack spacing={2}>

              {features.map((feature) => (

                <Box
                  key={feature}

                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1.5
                  }}
                >

                  <CheckCircleIcon
                    sx={{
                      fontSize: 21
                    }}
                  />

                  <Typography
                    variant="body1"
                    fontWeight={500}
                  >
                    {feature}
                  </Typography>

                </Box>

              ))}

            </Stack>

          </Box>


          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <CardContent
            sx={{
              p: {
                xs: 4,
                md: 6
              },

              display: "flex",

              flexDirection: "column",

              justifyContent: "center"
            }}
          >

            <Typography
              variant="h4"
              fontWeight="bold"

              sx={{
                mb: 1
              }}
            >
              Welcome Back
            </Typography>


            <Typography
              variant="body2"
              color="text.secondary"

              sx={{
                mb: 4
              }}
            >
              Login to access the
              FacilityOps intelligence platform.
            </Typography>


            {/* Error Message */}

            {error && (

              <Alert
                severity="error"

                sx={{
                  mb: 2
                }}
              >
                {error}
              </Alert>

            )}


            {/* Username */}

            <TextField
              fullWidth

              label="Username"

              placeholder="Enter username"

              value={username}

              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }

              onKeyDown={handleKeyDown}

              autoComplete="username"

              sx={{
                mb: 2
              }}
            />


            {/* Password */}

            <TextField
              fullWidth

              label="Password"

              type="password"

              placeholder="Enter password"

              value={password}

              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }

              onKeyDown={handleKeyDown}

              autoComplete="current-password"

              sx={{
                mb: 3
              }}
            />


            {/* Login Button */}

            <Button
              fullWidth

              variant="contained"

              size="large"

              onClick={handleLogin}

              disabled={loading}

              sx={{
                py: 1.4,

                borderRadius: 2,

                textTransform: "none",

                fontSize: 16,

                fontWeight: "bold"
              }}
            >

              {loading ? (

                <>

                  <CircularProgress
                    size={20}

                    color="inherit"

                    sx={{
                      mr: 1
                    }}
                  />

                  Signing In...

                </>

              ) : (

                "Login to FacilityOps"

              )}

            </Button>


            {/* Information */}

            <Box
              sx={{
                mt: 4,

                p: 2,

                borderRadius: 2,

                backgroundColor: "#f8fafc"
              }}
            >

              <Typography
                variant="body2"

                color="text.secondary"

                textAlign="center"
              >
                Authorized users only
              </Typography>


              <Typography
                variant="caption"

                color="text.secondary"

                textAlign="center"

                display="block"

                sx={{
                  mt: 0.5
                }}
              >
                Access energy,
                maintenance,
                security and
                cost optimization intelligence.
              </Typography>

            </Box>


            <Typography
              variant="caption"

              color="text.secondary"

              textAlign="center"

              sx={{
                mt: 3
              }}
            >
              Agentic AI For Smart Facility
              Operations And Optimizations
            </Typography>

          </CardContent>

        </Box>

      </Card>

    </Box>

  );

}


export default Login;