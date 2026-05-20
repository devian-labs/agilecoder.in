"use client"
import { useEffect, useState } from "react"
import { Plus, Trash2, Edit2, Save, X, Loader2, Tag } from "lucide-react"
import { getAllCategories, createCategory, updateCategory, deleteCategory, DEFAULT_CATEGORIES, Category, CategoryInput } from "@/lib/firestore/categories"
import { toast } from "sonner"

const COLORS = ["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ec4899","#10b981","#f97316","#6366f1","#ef4444","#14b8a6"]

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {COLORS.map((c) => (
        <button key={c} type="button" onClick={() => onChange(c)}
          style={{ background: c }}
          className={`w-6 h-6 rounded-full transition-transform ${value === c ? "ring-2 ring-offset-1 ring-zinc-900 scale-110" : "hover:scale-110"}`}
        />
      ))}
    </div>
  )
}

function CategoryRow({ cat, onUpdate, onDelete }: {
  cat: Category
  onUpdate: (slug: string, data: Partial<CategoryInput>) => Promise<void>
  onDelete: (slug: string) => Promise<void>
}) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: cat.name, description: cat.description, icon: cat.icon ?? "", color: cat.color ?? "#3b82f6" })

  async function save() {
    setSaving(true)
    await onUpdate(cat.slug, form)
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="px-6 py-4 border-b border-zinc-50 bg-blue-50/30">
        <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-3 items-start">
          <input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
            placeholder="🌐" className="text-xl text-center px-2 py-1.5 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <ColorPicker value={form.color} onChange={(c) => setForm((f) => ({ ...f, color: c }))} />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={save} disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Save
          </button>
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[60px_1fr_1fr_1fr_80px] px-6 py-3.5 border-b border-zinc-50 items-center hover:bg-zinc-50/50 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-lg">{cat.icon}</span>
        <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
      </div>
      <span className="text-sm font-medium text-zinc-800">{cat.name}</span>
      <span className="text-sm text-zinc-400 truncate pr-4">{cat.description}</span>
      <span className="text-xs text-zinc-400 font-mono">{cat.slug}</span>
      <div className="flex items-center gap-1 justify-end">
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 transition-colors">
          <Edit2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => onDelete(cat.slug)} className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newCat, setNewCat] = useState<CategoryInput>({ slug: "", name: "", description: "", color: "#3b82f6", icon: "" })

  useEffect(() => {
    getAllCategories()
      .then((c) => { setCategories(c); setLoading(false) })
      .catch(() => { toast.error("Failed to load categories"); setLoading(false) })
  }, [])

  async function handleCreate() {
    if (!newCat.slug || !newCat.name) { toast.error("Name and slug are required"); return }
    try {
      await createCategory(newCat)
      setCategories((c) => [...c, { ...newCat, id: newCat.slug, postCount: 0 }])
      setNewCat({ slug: "", name: "", description: "", color: "#3b82f6", icon: "" })
      setAdding(false)
      toast.success(`Category "${newCat.name}" created`)
    } catch { toast.error("Failed to create category") }
  }

  async function handleUpdate(slug: string, data: Partial<CategoryInput>) {
    try {
      await updateCategory(slug, data)
      setCategories((c) => c.map((x) => x.slug === slug ? { ...x, ...data } : x))
      toast.success("Category updated")
    } catch { toast.error("Failed to update category") }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this category?")) return
    try {
      await deleteCategory(slug)
      setCategories((c) => c.filter((x) => x.slug !== slug))
      toast.success("Category deleted")
    } catch { toast.error("Failed to delete category") }
  }

  async function seedDefaults() {
    setSeeding(true)
    const id = toast.loading("Seeding default categories…")
    try {
      for (const cat of DEFAULT_CATEGORIES) {
        await createCategory(cat).catch(() => {})
      }
      const fresh = await getAllCategories()
      setCategories(fresh)
      toast.success(`${fresh.length} categories ready`, { id })
    } catch {
      toast.error("Seeding failed", { id })
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Categories</h1>
          <p className="text-zinc-500 text-sm mt-1">{categories.length} categories</p>
        </div>
        <div className="flex gap-2">
          {categories.length === 0 && (
            <button onClick={seedDefaults} disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50">
              {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
              Seed defaults
            </button>
          )}
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" /> New category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_1fr_1fr_80px] px-6 py-3 border-b border-zinc-100 bg-zinc-50 text-xs font-medium text-zinc-400 uppercase tracking-wide">
          <span>Icon</span><span>Name</span><span>Description</span><span>Slug</span><span />
        </div>

        {adding && (
          <div className="px-6 py-4 border-b border-zinc-100 bg-blue-50/30">
            <div className="grid grid-cols-[60px_120px_1fr_1fr] gap-3 items-start mb-3">
              <input value={newCat.icon} onChange={(e) => setNewCat((f) => ({ ...f, icon: e.target.value }))}
                placeholder="🌐" className="text-xl text-center px-2 py-1.5 rounded-lg border border-zinc-200 bg-white focus:outline-none" />
              <input value={newCat.name} onChange={(e) => setNewCat((f) => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                placeholder="Name" className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              <input value={newCat.description} onChange={(e) => setNewCat((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description" className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              <input value={newCat.slug} onChange={(e) => setNewCat((f) => ({ ...f, slug: e.target.value }))}
                placeholder="slug" className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white focus:outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <ColorPicker value={newCat.color ?? "#3b82f6"} onChange={(c) => setNewCat((f) => ({ ...f, color: c }))} />
            <div className="flex gap-2 mt-3">
              <button onClick={handleCreate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
                <Save className="h-3 w-3" /> Create
              </button>
              <button onClick={() => setAdding(false)} className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600">Cancel</button>
            </div>
          </div>
        )}

        {loading ? Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[60px_1fr_1fr_1fr_80px] px-6 py-4 border-b border-zinc-50 items-center gap-4">
            <div className="w-8 h-8 bg-zinc-100 rounded-full animate-pulse" />
            <div className="h-3.5 bg-zinc-100 rounded animate-pulse w-24" />
            <div className="h-3 bg-zinc-100 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-zinc-100 rounded animate-pulse w-20" />
            <div />
          </div>
        )) : categories.length === 0 && !adding ? (
          <div className="py-16 text-center text-zinc-400">
            <Tag className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No categories yet. Seed defaults or create one.</p>
          </div>
        ) : categories.map((cat) => (
          <CategoryRow key={cat.slug} cat={cat} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
