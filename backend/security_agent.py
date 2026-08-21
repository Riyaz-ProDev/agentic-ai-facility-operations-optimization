from database import get_connection


def get_security_alerts():
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
    """)

    events = cursor.fetchall()

    alerts = []

    for event in events:

        # Convert MySQL TIME into hour
        hour = event["Time"].seconds // 3600

        # HIGH PRIORITY
        # Access was denied
        if event["Access_Status"] == "Denied":

            alerts.append({
                "event_id": event["Event_ID"],
                "facility": event["Facility_ID"],
                "person": event["Person_ID"],
                "date": str(event["Date"]),
                "time": str(event["Time"]),
                "door": event["Door_ID"],
                "priority": "High",
                "message": "Unauthorized access attempt detected."
            })

        # MEDIUM PRIORITY
        # Access happened during restricted hours
        elif hour >= 22 or hour < 6:

            alerts.append({
                "event_id": event["Event_ID"],
                "facility": event["Facility_ID"],
                "person": event["Person_ID"],
                "date": str(event["Date"]),
                "time": str(event["Time"]),
                "door": event["Door_ID"],
                "priority": "Medium",
                "message": "Access detected during restricted hours."
            })

    cursor.close()
    conn.close()

    return alerts