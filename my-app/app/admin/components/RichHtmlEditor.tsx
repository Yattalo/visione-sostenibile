"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link2, Image as ImageIcon, Eraser } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface RichHtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  minHeight?: number;
}

export function RichHtmlEditor({
  value,
  onChange,
  className,
  minHeight = 220,
}: RichHtmlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p></p>";
    }
  }, [value]);

  const refreshValue = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    refreshValue();
    editorRef.current?.focus();
  };

  const askLink = () => {
    const url = window.prompt("Inserisci URL", "https://");
    if (url) exec("createLink", url);
  };

  const askImage = () => {
    const url = window.prompt("URL immagine", "https://");
    if (url) exec("insertImage", url);
  };

  return (
    <div className={cn("border border-border rounded-xl overflow-hidden bg-white", className)}>
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/40">
        <button type="button" onClick={() => exec("bold")} className="p-2 rounded hover:bg-white" title="Grassetto">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("italic")} className="p-2 rounded hover:bg-white" title="Corsivo">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("underline")} className="p-2 rounded hover:bg-white" title="Sottolineato">
          <Underline className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className="p-2 rounded hover:bg-white" title="Lista puntata">
          <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")} className="p-2 rounded hover:bg-white" title="Lista numerata">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("formatBlock", "<h2>")} className="px-2 py-1 text-xs rounded hover:bg-white" title="Titolo H2">
          H2
        </button>
        <button type="button" onClick={() => exec("formatBlock", "<p>")} className="px-2 py-1 text-xs rounded hover:bg-white" title="Paragrafo">
          P
        </button>
        <button type="button" onClick={askLink} className="p-2 rounded hover:bg-white" title="Link">
          <Link2 className="w-4 h-4" />
        </button>
        <button type="button" onClick={askImage} className="p-2 rounded hover:bg-white" title="Immagine">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec("removeFormat")} className="p-2 rounded hover:bg-white" title="Rimuovi formattazione">
          <Eraser className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={refreshValue}
        className="prose max-w-none p-4 focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}
