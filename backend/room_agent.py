from database import get_connection


def get_room_utilization_insights():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Room_ID,
            Facility_ID,
            Room_Type,
            ROUND(AVG(Utilization_Percent), 2) AS average_utilization
        FROM room_utilization
        GROUP BY
            Room_ID,
            Facility_ID,
            Room_Type
        ORDER BY average_utilization DESC
    """)

    rooms = cursor.fetchall()

    insights = []

    for room in rooms:
        utilization = float(room["average_utilization"])

        if utilization >= 90:
            priority = "High"
            status = "Near Capacity"
            message = "Room is operating near maximum capacity. Consider crowd control or alternate space."

        elif utilization >= 70:
            priority = "Medium"
            status = "High Utilization"
            message = "Room utilization is high. Monitor usage during peak periods."

        elif utilization < 30:
            priority = "Low"
            status = "Underutilized"
            message = "Room is underutilized. Consider consolidating space or reducing HVAC and lighting usage."

        else:
            priority = "Normal"
            status = "Optimal"
            message = "Room utilization is within the normal range."

        insights.append({
            "room_id": room["Room_ID"],
            "facility_id": room["Facility_ID"],
            "room_type": room["Room_Type"],
            "average_utilization": utilization,
            "status": status,
            "priority": priority,
            "message": message
        })

    cursor.close()
    conn.close()

    return insights