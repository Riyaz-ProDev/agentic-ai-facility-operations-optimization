from database import get_connection


def get_cctv_alerts():
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
        WHERE Severity IN ('High', 'Critical')
        ORDER BY Date DESC, Time DESC
    """)

    events = cursor.fetchall()

    alerts = []

    for event in events:
        alerts.append({
            "event_id": event["Event_ID"],
            "camera_id": event["Camera_ID"],
            "facility": event["Facility_ID"],
            "date": str(event["Date"]),
            "time": str(event["Time"]),
            "location": event["Location"],
            "event_type": event["Event_Type"],
            "severity": event["Severity"],
            "status": event["Status"],
            "message": event["Description"]
        })

    cursor.close()
    conn.close()

    return alerts