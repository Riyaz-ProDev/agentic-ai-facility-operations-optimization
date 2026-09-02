from datetime import datetime

from cross_agent_orchestrator import get_enterprise_intelligence
from cost_optimization_agent import get_cost_optimization_recommendations


def generate_facility_intelligence_report():

    executive_data = get_enterprise_intelligence()

    recommendations = (
        get_cost_optimization_recommendations()
    )

    high_priority = [
        item
        for item in recommendations
        if item["priority"] == "High"
    ]

    medium_priority = [
        item
        for item in recommendations
        if item["priority"] == "Medium"
    ]

    top_savings = sorted(
        recommendations,
        key=lambda item: item["estimated_saving"],
        reverse=True
    )[:10]

    return {

        "report_title":
            "Agentic FacilityOps Facility Intelligence Report",

        "generated_at":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "executive_summary": {
            "total_facilities":
                executive_data["total_facilities"],

            "total_operational_cost":
                executive_data["total_operational_cost"],

            "estimated_savings":
                executive_data["estimated_savings"],

            "cost_reduction_percentage":
                executive_data["cost_reduction_percentage"],

            "facility_health_score":
                executive_data["facility_health_score"],

            "renewable_percentage":
                executive_data["renewable_percentage"]
        },

        "operational_intelligence": {
            "optimization_opportunities":
                executive_data[
                    "optimization_opportunities"
                ],

            "high_cost_facilities":
                executive_data[
                    "high_cost_facilities"
                ],

            "critical_assets":
                executive_data["critical_assets"],

            "security_alerts":
                executive_data["security_alerts"],

            "cctv_alerts":
                executive_data["cctv_alerts"]
        },

        "recommendation_summary": {
            "high_priority":
                len(high_priority),

            "medium_priority":
                len(medium_priority),

            "total_recommendations":
                len(recommendations)
        },

        "top_cost_saving_opportunities":
            top_savings,

        "agent_status":
            executive_data["agent_status"],

        "conclusion": (
            "The Agentic FacilityOps platform combines "
            "energy, occupancy, maintenance and security "
            "intelligence to identify operational risks "
            "and cost reduction opportunities."
        )
    }