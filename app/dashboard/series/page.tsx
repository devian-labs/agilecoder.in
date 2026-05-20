"use client"

import { useEffect, useState } from "react"
import { getAllSeriesAdmin } from "@/lib/firestore/series-crud"
import type { Series } from "@/lib/firestore/series-crud"
import Link from "next/link"
import { Plus, BookOpen, Pencil, Eye, EyeOff } from "lucide-react"

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-zinc-100 rounded ${className}`} />
}

export default function DashboardSeriesPage() {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllSeriesAdmin()
      .then(setSeries)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Learning Paths</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {loading ? "Loading…" : `${series.length} series total`}
          </p>
        </div>
        <Link
          href="/dashboard/series/new/edit"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Series
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-zinc-50">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-48" />
                <Skeleton className="h-3 w-72" />
              </div>
              <Skeleton className="h-7 w-16 rounded-lg" />
            </div>
          ))
        ) : series.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-zinc-400">
            <BookOpen className="h-8 w-8 opacity-30" />
            <p className="text-sm">No series yet.</p>
            <Link href="/dashboard/series/new/edit" className="text-sm text-blue-600 hover:underline">
              Create your first learning path →
            </Link>
          </div>
        ) : (
          series.map((s) => (
            <div key={s.slug} className="flex items-center gap-4 px-6 py-4 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-100 flex items-center justify-center">
                {s.coverImage ? (
                  <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="h-5 w-5 text-zinc-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-zinc-800 truncate">{s.title}</span>
                  {s.published ? (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      <Eye className="h-2.5 w-2.5" /> Published
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-500">
                      <EyeOff className="h-2.5 w-2.5" /> Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 truncate">{s.description}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{s.postCount} articles</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {s.published && (
                  <Link
                    href={`/blog/series/${s.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 transition-colors"
                    title="View public page"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                )}
                <Link
                  href={`/dashboard/series/${s.slug}/edit`}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-medium hover:bg-zinc-200 transition-colors"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
