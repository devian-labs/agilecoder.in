"use client"
import { useEffect, useRef, useState } from "react"
import { Plus, Trash2, Edit2, Save, Loader2, Tag } from "lucide-react"
import { getAllCategories, createCategory, updateCategory, deleteCategory, DEFAULT_CATEGORIES, Category, CategoryInput } from "@/lib/firestore/categories"
import { toast } from "sonner"
import { Icon } from "@iconify/react"

// Curated Lucide icons for blog/tech categories
const ICON_SET = [
  // Dev & Code
  "lucide:code-2","lucide:terminal","lucide:cpu","lucide:git-branch","lucide:git-merge",
  "lucide:github","lucide:file-code","lucide:file-json","lucide:braces","lucide:binary",
  "lucide:bug","lucide:bug-off","lucide:webhook","lucide:api","lucide:cable",
  // AI & Data
  "lucide:brain","lucide:bot","lucide:sparkles","lucide:atom","lucide:microscope",
  "lucide:flask-conical","lucide:radar","lucide:scan","lucide:cpu","lucide:circuit-board",
  "lucide:database","lucide:hard-drive","lucide:server","lucide:cloud","lucide:cloud-upload",
  // Web & Design
  "lucide:globe","lucide:layout-dashboard","lucide:layout-template","lucide:panel-left","lucide:component",
  "lucide:palette","lucide:pen-tool","lucide:pencil","lucide:wand-2","lucide:image",
  "lucide:camera","lucide:video","lucide:monitor","lucide:smartphone","lucide:tablet",
  // Learning
  "lucide:book-open","lucide:graduation-cap","lucide:lightbulb","lucide:award","lucide:badge-check",
  "lucide:bookmark","lucide:file-text","lucide:newspaper","lucide:rss","lucide:mail",
  // Infrastructure
  "lucide:network","lucide:shield","lucide:lock","lucide:key","lucide:wrench",
  "lucide:settings","lucide:settings-2","lucide:sliders","lucide:package","lucide:boxes",
  "lucide:layers","lucide:workflow","lucide:git-pull-request","lucide:rocket","lucide:zap",
  // Analytics
  "lucide:bar-chart-2","lucide:line-chart","lucide:trending-up","lucide:pie-chart","lucide:activity",
  "lucide:gauge","lucide:signal","lucide:wifi","lucide:radio","lucide:satellite",
  // Misc
  "lucide:star","lucide:heart","lucide:music","lucide:gamepad-2","lucide:joystick",
  "lucide:link","lucide:search","lucide:map","lucide:compass","lucide:navigation",
]

const COLORS = [
  "#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ec4899",
  "#10b981","#f97316","#6366f1","#ef4444","#14b8a6",
]

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function IconChip({ icon, color, size = "md" }: { icon: string; color: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10"
  const iconSize = size === "sm" ? 16 : 20
  const isLegacyEmoji = icon && !icon.includes(":")
  return (
    <div
      className={`${dim} rounded-xl flex items-center justify-center flex-shrink-0 border`}
      style={{
        background: `rgba(${hexToRgb(color)}, 0.12)`,
        borderColor: `rgba(${hexToRgb(color)}, 0.3)`,
      }}
    >
      {isLegacyEmoji
        ? <span className="text-base">{icon}</span>
        : <Icon icon={icon || "lucide:folder"} width={iconSize} height={iconSize} style={{ color }} />
      }
    </div>
  )
}

function IconPickerPopover({ value, color, onChange }: { value: string; color: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  const filtered = query.trim()
    ? ICON_SET.filter((i) => i.replace("lucide:", "").includes(query.toLowerCase().trim()))
    : ICON_SET

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center transition-colors"
        title="Pick icon"
      >
        <Icon
          icon={value && value.includes(":") ? value : "lucide:folder"}
          width={22} height={22}
          style={{ color }}
        />
      </button>

      {open && (
        <div className="fixed z-50 w-72 bg-white rounded-2xl border border-zinc-200 shadow-xl p-3" style={{ top: ref.current ? ref.current.getBoundingClientRect().bottom + 8 : 0, left: ref.current ? ref.current.getBoundingClientRect().left : 0 }}>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons…"
            className="w-full px-3 py-2 text-sm text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 mb-3"
          />
          <div className="grid grid-cols-8 gap-1 h-48 overflow-y-auto overflow-x-hidden">
            {filtered.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => { onChange(icon); setOpen(false); setQuery("") }}
                title={icon.replace("lucide:", "")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-zinc-100 ${value === icon ? "bg-blue-50 ring-1 ring-blue-400" : ""}`}
              >
                <Icon icon={icon} width={16} height={16} className="text-zinc-600" />
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-8 text-xs text-zinc-400 text-center py-4">No icons found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap items-center">
      <span className="text-xs text-zinc-400 mr-1">Color</span>
      {COLORS.map((c) => (
        <button key={c} type="button" onClick={() => onChange(c)}
          style={{ background: c }}
          className={`w-5 h-5 rounded-full transition-transform ${value === c ? "ring-2 ring-offset-1 ring-zinc-400 scale-110" : "hover:scale-110"}`}
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
  const [form, setForm] = useState({
    name: cat.name,
    description: cat.description,
    icon: cat.icon ?? "lucide:folder",
    color: cat.color ?? "#3b82f6",
  })

  async function save() {
    setSaving(true)
    await onUpdate(cat.slug, form)
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="px-6 py-4 border-b border-zinc-100 bg-blue-50/30">
        <div className="flex items-start gap-4 mb-4">
          <IconPickerPopover value={form.icon} color={form.color} onChange={(v) => setForm((f) => ({ ...f, icon: v }))} />
          <div className="flex-1 grid grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Name"
              className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Description"
              className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
        <div className="flex items-center gap-6 mb-4 ml-16">
          <ColorPicker value={form.color} onChange={(c) => setForm((f) => ({ ...f, color: c }))} />
        </div>
        <div className="flex gap-2 ml-16">
          <button onClick={save} disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:opacity-50">
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Save
          </button>
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600 hover:bg-zinc-50">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[72px_1fr_1fr_1fr_80px] px-6 py-3 border-b border-zinc-50 items-center hover:bg-zinc-50/50 transition-colors">
      <IconChip icon={cat.icon ?? "lucide:folder"} color={cat.color ?? "#3b82f6"} size="sm" />
      <span className="text-sm font-medium text-zinc-800">{cat.name}</span>
      <span className="text-sm text-zinc-400 truncate pr-4">{cat.description}</span>
      <span className="text-xs text-zinc-400 font-mono">{cat.slug}</span>
      <div className="flex items-center gap-1 justify-end">
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100">
          <Edit2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => onDelete(cat.slug)} className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50">
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
  const [newCat, setNewCat] = useState<CategoryInput>({
    slug: "", name: "", description: "", color: "#3b82f6", icon: "lucide:folder",
  })

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
      setNewCat({ slug: "", name: "", description: "", color: "#3b82f6", icon: "lucide:folder" })
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50">
              {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
              Seed defaults
            </button>
          )}
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
            <Plus className="h-4 w-4" /> New category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-[72px_1fr_1fr_1fr_80px] px-6 py-3 border-b border-zinc-100 bg-zinc-50 text-xs font-medium text-zinc-400 uppercase tracking-wide">
          <span>Icon</span><span>Name</span><span>Description</span><span>Slug</span><span />
        </div>

        {adding && (
          <div className="px-6 py-5 border-b border-zinc-100 bg-blue-50/30">
            <div className="flex items-start gap-4 mb-4">
              <IconPickerPopover
                value={newCat.icon ?? "lucide:folder"}
                color={newCat.color ?? "#3b82f6"}
                onChange={(v) => setNewCat((f) => ({ ...f, icon: v }))}
              />
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input value={newCat.name}
                  onChange={(e) => setNewCat((f) => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                  placeholder="Name"
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                <input value={newCat.description} onChange={(e) => setNewCat((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Description"
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                <input value={newCat.slug} onChange={(e) => setNewCat((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="slug"
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            <div className="flex items-center gap-6 mb-4 ml-16">
              <ColorPicker value={newCat.color ?? "#3b82f6"} onChange={(c) => setNewCat((f) => ({ ...f, color: c }))} />
            </div>
            <div className="flex gap-2 ml-16">
              <button onClick={handleCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700">
                <Save className="h-3 w-3" /> Create
              </button>
              <button onClick={() => setAdding(false)} className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600">Cancel</button>
            </div>
          </div>
        )}

        {loading ? Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[72px_1fr_1fr_1fr_80px] px-6 py-4 border-b border-zinc-50 items-center gap-4">
            <div className="w-8 h-8 bg-zinc-100 rounded-xl animate-pulse" />
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
