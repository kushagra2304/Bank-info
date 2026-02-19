import React from "react";

export default function RecentCases({ cases, onCaseClick }) {
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
    <div className="border border-gray-800 bg-[#0d0d0d]">

      <div className="overflow-x-auto">
        {cases.length === 0 ? (
          <div className="p-8 text-center text-gray-500 uppercase tracking-wider">
            No Case Records Found
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">

            {/* Table Header */}
            <thead>
              <tr className="bg-[#111111] border-b border-gray-700 text-gray-400 uppercase tracking-wider text-xs">
                <th className="px-6 py-4 text-left">Case ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                {/* <th className="px-6 py-4 text-left">Bank</th> */}
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {cases.map((c, index) => (
                <tr
                  key={c.id}
                  onClick={() => onCaseClick(c)}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer transition"
                >
                  <td className="px-6 py-5 font-semibold text-yellow-400 tracking-wide">
                    {c.id}
                  </td>

                  <td className="px-6 py-5 text-gray-300">
                    {c.name}
                  </td>

                  {/* <td className="px-6 py-5 text-gray-400">
                    {c.bank}
                  </td> */}

                  <td className={`px-6 py-5 font-semibold uppercase tracking-wide ${getStatusStyles(c.status)}`}>
                    {c.status}
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
