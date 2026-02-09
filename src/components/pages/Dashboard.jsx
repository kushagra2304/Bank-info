import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import RecentCases from "../RecentCases";
import CreateCaseButton from "../CreateCaseButton";

export default function AdminPage() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  // Mock fetch (later replace with API)
  useEffect(() => {
    const mockCases = [
      { id: "NETRA-101", name: "Rahul Sharma", bank: "SBI", status: "Active" },
      { id: "NETRA-102", name: "Aman Verma", bank: "HDFC", status: "Closed" },
      { id: "NETRA-103", name: "Priya Singh", bank: "ICICI", status: "Active" },
      { id: "NETRA-104", name: "Rohit Gupta", bank: "PNB", status: "Investigating" },
      { id: "NETRA-105", name: "Neha Jain", bank: "Axis", status: "Active" },
      { id: "NETRA-106", name: "Karan Mehta", bank: "SBI", status: "Closed" },
      { id: "NETRA-107", name: "Vikas Sharma", bank: "BOB", status: "Active" },
      { id: "NETRA-108", name: "Anjali Kapoor", bank: "HDFC", status: "Investigating" },
      { id: "NETRA-109", name: "Manish Yadav", bank: "ICICI", status: "Closed" },
      { id: "NETRA-110", name: "Sneha Roy", bank: "Axis", status: "Active" }
    ];

    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

  // Search logic
  const handleSearch = (query) => {
    if (!query) {
      setFilteredCases(cases);
      return;
    }

    const filtered = cases.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.bank.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCases(filtered);
  };

  const handleCreateCase = () => {
    alert("Create Case clicked (Later → open form / route)");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">NETRA Admin Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      <RecentCases cases={filteredCases.slice(0, 10)} />

      <CreateCaseButton onCreate={handleCreateCase} />
    </div>
  );
}
