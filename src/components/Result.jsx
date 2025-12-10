import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Download, 
  File, 
  Clock,
  Hash,
  FileText,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

const Result = ({ results = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Copy hash to clipboard
  const copyToClipboard = (hash, index) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Download results as JSON
  const downloadJSON = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hash-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download results as CSV
  const downloadCSV = () => {
    const headers = ['File Name', 'Size', 'Algorithm', 'Hash', 'Timestamp'];
    const rows = results.map(r => [
      r.fileName,
      r.fileSize,
      r.algorithm,
      r.hash,
      r.timestamp
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hash-results-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle expand/collapse
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Hash Results</h2>
              <p className="text-gray-400">
                {results.length} file{results.length > 1 ? 's' : ''} processed successfully
              </p>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-3">
            <button
              onClick={downloadJSON}
              className="
                flex items-center gap-2 px-4 py-2
                bg-blue-500/20 text-blue-400 rounded-lg
                hover:bg-blue-500/30 transition-all duration-200
                border border-blue-500/30
              "
            >
              <Download className="w-4 h-4" />
              JSON
            </button>
            <button
              onClick={downloadCSV}
              className="
                flex items-center gap-2 px-4 py-2
                bg-green-500/20 text-green-400 rounded-lg
                hover:bg-green-500/30 transition-all duration-200
                border border-green-500/30
              "
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="
              bg-gray-900/50 border border-purple-500/30 rounded-xl
              hover:border-purple-400/50 transition-all duration-300
              overflow-hidden
            "
          >
            {/* Result Header - Always Visible */}
            <div
              onClick={() => toggleExpand(index)}
              className="p-5 cursor-pointer hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* File Icon */}
                  <div className="p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                    <File className="w-6 h-6 text-purple-400" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {result.fileName}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {formatFileSize(result.fileSize)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        {result.algorithm}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0">
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Result Details - Expandable */}
            {expandedIndex === index && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-800">
                {/* Hash Value */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-400">
                      Hash Value
                    </label>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(result.hash, index);
                      }}
                      className="
                        flex items-center gap-2 px-3 py-1.5
                        bg-gray-800 text-gray-300 rounded-lg
                        hover:bg-gray-700 transition-all duration-200
                        text-sm
                      "
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="
                    p-4 bg-black/50 rounded-lg border border-gray-800
                    font-mono text-sm text-cyan-400 break-all
                  ">
                    {result.hash}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Algorithm */}
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-500">Algorithm</span>
                    </div>
                    <p className="text-white font-semibold">{result.algorithm}</p>
                  </div>

                  {/* Timestamp */}
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-500">Processed At</span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {formatTimestamp(result.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="text-blue-400 font-semibold">💡 Tip:</span> Click on any result to expand and view full hash value. 
          Use the copy button to quickly copy hash to clipboard.
        </p>
      </div>
    </div>
  );
};

export default Result;