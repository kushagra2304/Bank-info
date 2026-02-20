import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Entity() {
  const [entities, setEntities] = useState([
    {
      id: 1,
      caseId: "C-101",
      caseName: "Fraud Investigation",
      name: "Rahul Sharma",
      pan: "ABCDE1234F",
      mobile: "9876543210",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newEntity, setNewEntity] = useState({
    caseId: "",
    caseName: "",
    name: "",
    pan: "",
    mobile: "",
  });

  const handleAddEntity = () => {
    if (
      !newEntity.caseId ||
      !newEntity.caseName ||
      !newEntity.name ||
      !newEntity.pan ||
      !newEntity.mobile
    )
      return;

    setEntities([
      ...entities,
      { id: Date.now(), ...newEntity },
    ]);

    setNewEntity({
      caseId: "",
      caseName: "",
      name: "",
      pan: "",
      mobile: "",
    });

    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setEntities(entities.filter((entity) => entity.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide">Entity</h1>

        <Button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 text-black hover:bg-yellow-300"
        >
          + Add Entity
        </Button>
      </div>
      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-yellow-400">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Case ID</th>
              <th className="p-3">Case Name</th>
              <th className="p-3">Name</th>
              <th className="p-3">PAN</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {entities.map((entity) => (
              <tr
                key={entity.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3">{entity.id}</td>
                <td className="p-3">{entity.caseId}</td>
                <td className="p-3">{entity.caseName}</td>
                <td className="p-3">{entity.name}</td>
                <td className="p-3">{entity.pan}</td>
                <td className="p-3">{entity.mobile}</td>
                <td className="p-3">
                  <Button
                    onClick={() => handleDelete(entity.id)}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-lg p-6 space-y-4">

            <h2 className="text-xl font-semibold text-white">
              Add New Entity
            </h2>

            <Input
              placeholder="Case ID"
              value={newEntity.caseId}
              onChange={(e) =>
                setNewEntity({ ...newEntity, caseId: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="Case Name"
              value={newEntity.caseName}
              onChange={(e) =>
                setNewEntity({ ...newEntity, caseName: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="Name"
              value={newEntity.name}
              onChange={(e) =>
                setNewEntity({ ...newEntity, name: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="PAN"
              value={newEntity.pan}
              onChange={(e) =>
                setNewEntity({ ...newEntity, pan: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="Mobile"
              value={newEntity.mobile}
              onChange={(e) =>
                setNewEntity({ ...newEntity, mobile: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-600 text-black"
              >
                Cancel
              </Button>

              <Button
                onClick={handleAddEntity}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Add Entity
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}