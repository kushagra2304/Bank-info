import React from "react";
import CaseCard from "./CaseCard";

export default function RecentCases({ cases, onCaseClick }) {
  return (
    <div className="grid grid-cols-3 gap-5 mt-6">
      {cases.map((c) => (
        <CaseCard key={c.id} caseData={c} onClick={onCaseClick} />
      ))}
    </div>
  );
}
