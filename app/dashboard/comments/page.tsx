"use client"
import { useEffect, useState, useMemo } from "react"
import { CheckCircle, XCircle, MessageSquare, Search } from "lucide-react"
import {
  getAllPendingComments,
  getAllApprovedComments,
  approveComment,
  deleteComment,
  Comment,
} from "@/lib/firestore/comments"
import { formatDate } from "@/utils/formatDate"
import { toast } from "sonner"

type Tab = "pending" | "approved"

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-zinc-100 rounded ${className}`} />
}

function CommentCard({
  comment,
  getTitle,
  onApprove,
  onDelete,
  showApprove,
}: {
  comment: Comment
  getTitle: (slug: string) => string
  onApprove?: () => void
  onDelete: () => void
  showApprove: boolean
}) {
  return (
    <div className="px-6 py-4 border-b border-zinc-50 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-zinc-800">{comment.author}</span>
            <span className="text-[10px] text-zinc-400">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">{comment.content}</p>
          <p className="text-xs text-zinc-400 mt-1.5 truncate">
            on: <span className="text-zinc-500">{getTitle(comment.slug)}</span>
          </p>
        </div>
        <div className="flex gap-2 shrink-0 mt-0.5">
          {showApprove && onApprove && (
            <button
              onClick={onApprove}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors"
            >
              <CheckCircle className="h-3 w-3" /> Approve
            </button>
          )}
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
          >
            <XCircle className="h-3 w-3" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CommentsPage() {
  const [tab, setTab] = useState<Tab>("pending")
  const [pending, setPending] = useState<Comment[]>([])
  const [approved, setApproved] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    import("@/lib/firestore/posts-crud").then(({ getAllPostsAdmin }) => {
      getAllPostsAdmin()
        .then(async (posts) => {
          setAllPosts(posts)
          const slugs = posts.map((p) => p.slug)
          const [p, a] = await Promise.all([
            getAllPendingComments(slugs),
            getAllApprovedComments(slugs),
          ])
          setPending(p)
          setApproved(a)
          setLoading(false)
        })
        .catch(() => { toast.error("Failed to load comments"); setLoading(false) })
    })
  }, [])

  function getTitle(slug: string) {
    return allPosts.find((p) => p.slug === slug)?.title ?? slug
  }

  async function handleApprove(comment: Comment) {
    try {
      await approveComment(comment.slug, comment.id)
      setPending((c) => c.filter((x) => x.id !== comment.id))
      setApproved((c) => [{ ...comment, approved: true }, ...c])
      toast.success("Comment approved")
    } catch { toast.error("Failed to approve comment") }
  }

  async function handleDelete(comment: Comment, from: Tab) {
    try {
      await deleteComment(comment.slug, comment.id)
      if (from === "pending") setPending((c) => c.filter((x) => x.id !== comment.id))
      else setApproved((c) => c.filter((x) => x.id !== comment.id))
      toast.success("Comment deleted")
    } catch { toast.error("Failed to delete comment") }
  }

  const currentList = tab === "pending" ? pending : approved
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return currentList
    return currentList.filter(
      (c) =>
        c.author.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        getTitle(c.slug).toLowerCase().includes(q)
    )
  }, [currentList, search, allPosts])

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Comments</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {pending.length} pending · {approved.length} approved
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 bg-zinc-100 rounded-xl p-1 w-fit">
        {(["pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSearch("") }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {t}
            <span className={`ml-1.5 text-xs ${tab === t ? "text-zinc-400" : "text-zinc-400"}`}>
              ({t === "pending" ? pending.length : approved.length})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search comments…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-zinc-50 space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-zinc-400">
            <MessageSquare className="h-8 w-8 opacity-30" />
            <p className="text-sm">
              {tab === "pending" ? "No pending comments" : "No approved comments yet"}
            </p>
          </div>
        ) : (
          filtered.map((c) => (
            <CommentCard
              key={c.id}
              comment={c}
              getTitle={getTitle}
              showApprove={tab === "pending"}
              onApprove={tab === "pending" ? () => handleApprove(c) : undefined}
              onDelete={() => handleDelete(c, tab)}
            />
          ))
        )}
      </div>
    </div>
  )
}
