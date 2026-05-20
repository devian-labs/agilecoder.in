"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp, deleteField } from "firebase/firestore"
import { CodeWidgetEditor } from "@/components/editor/CodeWidgetEditor"
import type { CodeWidget } from "@/lib/firestore/posts-crud"
import { ArrowLeft, CheckCircle, Loader2, Code2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface PostEntry {
  slug: string
  title: string
  content: string
  codeWidget?: CodeWidget
}

// Extract raw text from <pre><code>...</code></pre> blocks in HTML
function extractCodeBlocks(html: string): { lang: string; code: string }[] {
  const blocks: { lang: string; code: string }[] = []
  const re = /<pre[^>]*><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const lang = m[1] ?? "js"
    const code = m[2]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    blocks.push({ lang, code })
  }
  return blocks
}

function guessRuntime(blocks: { lang: string; code: string }[]): "p5js" | "vanilla" {
  const all = blocks.map((b) => b.code).join("\n")
  if (/\bsetup\b|\bdraw\b|\bcreateCanvas\b|\bp5\b/i.test(all)) return "p5js"
  return "vanilla"
}

function PostWidgetCard({ post, onSaved }: { post: PostEntry; onSaved: (slug: string, w: CodeWidget | null) => void }) {
  const [widget, setWidget] = useState<CodeWidget | null>(post.codeWidget ?? null)
  const [saving, setSaving] = useState(false)
  const [showBlocks, setShowBlocks] = useState(false)
  const blocks = extractCodeBlocks(post.content)

  async function save() {
    setSaving(true)
    try {
      const ref = doc(db, "posts", post.slug)
      if (widget) {
        await updateDoc(ref, { codeWidget: widget, updatedAt: serverTimestamp() })
      } else {
        await updateDoc(ref, { codeWidget: deleteField(), updatedAt: serverTimestamp() })
      }
      onSaved(post.slug, widget)
      toast.success(`Saved widget for "${post.title}"`)
    } catch (e: any) {
      toast.error(e.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  function useBlock(code: string) {
    const runtime = guessRuntime([{ lang: "js", code }])
    setWidget({ code, runtime, height: 480 })
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      {/* Post header */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 truncate">{post.title}</p>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{post.slug}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {post.codeWidget && (
            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">
              <CheckCircle className="h-3 w-3" /> Has widget
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            Save
          </button>
        </div>
      </div>

      {/* Code blocks extracted from post */}
      {blocks.length > 0 && (
        <div className="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
          <button
            type="button"
            onClick={() => setShowBlocks((s) => !s)}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5" />
            {blocks.length} code block{blocks.length !== 1 ? "s" : ""} found in post
            {showBlocks ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showBlocks && (
            <div className="mt-3 space-y-2">
              {blocks.map((b, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100 border-b border-zinc-200">
                    <span className="text-[11px] font-mono text-zinc-500">{b.lang || "code"}</span>
                    <button
                      type="button"
                      onClick={() => useBlock(b.code)}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Use as widget →
                    </button>
                  </div>
                  <pre className="p-3 text-xs font-mono text-zinc-700 bg-white overflow-x-auto max-h-32 leading-relaxed">
                    {b.code.trim().slice(0, 400)}{b.code.length > 400 ? "\n…" : ""}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Widget editor */}
      <div className="p-5">
        <CodeWidgetEditor value={widget} onChange={setWidget} />
      </div>
    </div>
  )
}

export default function MigrateWidgetsPage() {
  const [posts, setPosts] = useState<PostEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(
          query(collection(db, "posts"), where("category", "==", "creative-coding"))
        )
        const items: PostEntry[] = snap.docs.map((d) => {
          const data = d.data()
          return {
            slug: d.id,
            title: data.title ?? d.id,
            content: data.content ?? "",
            codeWidget: data.codeWidget ?? undefined,
          }
        })
        // Sort: posts without widgets first
        items.sort((a, b) => (a.codeWidget ? 1 : 0) - (b.codeWidget ? 1 : 0))
        setPosts(items)
      } catch (e: any) {
        toast.error("Failed to load posts: " + e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function handleSaved(slug: string, widget: CodeWidget | null) {
    setPosts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, codeWidget: widget ?? undefined } : p))
    )
  }

  const withWidget = posts.filter((p) => p.codeWidget).length
  const without = posts.length - withWidget

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 mb-6">
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Widget Scripts</h1>
          <p className="text-zinc-500 text-sm">
            Add interactive code widgets to creative-coding posts. Code blocks found in each post are shown for reference.
          </p>
        </div>
        {!loading && (
          <div className="flex gap-3 text-sm shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              {withWidget} done
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
              {without} remaining
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-zinc-400 py-12">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading creative-coding posts…
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <Code2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No creative-coding posts found.</p>
          <p className="text-xs mt-1">Make sure posts have <code className="bg-zinc-100 px-1 rounded">category: creative-coding</code> in Firestore.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostWidgetCard key={post.slug} post={post} onSaved={handleSaved} />
          ))}
        </div>
      )}
    </div>
  )
}
