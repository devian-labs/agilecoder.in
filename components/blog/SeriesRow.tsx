"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"
import type { Series } from "@/lib/firestore/series-crud"

function getProgress(slug: string, postCount: number): number {
  if (typeof window === "undefined" || postCount === 0) return 0
  try {
    const raw = localStorage.getItem(`ac_series_${slug}`)
    const read: string[] = raw ? JSON.parse(raw) : []
    return Math.round((read.length / postCount) * 100)
  } catch {
    return 0
  }
}

function SeriesCard({ s }: { s: Series }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(getProgress(s.slug, s.postCount))
  }, [s.slug, s.postCount])

  return (
    <Link
      href={`/blog/series/${s.slug}`}
      className="group flex-shrink-0 w-72 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Cover */}
      <div className="h-32 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 relative overflow-hidden">
        {s.coverImage ? (
          <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-violet-400/40" />
          </div>
        )}
        {/* Progress overlay */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-zinc-500">{s.postCount} articles</span>
          {progress > 0 && (
            <span className={`text-xs font-semibold ${progress === 100 ? "text-emerald-400" : "text-violet-400"}`}>
              {progress === 100 ? "Complete" : `${progress}%`}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-white mb-1 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
          {s.title}
        </h3>
        <p className="text-xs text-zinc-500 line-clamp-2 flex-1">{s.description}</p>
        <div className="flex items-center justify-end mt-3">
          <span className="text-xs text-zinc-600 group-hover:text-violet-400 flex items-center gap-1 transition-colors">
            {progress > 0 ? "Continue" : "Start"} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

interface Props {
  series: Series[]
}

export default function SeriesRow({ series }: Props) {
  if (series.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">Learning Paths</h2>
          <p className="text-sm text-zinc-500">Curated sequences to take you from zero to confident</p>
        </div>
        <Link href="/blog/series" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
          All paths <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {series.map((s) => (
          <SeriesCard key={s.slug} s={s} />
        ))}
      </div>
    </div>
  )
}
