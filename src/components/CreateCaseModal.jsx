import React, { useState } from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 p-6 rounded-lg relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4">Create New Case</h2>
        <div className="mb-3">
          <label className="block font-semibold">Case ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="NETRA-111"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Bank</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Active</option>
            <option>Closed</option>
            <option>Investigating</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Attach Files
          </label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        {files.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Selected Files:</h4>
            <ul className="list-disc ml-6">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Create Case
        </button>
      </div>
    </div>
  );
}
