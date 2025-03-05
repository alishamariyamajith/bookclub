import React from "react";
import "./styles/Sidebar.css";
const Sidebar = ({ groups, joinGroup }) => {
  return (
    <div className="sidebar">
  <h2>Groups</h2>
  {groups.map((group) => (
    <div key={group.id} className="sidebar-group" onClick={() => joinGroup(group.id)}>
      {group.name}
    </div>
  ))}
</div>

  );
};

export default Sidebar;
