import React, { useState } from "react";
import { X } from "lucide-react";

export default function CaseModal({ caseData, onClose }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      selected: false,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const toggleFileSelection = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].selected = !updatedFiles[index].selected;
    setFiles(updatedFiles);
  };

  const handleProcess = () => {
    const selectedFiles = files.filter((f) => f.selected);

    if (selectedFiles.length === 0) {
      alert("Please select at least one file to process.");
      return;
    }

    console.log(
      "Processing:",
      selectedFiles.map((f) => f.file.name)
    );

    alert("Selected files added to process!");
  };

  if (!caseData) return null;

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
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-6">

      {/* Modal Container */}
      <div className="bg-[#0d0d0d] border border-gray-800 w-full max-w-3xl 
                      max-h-[90vh] overflow-y-auto p-10 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="border-b border-gray-800 pb-6 mb-8">
          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-yellow-400 tracking-wide uppercase">
              {caseData.id}
            </h2>

            <span
              className={`text-sm font-semibold uppercase tracking-wider ${getStatusStyles(
                caseData.status
              )}`}
            >
              {caseData.status}
            </span>
          </div>

          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500 uppercase text-xs tracking-wider">
                Name
              </span>
              <br />
              <span className="text-gray-300">{caseData.name}</span>
            </p>

            <p>
              <span className="text-gray-500 uppercase text-xs tracking-wider">
                Bank
              </span>
              <br />
              <span className="text-gray-300">{caseData.bank}</span>
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <label className="block mb-3 text-sm uppercase tracking-wider text-gray-400">
            Upload Case Files
          </label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400
                       file:mr-6 file:py-2 file:px-6
                       file:border file:border-gray-700
                       file:bg-black file:text-yellow-400
                       file:uppercase file:text-xs
                       hover:file:bg-gray-900 transition"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Uploaded Files
            </h4>

            <ul className="space-y-3">
              {files.map((f, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between
                             border border-gray-800 p-4
                             hover:bg-[#1a1a1a] transition"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={f.selected}
                      onChange={() => toggleFileSelection(index)}
                      className="w-4 h-4 accent-yellow-400"
                    />

                    <span className="text-sm text-gray-300">
                      {f.file.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleProcess}
          className="w-full bg-yellow-400 text-black py-4 font-semibold
                     uppercase tracking-wide hover:bg-yellow-300 transition"
        >
          Add Selected Files To Process
        </button>
      </div>
    </div>
  );
}
