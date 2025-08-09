import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DynamicForm from './ComponentLibrary/DynamicForm'
import DynamicText from './ComponentLibrary/DynamicText'
import DynamicImage from './ComponentLibrary/DynamicImage'

const SortableItem = ({ id, children, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      {/* Drag Handle */}
      <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...listeners}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing rounded"
          title="Drag to reorder"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 6a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"/>
          </svg>
        </button>
      </div>

      {/* Delete Button */}
      <div className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(id)}
          className="p-1 text-red-400 hover:text-red-600 rounded"
          title="Delete component"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"/>
            <path d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"/>
          </svg>
        </button>
      </div>

      {children}
    </div>
  )
}

const DragDropRenderer = ({ schema, setSchema }) => {
  // Update content of a specific component
  const updateComponentContent = (idx, newContent) => {
    const newSchema = schema.map((component, i) =>
      i === idx ? { ...component, content: newContent } : component
    );
    setSchema(newSchema);
  };
  const [results, setResults] = useState({})
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const ComponentFactory = {
    form: (props, index) => (
      <DynamicForm 
        key={`form-${index}`}
        {...props} 
        onResult={(result) => setResults(prev => ({ ...prev, [`form_${index}`]: result }))}
      />
    ),
    text: (props, index) => (
      <DynamicText
        key={`text-${index}`}
        {...props}
        onContentChange={(val) => updateComponentContent(index, val)}
      />
    ),
    image: (props, index) => <DynamicImage key={`image-${index}`} {...props} />
  }

  const renderComponent = (componentSchema, index) => {
    const { type, ...props } = componentSchema
    const Component = ComponentFactory[type]
    
    if (!Component) {
      return (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-red-300 text-sm">
            Unknown component type: <code className="bg-red-800/30 px-2 py-1 rounded text-xs">{type}</code>
          </p>
        </div>
      )
    }

    return Component(props, index)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = schema.findIndex((_, index) => index.toString() === active.id)
      const newIndex = schema.findIndex((_, index) => index.toString() === over.id)
      
      const newSchema = arrayMove(schema, oldIndex, newIndex)
      setSchema(newSchema)
    }
  }

  const handleDelete = (id) => {
    const index = parseInt(id)
    const newSchema = schema.filter((_, i) => i !== index)
    setSchema(newSchema)
  }

  const addComponent = (type) => {
    const newComponent = getDefaultComponent(type)
    setSchema([...schema, newComponent])
  }

  const getDefaultComponent = (type) => {
    switch (type) {
      case 'form':
        return {
          type: 'form',
          fields: [
            { label: 'Name', type: 'text', required: true, placeholder: 'Enter your name' }
          ],
          submitText: 'Submit'
        }
      case 'text':
        return {
          type: 'text',
          content: 'New Text Component',
          variant: 'p'
        }
      case 'image':
        return {
          type: 'image',
          src: 'https://picsum.photos/400/300',
          alt: 'Sample image',
          width: '400px',
          rounded: true
        }
      default:
        return { type: 'text', content: 'Unknown component', variant: 'p' }
    }
  }

  if (!schema || schema.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-slate-800/30 rounded-lg border-2 border-dashed border-slate-600/50">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <svg className="w-8 h-8 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-slate-300 mb-1">No components</h3>
          <p className="text-sm text-slate-500">
            Add components to start building your interface
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => addComponent('form')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            + Form
          </button>
          <button
            onClick={() => addComponent('text')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            + Text
          </button>
          <button
            onClick={() => addComponent('image')}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            + Image
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative px-8">
      {/* Add Component Buttons */}
      <div className="mb-4 flex gap-2 justify-center">
        <button
          onClick={() => addComponent('form')}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
        >
          + Form
        </button>
        <button
          onClick={() => addComponent('text')}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
        >
          + Text
        </button>
        <button
          onClick={() => addComponent('image')}
          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
        >
          + Image
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={schema.map((_, index) => index.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {schema.map((componentSchema, index) => (
              <SortableItem
                key={index}
                id={index.toString()}
                onDelete={handleDelete}
              >
                {renderComponent(componentSchema, index)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Results Display */}
      {Object.keys(results).length > 0 && (
        <div className="border-t border-slate-700/50 pt-6 mt-6">
          <h3 className="text-lg font-medium text-white mb-4">Form Results</h3>
          <div className="flex flex-col gap-4">
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

export default DragDropRenderer
