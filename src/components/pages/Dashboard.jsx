import React, { useState, useEffect } from "react";
import RecentCases from "../RecentCases";
import CaseModal from "../CaseModal";
import CreateCaseModal from "../CreateCaseModal";
import Navbar1 from "../Navbar1";

export default function AdminPage() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const mockCases = [
      { id: "101", name: "Rahul Sharma", bank: "SBI", status: "Active" },
      { id: "102", name: "Aman Verma", bank: "HDFC", status: "Closed" },
      { id: "103", name: "Priya Singh", bank: "ICICI", status: "Active" },
      { id: "104", name: "Rohit Gupta", bank: "PNB", status: "Investigating" },
      { id: "105", name: "Neha Jain", bank: "Axis", status: "Active" },
    ];

    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

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
    <div className=" bg-black text-white px-10 py-0 h-full overflow-auto p-6">
      <Navbar1 /> 

      <div className="text-center py-14 border-b border-gray-900">
        <h1 className="text-5xl font-extrabold tracking-widest uppercase">
          View Cases
        </h1>
        <p className="text-gray-400 mt-4 uppercase text-sm tracking-wider">
          Investigation Case Management System
        </p>
      </div>

      <div className="bg-[#111111] border border-gray-800 p-6 mt-10">
  
  <div className="flex items-center gap-4 w-full">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="SEARCH BY CASE ID, NAME, BANK"
      className="flex-1 bg-black border border-gray-700 px-6 py-3 text-white
                 focus:outline-none focus:border-yellow-400
                 placeholder-gray-500 uppercase tracking-wider text-sm"
    />
    <button
      onClick={() => handleSearch("")}
      className="border border-gray-600 px-6 py-3 text-gray-300
                 hover:bg-gray-800 transition uppercase text-sm tracking-wide"
    >
      Reset
    </button>

    <button
      onClick={handleCreateCase}
      className="bg-yellow-400 text-black px-8 py-3
                 font-semibold uppercase tracking-wide
                 hover:bg-yellow-300 transition"
    >
      Create Case
    </button>

  </div>

</div>

      <div className="mt-10 bg-[#0d0d0d] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-wider uppercase">
            Case Records
          </h2>

          <span className="text-gray-400 text-sm">
            Total Cases: {filteredCases.length}
          </span>
        </div>

        <RecentCases
          cases={filteredCases}
          onCaseClick={setSelectedCase}
        />
      </div>

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
