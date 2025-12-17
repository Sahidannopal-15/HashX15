import React, { useState, useMemo, useCallback } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Download, 
  File, 
  Clock,
  Hash,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

const Result = ({ results = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }, []);

  const formatTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const copyToClipboard = useCallback((hash, index) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }, []);

  const downloadJSON = useCallback(() => {
    const dataStr = JSON.stringify(results, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hash-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [results]);

  const downloadCSV = useCallback(() => {
    const headers = ['File Name', 'Size', 'Algorithm', 'Hash', 'Timestamp'];
    const rows = results.map(r => [
      r.fileName, r.fileSize, r.algorithm, r.hash, r.timestamp
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
  }, [results]);

  const toggleExpand = useCallback((index) => {
    setExpandedIndex(prev => prev === index ? null : index);
  }, []);

  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/15 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Hash Results</h2>
              <p className="text-sm text-gray-400">
                {results.length} file{results.length > 1 ? 's' : ''} 
                processed
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={downloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 text-blue-400 rounded-lg hover:bg-blue-500/25 transition-colors duration-150 border border-blue-500/20 text-sm"
            >
              <Download className="w-3.5 h-3.5" />
              JSON
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 text-green-400 rounded-lg hover:bg-green-500/25 transition-colors duration-150 border border-green-500/20 text-sm"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-700"></div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-gray-900/70 border border-purple-500/15 rounded-lg hover:border-purple-400/30 transition-colors duration-150 overflow-hidden"
          >
            <div
              onClick={() => toggleExpand(index)}
              className="p-3 cursor-pointer hover:bg-gray-900/90 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="p-1.5 bg-purple-500/15 rounded flex-shrink-0">
                    <File className="w-4 h-4 text-purple-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {result.fileName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{formatFileSize(result.fileSize)}</span>
                      <span>•</span>
                      <span>{result.algorithm}</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-800 rounded transition-colors duration-150 flex-shrink-0">
                  {expandedIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="px-3 pb-3 space-y-3 border-t border-gray-800">
                <div className="pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-400">
                    </label>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(result.hash, index);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors duration-150 text-xs"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-black/50 rounded border border-gray-800 font-mono text-xs text-cyan-400 break-all">
                    {result.hash}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  
                  <div className="p-2 bg-gray-800/50 rounded">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Hash className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-gray-500">Algorithm</span>
                    </div>
                    <p className="text-white font-semibold text-xs">{result.algorithm}</p>
                  </div>

                  <div className="p-2 bg-gray-800/50 rounded">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-gray-500">Processed</span>
                    </div>
                    <p className="text-white font-semibold text-xs">
                      {formatTimestamp(result.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;