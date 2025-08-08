// SchemaEditor.js

"use client";

import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import isEqual from 'lodash.isequal'; 

const SchemaEditor = ({ schema, onChange }) => {
  // Initialize state with the prop value only on the first render.
  const [jsonString, setJsonString] = useState(() =>
    JSON.stringify(schema, null, 2)
  );
  const [error, setError] = useState('');
  
  // This effect now intelligently syncs external prop changes with the internal state.
  useEffect(() => {
    let internalSchema;
    try {
      internalSchema = JSON.parse(jsonString);
    } catch {
      // If current text is invalid, it's definitely out of sync.
      // Reset to the valid prop's value.
      setJsonString(JSON.stringify(schema, null, 2));
      return;
    }
    
    // Only update the editor if the parent's schema is truly different
    // from what's currently in the editor. This check prevents the re-render loop.
    // We use a deep equality check to compare the objects.
    if (!isEqual(internalSchema, schema)) {
      setJsonString(JSON.stringify(schema, null, 2));
    }
  }, [schema]); // This effect only runs when the parent's `schema` prop changes.


  const handleEditorChange = (value) => {
    setJsonString(value);
    setError('');

    try {
      const parsed = JSON.parse(value || '[]');
      onChange(parsed);
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonString(formatted);
      onChange(parsed); // Also update parent on format
      setError('');
    } catch (err) {
      setError('Cannot format invalid JSON');
    }
  };

  const clearSchema = () => {
    setJsonString('[]');
    onChange([]);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={formatJson}
            className="px-3 py-1.5 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Format
          </button>
          <button
            onClick={clearSchema}
            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Clear
          </button>
        </div>
        {error && (
          <span className="text-sm text-red-400 font-medium">
            {error}
          </span>
        )}
      </div>

      <div className="border border-slate-600/50 rounded-lg overflow-hidden bg-slate-900/50">
        <Editor
          height="400px"
          defaultLanguage="json"
          value={jsonString}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true
          }}
        />
      </div>

      <div className="text-xs text-slate-400 bg-slate-800/30 rounded-lg p-3">
        <p className="mb-1">
          <strong className="text-slate-300">Supported components:</strong> form, text, image
        </p>
        <p>
          <strong className="text-slate-300">Example:</strong> {`[{"type": "text", "content": "Hello World", "variant": "h1"}]`}
        </p>
      </div>
    </div>
  );
};

export default SchemaEditor;