import React, { useState } from "react";
import { X } from "lucide-react";

export default function CreateCaseModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    bank: "",
    status: "Active",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name || !formData.bank) {
      alert("Please fill all required fields");
      return;
    }

    onSave({ ...formData, files });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      
      {/* Modal Card */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl 
      border border-gray-200 p-8 relative max-h-[90vh] overflow-y-auto 
      animate-in fade-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full 
          hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Create New Case
        </h2>

        {/* Form Fields */}
        <div className="space-y-5">

          {/* Case ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Case ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="NETRA-111"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bank
            </label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition"
            >
              <option>Active</option>
              <option>Closed</option>
              <option>Investigating</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attach Files
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

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Selected Files
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl 
            font-medium hover:bg-indigo-700 
            shadow-sm hover:shadow-md 
            transition-all duration-200"
          >
            Create Case
          </button>
        </div>
      </div>
    </div>
  );
}
