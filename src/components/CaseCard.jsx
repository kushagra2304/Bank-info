import React from "react";

export default function CaseCard({ caseData, onClick }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-gray-200 text-gray-700";
      case "Investigating":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      onClick={() => onClick(caseData)}
      className="bg-white rounded-2xl border border-gray-200 
      p-5 cursor-pointer shadow-sm 
      hover:shadow-xl hover:scale-[1.02] 
      transition-all duration-300"
    >
      {/* Case ID */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-indigo-700">
          {caseData.id}
        </h2>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(
            caseData.status
          )}`}
        >
          {caseData.status}
        </span>
      </div>

      {/* Case Info */}
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Name:</span>{" "}
          {caseData.name}
        </p>
        <p>
          <span className="font-medium text-gray-800">Bank:</span>{" "}
          {caseData.bank}
        </p>
      </div>
    </div>
  );
}
