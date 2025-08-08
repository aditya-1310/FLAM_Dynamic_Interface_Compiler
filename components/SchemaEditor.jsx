import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

const SchemaEditor = ({ schema, onChange }) => {
  const [jsonString, setJsonString] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setJsonString(JSON.stringify(schema, null, 2))
  }, [schema])

  const handleEditorChange = (value) => {
    setJsonString(value)
    setError('')

    try {
      const parsed = JSON.parse(value || '[]')
      onChange(parsed)
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
    }
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonString)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonString(formatted)
      setError('')
    } catch (err) {
      setError('Cannot format invalid JSON')
    }
  }

  const clearSchema = () => {
    setJsonString('[]')
    onChange([])
    setError('')
  }

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
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible'
            },
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
  )
}

export default SchemaEditor
