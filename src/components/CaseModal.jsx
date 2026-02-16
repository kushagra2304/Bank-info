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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      
      {/* Modal Card */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 
      p-8 relative max-h-[85vh] overflow-y-auto animate-in fade-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full 
          hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-indigo-700">
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

          <div className="text-sm text-gray-600 space-y-1">
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

        {/* Upload Section */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Upload Files
          </label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-xl file:border-0
            file:text-sm file:font-medium
            file:bg-indigo-100 file:text-indigo-700
            hover:file:bg-indigo-200 transition"
          />
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Uploaded Files
            </h4>

            <ul className="space-y-3">
              {files.map((f, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between 
                  bg-gray-50 border border-gray-200 
                  p-3 rounded-xl hover:bg-indigo-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={f.selected}
                      onChange={() => toggleFileSelection(index)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">
                      {f.file.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Process Button */}
        <button
          onClick={handleProcess}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl 
          font-medium hover:bg-indigo-700 
          shadow-sm hover:shadow-md 
          transition-all duration-200"
        >
          Add Selected Files to Process
        </button>
      </div>
    </div>
  );
}
