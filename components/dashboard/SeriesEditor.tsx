"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Trash2, Plus, FileText, AlignLeft,
  ChevronUp, ChevronDown, Eye, EyeOff, Save, Loader2, ArrowLeft,
} from "lucide-react"
import { createSeries, updateSeries, deleteSeries } from "@/lib/firestore/series-crud"
import type { SeriesItem, SeriesInput } from "@/lib/firestore/series-crud"
import type { Post } from "@/lib/firestore/posts-crud"

interface Props {
  initialSlug?: string
  initialData?: {
    title: string
    description: string
    coverImage?: string
    published: boolean
    items: SeriesItem[]
  }
  posts: Post[]
  isNew?: boolean
}

export default function SeriesEditor({ initialSlug, initialData, posts, isNew }: Props) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug ?? "")
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "")
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [items, setItems] = useState<SeriesItem[]>(initialData?.items ?? [])
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [postSearch, setPostSearch] = useState("")

  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  function addPost(postSlug: string) {
    setItems((prev) => [...prev, { type: "post", postSlug, order: prev.length }])
    setPostSearch("")
  }

  function addText() {
    setItems((prev) => [...prev, { type: "text", content: "", order: prev.length }])
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx).map((item, i) => ({ ...item, order: i })))
  }

  function updateText(idx: number, content: string) {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, content } : item))
  }

  function moveItem(idx: number, dir: -1 | 1) {
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next.map((item, i) => ({ ...item, order: i })))
  }

  const postMap = new Map(posts.map((p) => [p.slug, p]))
  const usedSlugs = new Set(items.filter((i) => i.type === "post").map((i) => i.postSlug))
  const filteredPosts = posts.filter((p) => {
    if (usedSlugs.has(p.slug)) return false
    if (!postSearch) return true
    return p.title.toLowerCase().includes(postSearch.toLowerCase())
  })

  async function handleSave() {
    if (!slug.trim() || !title.trim()) { setError("Slug and title are required."); return }
    setError("")
    setSaving(true)
    try {
      const input: SeriesInput = {
        slug: slug.trim(),
        title: title.trim(),
        description: description.trim(),
        coverImage: coverImage.trim() || undefined,
        published,
        items: items.map((item, i) => ({ ...item, order: i })),
      }
      if (isNew) await createSeries(input)
      else await updateSeries(slug.trim(), input)
      router.push("/dashboard/series")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!initialSlug) return
    if (!confirm(`Delete series "${title}"? This cannot be undone.`)) return
    setDeleting(true)
    try {
      await deleteSeries(initialSlug)
      router.push("/dashboard/series")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed.")
      setDeleting(false)
    }
  }

  const INPUT = "w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
  const LABEL = "block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide"
  const SECTION = "bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-6"

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/series")}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">
              {isNew ? "New Learning Path" : "Edit Learning Path"}
            </h1>
            {!isNew && initialSlug && (
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">{initialSlug}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Delete"}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {/* Meta fields */}
      <div className={SECTION}>
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-700">Series Info</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className={LABEL}>Title</label>
            <input
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(autoSlug(e.target.value)) }}
              placeholder="e.g. Mastering React Hooks"
              className={INPUT}
            />
          </div>
          <div>
            <label className={LABEL}>Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={!isNew}
              placeholder="mastering-react-hooks"
              className={`${INPUT} font-mono disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50`}
            />
            {isNew && <p className="text-xs text-zinc-400 mt-1">Auto-generated from title. Cannot be changed after creation.</p>}
          </div>
          <div>
            <label className={LABEL}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What will readers learn by completing this series?"
              className={`${INPUT} resize-none`}
            />
          </div>
          <div>
            <label className={LABEL}>Cover Image URL</label>
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className={INPUT}
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm font-medium text-zinc-800">Published</p>
              <p className="text-xs text-zinc-400">Visible on the public /blog/series page</p>
            </div>
            <button
              onClick={() => setPublished((p) => !p)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${published ? "bg-blue-600" : "bg-zinc-200"}`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${published ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Items editor */}
      <div className={SECTION}>
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-700">Series Content</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {items.filter((i) => i.type === "post").length} articles · {items.filter((i) => i.type === "text").length} text blocks
            </p>
          </div>
        </div>

        <div className="px-6 py-5">
          {/* Items list */}
          {items.length > 0 && (
            <div className="space-y-2 mb-5">
              {items.map((item, idx) => {
                const post = item.type === "post" && item.postSlug ? postMap.get(item.postSlug) : undefined
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border flex items-start gap-3 p-3 ${
                      item.type === "post" ? "border-zinc-200 bg-zinc-50" : "border-zinc-100 bg-white"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {item.type === "post" ? (
                        <FileText className="h-4 w-4 text-blue-500" />
                      ) : (
                        <AlignLeft className="h-4 w-4 text-zinc-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {item.type === "post" ? (
                        post ? (
                          <p className="text-sm font-medium text-zinc-800 truncate">{post.title}</p>
                        ) : (
                          <p className="text-sm text-zinc-400 italic truncate">{item.postSlug}</p>
                        )
                      ) : (
                        <textarea
                          value={item.content ?? ""}
                          onChange={(e) => updateText(idx, e.target.value)}
                          rows={2}
                          placeholder="Add context, intro, or instructions..."
                          className="w-full bg-transparent text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none resize-none"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="p-1 rounded text-zinc-300 hover:text-zinc-600 disabled:opacity-30 transition-colors">
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} className="p-1 rounded text-zinc-300 hover:text-zinc-600 disabled:opacity-30 transition-colors">
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => removeItem(idx)} className="p-1 rounded text-zinc-300 hover:text-red-500 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Add post */}
          <div className="mb-3">
            <label className={LABEL}>Add article</label>
            <input
              value={postSearch}
              onChange={(e) => setPostSearch(e.target.value)}
              placeholder="Search posts by title..."
              className={`${INPUT} mb-2`}
            />
            {(postSearch || filteredPosts.length <= 8) && filteredPosts.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden max-h-52 overflow-y-auto shadow-sm">
                {filteredPosts.slice(0, 20).map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => addPost(p.slug)}
                    className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
                  >
                    <FileText className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span className="text-sm text-zinc-700 truncate">{p.title}</span>
                    <Plus className="h-3 w-3 text-zinc-400 ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add text block */}
          <button
            onClick={addText}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <AlignLeft className="h-3.5 w-3.5" />
            Add text block
          </button>
        </div>
      </div>
    </div>
  )
}
