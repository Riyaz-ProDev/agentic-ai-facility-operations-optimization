import random
from datetime import date, timedelta, time

from database import get_connection


def generate_room_data():
    conn = get_connection()
    cursor = conn.cursor()

    room_types = [
        "Meeting Room",
        "Conference Room",
        "Workspace",
        "Training Room",
        "Server Room",
    ]

    start_date = date(2026, 7, 1)

    records = []
    record_number = 1

    # 50 facilities
    for facility_number in range(1, 51):

        facility_id = f"F{facility_number:03d}"

        # 5 rooms per facility
        for room_number in range(1, 6):

            room_id = f"R{facility_number:03d}{room_number:02d}"

            room_type = random.choice(room_types)

            capacity = random.randint(20, 100)

            # Generate 10 observations for each room
            for day_offset in range(10):

                current_date = start_date + timedelta(days=day_offset)

                hour = random.randint(8, 20)
                minute = random.randint(0, 59)

                current_time = time(hour, minute)

                occupancy = random.randint(0, capacity)

                utilization = round(
                    (occupancy / capacity) * 100,
                    2
                )

                motion = "Yes" if occupancy > 0 else "No"

                record_id = f"RU{record_number:06d}"

                records.append(
                    (
                        record_id,
                        room_id,
                        facility_id,
                        current_date,
                        current_time,
                        room_type,
                        capacity,
                        occupancy,
                        motion,
                        utilization,
                    )
                )

                record_number += 1

    sql = """
        INSERT INTO room_utilization
        (
            Record_ID,
            Room_ID,
            Facility_ID,
            Date,
            Time,
            Room_Type,
            Capacity,
            Occupancy,
            Motion,
            Utilization_Percent
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    cursor.executemany(sql, records)

    conn.commit()

    print(f"{cursor.rowcount} room utilization records inserted successfully.")

    cursor.close()
    conn.close()


if __name__ == "__main__":
    generate_room_data()