"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { CoverImageUpload } from "./CoverImageUpload"
import { CodeWidgetEditor } from "./CodeWidgetEditor"
import { createPost, updatePost, slugify, estimateReadingTime, PostInput, CodeWidget } from "@/lib/firestore/posts-crud"
import { getAllCategories, Category } from "@/lib/firestore/categories"
import { Save, Eye, ArrowLeft, Globe, FileText, Loader2, X, Plus } from "lucide-react"
import { toast } from "sonner"

const RichEditor = dynamic(() => import("./RichEditor").then((m) => m.RichEditor), { ssr: false })

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const

interface Props {
  initialData?: Partial<PostInput & { slug: string; published?: boolean; views?: number; likes?: number }>
  mode: "create" | "edit"
}

export function PostForm({ initialData, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [tagInput, setTagInput] = useState("")

  const [form, setForm] = useState<PostInput>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    author: initialData?.author ?? "Smruti Ranjan",
    date: initialData?.date ?? new Date().toISOString().slice(0, 10),
    category: initialData?.category ?? "",
    tags: initialData?.tags ?? [],
    published: initialData?.published ?? false,
    featured: initialData?.featured ?? false,
    draft: false,
    difficulty: initialData?.difficulty ?? "beginner",
    learningPath: initialData?.learningPath ?? "",
    learningPathOrder: initialData?.learningPathOrder,
    readingTime: initialData?.readingTime,
    codeWidget: initialData?.codeWidget ?? null,
  })

  const [slugManual, setSlugManual] = useState(mode === "edit")

  useEffect(() => {
    getAllCategories().then(setCategories).catch(() => toast.error("Failed to load categories"))
  }, [])

  function set<K extends keyof PostInput>(key: K, val: PostInput[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function handleTitleChange(val: string) {
    set("title", val)
    if (!slugManual) set("slug", slugify(val))
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase()
    if (t && !form.tags?.includes(t)) {
      set("tags", [...(form.tags ?? []), t])
    }
    setTagInput("")
  }

  function removeTag(t: string) {
    set("tags", (form.tags ?? []).filter((x) => x !== t))
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) { toast.error("Title is required"); return }
    if (!form.slug.trim()) { toast.error("Slug is required"); return }
    setSaving(true)
    const isPublishing = publish ?? form.published
    try {
      const payload: PostInput = {
        ...form,
        published: isPublishing,
        readingTime: estimateReadingTime(form.content),
      }
      if (mode === "create") {
        const id = toast.loading("Creating post…")
        const slug = await createPost(payload)
        toast.dismiss(id)
        toast.success(isPublishing ? "Post published!" : "Draft saved")
        router.push(`/dashboard/posts/${slug}/edit`)
      } else {
        const id = toast.loading("Saving…")
        await updatePost(form.slug, payload)
        toast.dismiss(id)
        toast.success(isPublishing ? "Post published!" : "Draft saved")
        set("published", isPublishing)
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-200 px-6 py-3 flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/posts")}
          className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-900 truncate">{form.title || "Untitled post"}</p>
          <p className="text-xs text-zinc-400">{form.published ? "Published" : "Draft"}</p>
        </div>
        <div className="flex items-center gap-2">
          {form.slug && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </a>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
            Save draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />}
            {form.published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
        {/* Main editor */}
        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full text-3xl font-bold text-zinc-900 placeholder-zinc-300 bg-transparent border-none outline-none focus:outline-none resize-none"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">slug:</span>
            <span className="text-zinc-400">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => { setSlugManual(true); set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")) }}
              className="flex-1 text-zinc-600 font-mono bg-transparent border-b border-zinc-200 focus:border-blue-400 focus:outline-none py-0.5"
            />
          </div>

          {/* Editor */}
          <RichEditor
            content={form.content}
            onChange={(html) => set("content", html)}
            placeholder="Start writing your post..."
            stickyTop={61}
          />

          {/* Code widget - full-width below the editor */}
          <CodeWidgetEditor
            value={form.codeWidget}
            onChange={(val) => set("codeWidget", val)}
          />
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          {/* Cover image */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-900">Cover Image</p>
            <CoverImageUpload value={form.coverImage} onChange={(url) => set("coverImage", url)} />
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-4">
            <p className="text-sm font-semibold text-zinc-900">Post Settings</p>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              >
                <option value="">- No category -</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => set("difficulty", e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              >
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={3}
                placeholder="Brief description for SEO and cards..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Publish Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
                <button type="button" onClick={addTag} className="p-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {form.tags?.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs">
                    {t}
                    <button type="button" onClick={() => removeTag(t)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1 border-t border-zinc-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="rounded" />
                <span className="text-sm text-zinc-700">Featured post</span>
              </label>
            </div>
          </div>

          {/* Series */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-4">
            <p className="text-sm font-semibold text-zinc-900">Series / Learning Path</p>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Path name</label>
              <input
                type="text"
                value={form.learningPath ?? ""}
                onChange={(e) => set("learningPath", e.target.value)}
                placeholder="e.g. react-fundamentals"
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Order in series</label>
              <input
                type="number"
                min={1}
                value={form.learningPathOrder ?? ""}
                onChange={(e) => set("learningPathOrder", Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
