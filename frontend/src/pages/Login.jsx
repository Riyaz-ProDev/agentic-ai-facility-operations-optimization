import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider
} from "../firebaseConfig";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const features = [
    "Energy Intelligence",
    "Predictive Maintenance",
    "Occupancy & Security Monitoring",
    "Cost Optimization"
  ];

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      console.log(
        "Logged in user:",
        result.user
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );

      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google sign-in was cancelled."
        );
      } else if (
        error.code ===
        "auth/unauthorized-domain"
      ) {
        setError(
          "This domain is not authorized in Firebase Authentication."
        );
      } else {
        setError(
          "Unable to sign in with Google. Please try again."
        );
      }
    } finally {
      setLoading(false);
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
          {/* LEFT SECTION */}

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
              Agentic AI For Smart
              Facility Operations
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
              Monitor facilities,
              optimize resources,
              reduce operational costs
              and improve decisions
              using intelligent AI
              agents.
            </Typography>

            <Stack spacing={2}>
              {features.map(
                (feature) => (
                  <Box
                    key={feature}
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
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
                )
              )}
            </Stack>
          </Box>

          {/* RIGHT SECTION */}

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
              Sign in to access the
              Agentic Facility
              Operations Intelligence
              Platform.
            </Typography>

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

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              sx={{
                mb: 2
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
              sx={{
                mb: 1
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "flex-end",
                mb: 3
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color:
                    "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration:
                      "underline"
                  }
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Sign In
            </Button>

            <Divider
              sx={{
                my: 3
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={
                handleGoogleLogin
              }
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress
                    size={20}
                  />
                ) : (
                  <GoogleIcon />
                )
              }
              sx={{
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 15,
                fontWeight: 600
              }}
            >
              {loading
                ? "Signing in..."
                : "Continue with Google"}
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              sx={{
                mt: 4
              }}
            >
              Agentic AI For Smart
              Facility Operations And
              Optimizations
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;