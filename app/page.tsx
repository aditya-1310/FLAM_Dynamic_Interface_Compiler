"use client";

import { useState } from "react";
import AIPromptPanel from "../components/AIPromptPanel";
import SchemaEditor from "../components/SchemaEditor";
import LiveRenderer from "../components/LiveRenderer";
import DragDropRenderer from "../components/DragDropRenderer";
import SchemaManager from "../components/SchemaManager";

function Home() {
  const [schema, setSchema] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragDropMode, setIsDragDropMode] = useState(false);
  const [layoutMode, setLayoutMode] = useState("two-column");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              {/* Logo/Icon */}
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Dynamic Interface Compiler
                </h1>
                <p className="text-sm text-slate-400 font-medium mt-1">
                  Build UI components from natural language prompts
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Layout Toggle */}
              <div className="flex bg-slate-700/50 rounded-lg p-1">
                <button
                  onClick={() => setLayoutMode("two-column")}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    layoutMode === "two-column"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                  }`}
                  title="Two Column Layout"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setLayoutMode("single-column")}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    layoutMode === "single-column"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                  }`}
                  title="Single Column Layout"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </button>
              </div>
              <SchemaManager schema={schema} setSchema={setSchema} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        className={`mx-auto px-6 lg:px-8 py-8 transition-all duration-300 ${
          layoutMode === "single-column" ? "max-w-4xl" : "max-w-7xl"
        }`}
      >
        {layoutMode === "single-column" ? (
          /* Single Column Layout */
          <div className="space-y-8">
            {/* AI Prompt Panel */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    AI Schema Generator
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Describe your UI and let AI generate the schema
                  </p>
                </div>
              </div>
              <AIPromptPanel
                onSchemaGenerated={setSchema}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>

            {/* Schema Editor */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Schema Editor
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Manually edit the JSON schema
                  </p>
                </div>
              </div>
              <SchemaEditor schema={schema} onChange={setSchema} />
            </div>

            {/* Live Preview */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Live Preview
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      See your components render in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-400 font-medium">
                    View Mode:
                  </span>
                  <div className="flex bg-slate-700/50 rounded-lg p-1">
                    <button
                      onClick={() => setIsDragDropMode(false)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        !isDragDropMode
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                      }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setIsDragDropMode(true)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        isDragDropMode
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                      }`}
                    >
                      Drag & Drop
                    </button>
                  </div>
                </div>
              </div>
              <div className="min-h-[400px] overflow-auto">
                {isDragDropMode ? (
                  <DragDropRenderer schema={schema} setSchema={setSchema} />
                ) : (
                  <LiveRenderer schema={schema} />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Two Column Layout */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Panel - Schema Definition */}
            <div className="xl:col-span-5 space-y-8">
              {/* AI Prompt Panel */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      AI Schema Generator
                    </h2>
                    <p className="text-sm text-slate-400">
                      Describe your UI and let AI generate the schema
                    </p>
                  </div>
                </div>
                <AIPromptPanel
                  onSchemaGenerated={setSchema}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>

              {/* Schema Editor */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Schema Editor
                    </h2>
                    <p className="text-sm text-slate-400">
                      Manually edit the JSON schema
                    </p>
                  </div>
                </div>
                <SchemaEditor schema={schema} onChange={setSchema} />
              </div>
            </div>

            {/* Right Panel - Live Preview */}
            <div className="xl:col-span-7">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl h-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Live Preview
                      </h2>
                      <p className="text-sm text-slate-400">
                        See your components render in real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-400 font-medium">
                      View Mode:
                    </span>
                    <div className="flex bg-slate-700/50 rounded-lg p-1">
                      <button
                        onClick={() => setIsDragDropMode(false)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          !isDragDropMode
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                            : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setIsDragDropMode(true)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          isDragDropMode
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                            : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                        }`}
                      >
                        Drag & Drop
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-[calc(100vh-12rem)] overflow-auto">
                  {isDragDropMode ? (
                    <DragDropRenderer schema={schema} setSchema={setSchema} />
                  ) : (
                    <LiveRenderer schema={schema} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
