"use client";

import ReactQuill, { type ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface BubbleEditorProps extends ReactQuillProps {}

const BubbleEditor = ({ ...props }: BubbleEditorProps) => {
  return <ReactQuill theme="bubble" {...props} />;
};

export default BubbleEditor;
