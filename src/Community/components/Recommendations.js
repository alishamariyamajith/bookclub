import React from "react";
import "./styles/Recommendations.css";
const Recommendations = ({ recommendedGroups }) => {
  return (
    <div className="recommendations-container">
  <h2 className="recommendations-title">Recommended Groups</h2>
  {recommendedGroups.map((group) => (
    <p key={group.id} className="recommendation-item">{group.name}</p>
  ))}
</div>

  );
};

export default Recommendations;
