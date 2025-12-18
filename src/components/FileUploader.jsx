import React, { useState, useRef } from 'react';
import { Upload, File, X, Check } from 'lucide-react';

const FileUploader = ({ 
  onFileSelect, 
  accept = "*",
  maxSize = 50 * 1024 * 1024, // 50MB
  multiple = true 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File size exceeds ${(maxSize / 1024 / 1024).toFixed(0)}MB limit`;
    }
    return null;
  };

  const processFiles = (fileList) => {
    setError('');
    const fileArray = Array.from(fileList);
    
    for (let file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    const newFiles = fileArray.map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      id: Math.random().toString(36).substr(2, 9)
    }));

    if (multiple) {
      setFiles(prev => [...prev, ...newFiles]);
      if (onFileSelect) onFileSelect([...files, ...newFiles]);
    } else {
      setFiles(newFiles);
      if (onFileSelect) onFileSelect(newFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    if (onFileSelect) onFileSelect(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 
          transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-pink-400 bg-pink-950/30 scale-[1.02]' 
            : 'border-purple-500/40 bg-gray-900/40 hover:border-purple-400/60 hover:bg-gray-900/60'
          }
        `}
      >
        {/* Animated Glow Effect */}
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-xl -z-10 opacity-50" />
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`
            p-4 rounded-full transition-all duration-300
            ${isDragging 
              ? 'bg-pink-500/20 scale-110' 
              : 'bg-purple-500/20'
            }
          `}>
            <Upload 
              className={`w-12 h-12 transition-colors duration-300 ${
                isDragging ? 'text-pink-400' : 'text-purple-400'
              }`} 
            />
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-gray-100 mb-2">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-gray-400">
              or <span className="text-purple-400 font-medium">browse</span> to choose files
            </p>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-xl transition-colors duration-300">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            Selected Files ({files.length})
          </h3>
          
          {files.map((fileItem) => (
            <div
              key={fileItem.id}
              className="
                flex items-center justify-between p-4 
                bg-gray-900/40 border border-purple-500/20 rounded-xl
                hover:border-purple-400/50 hover:bg-gray-900/60
                transition-all duration-200
                group
              "
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <File className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-100 truncate">
                    {fileItem.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(fileItem.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(fileItem.id);
                }}
                className="
                  p-2 rounded-lg bg-red-500/20 text-red-400
                  hover:bg-red-500/30 transition-all duration-200
                  opacity-0 group-hover:opacity-100
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;