"use client"
import { useEditor, EditorContent, NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from "@tiptap/react"
import { toast } from "sonner"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Youtube from "@tiptap/extension-youtube"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import CharacterCount from "@tiptap/extension-character-count"
import { common, createLowlight } from "lowlight"
import { useCallback, useRef } from "react"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Code2,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, Link2, Image as ImageIcon,
  Youtube as YoutubeIcon, Highlighter, Undo, Redo, Type,
} from "lucide-react"

const lowlight = createLowlight(common)

const LANGUAGES = [
  { value: "", label: "plain text" },
  { value: "bash", label: "bash" },
  { value: "javascript", label: "javascript" },
  { value: "typescript", label: "typescript" },
  { value: "python", label: "python" },
  { value: "html", label: "html" },
  { value: "css", label: "css" },
  { value: "json", label: "json" },
  { value: "yaml", label: "yaml" },
  { value: "sql", label: "sql" },
  { value: "rust", label: "rust" },
  { value: "go", label: "go" },
]

function CodeBlockView({ node, updateAttributes }: { node: any; updateAttributes: (attrs: Record<string, any>) => void }) {
  return (
    <NodeViewWrapper className="my-4 rounded-xl overflow-hidden border border-zinc-200 not-prose">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100 border-b border-zinc-200">
        <select
          value={node.attrs.language ?? ""}
          onChange={(e) => updateAttributes({ language: e.target.value })}
          contentEditable={false}
          className="text-xs px-2 py-0.5 rounded-md border border-zinc-300 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>
      <NodeViewContent
        as="code"
        className="block w-full p-4 bg-zinc-950 text-zinc-100 font-mono text-sm leading-relaxed whitespace-pre outline-none"
      />
    </NodeViewWrapper>
  )
}

const CodeBlockExtension = CodeBlockLowlight.configure({ lowlight }).extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView)
  },
})

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  stickyTop?: number
}

function ToolBtn({ onClick, active, title, children }: {
  onClick: () => void; active?: boolean; title: string; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors text-sm ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-zinc-200 mx-1" />
}

export function RichEditor({ content, onChange, placeholder, stickyTop = 0 }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Youtube.configure({ controls: true }),
      CodeBlockExtension,
      Placeholder.configure({ placeholder: placeholder ?? "Start writing your post..." }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-zinc dark:prose-invert max-w-none min-h-[500px] focus:outline-none px-8 py-6 text-base leading-relaxed",
      },
    },
  })

  const uploadImage = useCallback(async (file: File) => {
    if (!editor) return
    const id = toast.loading("Uploading image…")
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/cloudinary/upload", { method: "POST", body: form })
      const data = await res.json()
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run()
        toast.success("Image inserted", { id })
      } else {
        toast.error(data.error ?? "Upload failed", { id })
      }
    } catch {
      toast.error("Upload failed", { id })
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href
    const url = window.prompt("URL:", prev)
    if (url === null) return
    if (url === "") { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  const addYoutube = useCallback(() => {
    if (!editor) return
    const url = window.prompt("YouTube URL:")
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }, [editor])

  if (!editor) return null

  const wordCount = editor.storage.characterCount?.words() ?? 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="border border-zinc-200 rounded-2xl bg-white flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b rounded-lg border-zinc-100 bg-white sticky z-10" style={{ top: stickyTop }}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <UnderlineIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">
          <Highlighter className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">
          <Code className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="H1">
          <Heading1 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2">
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3">
          <Heading3 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Paragraph">
          <Type className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <List className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
          <ListOrdered className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
          <Quote className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block">
          <Code2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">
          <Minus className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right">
          <AlignRight className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={addLink} active={editor.isActive("link")} title="Add link">
          <Link2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => fileRef.current?.click()} active={false} title="Insert image">
          <ImageIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={addYoutube} active={false} title="Embed YouTube">
          <YoutubeIcon className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
          <Undo className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
          <Redo className="h-4 w-4" />
        </ToolBtn>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />

      {/* Word count */}
      <div className="px-8 py-2 border-t border-zinc-100 flex items-center gap-4 text-xs text-zinc-400 bg-zinc-50/50">
        <span>{wordCount} words</span>
        <span>{readTime} min read</span>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) uploadImage(f)
          e.target.value = ""
        }}
      />
    </div>
  )
}
