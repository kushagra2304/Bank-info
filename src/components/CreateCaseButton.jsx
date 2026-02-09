import React from "react";

export default function CreateCaseButton({ onCreate }) {
  return (
    <div className="text-center">
      <button
        onClick={onCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
      >
        + Create New Case
      </button>
    </div>
  );
}
