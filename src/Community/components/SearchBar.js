import React, { useState } from "react";
import "./styles/SearchBar.css";
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <input
  type="text"
  className="search-bar"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search groups..."
/>

  );
};

export default SearchBar;
