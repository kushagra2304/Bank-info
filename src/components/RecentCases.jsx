import React from "react";

export default function RecentCases({ cases, onCaseClick }) {
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Cases
        </h2>
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        {cases.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No cases found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-6 py-3 text-left font-medium">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Bank
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {cases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onCaseClick(c)}
                  className="border-t border-gray-200 
                  hover:bg-indigo-50 cursor-pointer 
                  transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-indigo-700">
                    {c.id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {c.bank}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
