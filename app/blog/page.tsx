import { getPublishedPosts } from "@/lib/firestore/posts-crud"
import { getAllCategories } from "@/lib/firestore/categories"
import Link from "next/link"
import { formatDate } from "@/utils/formatDate"
import { Clock, Eye, Tag } from "lucide-react"
import { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog — AgileCoder",
  description: "Tutorials, guides, and deep-dives for developers. Web dev, backend, DevOps, system design and more.",
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const [posts, categories] = await Promise.all([
    getPublishedPosts({ category }),
    getAllCategories(),
  ])

  const featured = !category ? posts.filter((p) => p.featured).slice(0, 1)[0] : null
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts

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
        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !category
                ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            All posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat.slug
                  ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
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
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold">Featured</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                {featured.category && (
                  <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    {categories.find((c) => c.slug === featured.category)?.icon}{" "}
                    {categories.find((c) => c.slug === featured.category)?.name}
                  </span>
                )}
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{formatDate(featured.date)}</span>
                  {featured.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readingTime} min</span>}
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{featured.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        {rest.length === 0 || (!category && posts.length < 3) ? (
          <div className="text-center py-20 text-zinc-600">
            {category ? (
              <p className="text-lg">No posts yet in this category.</p>
            ) : (
              <div>
                <p className="text-lg mb-3">First posts shipping soon.</p>
                <p className="text-sm">
                  <a href="#newsletter" className="text-cyan-400 hover:underline">Subscribe to the newsletter</a>{" "}
                  to know when they go live.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => {
              const cat = categories.find((c) => c.slug === post.category)
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="aspect-video bg-zinc-800 overflow-hidden relative">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
                        <span className="text-3xl opacity-40">{cat?.icon ?? "📝"}</span>
                      </div>
                    )}
                    {post.difficulty && (
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${DIFFICULTY_COLORS[post.difficulty]}`}>
                        {post.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {cat && (
                      <span className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: cat.color }}>
                        {cat.icon} {cat.name}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span>{formatDate(post.date)}</span>
                      {post.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}m</span>}
                      <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
