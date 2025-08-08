import { useState } from 'react'
import DynamicForm from './ComponentLibrary/DynamicForm'
import DynamicText from './ComponentLibrary/DynamicText'
import DynamicImage from './ComponentLibrary/DynamicImage'

const LiveRenderer = ({ schema }) => {
  const [results, setResults] = useState({})

  const ComponentFactory = {
    form: (props, index) => (
      <DynamicForm 
        key={index} 
        {...props} 
        onResult={(result) => setResults(prev => ({ ...prev, [`form_${index}`]: result }))}
      />
    ),
    text: (props, index) => <DynamicText key={index} {...props} />,
    image: (props, index) => <DynamicImage key={index} {...props} />
  }

  const renderComponent = (componentSchema, index) => {
    const { type, ...props } = componentSchema
    const Component = ComponentFactory[type]
    
    if (!Component) {
      return (
        <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-red-300 text-sm">
            Unknown component type: <code className="bg-red-800/30 px-2 py-1 rounded text-xs">{type}</code>
          </p>
        </div>
      )
    }

    return Component(props, index)
  }

  if (!schema || schema.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-800/30 rounded-lg border-2 border-dashed border-slate-600/50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-slate-300">No components</h3>
          <p className="mt-1 text-sm text-slate-500">
            Generate a schema using AI or edit the JSON manually to see components here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rendered Components */}
      <div className="space-y-4">
        {schema.map((componentSchema, index) => renderComponent(componentSchema, index))}
      </div>

      {/* Results Display */}
      {Object.keys(results).length > 0 && (
        <div className="border-t border-slate-700/50 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">Form Results</h3>
          <div className="space-y-4">
            {Object.entries(results).map(([key, result]) => (
              <div key={key} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                <h4 className="text-sm font-medium text-slate-300 mb-2">
                  {key.replace('_', ' ').toUpperCase()}
                </h4>
                {result.error ? (
                  <div className="text-red-400 text-sm">
                    <strong>Error:</strong> {result.error}
                  </div>
                ) : result.success ? (
                  <div className="text-emerald-400 text-sm">
                    <strong>Success:</strong> {result.success}
                  </div>
                ) : (
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/50 p-3 rounded border border-slate-700/30">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveRenderer
