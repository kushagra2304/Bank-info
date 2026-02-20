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
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");

  const [newEntity, setNewEntity] = useState({
    id: null,
    caseId: "",
    caseName: "",
    name: "",
    pan: "",
    mobile: "",
  });

  const handleSaveEntity = () => {
    if (
      !newEntity.caseId ||
      !newEntity.caseName ||
      !newEntity.name ||
      !newEntity.pan ||
      !newEntity.mobile
    )
      return;

    if (isEdit) {
      setEntities(
        entities.map((entity) =>
          entity.id === newEntity.id ? newEntity : entity
        )
      );
    } else {
      setEntities([
        ...entities,
        { ...newEntity, id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (entity) => {
    setNewEntity(entity);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setEntities(entities.filter((entity) => entity.id !== id));
  };

  const resetForm = () => {
    setNewEntity({
      id: null,
      caseId: "",
      caseName: "",
      name: "",
      pan: "",
      mobile: "",
    });
    setIsEdit(false);
    setIsOpen(false);
  };

  const filteredEntities = entities.filter((entity) =>
    Object.values(entity)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

        <h1 className="text-2xl font-bold tracking-wide">Entity</h1>

        <div className="flex gap-3">
          <Input
            placeholder="Search by any detail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black border-gray-700 text-white w-64"
          />

          <Button
            onClick={() => {
              setIsEdit(false);
              setIsOpen(true);
            }}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            + Add Entity
          </Button>
        </div>
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
            {filteredEntities.map((entity) => (
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
                <td className="p-3 flex gap-2">
                  <Button
                    onClick={() => handleEdit(entity)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(entity.id)}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {filteredEntities.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-lg p-6 space-y-4">

            <h2 className="text-xl font-semibold text-white">
              {isEdit ? "Edit Entity" : "Add New Entity"}
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
                onClick={resetForm}
                className="border-gray-600 text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveEntity}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}