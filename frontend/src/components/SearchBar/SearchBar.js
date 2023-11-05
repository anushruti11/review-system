import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ searchData, setSearchData }) {
  const handleChange = (event) => {
    const [key, value] = [event.target.name, event.target.value];
    setSearchData((prevData) => ({ ...prevData, [key]: value }));
  };
  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="search breweries"
        name="input"
        value={searchData.input}
        onChange={(event) => handleChange(event)}
      />
      <select
        className="search-dropdown"
        name="type"
        onChange={(event) => handleChange(event)}
        value={searchData.type}
      >
        <option value="by_city">Seach By City</option>
        <option value="by_name">Seach By Name</option>
        <option value="by_type">Seach By Type</option>
      </select>
    </div>
  );
}
