"use client"
import { useEffect, useState } from "react"
import { Eye, Heart, MessageSquare, Users, TrendingUp, Clock, CheckCircle, XCircle, Plus, FileText } from "lucide-react"
import { getSiteTotals, getTopPostsByViews } from "@/lib/firestore/analytics"
import { getAllPendingComments, approveComment, deleteComment } from "@/lib/firestore/comments"
import { getSubscriberCount } from "@/lib/firestore/subscribers"
import { getAllPostsAdmin, Post } from "@/lib/firestore/posts-crud"
import Link from "next/link"
import { formatDate } from "@/utils/formatDate"
import { CATEGORY_LABELS, PostCategory } from "@/types"

function MetricCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: any; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
        <p className="text-sm text-zinc-500">{label}</p>
      </div>
    </div>
  )
}

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-zinc-100 rounded-lg ${className}`} />
}

export default function DashboardPage() {
  const [totals, setTotals] = useState<{ totalViews: number; totalLikes: number } | null>(null)
  const [topPosts, setTopPosts] = useState<any[]>([])
  const [pendingComments, setPendingComments] = useState<any[]>([])
  const [subscriberCount, setSubscriberCount] = useState<number>(0)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getSiteTotals(),
      getTopPostsByViews(5),
      getAllPostsAdmin(),
      getSubscriberCount(),
    ]).then(async ([t, top, posts, subCount]) => {
      setTotals(t)
      setTopPosts(top)
      setAllPosts(posts)
      setSubscriberCount(subCount)
      const slugs = posts.map((p) => p.slug)
      const pending = await getAllPendingComments(slugs)
      setPendingComments(pending.slice(0, 10))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function getPostTitle(slug: string) {
    return allPosts.find((p) => p.slug === slug)?.title ?? slug
  }

  async function handleApprove(slug: string, id: string) {
    await approveComment(slug, id)
    setPendingComments((c) => c.filter((x) => x.id !== id))
  }

  async function handleDelete(slug: string, id: string) {
    await deleteComment(slug, id)
    setPendingComments((c) => c.filter((x) => x.id !== id))
  }

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const published = allPosts.filter((p) => p.published).length
  const drafts = allPosts.length - published

  return (
    <div className="px-8 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{greeting}, Smruti 👋</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link href="/dashboard/posts/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />) : (
          <>
            <MetricCard label="Total Views" value={totals?.totalViews?.toLocaleString() ?? 0} icon={Eye} color="bg-blue-50 text-blue-600" />
            <MetricCard label="Total Likes" value={totals?.totalLikes?.toLocaleString() ?? 0} icon={Heart} color="bg-rose-50 text-rose-600" />
            <MetricCard label="Pending Comments" value={pendingComments.length} icon={MessageSquare} color="bg-amber-50 text-amber-600" />
            <MetricCard label="Subscribers" value={subscriberCount} icon={Users} color="bg-emerald-50 text-emerald-600" />
          </>
        )}
      </div>

      {/* Post stats bar */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-zinc-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-zinc-900">{published}</p>
            <p className="text-sm text-zinc-500">Published posts</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold text-zinc-400">{drafts}</p>
            <p className="text-sm text-zinc-400">Drafts</p>
          </div>
        </div>
        <Link href="/dashboard/posts/new"
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 flex items-center gap-4 hover:from-blue-700 hover:to-indigo-700 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-white">Write a post</p>
            <p className="text-sm text-blue-200">Open the editor</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top posts */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-zinc-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
            <div className="flex items-center gap-2 font-semibold text-zinc-900">
              <TrendingUp className="h-4 w-4 text-blue-500" /> Top Posts
            </div>
            <Link href="/dashboard/posts" className="text-xs text-blue-600 hover:underline">See all</Link>
          </div>
          <div className="divide-y divide-zinc-50">
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-4 flex justify-between">
                <Skeleton className="h-4 w-48" /><Skeleton className="h-4 w-16" />
              </div>
            )) : topPosts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-zinc-400 text-center">No views tracked yet.</p>
            ) : topPosts.map((p, i) => (
              <div key={p.slug} className="px-6 py-3.5 flex items-center gap-4">
                <span className="text-xs font-bold text-zinc-300 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <Link href={`/blog/${p.slug}`} target="_blank"
                    className="text-sm font-medium text-zinc-800 hover:text-blue-600 truncate block transition-colors">
                    {getPostTitle(p.slug)}
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400 shrink-0">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{p.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{p.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending comments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
            <div className="flex items-center gap-2 font-semibold text-zinc-900">
              <MessageSquare className="h-4 w-4 text-amber-500" /> Pending Comments
            </div>
            <Link href="/dashboard/comments" className="text-xs text-blue-600 hover:underline">See all</Link>
          </div>
          <div className="divide-y divide-zinc-50">
            {loading ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-6 py-4 space-y-2">
                <Skeleton className="h-3 w-32" /><Skeleton className="h-3 w-full" />
              </div>
            )) : pendingComments.length === 0 ? (
              <p className="px-6 py-8 text-sm text-zinc-400 text-center">No pending comments 🎉</p>
            ) : pendingComments.slice(0, 5).map((c) => (
              <div key={c.id} className="px-6 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-700">{c.author}</span>
                  <span className="text-[10px] text-zinc-400">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">{c.content}</p>
                <p className="text-[10px] text-zinc-400 truncate">on: {getPostTitle(c.slug)}</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => handleApprove(c.slug, c.id)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors">
                    <CheckCircle className="h-3 w-3" /> Approve
                  </button>
                  <button onClick={() => handleDelete(c.slug, c.id)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors">
                    <XCircle className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent posts */}
      <div className="mt-6 bg-white rounded-2xl border border-zinc-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2 font-semibold text-zinc-900">
            <Clock className="h-4 w-4 text-zinc-400" /> Recent Posts
          </div>
          <Link href="/dashboard/posts" className="text-xs text-blue-600 hover:underline">See all</Link>
        </div>
        <div className="divide-y divide-zinc-50">
          {allPosts.slice(0, 6).map((post) => (
            <div key={post.slug} className="px-6 py-3.5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${post.published ? "bg-emerald-500" : "bg-zinc-300"}`} />
                  <Link href={`/blog/${post.slug}`} target="_blank"
                    className="text-sm font-medium text-zinc-800 hover:text-blue-600 truncate block">
                    {post.title || "Untitled"}
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-0.5 pl-3.5">
                  {post.category && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500">
                      {CATEGORY_LABELS[post.category as PostCategory] ?? post.category}
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400">{formatDate(post.date)}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={`/blog/${post.slug}`} target="_blank"
                  className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors">
                  View
                </a>
                <Link href={`/dashboard/posts/${post.slug}/edit`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
