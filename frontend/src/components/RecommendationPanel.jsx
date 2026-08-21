import { useEffect, useState } from "react";
import api from "../services/api";

function RecommendationPanel() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    api
      .get("/recommendations")
      .then((res) => setRecommendations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <h2>🤖 AI Energy Recommendations</h2>

      {recommendations.map((item, index) => (
        <div
          key={index}
          style={{
            borderLeft: "5px solid green",
            paddingLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <h4>{item.priority} Priority</h4>

          <p>
            <b>{item.facility}</b>
          </p>

          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendationPanel;