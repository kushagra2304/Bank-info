import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Banks() {
  const [banks, setBanks] = useState([
    { id: 1, name: "State Bank of India", branch: "Delhi", ifsc: "SBIN0001234" },
    { id: 2, name: "HDFC Bank", branch: "Mumbai", ifsc: "HDFC0005678" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newBank, setNewBank] = useState({
    name: "",
    branch: "",
    ifsc: "",
  });

  const handleAddBank = () => {
    if (!newBank.name || !newBank.branch || !newBank.ifsc) return;

    setBanks([
      ...banks,
      { id: Date.now(), ...newBank }
    ]);

    setNewBank({ name: "", branch: "", ifsc: "" });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide">Banks</h1>

        <Button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 text-black hover:bg-yellow-300"
        >
          + Add Bank
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.map((bank) => (
          <Card
            key={bank.id}
            className="bg-white/5 border border-white/10 backdrop-blur-lg"
          >
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold text-yellow-400">
                {bank.name}
              </h2>
              <p className="text-sm text-gray-300">
                Branch: {bank.branch}
              </p>
              <p className="text-sm text-gray-300">
                IFSC: {bank.ifsc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          
          <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-md p-6 space-y-4">

            <h2 className="text-xl font-semibold text-white">
              Add New Bank
            </h2>

            <Input
              placeholder="Bank Name"
              value={newBank.name}
              onChange={(e) =>
                setNewBank({ ...newBank, name: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="Branch"
              value={newBank.branch}
              onChange={(e) =>
                setNewBank({ ...newBank, branch: e.target.value })
              }
              className="bg-black border-gray-700 text-white"
            />

            <Input
              placeholder="IFSC Code"
              value={newBank.ifsc}
              onChange={(e) =>
                setNewBank({ ...newBank, ifsc: e.target.value })
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
                onClick={handleAddBank}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Add Bank
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}