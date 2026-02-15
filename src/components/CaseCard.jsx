// components/CaseCard.js
import React from "react";

export default function CaseCard({ caseData, onClick }) {
  return (
    <div
      onClick={() => onClick(caseData)}
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="font-bold text-lg">{caseData.id}</h2>
      <p>Name: {caseData.name}</p>
      <p>Bank: {caseData.bank}</p>
      <p>Status: {caseData.status}</p>
    </div>
  );
}
