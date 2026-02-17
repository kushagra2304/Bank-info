import React from "react";

export default function CaseCard({ caseData, onClick }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "text-green-400";
      case "Closed":
        return "text-gray-400";
      case "Investigating":
        return "text-yellow-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      onClick={() => onClick(caseData)}
      className="bg-[#0d0d0d] border border-gray-800 p-6 cursor-pointer
                 hover:bg-[#1a1a1a] transition"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">

        {/* Case ID */}
        <h2 className="text-lg font-semibold text-yellow-400 tracking-wide uppercase">
          {caseData.id}
        </h2>

        {/* Status */}
        <span
          className={`text-sm font-semibold uppercase tracking-wider ${getStatusStyles(
            caseData.status
          )}`}
        >
          {caseData.status}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mb-4"></div>

      {/* Case Details */}
      <div className="space-y-2 text-sm tracking-wide">
        <p className="text-gray-400 uppercase text-xs">Name</p>
        <p className="text-gray-300">{caseData.name}</p>

        <p className="text-gray-400 uppercase text-xs mt-3">Bank</p>
        <p className="text-gray-300">{caseData.bank}</p>
      </div>
    </div>
  );
}
