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
  <div className="min-h-screen bg-gray-50 p-6 space-y-8">

    {/* Header Section */}
    <div className="text-center space-y-1">
      <h1 className="text-4xl font-bold text-gray-900 relative inline-block 
      after:block after:h-1 after:bg-indigo-600 after:w-full after:mt-1">
        NETRA Admin Dashboard
      </h1>
      <p className="text-gray-500">
        Manage cases, monitor activity, and create new investigations.
      </p>
    </div>

    {/* Search Section */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <SearchBar onSearch={handleSearch} />
    </div>

    {/* Recent Cases Section */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Cases
        </h2>

        <button
          onClick={handleCreateCase}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl 
          hover:bg-indigo-700 transition font-medium shadow-sm"
        >
          + Create Case
        </button>
      </div>

      <RecentCases
        cases={filteredCases}
        onCaseClick={setSelectedCase}
      />
    </div>

    {/* View Case Modal */}
    {selectedCase && (
      <CaseModal
        caseData={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    )}

    {/* Create Case Modal */}
    {showCreateModal && (
      <CreateCaseModal
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveCase}
      />
    )}
  </div>
);
}
