// The mapping from variant string to actual HTML tag
const variantMappings = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
};

const DynamicText = ({ content, variant = 'p', className = '' }) => {
  const Tag = variantMappings[variant] || 'p';

  // --- FIX IS HERE ---
  // I've added a default light text color (e.g., `text-slate-100`) to each
  // variant to ensure it's visible on dark backgrounds.
  const variantClasses = {
    h1: 'text-4xl font-bold text-slate-100',
    h2: 'text-3xl font-bold text-slate-100',
    h3: 'text-2xl font-bold text-slate-100',
    h4: 'text-xl font-semibold text-slate-200',
    h5: 'text-lg font-semibold text-slate-200',
    h6: 'text-base font-semibold text-slate-200',
    p: 'text-base text-slate-300',
    span: 'text-base text-slate-300',
  };

  // Combine the default variant styles with any custom classes passed in props
  const classes = `${variantClasses[variant] || 'text-slate-300'} ${className}`;

  return <Tag className={classes}>{content}</Tag>;
};

export default DynamicText;
