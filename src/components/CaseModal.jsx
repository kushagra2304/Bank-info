import React, { useState } from "react";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 p-6 rounded-lg relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4">{caseData.id}</h2>

        <p><strong>Name:</strong> {caseData.name}</p>
        <p><strong>Bank:</strong> {caseData.bank}</p>
        <p><strong>Status:</strong> {caseData.status}</p>
        <div className="mt-6">
          <label className="block mb-2 font-semibold">
            Upload Files
          </label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <div className="mt-6">
          {files.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">Uploaded Files:</h4>
              <ul className="space-y-2">
                {files.map((f, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={f.selected}
                        onChange={() => toggleFileSelection(index)}
                      />
                      <span>{f.file.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <button
          onClick={handleProcess}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Add Selected Files to Process
        </button>
      </div>
    </div>
  );
}
