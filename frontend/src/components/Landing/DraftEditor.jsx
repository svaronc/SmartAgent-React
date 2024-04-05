import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { modules, formats } from "../../constants/draft-editor-format";

function DraftEditor({ value, onChange }) {
  return (
    <div>
      <div className="pb-10">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="..."
          value={value}
          onChange={onChange}
          style={{ height: "17em", width: "100%" }}
        ></ReactQuill>
      </div>
      {/* Delete the below after testing is completed */}
      <h2 className="mt-10">Editor Content:</h2>
      <p>{value}</p> Display the editor content
    </div>
  );
}

export default DraftEditor;
