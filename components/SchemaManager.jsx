import { useState, useRef } from 'react';
import axios from 'axios';
import Portal from './Portal'; // Make sure this import is correct

const SchemaManager = ({ schema, setSchema }) => {
  const [savedSchemas, setSavedSchemas] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSave = async () => {
    if (!saveName.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('https://backend-dynamic-interface-compiler.onrender.com/api/schemas', {
        name: saveName.trim(),
        description: saveDescription.trim(),
        schema: schema,
      });

      if (response.data.success) {
        setMessage('Schema saved successfully!');
        setSaveName('');
        setSaveDescription('');
        setShowSaveDialog(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving schema:', error);
      setMessage('Failed to save schema');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://backend-dynamic-interface-compiler.onrender.com/api/schemas');
      if (response.data.success) {
        setSavedSchemas(response.data.schemas);
        setShowLoadDialog(true);
      }
    } catch (error) {
      console.error('Error loading schemas:', error);
      setMessage('Failed to load schemas');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSchema = (selectedSchema) => {
    setSchema(selectedSchema.schema);
    setShowLoadDialog(false);
    setMessage('Schema loaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleExport = () => {
    if (!schema?.length) {
      setMessage('No schema to export');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const dataStr = JSON.stringify(schema, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ui-schema.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Schema exported successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSchema = JSON.parse(e.target.result);
        if (Array.isArray(importedSchema)) {
          setSchema(importedSchema);
          setMessage('Schema imported successfully!');
        } else {
          setMessage('Invalid schema format');
        }
      } catch (error) {
        setMessage('Failed to parse JSON file');
      }
      setTimeout(() => setMessage(''), 3000);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div>
      <div className="relative">
        {/* Main Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSaveDialog(true)}
            disabled={!schema?.length}
            className="px-3 inline-flex justify-center py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium shadow-md shadow-blue-600/25"
          >
            <svg className="w-3 h-3 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Save
          </button>

          <button
            onClick={handleLoad}
            disabled={isLoading}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium shadow-md shadow-purple-600/25"
          >
            <svg className="w-3 h-3 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Load
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              disabled={!schema?.length}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium shadow-md shadow-emerald-600/25"
            >
              <svg className="w-3 h-3 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>

            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 text-xs font-medium shadow-md shadow-orange-600/25"
            >
              <svg className="w-3 h-3 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-xl">
              <p className="text-sm text-slate-300">{message}</p>
            </div>
          </div>
        )}
      </div>

      {/* --- Modals are wrapped in Portal to escape the parent's CSS context --- */}

      <Portal>
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6 w-full max-w-md mx-4 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Save Schema</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Enter schema name"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description (optional)</label>
                  <textarea
                    value={saveDescription}
                    onChange={(e) => setSaveDescription(e.target.value)}
                    placeholder="Enter description"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!saveName.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Portal>

      <Portal>
        {showLoadDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-4">Load Schema</h3>
              <div className="flex-1 overflow-auto">
                {savedSchemas.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-8 h-8 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-slate-400">No saved schemas found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedSchemas.map((savedSchema) => (
                      <div
                        key={savedSchema._id}
                        className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 cursor-pointer group"
                        onClick={() => handleLoadSchema(savedSchema)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                              {savedSchema.name}
                            </h4>
                            {savedSchema.description && (
                              <p className="text-sm text-slate-400 mt-1">{savedSchema.description}</p>
                            )}
                            <p className="text-xs text-slate-500 mt-2">
                              {(Array.isArray(savedSchema.schema) ? savedSchema.schema.length : 0)} component{(Array.isArray(savedSchema.schema) && savedSchema.schema.length !== 1) ? 's' : ''}
                            </p>
                          </div>
                          <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowLoadDialog(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </div>
  );
};

export default SchemaManager;
