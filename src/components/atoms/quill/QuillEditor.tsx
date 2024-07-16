import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  required = false,
  placeholder = "Enter text here...",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const toolbarOptions = [
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
  ];

  const modules = { toolbar: toolbarOptions };

  const handleEditorChange = (newValue: string) => onChange(newValue);

  return (
    <div className="w-full border border-gray-300 rounded p-2">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`quill-container ${isFocused ? "quill-focused" : ""}`}>
        <ReactQuill
          data-testid="quill-textbox" // Added test id
          modules={modules}
          theme="snow"
          value={value}
          onChange={handleEditorChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={errorMessage ? "border border-red-500" : ""}
          placeholder={placeholder}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export { QuillEditor };
