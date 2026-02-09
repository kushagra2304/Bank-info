import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by Name, Case ID, Bank..."
        value={query}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg shadow-sm"
      />
    </div>
  );
}
