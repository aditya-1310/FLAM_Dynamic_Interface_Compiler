import React from 'react'

/**
 * SettingsPanel – side panel scaffold for editing selected component properties.
 * For now it only displays the component JSON. We will incrementally enhance it.
 */
const SettingsPanel = ({ component, onClose, onUpdateProp, onAddField, onDeleteField, onUpdateFieldProp }) => {
  if (!component) return null

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-slate-800/90 backdrop-blur-md border-l border-slate-700/50 p-6 text-slate-100 shadow-lg z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold capitalize">
          {component.type} settings
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white focus:outline-none"
        >
          ✕
        </button>
      </div>
      {component.type === 'form' ? (
        <div className="space-y-4">
          <button
            onClick={onAddField}
            className="w-full mb-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            + Add Field
          </button>
          <label className="block text-sm font-medium">
            Fields
            {component.fields?.map((f, idx) => (
              <div key={idx} className="mb-3 p-2 rounded bg-slate-800/40 border border-slate-700/50">
                <label className="block text-xs font-medium mb-1">Label
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => onUpdateFieldProp && onUpdateFieldProp(idx, 'label', e.target.value)}
                    className="mt-1 w-full px-2 py-1 rounded bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600/50 text-xs"
                  />
                </label>
                <label className="block text-xs font-medium mb-1">Type
                  <select
                    value={f.type}
                    onChange={(e) => onUpdateFieldProp && onUpdateFieldProp(idx, 'type', e.target.value)}
                    className="mt-1 w-full px-2 py-1 rounded bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600/50 text-xs"
                  >
                    {['text','email','number','password','textarea'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-medium mb-1">Placeholder
                  <input
                    type="text"
                    value={f.placeholder}
                    onChange={(e) => onUpdateFieldProp && onUpdateFieldProp(idx, 'placeholder', e.target.value)}
                    className="mt-1 w-full px-2 py-1 rounded bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600/50 text-xs"
                  />
                </label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs">Required</span>
                  <input
                    type="checkbox"
                    checked={f.required}
                    onChange={(e) => onUpdateFieldProp && onUpdateFieldProp(idx, 'required', e.target.checked)}
                  />
                  <button
                    onClick={() => onDeleteField && onDeleteField(idx)}
                    className="text-red-400 hover:text-red-600 text-sm ml-2"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-3 border-slate-700" />
            Submit Button Text
            <input
              type="text"
              value={component.submitText}
              onChange={(e) => onUpdateProp && onUpdateProp('submitText', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
            />
          </label>
        </div>
      ) : (
        <pre className="text-xs whitespace-pre-wrap bg-slate-900/50 p-3 rounded border border-slate-700/30 max-h-full overflow-auto">
          {JSON.stringify(component, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default SettingsPanel
