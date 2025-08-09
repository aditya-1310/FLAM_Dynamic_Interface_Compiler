# Dynamic Interface Compiler

A no-code interface builder for internal tools that allows users to design UI blocks (forms, tables, text sections) dynamically and compile those definitions into actual working React components without refreshing the page.

## Features

### Core Requirements Completed

#### 🔹 1. UI Block Definition Panel
- **JSON Editor**: Monaco editor with syntax highlighting and validation
- **AI-Powered Schema Builder**: Natural language to schema conversion using Google Gemini AI
- **Component Support**: form, text, image components
- **Persistent Storage**: MongoDB backend with save/load functionality

#### 🔹 2. Live Renderer
- **Dynamic Component Rendering**: Parse JSON schema into actual React components
- **Real-time Updates**: Components render instantly as schema changes
- **State Management**: Form state, validation, and submission handling
- **Form Submission**: Console logging and success/error messages

#### 🔹 3. Composable Component Library
- **Form Component**: 
  - Multiple field types (text, email, number, textarea, select)
  - Built-in validation with react-hook-form
  - Custom styling and error handling
- **Text Component**: 
  - Multiple variants (h1-h6, p, lead, caption)
  - Responsive typography
- **Image Component**: 
  - Configurable dimensions, rounded corners, shadows
  - Error handling with fallback images

####  4. Logic Injection (Advanced)
- **Sandboxed Execution**: Using `new Function()` instead of dangerous `eval`
- **Custom Logic**: Attach JavaScript logic to form submissions
- **Dynamic Error Handling**: Show custom error messages from user-defined logic
- **Safe Execution**: Isolated execution environment

### Bonus Features

####  Implemented
- **Visual JSON Editor**: Monaco editor with syntax highlighting
- **Export Schema**: Download schemas as JSON files
- **Import Schema**: Upload and validate JSON schema files with feedback
- **Live Drag & Drop Layout**: Full drag-and-drop interface using dnd-kit
- **AI-Powered Generation**: Natural language to schema conversion
- **Database Storage**: MongoDB integration for persistent schemas

####  Advanced Features
- **Dual View Modes**: Toggle between Preview and Drag & Drop modes
- **Component Management**: Add, delete, and reorder components visually
- **Real-time Validation**: Instant feedback on schema changes
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **Next.js** - React framework with server-side rendering
- **Vite** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Monaco Editor** - VS Code editor in the browser
- **React Hook Form** - Performant form library
- **@dnd-kit** - Modern drag and drop library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Google Generative AI** - AI-powered schema generation
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup


### 1. Clone the Repository
```bash
git clone <repository-url>
cd dynamic-interface-compiler
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/dynamic-interface-compiler" > .env
echo "GEMINI_API_KEY=your_gemini_api_key_here" >> .env
echo "PORT=3001" >> .env

# Start the backend server
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: https://flam-dynamic-interface-compiler.vercel.app

## 🎯 Usage Guide

### 1. AI Schema Generation
1. Enter a natural language description in the AI prompt panel
2. Click "Generate Schema" to create components automatically
3. The AI will generate appropriate JSON schema based on your description

### 2. Manual Schema Editing
1. Use the Monaco editor to manually edit JSON schema
2. Real-time validation shows syntax errors
3. Format and clear buttons for easy editing

### 3. Live Preview
- **Preview Mode**: See how components will look to end users
- **Drag & Drop Mode**: Visually arrange, add, and delete components

### 4. Schema Management
- **Save**: Store schemas in MongoDB with name and description
- **Load**: Retrieve previously saved schemas
- **Export**: Download schema as JSON file
- **Import**: Upload JSON schema files

### 5. Component Types

#### Form Component
```json
{
  "type": "form",
  "fields": [
    {
      "label": "Email",
      "type": "email",
      "required": true,
      "placeholder": "your@email.com"
    }
  ],
  "submitText": "Submit",
  "onSubmit": "if (values.email.includes('test')) return 'Test emails not allowed';"
}
```

#### Text Component
```json
{
  "type": "text",
  "content": "Welcome to our app",
  "variant": "h1"
}
```

#### Image Component
```json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "alt": "Description",
  "width": "400px",
  "rounded": true,
  "shadow": true
}
```

## 🏗 Architecture

### Component Factory Pattern
The system uses a factory pattern to dynamically create components based on schema type:

```javascript
const ComponentFactory = {
  form: (props) => <DynamicForm {...props} />,
  text: (props) => <DynamicText {...props} />,
  image: (props) => <DynamicImage {...props} />
}
```



### API Architecture
- RESTful API design
- MongoDB for data persistence
- Google Gemini AI integration
- Error handling and validation

## 🔧 Development

### Project Structure
```
dynamic-interface-compiler/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComponentLibrary/
│   │   │   │   ├── DynamicForm.jsx
│   │   │   │   ├── DynamicText.jsx
│   │   │   │   └── DynamicImage.jsx
│   │   │   ├── AIPromptPanel.jsx
│   │   │   ├── SchemaEditor.jsx
│   │   │   ├── LiveRenderer.jsx
│   │   │   ├── DragDropRenderer.jsx
│   │   │   └── SchemaManager.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── models/
│   │   └── UISchema.js
│   ├── routes/
│   │   ├── schemas.js
│   │   └── gemini.js
│   ├── server.js
│   └── package.json
└── README.md
```

### Adding New Component Types
1. Create component in `ComponentLibrary/`
2. Add to `ComponentFactory` in renderers
3. Update schema validation
4. Add examples to documentation

### Environment Variables
```bash
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/dynamic-interface-compiler
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```


## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Render)
```bash
# Set environment variables
# Deploy with MongoDB Atlas connection
```

## Future Enhancements

### Planned Features
- **More Component Types**: Tables, charts, buttons, cards
- **Advanced Layouts**: Grid system, responsive breakpoints
- **Theme System**: Custom color schemes and typography
- **Component Marketplace**: Share and discover components
- **Version Control**: Schema versioning and history
- **Real-time Collaboration**: Multiple users editing simultaneously

### Technical Improvements
- **TypeScript**: Add type safety
- **Testing**: Unit and integration tests
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG compliance
- **Internationalization**: Multi-language support

## Challenges Faced & Lessons Learned

During development we ran into a few tricky hurdles:

* **Schema ↔ UI Sync** – keeping the JSON schema, live preview, and drag-and-drop layout in perfect sync without race conditions was the hardest engineering problem. It required debouncing editor updates, optimistic UI, and a *schema→react* diff algorithm.
* **AI Prompt Reliability** – Gemini occasionally returned invalid JSON. We added streaming validation, auto-repair, and clear user error to handle this.
* **Drag & Drop Performance** – rendering a big list of draggable nodes caused jank. Virtualisation with `react-window` solved it.
* **Sandboxed Logic Execution** – executing user JS safely without `eval` meant building a custom `new Function()` wrapper with a whitelisted scope.
* **Cross-origin Dev Setup** – running Vite (5173) and Express (3001) locally needed tight CORS rules and proxy configuration to avoid 401s.

 **Most difficult part**: real-time bidirectional sync between Monaco JSON editor and the visual drag-and-drop canvas while preserving undo/redo history.

### What we would optimise next

1. **Bundle Size** – enable code-splitting + lazy load Monaco/editor heavy deps.
2. **Type Safety** – migrate to TypeScript for fewer runtime bugs.
3. **Testing** – add Jest + React Testing Library suites for schema parsing and renderer.
4. **Accessibility** – audit keyboard & screen-reader flows, especially DnD.
5. **CI/CD** – automatic preview deploys per PR on Vercel.

---

##  Known Issues & Limitations

1. **Sandbox Security**: Logic injection uses `new Function()` - safe but limited
2. **Component Styling**: Limited to predefined styles (no custom CSS)
3. **Complex Layouts**: No nested component support yet
4. **Mobile Drag & Drop**: Touch interactions could be improved