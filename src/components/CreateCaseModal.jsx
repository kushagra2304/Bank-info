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

        {/* Header */}
        <div className="border-b border-gray-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 uppercase tracking-wide">
            Register New Case
          </h2>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-wider">
            Investigation Case Registration Form
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">

          {/* Case ID */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Case ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="NETRA-111"
              className="w-full bg-black border border-gray-700 px-4 py-3
                         text-white focus:outline-none
                         focus:border-yellow-400 transition"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 px-4 py-3
                         text-white focus:outline-none
                         focus:border-yellow-400 transition"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Bank
            </label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 px-4 py-3
                         text-white focus:outline-none
                         focus:border-yellow-400 transition"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Case Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 px-4 py-3
                         text-white focus:outline-none
                         focus:border-yellow-400 transition"
            >
              <option>Active</option>
              <option>Closed</option>
              <option>Investigating</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3">
              Attach Supporting Documents
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

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="border border-gray-800 p-6">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                Selected Files
              </h4>

              <ul className="space-y-3 text-sm text-gray-300">
                {files.map((file, index) => (
                  <li key={index} className="border-b border-gray-800 pb-2">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 text-black py-4
                       font-semibold uppercase tracking-wide
                       hover:bg-yellow-300 transition"
          >
            Create Case
          </button>

        </div>
      </div>
    </div>
  );
}
