import React from "react";

export default function FileUploader({ files, setFiles }) {
  const onFiles = (fileList) => {
    const cur = Array.from(files || []);
    const incoming = Array.from(fileList);
    const merged = [...cur];

    incoming.forEach((f) => {
      if (!merged.some(m => m.name === f.name && m.size === f.size)) merged.push(f);
    });

    setFiles(merged);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  const handleInput = (e) => {
    onFiles(e.target.files);
    e.target.value = null;
  };

  const removeFile = (index) => {
    const next = Array.from(files);
    next.splice(index, 1);
    setFiles(next);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
      >
        <p className="text-sm text-gray-500 mb-3">Drop files here or click to browse</p>
        <label className="inline-block">
          <input type="file" multiple className="hidden" onChange={handleInput} />
          <span className="px-4 py-2 bg-blue-600 text-white rounded">Choose Files</span>
        </label>
      </div>

      {files && files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Selected files</h4>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${f.size}`} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-xs text-gray-600">{(f.size / 1024).toFixed(2)} KB</div>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
