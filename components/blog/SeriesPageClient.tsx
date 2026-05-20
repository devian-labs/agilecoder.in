"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Circle, ArrowRight, BookOpen } from "lucide-react"
import type { Series, SeriesItem } from "@/lib/firestore/series-crud"
import type { Post } from "@/lib/firestore/posts-crud"

interface Props {
  series: Series
  posts: Post[]
}

function getReadSlugs(seriesSlug: string): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(`ac_series_${seriesSlug}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function markRead(seriesSlug: string, postSlug: string) {
  const read = getReadSlugs(seriesSlug)
  if (!read.includes(postSlug)) {
    localStorage.setItem(`ac_series_${seriesSlug}`, JSON.stringify([...read, postSlug]))
  }
}

function markUnread(seriesSlug: string, postSlug: string) {
  const read = getReadSlugs(seriesSlug).filter((s) => s !== postSlug)
  localStorage.setItem(`ac_series_${seriesSlug}`, JSON.stringify(read))
}

export default function SeriesPageClient({ series, posts }: Props) {
  const [readSlugs, setReadSlugs] = useState<string[]>([])

  useEffect(() => {
    setReadSlugs(getReadSlugs(series.slug))
  }, [series.slug])

  function toggle(postSlug: string) {
    if (readSlugs.includes(postSlug)) {
      markUnread(series.slug, postSlug)
    } else {
      markRead(series.slug, postSlug)
    }
    setReadSlugs(getReadSlugs(series.slug))
  }

  const postMap = new Map(posts.map((p) => [p.slug, p]))
  const progress = series.postCount > 0
    ? Math.round((readSlugs.length / series.postCount) * 100)
    : 0

  let postIndex = 0

  return (
    <div>
      {/* Progress bar */}
      {series.postCount > 0 && (
        <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Your progress</span>
            <span className={`text-sm font-bold ${progress === 100 ? "text-emerald-400" : "text-violet-400"}`}>
              {progress === 100 ? "Complete!" : `${readSlugs.length} / ${series.postCount} articles`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 0 && (
            <p className="text-xs text-zinc-500 mt-2">Check off articles as you read them to track your progress.</p>
          )}
        </div>
      )}

      {/* Items */}
      <div className="space-y-3">
        {series.items.map((item: SeriesItem, idx: number) => {
          if (item.type === "text") {
            return (
              <div key={idx} className="px-4 py-3">
                <p className="text-sm text-zinc-400 leading-relaxed">{item.content}</p>
              </div>
            )
          }

          const post = item.postSlug ? postMap.get(item.postSlug) : undefined
          const isRead = item.postSlug ? readSlugs.includes(item.postSlug) : false
          postIndex += 1
          const currentIndex = postIndex

          return (
            <div
              key={idx}
              className={`group rounded-2xl border transition-all duration-200 ${
                isRead
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30"
              }`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Step number / check */}
                <button
                  onClick={() => item.postSlug && toggle(item.postSlug)}
                  className="shrink-0 mt-0.5 transition-colors"
                  title={isRead ? "Mark as unread" : "Mark as read"}
                >
                  {isRead ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-600 mb-1 block">
                    Step {currentIndex}
                  </span>
                  {post ? (
                    <Link href={`/blog/${post.slug}`} className="group/link">
                      <h3 className={`text-sm font-bold leading-snug mb-1 group-hover/link:text-violet-300 transition-colors ${isRead ? "text-zinc-400" : "text-white"}`}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
                        {post.readingTime && <span>{post.readingTime} min read</span>}
                        {post.difficulty && <span className="capitalize">{post.difficulty}</span>}
                      </div>
                    </Link>
                  ) : (
                    <p className="text-sm text-zinc-500 italic">Post not available</p>
                  )}
                </div>

                {post && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="shrink-0 p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {series.items.length === 0 && (
        <div className="text-center py-16 text-zinc-600">
          <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No articles in this series yet.</p>
        </div>
      )}
    </div>
  )
}
