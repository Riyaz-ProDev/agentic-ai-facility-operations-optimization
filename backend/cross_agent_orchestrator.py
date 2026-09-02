from database import get_connection

from occupancy_agent import get_occupancy_insights
from security_agent import get_security_alerts
from room_agent import get_room_utilization_insights
from cctv_agent import get_cctv_alerts
from cost_optimization_agent import get_cost_optimization_recommendations


def get_enterprise_intelligence():

    # -------------------------------------------------
    # 1. Run existing agents
    # -------------------------------------------------

    cost_data = get_cost_optimization_recommendations()
    occupancy_data = get_occupancy_insights()
    room_data = get_room_utilization_insights()
    security_data = get_security_alerts()
    cctv_data = get_cctv_alerts()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # -------------------------------------------------
    # 2. Total facilities
    # -------------------------------------------------

    cursor.execute("""
        SELECT COUNT(*) AS total_facilities
        FROM facilities
    """)

    facility_result = cursor.fetchone()

    total_facilities = facility_result["total_facilities"]

    # -------------------------------------------------
    # 3. Equipment health
    # -------------------------------------------------

    cursor.execute("""
        SELECT COUNT(*) AS critical_assets
        FROM equipment_health
        WHERE health_status = 'Critical'
    """)

    critical_result = cursor.fetchone()

    critical_assets = critical_result["critical_assets"]

    # -------------------------------------------------
    # 4. Energy + renewable information
    # -------------------------------------------------

    cursor.execute("""
        SELECT
            ROUND(SUM(Electricity_kWh), 2) AS total_energy,
            ROUND(SUM(Renewable_Energy_kWh), 2)
            AS renewable_energy
        FROM energy_usage
    """)

    energy_result = cursor.fetchone()

    total_energy = float(
        energy_result["total_energy"] or 0
    )

    renewable_energy = float(
        energy_result["renewable_energy"] or 0
    )

    cursor.close()
    conn.close()

    # -------------------------------------------------
    # 5. Cost intelligence
    # -------------------------------------------------

    total_cost = sum(
        item["total_cost"]
        for item in cost_data
    )

    estimated_savings = sum(
        item["estimated_saving"]
        for item in cost_data
    )

    high_cost_facilities = sum(
        1
        for item in cost_data
        if item["priority"] == "High"
    )

    # -------------------------------------------------
    # 6. Cost reduction percentage
    # -------------------------------------------------

    if total_cost > 0:

        cost_reduction_percentage = (
            estimated_savings / total_cost
        ) * 100

    else:

        cost_reduction_percentage = 0

    # -------------------------------------------------
    # 7. Sustainability percentage
    # -------------------------------------------------

    if total_energy > 0:

        renewable_percentage = (
            renewable_energy / total_energy
        ) * 100

    else:

        renewable_percentage = 0

    # -------------------------------------------------
    # 8. Facility health score
    # -------------------------------------------------

    security_alerts = len(security_data)
    cctv_alerts = len(cctv_data)

    penalty = (
        high_cost_facilities * 0.5
        + security_alerts * 0.05
        + cctv_alerts * 0.03
        + critical_assets * 2
    )

    facility_health_score = max(
        0,
        min(
            100,
            round(100 - penalty, 2)
        )
    )

    # -------------------------------------------------
    # 9. Final combined response
    # -------------------------------------------------

    return {

        "total_facilities": total_facilities,

        "total_operational_cost": round(
            total_cost,
            2
        ),

        "estimated_savings": round(
            estimated_savings,
            2
        ),

        "cost_reduction_percentage": round(
            cost_reduction_percentage,
            2
        ),

        "facility_health_score":
            facility_health_score,

        "optimization_opportunities":
            len(cost_data),

        "high_cost_facilities":
            high_cost_facilities,

        "occupancy_insights":
            len(occupancy_data),

        "room_insights":
            len(room_data),

        "security_alerts":
            security_alerts,

        "cctv_alerts":
            cctv_alerts,

        "critical_assets":
            critical_assets,

        "renewable_percentage": round(
            renewable_percentage,
            2
        ),

        "agent_status": {

            "cost_agent": "Active",

            "occupancy_agent": "Active",

            "room_agent": "Active",

            "security_agent": "Active",

            "cctv_agent": "Active",

            "maintenance_agent": "Active"
        }
    }