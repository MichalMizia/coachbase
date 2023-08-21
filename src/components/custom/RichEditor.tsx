import React, {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Quill from "react-quill";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";

// Undo and redo functions for Custom Toolbar
function undoChange() {
  // @ts-expect-error
  this.quill.history.undo();
}
function redoChange() {
  // @ts-expect-error
  this.quill.history.redo();
}

const formats: string[] = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

interface RichEditorProps extends HTMLProps<HTMLDivElement> {
  isLoading?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  editorClassName?: string;
}
// Quill Toolbar component
export const RichEditor = ({
  isLoading,
  className,
  value,
  setValue,
  editorClassName,
  ...props
}: RichEditorProps) => {
  const quillRef = useRef<any>(null);

  useEffect(() => {
    quillRef.current
      .getEditor()
      .getModule("toolbar")
      .addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          if (!input.files || !input?.files?.length || !input?.files?.[0])
            return;
          const editor = quillRef?.current?.getEditor();
          const file = input.files[0];
          const formData = new FormData();
          formData.append("file", file);

          // uploading the file to aws
          let url: string | null = null;
          try {
            const res = await axios.post("/api/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            url = res?.data?.resultURLS[0];
            if (!url) {
              return toast.error("Nie udało się dodać zdjęcia");
            }
          } catch (e) {
            return toast.error("Nie udało się dodać zdjęcia");
          }

          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", url);
        };
      });
  }, [quillRef]);

  return (
    <div
      className={cn(
        "text-editor mt-4 flex h-full max-h-full flex-1 flex-col items-stretch justify-start !overflow-y-auto",
        className
      )}
    >
      <div id="toolbar" className="!h-auto">
        <span className="ql-formats">
          {/* <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="courier-new">Courier New</option>
        <option value="helvetica">Helvetica</option>
      </select> */}
          <select className="ql-header" defaultValue="4">
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">Normal</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
        </span>
        <span className="ql-formats">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>

        <span className="ql-formats">
          <button className="ql-undo">
            <svg viewBox="0 0 18 18">
              <polygon
                className="ql-fill ql-stroke"
                points="6 10 4 12 2 10 6 10"
              />
              <path
                className="ql-stroke"
                d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
              />
            </svg>
          </button>
          <button className="ql-redo">
            <svg viewBox="0 0 18 18">
              <polygon
                className="ql-fill ql-stroke"
                points="12 10 14 12 16 10 12 10"
              />
              <path
                className="ql-stroke"
                d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
              />
            </svg>
          </button>
        </span>
      </div>
      <Quill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={"Napisz coś wielkiego..."}
        modules={modules}
        formats={formats}
        className={cn(
          `article-editor !overflow-y-auto !text-gray-800`,
          editorClassName
        )}
      />
    </div>
  );
};

export default RichEditor;
