import { useEffect, useState } from "react";
import api from "../services/api";

function FacilityTable() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    api.get("/facilities")
      .then((res) => setFacilities(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
    style={{
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
}}
    >
      <h2>Facility Details</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th>Facility ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Floors</th>
            <th>Area</th>
          </tr>
        </thead>

        <tbody>
          {facilities.map((facility) => (
            <tr key={facility.Facility_ID}>
              <td>{facility.Facility_ID}</td>
              <td>{facility.Facility_Name}</td>
              <td>{facility.Facility_Type}</td>
              <td>{facility.City}</td>
              <td>{facility.State}</td>
              <td>{facility.Total_Floors}</td>
              <td>{facility.Total_Area_sqft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacilityTable;