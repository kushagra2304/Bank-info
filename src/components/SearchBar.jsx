import React, { useState } from "react";

export default function SearchBar({ onSearch, onCreate }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full flex items-center gap-4">

      {/* Search Input - Takes Full Available Space */}
      <input
        type="text"
        placeholder="SEARCH BY NAME, CASE ID, BANK"
        value={query}
        onChange={handleChange}
        className="flex-1 bg-black border border-gray-700 px-6 py-3 text-white
                   focus:outline-none focus:border-yellow-400
                   placeholder-gray-500 uppercase tracking-wider text-sm"
      />

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="border border-gray-600 px-6 py-3 text-gray-300
                   hover:bg-gray-800 transition uppercase text-sm tracking-wide"
      >
        Reset
      </button>

      {/* Create Case Button */}
      <button
        onClick={onCreate}
        className="bg-yellow-400 text-black px-8 py-3
                   font-semibold uppercase tracking-wide
                   hover:bg-yellow-300 transition"
      >
        Create Case
      </button>

    </div>
  );
}
