const DynamicImage = ({ 
  src, 
  alt = 'Image', 
  width, 
  height, 
  rounded = false, 
  shadow = false, 
  className = '' 
}) => {
  const getImageClasses = () => {
    let classes = "block max-w-full h-auto"
    
    // Apply width and height if provided
    if (width) {
      classes += ` w-${width}`
    }
    if (height) {
      classes += ` h-${height}`
    }

    // Apply rounded corners
    if (rounded) {
      classes += " rounded-lg"
    }

    // Apply shadow
    if (shadow) {
      classes += " shadow-lg"
    }

    return classes
  }

  const containerClasses = "inline-block mb-4"

  return (
    <div className={`${containerClasses} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={getImageClasses()}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
        onError={(e) => {
          // Fallback for broken images
          e.target.src = 'https://placehold.co/300x200?text=Image+Not+Found&font=roboto'
          e.target.alt = 'Image failed to load'
        }}
      />
    </div>
  )
}

export default DynamicImage
