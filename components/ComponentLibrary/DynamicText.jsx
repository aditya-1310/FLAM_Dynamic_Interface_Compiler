import { useState } from 'react';

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

const DynamicText = ({ content, variant = 'p', className = '', onContentChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const Tag = variantMappings[variant] || 'p';

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

  const classes = `${variantClasses[variant] || 'text-slate-300'} ${className}`;

  const finishEditing = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    }
  };

  if (isEditing && onContentChange) {
    return (
      <input
        autoFocus
        type="text"
        className={`bg-transparent border-b border-slate-500 focus:outline-none ${classes}`}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        onBlur={finishEditing}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <Tag
      className={classes}
      onDoubleClick={() => {
        if (onContentChange) setIsEditing(true);
      }}
    >
      {content}
    </Tag>
  );
};

export default DynamicText;
