from database import get_connection


def get_cost_optimization_recommendations():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Facility_ID,
            ROUND(SUM(Electricity_kWh), 2) AS total_energy,
            ROUND(SUM(Energy_Cost_INR), 2) AS total_cost,
            ROUND(SUM(Renewable_Energy_kWh), 2) AS renewable_energy,
            ROUND(AVG(Peak_Demand_kW), 2) AS average_peak_demand
        FROM energy_usage
        GROUP BY Facility_ID
        ORDER BY total_cost DESC
    """)

    facilities = cursor.fetchall()

    if not facilities:
        cursor.close()
        conn.close()
        return []

    processed = []

    for facility in facilities:

        total_energy = float(
            facility["total_energy"] or 0
        )

        total_cost = float(
            facility["total_cost"] or 0
        )

        renewable_energy = float(
            facility["renewable_energy"] or 0
        )

        average_peak_demand = float(
            facility["average_peak_demand"] or 0
        )

        renewable_percentage = (
            (renewable_energy / total_energy) * 100
            if total_energy > 0
            else 0
        )

        processed.append({
            "facility_id": facility["Facility_ID"],
            "total_energy": total_energy,
            "total_cost": total_cost,
            "renewable_energy": renewable_energy,
            "renewable_percentage": renewable_percentage,
            "average_peak_demand": average_peak_demand
        })

    # --------------------------------------------
    # Average values
    # --------------------------------------------

    average_cost = sum(
        item["total_cost"]
        for item in processed
    ) / len(processed)

    average_energy = sum(
        item["total_energy"]
        for item in processed
    ) / len(processed)

    average_peak = sum(
        item["average_peak_demand"]
        for item in processed
    ) / len(processed)

    # --------------------------------------------
    # Sort highest cost first
    # --------------------------------------------

    processed.sort(
        key=lambda item: item["total_cost"],
        reverse=True
    )

    total_facilities = len(processed)

    # Top 10% = High
    high_count = max(
        1,
        round(total_facilities * 0.10)
    )

    # Next 20% = Medium
    medium_count = max(
        1,
        round(total_facilities * 0.20)
    )

    recommendations = []

    # --------------------------------------------
    # Analyze each facility
    # --------------------------------------------

    for index, facility in enumerate(processed):

        total_energy = facility["total_energy"]
        total_cost = facility["total_cost"]

        renewable_percentage = (
            facility["renewable_percentage"]
        )

        average_peak_demand = (
            facility["average_peak_demand"]
        )

        # --------------------------------------------
        # Severity scores
        # --------------------------------------------

        cost_score = (
            total_cost / average_cost
            if average_cost > 0
            else 0
        )

        energy_score = (
            total_energy / average_energy
            if average_energy > 0
            else 0
        )

        peak_score = (
            average_peak_demand / average_peak
            if average_peak > 0
            else 0
        )

        renewable_score = (
            (20 - renewable_percentage) / 20
            if renewable_percentage < 20
            else 0
        )

        problem_scores = {
            "cost": cost_score,
            "energy": energy_score,
            "peak": peak_score,
            "renewable": renewable_score
        }

        dominant_issue = max(
            problem_scores,
            key=problem_scores.get
        )

        # ============================================
        # PRIORITY CLASSIFICATION
        # ============================================

        if index < high_count:

            priority = "High"
            saving_percentage = 12

        elif index < high_count + medium_count:

            priority = "Medium"
            saving_percentage = 8

        else:

            priority = "Low"
            saving_percentage = 5

        # ============================================
        # ISSUE + RECOMMENDATION
        # ============================================

        if dominant_issue == "peak":

            issue = "High peak demand"

            recommendation = (
                "Reduce peak-hour electricity usage, "
                "schedule heavy equipment during off-peak "
                "hours and apply demand-side management."
            )

        elif dominant_issue == "renewable":

            issue = "Low renewable energy utilization"

            recommendation = (
                "Increase renewable energy contribution, "
                "shift suitable loads to renewable sources "
                "and reduce grid dependency."
            )

        elif dominant_issue == "energy":

            issue = "Excessive facility energy consumption"

            recommendation = (
                "Perform an energy audit, inspect "
                "high-consuming equipment and optimize "
                "HVAC and lighting schedules."
            )

        else:

            issue = "High operational energy cost"

            recommendation = (
                "Review facility operating schedules, "
                "identify unnecessary equipment runtime "
                "and implement automated energy controls."
            )

        # --------------------------------------------
        # Estimated savings
        # --------------------------------------------

        estimated_saving = round(
            total_cost * saving_percentage / 100,
            2
        )

        recommendations.append({

            "facility_id":
                facility["facility_id"],

            "total_energy":
                round(total_energy, 2),

            "total_cost":
                round(total_cost, 2),

            "renewable_energy":
                round(
                    facility["renewable_energy"],
                    2
                ),

            "renewable_percentage":
                round(
                    renewable_percentage,
                    2
                ),

            "average_peak_demand":
                round(
                    average_peak_demand,
                    2
                ),

            "issue":
                issue,

            "priority":
                priority,

            "saving_percentage":
                saving_percentage,

            "estimated_saving":
                estimated_saving,

            "recommendation":
                recommendation
        })

    cursor.close()
    conn.close()

    return recommendations