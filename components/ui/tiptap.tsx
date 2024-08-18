"use client";

import sanitizeHtml from "sanitize-html";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./editor-toolbar";
import { forwardRef, useImperativeHandle } from "react";

export interface ITiptapRef {
  editorValue: string;
  clearEditorValue: () => void;
}

const Tiptap = forwardRef<ITiptapRef>((props, ref) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    editorValue:
      editor && !editor.isEmpty ? sanitizeHtml(editor.getHTML()) : "",
    clearEditorValue: () => (editor ? editor.commands.clearContent() : ""),
  }));

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
});

Tiptap.displayName = "Tiptap";

export default Tiptap;
