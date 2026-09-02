import { useState } from "react";
import jsPDF from "jspdf";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from "@mui/material";


function FacilityIntelligenceReport() {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // Generate Report
  // ==========================================

  const generateReport = () => {

    setLoading(true);
    setError("");

    fetch(
      "http://127.0.0.1:8000/facility-intelligence-report"
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to generate facility intelligence report"
          );
        }

        return response.json();

      })

      .then((result) => {

        setReport(result);
        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Facility Report Error:",
          error
        );

        setError(
          "Unable to generate facility intelligence report."
        );

        setLoading(false);

      });

  };


  // ==========================================
  // Download Report as PDF
  // ==========================================

  const downloadPDF = () => {

    if (!report) {
      return;
    }

    const pdf = new jsPDF();

    let y = 20;


    // ==========================================
    // Title
    // ==========================================

    pdf.setFontSize(17);

    pdf.text(
      "Agentic AI For Smart Facility Operations",
      15,
      y
    );

    y += 8;

    pdf.text(
      "And Optimizations",
      15,
      y
    );

    y += 12;


    pdf.setFontSize(13);

    pdf.text(
      "Facility Intelligence Report",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(10);

    pdf.text(
      `Generated At: ${report.generated_at}`,
      15,
      y
    );

    y += 15;


    // ==========================================
    // Executive Summary
    // ==========================================

    pdf.setFontSize(13);

    pdf.text(
      "Executive Summary",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(10);


    const summary =
      report.executive_summary || {};


    pdf.text(
      `Total Facilities: ${
        summary.total_facilities || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Operational Cost: INR ${Number(
        summary.total_operational_cost || 0
      ).toLocaleString("en-IN")}`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Estimated Savings: INR ${Number(
        summary.estimated_savings || 0
      ).toLocaleString("en-IN", {
        maximumFractionDigits: 2
      })}`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Cost Reduction: ${
        summary.cost_reduction_percentage || 0
      }%`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Facility Health Score: ${
        summary.facility_health_score || 0
      }/100`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Renewable Energy Utilization: ${
        summary.renewable_percentage || 0
      }%`,
      15,
      y
    );

    y += 15;


    // ==========================================
    // Operational Intelligence
    // ==========================================

    pdf.setFontSize(13);

    pdf.text(
      "Operational Intelligence",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(10);


    const operational =
      report.operational_intelligence || {};


    pdf.text(
      `Optimization Opportunities: ${
        operational.optimization_opportunities || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `High Cost Facilities: ${
        operational.high_cost_facilities || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Critical Assets: ${
        operational.critical_assets || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Security Alerts: ${
        operational.security_alerts || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `CCTV Alerts: ${
        operational.cctv_alerts || 0
      }`,
      15,
      y
    );

    y += 15;


    // ==========================================
    // Recommendation Summary
    // ==========================================

    pdf.setFontSize(13);

    pdf.text(
      "Recommendation Summary",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(10);


    const recommendations =
      report.recommendation_summary || {};


    pdf.text(
      `High Priority: ${
        recommendations.high_priority || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Medium Priority: ${
        recommendations.medium_priority || 0
      }`,
      15,
      y
    );

    y += 7;


    pdf.text(
      `Total Recommendations: ${
        recommendations.total_recommendations || 0
      }`,
      15,
      y
    );

    y += 15;


    // ==========================================
    // Top Saving Opportunities
    // ==========================================

    pdf.setFontSize(13);

    pdf.text(
      "Top Cost Saving Opportunities",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(9);


    const opportunities =
      report.top_cost_saving_opportunities || [];


    opportunities.slice(0, 5).forEach(
      (item, index) => {

        if (y > 270) {

          pdf.addPage();

          y = 20;

        }


        pdf.text(
          `${index + 1}. Facility: ${
            item.facility_id
          }`,
          15,
          y
        );

        y += 6;


        pdf.text(
          `Priority: ${
            item.priority
          }`,
          20,
          y
        );

        y += 6;


        pdf.text(
          `Estimated Saving: INR ${Number(
            item.estimated_saving || 0
          ).toLocaleString("en-IN")}`,
          20,
          y
        );

        y += 6;


        const recommendationText =
          pdf.splitTextToSize(
            `Recommendation: ${
              item.recommendation
            }`,
            170
          );


        pdf.text(
          recommendationText,
          20,
          y
        );


        y +=
          recommendationText.length * 5 + 6;

      }
    );


    // ==========================================
    // Conclusion
    // ==========================================

    if (y > 240) {

      pdf.addPage();

      y = 20;

    }


    y += 5;


    pdf.setFontSize(13);

    pdf.text(
      "Conclusion",
      15,
      y
    );

    y += 10;


    pdf.setFontSize(10);


    const conclusion =
      pdf.splitTextToSize(
        report.conclusion || "",
        175
      );


    pdf.text(
      conclusion,
      15,
      y
    );


    // ==========================================
    // Save PDF
    // ==========================================

    pdf.save(
      "Facility_Intelligence_Report.pdf"
    );

  };


  return (

    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2
      }}
    >

      <CardContent>


        {/* ===================================== */}
        {/* Header */}
        {/* ===================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap"
          }}
        >

          <Box>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              📄 Facility Intelligence Report
            </Typography>


            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Generate a consolidated executive report
              using cost, energy, maintenance and
              security intelligence.
            </Typography>

          </Box>


          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap"
            }}
          >

            <Button
              variant="contained"
              onClick={generateReport}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Report"}
            </Button>


            {report && (

              <Button
                variant="outlined"
                onClick={downloadPDF}
              >
                Download PDF
              </Button>

            )}

          </Box>

        </Box>


        {/* ===================================== */}
        {/* Loading */}
        {/* ===================================== */}

        {loading && (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 4
            }}
          >
            <CircularProgress />
          </Box>

        )}


        {/* ===================================== */}
        {/* Error */}
        {/* ===================================== */}

        {error && (

          <Typography
            color="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>

        )}


        {/* ===================================== */}
        {/* Report */}
        {/* ===================================== */}

        {report && !loading && (

          <Box sx={{ mt: 3 }}>


            <Divider sx={{ mb: 3 }} />


            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Agentic AI For Smart Facility
              Operations And Optimizations
            </Typography>


            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mt: 0.5 }}
            >
              Facility Intelligence Report
            </Typography>


            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                mb: 3
              }}
            >
              Generated At: {report.generated_at}
            </Typography>


            {/* Executive Summary */}

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Executive Summary
            </Typography>


            <Grid container spacing={2}>

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Total Facilities
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.executive_summary
                          ?.total_facilities || 0
                      }
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Operational Cost
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      ₹
                      {Number(
                        report.executive_summary
                          ?.total_operational_cost || 0
                      ).toLocaleString("en-IN")}
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Estimated Savings
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      ₹
                      {Number(
                        report.executive_summary
                          ?.estimated_savings || 0
                      ).toLocaleString("en-IN", {
                        maximumFractionDigits: 2
                      })}
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Cost Reduction
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.executive_summary
                          ?.cost_reduction_percentage || 0
                      }
                      %
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Facility Health
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.executive_summary
                          ?.facility_health_score || 0
                      }
                      /100
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Renewable Energy
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.executive_summary
                          ?.renewable_percentage || 0
                      }
                      %
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>

            </Grid>


            {/* Recommendation Summary */}

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                mt: 4,
                mb: 2
              }}
            >
              Recommendation Summary
            </Typography>


            <Grid container spacing={2}>

              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      color="text.secondary"
                    >
                      High Priority
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.recommendation_summary
                          ?.high_priority || 0
                      }
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      color="text.secondary"
                    >
                      Medium Priority
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.recommendation_summary
                          ?.medium_priority || 0
                      }
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>


              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}
              >

                <Card variant="outlined">

                  <CardContent>

                    <Typography
                      color="text.secondary"
                    >
                      Total Recommendations
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {
                        report.recommendation_summary
                          ?.total_recommendations || 0
                      }
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>

            </Grid>


            {/* Conclusion */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 3,
                lineHeight: 1.7
              }}
            >
              {report.conclusion}
            </Typography>

          </Box>

        )}

      </CardContent>

    </Card>

  );

}


export default FacilityIntelligenceReport;