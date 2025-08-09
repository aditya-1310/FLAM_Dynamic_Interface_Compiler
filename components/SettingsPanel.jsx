import React from 'react'

/**
 * SettingsPanel – side panel scaffold for editing selected component properties.
 * For now it only displays the component JSON. We will incrementally enhance it.
 */
const SettingsPanel = ({ component, onClose, onUpdateProp }) => {
  if (!component) return null

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-slate-800/90 backdrop-blur-md border-l border-slate-700/50 p-6 text-slate-100 shadow-lg z-50">
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
          <label className="block text-sm font-medium">
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
