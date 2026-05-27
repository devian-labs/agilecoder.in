"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Clock, ChevronDown, X } from "lucide-react"
import type { Post } from "@/lib/firestore/posts-crud"
import type { Category } from "@/lib/firestore/categories"
import { formatDate } from "@/utils/formatDate"
import { CategoryIcon } from "@/components/CategoryIcon"

const PAGE_SIZE = 12

type SortKey = "newest" | "oldest" | "popular"

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-600 text-white",
  intermediate: "bg-amber-500 text-white",
  advanced: "bg-red-600 text-white",
}

interface Props {
  posts: Post[]
  categories: Category[]
  initialCategory?: string
}

export default function ExploreClient({ posts, categories, initialCategory }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SortKey>("newest")
  const [category, setCategory] = useState(initialCategory ?? "")
  const [page, setPage] = useState(1)

  function selectCategory(cat: string) {
    setCategory(cat)
    setPage(1)
    setSearch("")
    router.push(cat ? `/blog?category=${cat}` : "/blog", { scroll: false })
  }

  const filtered = useMemo(() => {
    let result = [...posts]

    if (category) result = result.filter((p) => p.category === category)

    const q = search.toLowerCase().trim()
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt ?? "").toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
    }

    switch (sort) {
      case "oldest":
        result.sort((a, b) => a.date.localeCompare(b.date))
        break
      case "popular":
        result.sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        break
      default:
        result.sort((a, b) => b.date.localeCompare(a.date))
    }

    return result
  }, [posts, category, search, sort])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  // Featured post (first featured, only when no search/category/sort active)
  const featured =
    !category && !search && sort === "newest"
      ? posts.filter((p) => p.featured)[0] ?? null
      : null
  const gridPosts = featured ? visible.filter((p) => p.slug !== featured.slug) : visible

  return (
    <div>
      {/* Category tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button
          onClick={() => selectCategory("")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!category
              ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
              : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
        >
          All posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => selectCategory(cat.slug)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat.slug
                ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
          >
            <CategoryIcon icon={cat.icon ?? ""} color={category === cat.slug ? cat.color : undefined} size={16} />{cat.name}
          </button>
        ))}
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-9 pr-9 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setPage(1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          {(["newest", "oldest", "popular"] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => { setSort(s); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${sort === s ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {s === "popular" ? "Popular" : s === "newest" ? "Newest" : "Oldest"}
            </button>
          ))}
        </div>

        <span className="text-xs text-zinc-600 shrink-0">
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Featured post - only on default view */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group block mb-10">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/40 transition-all duration-300 grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto bg-zinc-800 relative overflow-hidden">
              {featured.coverImage ? (
                <img src={featured.coverImage} alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
                  <span className="text-5xl opacity-50">📝</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold tracking-wide shadow-md">Featured</span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              {featured.category && (() => {
                const cat = categories.find((c) => c.slug === featured.category)
                return cat ? (
                  <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1">
                    <CategoryIcon icon={cat.icon ?? ""} color={cat.color} size={13} />{cat.name}
                  </span>
                ) : null
              })()}
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{formatDate(featured.date)}</span>
                {featured.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readingTime} min</span>}
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      {gridPosts.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          {search ? (
            <p>No posts matching &ldquo;{search}&rdquo;. <button onClick={() => setSearch("")} className="text-cyan-400 hover:underline">Clear search</button></p>
          ) : (
            <p>No posts yet in this category.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => {
              const cat = categories.find((c) => c.slug === post.category)
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-zinc-800 overflow-hidden relative">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
                        <span className="text-3xl opacity-40">{cat?.icon ?? "📝"}</span>
                      </div>
                    )}
                    {post.difficulty && (
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow ${DIFFICULTY_COLORS[post.difficulty]}`}>
                        {post.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {cat && (
                      <span className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: cat.color }}>
                        <CategoryIcon icon={cat.icon ?? ""} color={cat.color} size={13} />{cat.name}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span>{formatDate(post.date)}</span>
                      {post.readingTime && (
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}m</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
                Load more ({filtered.length - visible.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
