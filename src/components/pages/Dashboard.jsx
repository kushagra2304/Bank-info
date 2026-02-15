import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import RecentCases from "../RecentCases";
import CreateCaseButton from "../CreateCaseButton";
import CaseModal from "../CaseModal";
import CreateCaseModal from "../CreateCaseModal"; 

export default function AdminPage() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false); 

  useEffect(() => {
    const mockCases = [
      { id: "NETRA-101", name: "Rahul Sharma", bank: "SBI", status: "Active" },
      { id: "NETRA-102", name: "Aman Verma", bank: "HDFC", status: "Closed" },
      { id: "NETRA-103", name: "Priya Singh", bank: "ICICI", status: "Active" },
      { id: "NETRA-104", name: "Rohit Gupta", bank: "PNB", status: "Investigating" },
      { id: "NETRA-105", name: "Neha Jain", bank: "Axis", status: "Active" },
    ];

    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

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
    setShowCreateModal(true);
  };

  const handleSaveCase = (newCase) => {
    setCases((prev) => [...prev, newCase]);
    setFilteredCases((prev) => [...prev, newCase]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">NETRA Admin Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      <RecentCases cases={filteredCases} onCaseClick={setSelectedCase} />

      <CreateCaseButton onCreate={handleCreateCase} />

      {selectedCase && (
        <CaseModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
      {showCreateModal && (
        <CreateCaseModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveCase}
        />
      )}
    </div>
  );
}
