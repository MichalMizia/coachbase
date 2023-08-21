"use client";

import ReactQuill, { type ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps extends ReactQuillProps {}

const Editor = ({ ...props }: EditorProps) => {
  return <ReactQuill theme="snow" {...props} />;
};

export default Editor;
