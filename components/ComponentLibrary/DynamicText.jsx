const DynamicText = ({ content, variant = 'p', className = '' }) => {
  const getTextClasses = (variant) => {
    const baseClasses = "font-sans leading-relaxed"
    
    switch (variant) {
      case 'h1':
        return `${baseClasses} text-4xl font-bold text-slate-900 mb-4`
      case 'h2':
        return `${baseClasses} text-3xl font-semibold text-slate-900 mb-3`
      case 'h3':
        return `${baseClasses} text-2xl font-semibold text-slate-900 mb-2`
      case 'h4':
        return `${baseClasses} text-xl font-semibold text-slate-900 mb-2`
      case 'h5':
        return `${baseClasses} text-lg font-semibold text-slate-900 mb-2`
      case 'h6':
        return `${baseClasses} text-base font-semibold text-slate-900 mb-2`
      case 'lead':
        return `${baseClasses} text-xl font-normal text-slate-700 mb-4`
      case 'caption':
        return `${baseClasses} text-sm font-normal text-slate-500 mb-2`
      case 'p':
      default:
        return `${baseClasses} text-base font-normal text-slate-700 mb-4`
    }
  }

  const Tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) ? variant : 'p'
  const classes = getTextClasses(variant)

  return (
    <Tag className={`${classes} ${className}`}>
      {content}
    </Tag>
  )
}

export default DynamicText
