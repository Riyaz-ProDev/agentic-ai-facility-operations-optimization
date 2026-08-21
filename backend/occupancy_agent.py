from database import get_connection


def get_occupancy_insights():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Facility_ID,
            ROUND(AVG(Occupancy), 2) AS average_occupancy,
            MAX(Occupancy) AS peak_occupancy
        FROM sensor_data
        GROUP BY Facility_ID
        ORDER BY average_occupancy DESC
    """)

    data = cursor.fetchall()

    insights = []

    for row in data:
        avg_occ = row["average_occupancy"]

        if avg_occ > 350:
            level = "High"
            message = "High occupancy detected. Monitor crowd density and ventilation."
        elif avg_occ < 150:
            level = "Low"
            message = "Low occupancy detected. Consider reducing lighting and HVAC usage."
        else:
            level = "Normal"
            message = "Occupancy is within normal range."

        insights.append({
            "facility": row["Facility_ID"],
            "average_occupancy": avg_occ,
            "peak_occupancy": row["peak_occupancy"],
            "level": level,
            "message": message
        })

    cursor.close()
    conn.close()

    return insights