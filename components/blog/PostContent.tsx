"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import DOMPurify from "isomorphic-dompurify"

interface Props {
  html: string
}

const COLLAPSED_HEIGHT = 220

function unescapeHtml(s: string) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

type Part =
  | { type: "html"; content: string }
  | { type: "code"; content: string; lang: string }

function splitParts(html: string): Part[] {
  const parts: Part[] = []
  const re = /<pre[^>]*>\s*<code(?:[^>]+class="language-([^"]*)"[^>]*)?>([\s\S]*?)<\/code>\s*<\/pre>/gi
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ type: "html", content: html.slice(lastIndex, m.index) })
    }
    parts.push({ type: "code", content: unescapeHtml(m[2] ?? ""), lang: m[1] ?? "" })
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < html.length) {
    parts.push({ type: "html", content: html.slice(lastIndex) })
  }
  return parts
}

function sanitize(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li",
      "blockquote", "code", "strong", "em", "u", "s", "mark",
      "a", "img", "figure", "figcaption", "hr", "br",
      "table", "thead", "tbody", "tr", "th", "td", "div", "span", "iframe",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "target", "rel", "width", "height", "frameborder", "allowfullscreen", "style"],
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allowfullscreen"],
  })
}

const EXPAND_THRESHOLD = 5

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const lineCount = code.trim().split('\n').length
  const collapsible = lineCount > EXPAND_THRESHOLD

  function copy() {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayLang = lang || "code"

  return (
    <div className="my-6 rounded-xl border border-zinc-800 overflow-hidden not-prose">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <span className="text-xs text-zinc-500 font-mono">{displayLang}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-colors"
          >
            {copied
              ? <><Check className="h-3 w-3 text-emerald-400" /> Copied</>
              : <><Copy className="h-3 w-3" /> Copy</>
            }
          </button>
          {collapsible && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-colors"
            >
              {expanded
                ? <><ChevronUp className="h-3 w-3" /> Collapse</>
                : <><ChevronDown className="h-3 w-3" /> Expand</>
              }
            </button>
          )}
        </div>
      </div>

      {/* Code body */}
      <div className="relative">
        <div style={{ maxHeight: collapsible && !expanded ? COLLAPSED_HEIGHT : undefined, overflow: "auto" }}>
          <SyntaxHighlighter
            language={lang || "text"}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              background: "#0d1117",
              fontSize: "0.8125rem",
              lineHeight: "1.7",
              borderRadius: 0,
            }}
            codeTagProps={{ style: { fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace" } }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>

        {/* Fade + expand hint when collapsed */}
        {collapsible && !expanded && (
          <div
            className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#0d1117] to-transparent flex items-end justify-center pb-2 cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            <span className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors select-none">
              ↕ click to expand
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PostContent({ html }: Props) {
  const parts = splitParts(html)

  return (
    <div className="prose prose-invert max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-2
      prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-1
      prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-1
      prose-h4:text-lg prose-h4:mt-3 prose-h4:mb-0
      prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:my-3
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white prose-em:text-zinc-300
      prose-code:text-blue-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-400 prose-blockquote:bg-zinc-900 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:pr-4
      prose-img:rounded-xl prose-img:border prose-img:border-zinc-800
      prose-hr:border-zinc-800
      prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:text-zinc-300
      prose-th:text-white prose-td:text-zinc-300
      prose-mark:bg-yellow-400/20 prose-mark:text-yellow-200"
    >
      {parts.map((part, i) =>
        part.type === "code" ? (
          <CodeBlock key={i} code={part.content} lang={part.lang} />
        ) : (
          <div key={i} dangerouslySetInnerHTML={{ __html: sanitize(part.content) }} />
        )
      )}
    </div>
  )
}
