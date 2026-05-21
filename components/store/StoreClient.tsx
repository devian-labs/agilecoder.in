"use client"

import { useState, useMemo } from "react"
import { Search, ExternalLink, BookOpen, Code2, ShoppingBag, SlidersHorizontal } from "lucide-react"

export type StoreProduct = {
  id: string
  name: string
  price: number
  formattedPrice: string
  thumbnail: string | null
  url: string
  category: "code" | "book" | "merch"
  featured?: boolean
}

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "code", label: "Code" },
  { key: "book", label: "Books" },
  { key: "merch", label: "Merch" },
] as const

const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "free", label: "Free first" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
] as const

type Category = (typeof CATEGORIES)[number]["key"]
type Sort = (typeof SORT_OPTIONS)[number]["key"]

const CATEGORY_META = {
  code: {
    label: "Code",
    icon: Code2,
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    cta: "Get on Gumroad",
  },
  book: {
    label: "Book",
    icon: BookOpen,
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    cta: "Buy now",
  },
  merch: {
    label: "Merch",
    icon: ShoppingBag,
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    cta: "Get it",
  },
}

function ProductCard({ product }: { product: StoreProduct }) {
  const meta = CATEGORY_META[product.category]
  const Icon = meta.icon

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square bg-zinc-800 overflow-hidden relative">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="h-10 w-10 text-zinc-700" />
          </div>
        )}

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${meta.badge}`}>
            {meta.label}
          </span>
        </div>

        {/* Price badge — top right */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-black/80 text-white text-xs font-bold backdrop-blur-sm">
            {product.price === 0 ? "Free" : product.formattedPrice}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 flex-1">
          {product.name}
        </h3>
        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 transition-colors ml-auto">
          {meta.cta} <ExternalLink className="h-2.5 w-2.5" />
        </span>
      </div>
    </a>
  )
}

export default function StoreClient({
  products,
  initialCategory,
}: {
  products: StoreProduct[]
  initialCategory?: "code" | "book" | "merch"
}) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<Category>(initialCategory ?? "all")
  const [sort, setSort] = useState<Sort>("default")

  const filtered = useMemo(() => {
    let result = [...products]

    if (category !== "all") {
      result = result.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q))
    }

    if (sort === "free") {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [products, search, category, sort])

  const counts = useMemo(() => {
    const all = products.length
    const code = products.filter((p) => p.category === "code").length
    const book = products.filter((p) => p.category === "book").length
    const merch = products.filter((p) => p.category === "merch").length
    return { all, code, book, merch }
  }, [products])

  const countMap: Record<Category, number> = {
    all: counts.all,
    code: counts.code,
    book: counts.book,
    merch: counts.merch,
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                category === cat.key
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat.label}
              {countMap[cat.key] > 0 && (
                <span className={`ml-1.5 text-[10px] ${category === cat.key ? "text-zinc-400" : "text-zinc-600"}`}>
                  {countMap[cat.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative flex items-center gap-2">
          <SlidersHorizontal className="absolute left-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="pl-8 pr-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-zinc-600 mb-5">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
        {search ? ` for "${search}"` : ""}
        {category !== "all" ? ` in ${CATEGORIES.find((c) => c.key === category)?.label}` : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center text-zinc-600">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium mb-1">No products found</p>
          <p className="text-xs">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Merch coming soon — only show when merch tab selected and no merch products */}
      {category === "merch" && counts.merch === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 p-12 text-center text-zinc-600">
          <ShoppingBag className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium mb-1">Coming soon</p>
          <p className="text-xs">Merch drop in the works</p>
        </div>
      )}
    </div>
  )
}
