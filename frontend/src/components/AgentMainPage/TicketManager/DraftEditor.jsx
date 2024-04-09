// Packages required for HTML text editor
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import DOMPurify from 'dompurify';

// HTML to Markdown converter
import turndown from "turndown";
// Import constants
import { modules, formats } from '../../../constants/draft-editor-format';

function DraftEditor({ customer_name, editorState, setEditorState }) {
  const TurndownService = new turndown();
  
  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
    const sanitizedContent = DOMPurify.sanitize(content)
    // Update editorState with the content that is converted to markdown
    setEditorState(TurndownService.turndown(sanitizedContent));    
  };

  const defaultValue = `<p>Hi ${customer_name}, </p><p><br></p><br><p><br></p><p>Regards,</p><p><br></p><p><strong>SmartAgent</strong></p><p>Customer Support</p><a href="mailto:smartagents3@gmail.com">smartagents3@gmail.com</a>`

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
      
      {/* Delete the below after testing is completed */}
      <h2>Editor Content:</h2>
      <p>{editorState}</p> {/* Display the editor content */}
    </div>
  );
};

export default DraftEditor;