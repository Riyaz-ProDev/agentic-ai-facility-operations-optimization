from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection
from occupancy_agent import get_occupancy_insights
from security_agent import get_security_alerts
from room_agent import get_room_utilization_insights
from cctv_agent import get_cctv_alerts

from cost_optimization_agent import get_cost_optimization_recommendations

from cross_agent_orchestrator import get_enterprise_intelligence
app = FastAPI(title="Agentic FacilityOps API")

from facility_intelligence_report import generate_facility_intelligence_report
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your API routes continue below...
@app.get("/security-alerts")
def security_alerts():
    return get_security_alerts()

@app.get("/cost-optimization")
def cost_optimization():
    return get_cost_optimization_recommendations()

@app.get("/cost-optimization-summary")
def cost_optimization_summary():

    recommendations = get_cost_optimization_recommendations()

    if not recommendations:
        return {
            "total_facilities": 0,
            "total_operational_cost": 0,
            "total_estimated_savings": 0,
            "high_priority_facilities": 0,
            "medium_priority_facilities": 0,
            "low_priority_facilities": 0,
            "total_opportunities": 0
        }

    total_operational_cost = sum(
        item["total_cost"]
        for item in recommendations
    )

    total_estimated_savings = sum(
        item["estimated_saving"]
        for item in recommendations
    )

    high_priority = sum(
        1 for item in recommendations
        if item["priority"] == "High"
    )

    medium_priority = sum(
        1 for item in recommendations
        if item["priority"] == "Medium"
    )

    low_priority = sum(
        1 for item in recommendations
        if item["priority"] == "Low"
    )

    return {
        "total_facilities": len(recommendations),

        "total_operational_cost": round(
            total_operational_cost, 2
        ),

        "total_estimated_savings": round(
            total_estimated_savings, 2
        ),

        "high_priority_facilities": high_priority,

        "medium_priority_facilities": medium_priority,

        "low_priority_facilities": low_priority,

        "total_opportunities": len(recommendations)
    }

@app.get("/enterprise-intelligence")
def enterprise_intelligence():
    return get_enterprise_intelligence()

@app.get("/facility-intelligence-report")
def facility_intelligence_report():
    return generate_facility_intelligence_report()
@app.get("/cctv-alerts")
def cctv_alerts():
    return get_cctv_alerts()

@app.get("/")
def home():
    return {"message": "Agentic FacilityOps API is running"}

@app.get("/security-summary")
def security_summary():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Total access events
    cursor.execute("""
        SELECT COUNT(*) AS total_access_events
        FROM access_events
    """)
    total = cursor.fetchone()

    # Denied / unauthorized access
    cursor.execute("""
        SELECT COUNT(*) AS denied_access
        FROM access_events
        WHERE Access_Status = 'Denied'
    """)
    denied = cursor.fetchone()

    # Restricted hour events (10 PM - 6 AM)
    cursor.execute("""
        SELECT COUNT(*) AS restricted_hour_events
        FROM access_events
        WHERE HOUR(Time) >= 22
           OR HOUR(Time) < 6
    """)
    restricted = cursor.fetchone()

    # Facilities having denied access
    cursor.execute("""
        SELECT COUNT(DISTINCT Facility_ID) AS affected_facilities
        FROM access_events
        WHERE Access_Status = 'Denied'
    """)
    affected = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        **total,
        **denied,
        **restricted,
        **affected
    }
@app.get("/room-utilization-insights")
def room_utilization_insights():
    return get_room_utilization_insights()
@app.get("/access-monitoring")
def access_monitoring():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Event_ID,
            Facility_ID,
            Person_ID,
            Date,
            Time,
            Access_Type,
            Access_Status,
            Door_ID
        FROM access_events
        ORDER BY Date DESC, Time DESC
        LIMIT 200
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    for row in data:
        row["Date"] = str(row["Date"])
        row["Time"] = str(row["Time"])

    return data

@app.get("/cost-distribution")
def cost_distribution():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            ROUND(SUM(Energy_Cost_INR), 2) AS energy_cost
        FROM energy_usage
    """)

    result = cursor.fetchone()

    cursor.close()
    conn.close()

    energy_cost = float(result["energy_cost"] or 0)

    maintenance_cost = round(energy_cost * 0.25, 2)
    security_cost = round(energy_cost * 0.18, 2)
    other_cost = round(energy_cost * 0.12, 2)

    return [
        {
            "name": "Energy",
            "value": energy_cost
        },
        {
            "name": "Maintenance",
            "value": maintenance_cost
        },
        {
            "name": "Security",
            "value": security_cost
        },
        {
            "name": "Other",
            "value": other_cost
        }
    ]
@app.get("/cctv-summary")
def cctv_summary():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT COUNT(*) AS total_cctv_events
        FROM cctv_events
    """)
    total = cursor.fetchone()

    cursor.execute("""
        SELECT COUNT(*) AS high_severity_events
        FROM cctv_events
        WHERE Severity IN ('High', 'Critical')
    """)
    high = cursor.fetchone()

    cursor.execute("""
        SELECT COUNT(*) AS open_events
        FROM cctv_events
        WHERE Status = 'Open'
    """)
    open_events = cursor.fetchone()

    cursor.execute("""
        SELECT COUNT(DISTINCT Facility_ID) AS affected_facilities
        FROM cctv_events
        WHERE Severity IN ('High', 'Critical')
    """)
    affected = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        **total,
        **high,
        **open_events,
        **affected
    }


@app.get("/test-db")
def test_database():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM facilities")
    total = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {
        "status": "Connected Successfully",
        "total_facilities": total
    }

@app.get("/cctv-monitoring")
def cctv_monitoring():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Event_ID,
            Camera_ID,
            Facility_ID,
            Date,
            Time,
            Location,
            Event_Type,
            Severity,
            Status,
            Description
        FROM cctv_events
        ORDER BY Date DESC, Time DESC
        LIMIT 200
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    for row in data:
        row["Date"] = str(row["Date"])
        row["Time"] = str(row["Time"])

    return data
@app.get("/room-utilization-summary")
def room_utilization_summary():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            ROUND(AVG(Utilization_Percent), 2) AS average_utilization,
            ROUND(MAX(Utilization_Percent), 2) AS peak_utilization,

            COUNT(DISTINCT Room_ID) AS total_rooms,

            COUNT(DISTINCT CASE
                WHEN Utilization_Percent < 30
                THEN Room_ID
            END) AS underutilized_rooms,

            COUNT(DISTINCT CASE
                WHEN Utilization_Percent >= 90
                THEN Room_ID
            END) AS near_capacity_rooms

        FROM room_utilization
    """)

    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return data

@app.get("/agent-performance")
def agent_performance():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # ---------------------------------------------
        # ENERGY / COST AGENT
        # ---------------------------------------------

        cursor.execute("""
            SELECT COUNT(DISTINCT Facility_ID) AS total
            FROM energy_usage
        """)

        energy_result = cursor.fetchone()

        energy_facilities = int(
            energy_result["total"] or 0
        )


        # ---------------------------------------------
        # OCCUPANCY AGENT
        # ---------------------------------------------

        cursor.execute("""
            SELECT COUNT(DISTINCT Facility_ID) AS total
            FROM room_utilization
        """)

        occupancy_result = cursor.fetchone()

        occupancy_facilities = int(
            occupancy_result["total"] or 0
        )


        # ---------------------------------------------
        # MAINTENANCE AGENT
        # ---------------------------------------------

        cursor.execute("""
            SELECT COUNT(*) AS total,
                   SUM(
                       CASE
                           WHEN health_status = 'Critical'
                           THEN 1
                           ELSE 0
                       END
                   ) AS critical
            FROM equipment_health
        """)

        maintenance_result = cursor.fetchone()

        total_equipment = int(
            maintenance_result["total"] or 0
        )

        critical_equipment = int(
            maintenance_result["critical"] or 0
        )


        # ---------------------------------------------
        # SECURITY AGENT
        # ---------------------------------------------

        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM access_events
        """)

        security_result = cursor.fetchone()

        security_events = int(
            security_result["total"] or 0
        )


        # ---------------------------------------------
        # CCTV AGENT
        # ---------------------------------------------

        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM cctv_events
        """)

        cctv_result = cursor.fetchone()

        cctv_events = int(
            cctv_result["total"] or 0
        )


        # =============================================
        # PERFORMANCE SCORE CALCULATION
        # =============================================

        # Energy Agent
        cost_agent_score = min(
            100,
            70 + energy_facilities * 0.5
        )


        # Occupancy Agent
        occupancy_agent_score = min(
            100,
            70 + occupancy_facilities * 0.5
        )


        # Room Agent
        room_agent_score = min(
            100,
            75 + occupancy_facilities * 0.4
        )


        # Security Agent
        security_agent_score = min(
            100,
            70 + min(security_events, 1000) * 0.02
        )


        # CCTV Agent
        cctv_agent_score = min(
            100,
            70 + min(cctv_events, 1000) * 0.02
        )


        # Maintenance Agent
        if total_equipment > 0:

            healthy_ratio = (
                total_equipment - critical_equipment
            ) / total_equipment

            maintenance_agent_score = (
                healthy_ratio * 100
            )

        else:

            maintenance_agent_score = 0


        return [
            {
                "agent": "Cost Optimization Agent",
                "status": "Active",
                "performance": round(
                    cost_agent_score,
                    2
                )
            },
            {
                "agent": "Occupancy Agent",
                "status": "Active",
                "performance": round(
                    occupancy_agent_score,
                    2
                )
            },
            {
                "agent": "Room Utilization Agent",
                "status": "Active",
                "performance": round(
                    room_agent_score,
                    2
                )
            },
            {
                "agent": "Security Agent",
                "status": "Active",
                "performance": round(
                    security_agent_score,
                    2
                )
            },
            {
                "agent": "CCTV Agent",
                "status": "Active",
                "performance": round(
                    cctv_agent_score,
                    2
                )
            },
            {
                "agent": "Maintenance Agent",
                "status": "Active",
                "performance": round(
                    maintenance_agent_score,
                    2
                )
            }
        ]

    finally:

        cursor.close()
        conn.close()
@app.get("/overcrowding-alerts")
def overcrowding_alerts():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Room_ID,
            Facility_ID,
            Room_Type,
            Capacity,
            Occupancy,
            Utilization_Percent,
            Date,
            Time
        FROM room_utilization
        WHERE Utilization_Percent >= 90
        ORDER BY Utilization_Percent DESC
        LIMIT 100
    """)

    data = cursor.fetchall()

    alerts = []

    for row in data:
        utilization = float(row["Utilization_Percent"])

        if utilization >= 100:
            priority = "Critical"
            message = "Room has reached full capacity."
        else:
            priority = "High"
            message = "Room is close to maximum capacity."

        alerts.append({
            "room_id": row["Room_ID"],
            "facility_id": row["Facility_ID"],
            "room_type": row["Room_Type"],
            "capacity": row["Capacity"],
            "occupancy": row["Occupancy"],
            "utilization": utilization,
            "date": str(row["Date"]),
            "time": str(row["Time"]),
            "priority": priority,
            "message": message
        })

    cursor.close()
    conn.close()

    return alerts

@app.get("/workspace-allocation")
def workspace_allocation():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Room_ID,
            Facility_ID,
            Room_Type,
            MAX(Capacity) AS capacity,
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            ROUND(AVG(Utilization_Percent), 2) AS average_utilization
        FROM room_utilization
        GROUP BY
            Room_ID,
            Facility_ID,
            Room_Type
        ORDER BY average_utilization ASC
    """)

    rooms = cursor.fetchall()

    recommendations = []

    for room in rooms:
        utilization = float(room["average_utilization"])

        if utilization < 30:
            status = "Underutilized"
            priority = "Medium"
            recommendation = (
                "Consider consolidating workspace or reducing "
                "HVAC and lighting usage."
            )

        elif utilization >= 90:
            status = "Near Capacity"
            priority = "High"
            recommendation = (
                "Consider allocating users to another available room."
            )

        elif utilization >= 70:
            status = "High Utilization"
            priority = "Medium"
            recommendation = (
                "Monitor room usage and consider alternative workspace "
                "during peak periods."
            )

        else:
            continue

        recommendations.append({
            "room_id": room["Room_ID"],
            "facility_id": room["Facility_ID"],
            "room_type": room["Room_Type"],
            "capacity": room["capacity"],
            "average_occupancy": float(
                room["average_occupancy"]
            ),
            "average_utilization": utilization,
            "status": status,
            "priority": priority,
            "recommendation": recommendation
        })

    cursor.close()
    conn.close()

    return recommendations

@app.get("/occupancy-heatmap")
def occupancy_heatmap():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Room_ID,
            Facility_ID,
            Room_Type,
            ROUND(AVG(Utilization_Percent), 2) AS utilization
        FROM room_utilization
        GROUP BY
            Room_ID,
            Facility_ID,
            Room_Type
        ORDER BY Facility_ID, Room_ID
    """)

    data = cursor.fetchall()

    result = []

    for row in data:
        utilization = float(row["utilization"])

        if utilization >= 90:
            level = "Critical"
        elif utilization >= 70:
            level = "High"
        elif utilization >= 30:
            level = "Normal"
        else:
            level = "Low"

        result.append({
            "room_id": row["Room_ID"],
            "facility_id": row["Facility_ID"],
            "room_type": row["Room_Type"],
            "utilization": utilization,
            "level": level
        })

    cursor.close()
    conn.close()

    return result


@app.get("/room-utilization-analytics")
def room_utilization_analytics():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Room_ID,
            Facility_ID,
            Room_Type,
            MAX(Capacity) AS capacity,
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            MAX(Occupancy) AS peak_occupancy,
            ROUND(AVG(Utilization_Percent), 2) AS average_utilization
        FROM room_utilization
        GROUP BY
            Room_ID,
            Facility_ID,
            Room_Type
        ORDER BY average_utilization DESC
    """)

    data = cursor.fetchall()

    analytics = []

    for row in data:

        utilization = float(row["average_utilization"])

        if utilization >= 90:
            level = "Near Capacity"
            message = "Room is operating near maximum capacity."

        elif utilization >= 70:
            level = "High"
            message = "Room has high utilization."

        elif utilization >= 30:
            level = "Normal"
            message = "Room utilization is within normal range."

        else:
            level = "Underutilized"
            message = "Room is underutilized. Consider space optimization."

        analytics.append({
            "room_id": row["Room_ID"],
            "facility_id": row["Facility_ID"],
            "room_type": row["Room_Type"],
            "capacity": row["capacity"],
            "average_occupancy": float(row["average_occupancy"]),
            "peak_occupancy": row["peak_occupancy"],
            "average_utilization": utilization,
            "level": level,
            "message": message
        })

    cursor.close()
    conn.close()

    return analytics
@app.get("/facilities")
def get_facilities():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM facilities")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/energy")
def get_energy():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM energy_usage")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data  
  
 
@app.get("/sensor")
def get_sensor():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM sensor_data")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data 
  
  
  
@app.get("/dashboard")
def dashboard():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            COUNT(DISTINCT Facility_ID) AS total_facilities,
            ROUND(SUM(Electricity_kWh),2) AS total_energy,
            ROUND(SUM(Energy_Cost_INR),2) AS total_cost,
            ROUND(AVG(Peak_Demand_kW),2) AS avg_peak_demand,
            ROUND(SUM(Renewable_Energy_kWh),2) AS renewable_energy
        FROM energy_usage
    """)
    energy = cursor.fetchone()

    cursor.execute("""
        SELECT
            ROUND(AVG(Temperature_C),2) AS avg_temperature,
            ROUND(AVG(Humidity_Percent),2) AS avg_humidity,
            ROUND(AVG(Air_Quality_Index),2) AS avg_air_quality
        FROM sensor_data
    """)
    sensor = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        **energy,
        **sensor
    }  
   
@app.get("/energy-chart")
def energy_chart():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Date,
            ROUND(SUM(Electricity_kWh),2) AS energy
        FROM energy_usage
        GROUP BY Date
        ORDER BY Date
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data    

@app.get("/facility-energy")
def facility_energy():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Facility_ID,
            ROUND(SUM(Electricity_kWh),2) AS energy
        FROM energy_usage
        GROUP BY Facility_ID
        ORDER BY energy DESC
        LIMIT 10
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/temperature-humidity")
def temperature_humidity():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Date,
            ROUND(AVG(Temperature_C),2) AS temperature,
            ROUND(AVG(Humidity_Percent),2) AS humidity
        FROM sensor_data
        GROUP BY Date
        ORDER BY Date
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/recommendations")
def recommendations():

    return [
        {
            "priority": "High",
            "facility": "F029",
            "message": "High energy consumption detected. Inspect HVAC systems."
        },
        {
            "priority": "Medium",
            "facility": "F021",
            "message": "Lighting remains ON during low occupancy."
        },
        {
            "priority": "Low",
            "facility": "F011",
            "message": "Renewable energy utilization can be increased."
        }
    ]
    
    
@app.get("/assets")
def get_assets():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM asset_monitoring
        ORDER BY timestamp DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@app.get("/equipment-health")
def equipment_health():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM equipment_health
        ORDER BY health_score ASC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@app.get("/maintenance-schedule")
def maintenance_schedule():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM maintenance_schedule
        ORDER BY predicted_date
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/maintenance-alerts")
def maintenance_alerts():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM maintenance_alerts
        ORDER BY severity DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/health-distribution")
def health_distribution():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            health_status,
            COUNT(*) value
        FROM equipment_health
        GROUP BY health_status
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@app.get("/maintenance-priority")
def maintenance_priority():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            priority,
            COUNT(*) total
        FROM maintenance_schedule
        GROUP BY priority
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@app.get("/health-trend")
def health_trend():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            DATE(calculated_at) date,
            ROUND(AVG(health_score),2) average_health
        FROM equipment_health
        GROUP BY DATE(calculated_at)
        ORDER BY DATE(calculated_at)
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/recent-maintenance-alerts")
def recent_alerts():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM maintenance_alerts
        ORDER BY created_at DESC
        LIMIT 10
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

@app.get("/maintenance-dashboard")
def maintenance_dashboard():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Total Assets
    cursor.execute("""
        SELECT COUNT(*) AS total_assets
        FROM asset_monitoring
    """)
    total_assets = cursor.fetchone()["total_assets"]

    # Healthy Assets
    cursor.execute("""
        SELECT COUNT(*) AS healthy_assets
        FROM equipment_health
        WHERE health_status IN ('Excellent','Good')
    """)
    healthy_assets = cursor.fetchone()["healthy_assets"]

    # Warning Assets
    cursor.execute("""
        SELECT COUNT(*) AS warning_assets
        FROM equipment_health
        WHERE health_status IN ('Fair','Poor')
    """)
    warning_assets = cursor.fetchone()["warning_assets"]

    # Critical Assets
    cursor.execute("""
        SELECT COUNT(*) AS critical_assets
        FROM equipment_health
        WHERE health_status='Critical'
    """)
    critical_assets = cursor.fetchone()["critical_assets"]

    # Maintenance Count
    cursor.execute("""
        SELECT COUNT(*) AS maintenance_count
        FROM maintenance_schedule
    """)
    maintenance_count = cursor.fetchone()["maintenance_count"]

    # Active Alerts
    cursor.execute("""
        SELECT COUNT(*) AS active_alerts
        FROM maintenance_alerts
        WHERE status='Active'
    """)
    active_alerts = cursor.fetchone()["active_alerts"]

    cursor.close()
    conn.close()

    return {
        "total_assets": total_assets,
        "healthy_assets": healthy_assets,
        "warning_assets": warning_assets,
        "critical_assets": critical_assets,
        "maintenance_count": maintenance_count,
        "active_alerts": active_alerts
    }
    
@app.get("/occupancy-insights")
def occupancy_insights():
    return get_occupancy_insights()    


@app.get("/occupancy-summary")
def occupancy_summary():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            MAX(Occupancy) AS peak_occupancy,
            MIN(Occupancy) AS minimum_occupancy,
            COUNT(*) AS total_sensor_records
        FROM sensor_data
    """)

    summary = cursor.fetchone()

    cursor.execute("""
        SELECT COUNT(DISTINCT Facility_ID) AS high_occupancy_facilities
        FROM sensor_data
        WHERE Occupancy > 350
    """)

    high_data = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        **summary,
        **high_data
    }
    
@app.get("/occupancy-trend")
def occupancy_trend():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Date,
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            MAX(Occupancy) AS peak_occupancy
        FROM sensor_data
        GROUP BY Date
        ORDER BY Date
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data    

@app.get("/facility-occupancy")
def facility_occupancy():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Facility_ID,
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            MAX(Occupancy) AS peak_occupancy,
            MIN(Occupancy) AS minimum_occupancy
        FROM sensor_data
        GROUP BY Facility_ID
        ORDER BY average_occupancy DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data