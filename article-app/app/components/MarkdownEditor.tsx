"use client";

import { useRef, useState } from "react";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import {
  LuBold,
  LuItalic,
  LuHeading1,
  LuHeading2,
  LuList,
  LuListOrdered,
  LuQuote,
  LuCode,
  LuLink,
  LuEye,
  LuPen,
} from "react-icons/lu";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  id = "content-editor",
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Wrap selected text or insert markdown syntax and preserve cursor focus
  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const replacement = `${prefix}${textToInsert}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    // Defer cursor selection until next tick after textarea value updates
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + textToInsert.length
      );
    }, 0);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs focus-within:border-black transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 bg-gray-50/50 px-3 py-2 gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**", "bold text")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Bold"
          >
            <LuBold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*", "italic text")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Italic"
          >
            <LuItalic className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("# ", "", "Heading 1")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Heading 1"
          >
            <LuHeading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("## ", "", "Heading 2")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Heading 2"
          >
            <LuHeading2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("- ", "", "List item")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Bulleted List"
          >
            <LuList className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ", "", "List item")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <LuListOrdered className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("> ", "", "Quote")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Blockquote"
          >
            <LuQuote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("```\n", "\n```", "code")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Code Block"
          >
            <LuCode className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("[", "](https://example.com)", "link text")}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            title="Insert Link"
          >
            <LuLink className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center rounded-lg bg-gray-200/70 p-0.5 text-xs font-medium text-gray-600">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "write"
                ? "bg-white text-black shadow-xs font-semibold"
                : "hover:text-black"
            }`}
          >
            <LuPen className="w-3.5 h-3.5" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-black shadow-xs font-semibold"
                : "hover:text-black"
            }`}
          >
            <LuEye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor & Preview Area */}
      <div className="p-4 min-h-[300px]">
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={14}
            className="w-full resize-y bg-transparent text-sm md:text-base text-gray-800 leading-relaxed outline-none border-none focus:ring-0 placeholder:text-gray-400"
          />
        ) : (
          <div className="min-h-[300px] text-sm md:text-base text-gray-800 leading-relaxed">
            {value.trim() ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="italic text-gray-400">Nothing to preview yet. Start typing in the Write tab!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
