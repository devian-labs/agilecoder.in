"use client"
import { useEffect, useState, useMemo } from "react"
import { Eye, Heart, Search, ArrowUpDown, ExternalLink, PenSquare, Plus, Trash2, Globe, FileText } from "lucide-react"
import { getAllPostsAdmin, deletePost, publishPost, unpublishPost, Post } from "@/lib/firestore/posts-crud"
import { toast } from "sonner"
import { CATEGORY_LABELS, PostCategory } from "@/types"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"

type SortKey = "date" | "views" | "likes" | "title"

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-zinc-100 rounded ${className}`} />
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [sort, setSort] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    getAllPostsAdmin()
      .then((p) => { setPosts(p); setLoading(false) })
      .catch(() => { toast.error("Failed to load posts"); setLoading(false) })
  }, [])

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    try {
      await deletePost(post.slug)
      setPosts((p) => p.filter((x) => x.slug !== post.slug))
      toast.success("Post deleted")
    } catch {
      toast.error("Failed to delete post")
    }
  }

  async function handleTogglePublish(post: Post) {
    try {
      if (post.published) {
        await unpublishPost(post.slug)
        toast.success(`"${post.title}" unpublished`)
      } else {
        await publishPost(post.slug)
        toast.success(`"${post.title}" is now live`)
      }
      setPosts((p) => p.map((x) => x.slug === post.slug ? { ...x, published: !x.published } : x))
    } catch {
      toast.error("Failed to update post status")
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return posts
      .filter((p) => {
        if (filter === "published" && !p.published) return false
        if (filter === "draft" && p.published) return false
        return p.title.toLowerCase().includes(q) || p.slug.includes(q)
      })
      .sort((a, b) => {
        const mul = sortDir === "desc" ? -1 : 1
        if (sort === "title") return mul * a.title.localeCompare(b.title)
        if (sort === "date") return mul * (a.date > b.date ? 1 : -1)
        return mul * ((a[sort as "views" | "likes"] ?? 0) - (b[sort as "views" | "likes"] ?? 0))
      })
  }, [posts, search, filter, sort, sortDir])

  function toggleSort(key: SortKey) {
    if (sort === key) setSortDir((d) => d === "desc" ? "asc" : "desc")
    else { setSort(key); setSortDir("desc") }
  }

  const published = posts.filter((p) => p.published).length
  const drafts = posts.length - published

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Posts</h1>
          <p className="text-zinc-500 text-sm mt-1">{posts.length} total · {published} published · {drafts} drafts</p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      {/* Filters + search */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1">
          {(["all", "published", "draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input type="text" placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm text-zinc-900 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-[1fr_130px_100px_70px_70px_100px] px-6 py-3 border-b border-zinc-100 bg-zinc-50 text-xs font-medium text-zinc-400 uppercase tracking-wide">
          <button onClick={() => toggleSort("title")} className="flex items-center gap-1 hover:text-zinc-600 text-left">Title <ArrowUpDown className="h-3 w-3" /></button>
          <span>Category</span>
          <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-zinc-600">Date <ArrowUpDown className="h-3 w-3" /></button>
          <button onClick={() => toggleSort("views")} className="flex items-center gap-1 hover:text-zinc-600">Views <ArrowUpDown className="h-3 w-3" /></button>
          <button onClick={() => toggleSort("likes")} className="flex items-center gap-1 hover:text-zinc-600">Likes <ArrowUpDown className="h-3 w-3" /></button>
          <span className="text-right">Actions</span>
        </div>

        {loading ? Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[1fr_130px_100px_70px_70px_100px] px-6 py-4 border-b border-zinc-50 items-center gap-4">
            <Skeleton className="h-3.5 w-3/4" /><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-10" /><Skeleton className="h-3 w-10" /><Skeleton className="h-3 w-16 ml-auto" />
          </div>
        )) : filtered.length === 0 ? (
          <div className="py-16 text-center text-zinc-400">
            <FileText className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No posts yet. <Link href="/dashboard/posts/new" className="text-blue-600 hover:underline">Write your first post →</Link></p>
          </div>
        ) : filtered.map((post) => (
          <div key={post.slug} className="grid grid-cols-[1fr_130px_100px_70px_70px_100px] px-6 py-3.5 border-b border-zinc-50 items-center hover:bg-zinc-50/50 transition-colors">
            <div className="min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-zinc-300"}`} />
                <Link href={`/dashboard/posts/${post.slug}/edit`}
                  className="text-sm font-medium text-zinc-800 hover:text-blue-600 truncate transition-colors">
                  {post.title || "Untitled"}
                </Link>
              </div>
              {post.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Featured</span>}
            </div>
            <span className="text-xs text-zinc-400 truncate">
              {post.category ? (CATEGORY_LABELS[post.category as PostCategory] ?? post.category) : "-"}
            </span>
            <span className="text-xs text-zinc-400">{formatDate(post.date)}</span>
            <span className="flex items-center gap-1 text-xs text-zinc-500"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
            <span className="flex items-center gap-1 text-xs text-zinc-500"><Heart className="h-3 w-3" />{post.likes.toLocaleString()}</span>
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => handleTogglePublish(post)} title={post.published ? "Unpublish" : "Publish"}
                className={`p-1.5 rounded-lg transition-colors ${post.published ? "text-emerald-600 hover:bg-emerald-50" : "text-zinc-400 hover:bg-zinc-100"}`}>
                <Globe className="h-3.5 w-3.5" />
              </button>
              <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link href={`/dashboard/posts/${post.slug}/edit`} className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 transition-colors">
                <PenSquare className="h-3.5 w-3.5" />
              </Link>
              <button onClick={() => handleDelete(post)} className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
