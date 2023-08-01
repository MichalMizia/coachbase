"use client";

import ReactQuill, { Quill, type ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

interface EditorProps extends ReactQuillProps {
  rich?: boolean;
}

const Editor = ({ theme, rich, ...props }: EditorProps) => {
  return <ReactQuill theme={theme ? theme : "snow"} {...props} />;
};

export default Editor;
