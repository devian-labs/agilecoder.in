import { getPublishedPosts } from "@/lib/firestore/posts-crud"
import { getAllCategories } from "@/lib/firestore/categories"
import { getPublishedSeries } from "@/lib/firestore/series-crud"
import { Metadata } from "next"
import ExploreClient from "@/components/blog/ExploreClient"
import SeriesRow from "@/components/blog/SeriesRow"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog - AgileCoder",
  description: "Tutorials, guides, and deep-dives for developers. Web dev, backend, DevOps, system design and more.",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const [posts, categories, series] = await Promise.all([
    getPublishedPosts(),
    getAllCategories(),
    getPublishedSeries(),
  ])

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="border-b border-zinc-800 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-5">
              Blog
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Tutorials and deep-dives.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Practical writing on web development, system design, AI tooling, and the craft of shipping software.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Learning paths row */}
        <SeriesRow series={series} />

        {/* Explore client - handles search, sort, filter, pagination */}
        <ExploreClient
          posts={posts}
          categories={categories}
          initialCategory={category ?? ""}
        />
      </div>
    </div>
  )
}
