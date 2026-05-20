import { getPublishedSeries } from "@/lib/firestore/series-crud"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Learning Paths - AgileCoder",
  description: "Curated article series to take you from zero to confident on key engineering topics.",
}

export default async function SeriesListPage() {
  const series = await getPublishedSeries()

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero — same structure as /blog */}
      <div className="border-b border-zinc-800 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-5">
              Learning Paths
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Curated series.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Structured sequences that take you from zero to confident on specific topics. Work through them in order.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-10">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Learning Paths</span>
        </div>

        {series.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <BookOpen className="h-10 w-10 mx-auto mb-4 opacity-30" />
            <p>No learning paths published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/blog/series/${s.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-video bg-gradient-to-br from-violet-600/20 to-cyan-600/20 overflow-hidden">
                  {s.coverImage ? (
                    <img
                      src={s.coverImage}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-violet-400/30" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-zinc-500 mb-2">{s.postCount} articles</span>
                  <h2 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                    {s.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">{s.description}</p>
                  <div className="flex items-center justify-end mt-4">
                    <span className="text-xs text-zinc-600 group-hover:text-violet-400 flex items-center gap-1 transition-colors">
                      Start learning <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
