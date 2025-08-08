import { useForm } from 'react-hook-form'
import { useState } from 'react'

const DynamicForm = ({ fields = [], submitText = 'Submit', onSubmit, onResult, className = '' }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const executeLogic = (code, values) => {
    try {
      // Create a sandboxed function
      const func = new Function('values', `
        try {
          ${code}
        } catch (error) {
          return 'Error: ' + error.message;
        }
      `)
      return func(values)
    } catch (error) {
      return 'Execution Error: ' + error.message
    }
  }

  const onFormSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      let result = { values: data }

      // Execute custom logic if provided
      if (onSubmit) {
        const logicResult = executeLogic(onSubmit, data)
        if (logicResult) {
          if (typeof logicResult === 'string' && logicResult.includes('Error:')) {
            result.error = logicResult
          } else {
            result.success = logicResult
          }
        }
      } else {
        // Default behavior - just log the values
        console.log('Form submitted:', data)
        result.success = 'Form submitted successfully!'
      }

      setSubmitResult(result)
      if (onResult) {
        onResult(result)
      }
    } catch (error) {
      const errorResult = { error: error.message }
      setSubmitResult(errorResult)
      if (onResult) {
        onResult(errorResult)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field, index) => {
    const { label, type, required, placeholder, options, min, max, rows, ...fieldProps } = field
    const fieldName = `field_${index}`

    const registerOptions = {
      required: required ? `${label} is required` : false,
      ...(type === 'email' && { pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }),
      ...(min && { min: { value: min, message: `Minimum value is ${min}` } }),
      ...(max && { max: { value: max, message: `Maximum value is ${max}` } })
    }

    return (
      <div key={index} className="mb-4">
        <label 
          htmlFor={fieldName} 
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            id={fieldName}
            {...register(fieldName, registerOptions)}
            placeholder={placeholder}
            rows={rows || 3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-vertical min-h-[80px] ${
              errors[fieldName] ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50' : 'border-slate-300'
            }`}
            {...fieldProps}
          />
        ) : type === 'select' ? (
          <select
            id={fieldName}
            {...register(fieldName, registerOptions)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 bg-white ${
              errors[fieldName] ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50' : 'border-slate-300'
            }`}
            {...fieldProps}
          >
            <option value="">Select {label}</option>
            {options?.map((option, optIndex) => (
              <option key={optIndex} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldName}
            type={type || 'text'}
            {...register(fieldName, registerOptions)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 ${
              errors[fieldName] ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50' : 'border-slate-300'
            }`}
            {...fieldProps}
          />
        )}
        
        {errors[fieldName] && (
          <p className="text-sm text-red-600 mt-1">
            {errors[fieldName].message}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-6 shadow-lg max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {fields.map((field, index) => renderField(field, index))}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              Processing...
            </div>
          ) : (
            submitText
          )}
        </button>
      </form>

      {submitResult && (
        <div className="mt-4">
          {submitResult.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-800 text-sm">
                <strong>Error:</strong> {submitResult.error}
              </div>
            </div>
          ) : submitResult.success ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="text-emerald-800 text-sm">
                <strong>Success:</strong> {submitResult.success}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-slate-800 text-sm">
                <strong>Submitted Data:</strong>
                <pre className="mt-2 text-xs font-mono bg-slate-100 p-2 rounded border">
                  {JSON.stringify(submitResult.values, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DynamicForm
