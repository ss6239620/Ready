import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Or you can use "quill.bubble.css"

const MyEditor = () => {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = (value) => {
    setEditorValue(value);
  };

  const handleSave = async () => {
    try {
      console.log(editorValue);
      
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image"],
      ["blockquote", "code-block"],
      ["clean"]
    ],
  };

  return (
    <div>
      <h2>My Custom Toolbar Editor</h2>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        theme="snow"
        modules={modules}
      />
      <div>
        <h3>Editor Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorValue }} />
        <button onClick={handleSave}>Save Content</button>
        <div>
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
