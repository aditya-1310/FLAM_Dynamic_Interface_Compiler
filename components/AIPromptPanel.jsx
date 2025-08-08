import { useState } from 'react'
import axios from 'axios'

const AIPromptPanel = ({ onSchemaGenerated, isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:3001/api/generate-schema', {
        prompt: prompt.trim()
      })

      if (response.data.success) {
        onSchemaGenerated(response.data.schema)
        setPrompt('')
      } else {
        setError(response.data.error || 'Failed to generate schema')
      }
    } catch (err) {
      console.error('Error generating schema:', err)
      setError(err.response?.data?.error || 'Failed to connect to AI service')
    } finally {
      setIsLoading(false)
    }
  }

  const examplePrompts = [
    "Create a contact form with name, email, and message fields",
    "Build a user registration form with email, password, and age validation",
    "Make a simple landing page with a hero title and call-to-action button",
    "Design a product showcase with image, title, description, and price"
  ]

  const handleExampleClick = (example) => {
    setPrompt(example)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-3">
            Describe your UI
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a contact form with name, email, and message fields"
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 resize-none"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              Generating Schema...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate UI Schema
            </div>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-700/50 pt-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Example Prompts
        </h3>
        <div className="grid gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left text-sm text-slate-400 hover:text-emerald-400 hover:bg-slate-700/30 p-3 rounded-lg transition-all duration-200 border border-slate-700/30 hover:border-emerald-500/30 group"
              disabled={isLoading}
            >
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="flex-1">"{example}"</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIPromptPanel
