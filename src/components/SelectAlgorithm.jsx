import React from "react";

const algorithms = [
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" },
];

export default function SelectAlgorithm({ algorithm, setAlgorithm }) {
  return (
    <div>
      <h4 className="font-medium mb-2">Choose hash algorithm</h4>
      <div className="flex gap-4">
        {algorithms.map((a) => (
          <label key={a.id} className={`px-3 py-2 rounded cursor-pointer border 
          ${algorithm === a.id ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
            <input
              type="radio"
              name="algo"
              value={a.id}
              checked={algorithm === a.id}
              onChange={() => setAlgorithm(a.id)}
              className="mr-2"
            />
            {a.label}
          </label>
        ))}
      </div>
    </div>
  );
}
