
import { useState } from 'react';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

function DraftEditor({ customer_name }) {
  const [editorState, setEditorState] = useState();

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  const formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
    setEditorState(content); // Update editorState with the content
  };

  const defaultValue = `<p>Hi ${customer_name}, </p><p><br></p><p><br></p><p>Regards,</p><p><br></p><p><strong>SmartAgent</strong></p><p>Customer Support</p><p>smartagents3@gmail.com</p>`

  return (
    <div>
      <div className="pb-10">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="..."
          defaultValue={defaultValue}
          onChange={handleProcedureContentChange}
          style={{ height: "17em", width: "100%"}}
        >
        </ReactQuill>
      </div>
      <h2>Editor Content:</h2>
      <p>{editorState}</p> {/* Display the editor content */}
    </div>
  );
};

export default DraftEditor;