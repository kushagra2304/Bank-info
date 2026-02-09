import React from "react";

export default function RecentCases({ cases }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Recent Cases</h2>

      {cases.length === 0 ? (
        <p className="text-gray-500">No cases found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Case ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Bank</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.bank}</td>
                <td className="p-2 border">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
