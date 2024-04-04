import { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { modules, formats } from "../../constants/draft-editor-format";

function DraftEditor({ field }) {
  const [editorState, setEditorState] = useState();

  const handleProcedureContentChange = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    setEditorState(sanitizedContent); // Update editorState with the content
    field.onChange(sanitizedContent); // Notify Formik of the changed content
  };

  return (
    <div>
      <div className="pb-10">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="..."
          value={editorState}
          onChange={handleProcedureContentChange}
          style={{ height: "17em", width: "100%" }}
        ></ReactQuill>
      </div>
      {/* Delete the below after testing is completed */}
      <h2 className="mt-10">Editor Content:</h2>
      <p>{editorState}</p> Display the editor content
    </div>
  );
}

export default DraftEditor;
