import { getSeriesBySlug } from "@/lib/firestore/series-crud"
import { getPostBySlug } from "@/lib/firestore/posts-crud"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import SeriesPageClient from "@/components/blog/SeriesPageClient"
import type { Post } from "@/lib/firestore/posts-crud"

export const revalidate = 3600

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) return { title: "Not Found" }
  const url = `https://www.agilecoder.in/blog/series/${series.slug}`
  const image = series.coverImage ?? "https://www.agilecoder.in/default-og.jpg"
  return {
    title: `${series.title} | AgileCoder`,
    description: series.description,
    alternates: { canonical: url },
    openGraph: { title: series.title, description: series.description, url, images: [image] },
    twitter: { card: "summary_large_image", title: series.title, description: series.description, images: [image] },
  }
}

export default async function SeriesDetailPage({ params }: Params) {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)
  if (!series || !series.published) return notFound()

  const postSlugs = series.items
    .filter((i) => i.type === "post" && i.postSlug)
    .map((i) => i.postSlug as string)

  const postResults = await Promise.all(postSlugs.map((s) => getPostBySlug(s)))
  const posts: Post[] = postResults.filter((p): p is Post => p !== null)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Breadcrumb — same as blog post page */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
          <span>/</span>
          <Link href="/blog/series" className="hover:text-white transition-colors">
            Learning Paths
          </Link>
        </div>

        {/* Header — title first, consistent with blog post page */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-violet-500/30 text-violet-400 bg-violet-500/10 mb-4">
            <BookOpen className="h-3 w-3" /> Learning Path
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {series.title}
          </h1>

          {series.description && (
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{series.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
            <span>{series.postCount} articles in this series</span>
          </div>
        </div>

        {/* Cover image — after header, same as blog post page */}
        {series.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-zinc-800">
            <img src={series.coverImage} alt={series.title} className="w-full h-auto" />
          </div>
        )}

        {/* Progress tracking + items list */}
        <SeriesPageClient series={series} posts={posts} />

        {/* Back link — same as blog post page */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link href="/blog/series" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> All learning paths
          </Link>
        </div>
      </div>
    </div>
  )
}
