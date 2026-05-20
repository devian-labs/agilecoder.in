import { getPostBySlug, getRelatedPosts } from "@/lib/firestore/posts-crud"
import { getAllCategories } from "@/lib/firestore/categories"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, Eye } from "lucide-react"
import { formatDate } from "@/utils/formatDate"
import { ViewCounter } from "@/components/blog/ViewCounter"
import { LikeButton } from "@/components/blog/LikeButton"
import { Comments } from "@/components/blog/Comments"
import { NewsletterStrip } from "@/components/blog/NewsletterStrip"
import { AuthorBio } from "@/components/blog/AuthorBio"
import { ShareButton } from "@/components/ShareButton"
import PostContent from "@/components/blog/PostContent"
import { CodeWidget } from "@/components/blog/CodeWidget"

export const revalidate = 3600

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }
  const url = `https://www.agilecoder.in/blog/${post.slug}`
  const image = post.coverImage ?? "https://www.agilecoder.in/default-og.jpg"
  return {
    title: `${post.title} | AgileCoder`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.excerpt, url, images: [image], type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  }
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  intermediate: { label: "Intermediate", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  advanced: { label: "Advanced", color: "bg-red-500/10 text-red-400 border border-red-500/20" },
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || !post.published) return notFound()

  const [categories, related] = await Promise.all([
    getAllCategories(),
    getRelatedPosts(post.slug, post.category, post.tags),
  ])
  const cat = categories.find((c) => c.slug === post.category)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
          {cat && (
            <>
              <span>/</span>
              <Link href={`/blog?category=${cat.slug}`} className="hover:text-white transition-colors" style={{ color: cat.color }}>
                {cat.icon} {cat.name}
              </Link>
            </>
          )}
        </div>

        {/* Header */}
        <div className="mb-10">
          {post.difficulty && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${DIFFICULTY_LABELS[post.difficulty]?.color}`}>
              {DIFFICULTY_LABELS[post.difficulty]?.label}
            </span>
          )}

          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

          {post.excerpt && (
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{post.excerpt}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(post.date)}
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readingTime} min read
              </div>
            )}
            <ViewCounter slug={post.slug} />
            <div className="ml-auto flex items-center gap-3">
              <LikeButton slug={post.slug} />
              <ShareButton title={post.title} />
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-mono">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-zinc-800">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        {/* Interactive code widget — shown before article body */}
        {post.codeWidget && (
          <CodeWidget
            code={post.codeWidget.code}
            runtime={post.codeWidget.runtime}
            height={post.codeWidget.height}
          />
        )}

        {/* Ad slot — top of content */}
        <div className="mb-8 rounded-xl border border-dashed border-zinc-700 p-4 text-center text-zinc-600 text-xs">
          {/* Google AdSense slot — insert ad unit code here */}
          Advertisement
        </div>

        {/* Content */}
        <PostContent html={post.content} />

        {/* Ad slot — bottom of content */}
        <div className="mt-10 mb-6 rounded-xl border border-dashed border-zinc-700 p-4 text-center text-zinc-600 text-xs">
          Advertisement
        </div>

        {/* Like + share */}
        <div className="flex items-center gap-4 py-8 border-y border-zinc-800">
          <LikeButton slug={post.slug} />
          <ShareButton title={post.title} />
        </div>

        {/* Author */}
        <div className="py-8 border-b border-zinc-800">
          <AuthorBio author={post.author} />
        </div>

        {/* Newsletter */}
        <NewsletterStrip />

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-white mb-6">Related posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => {
                const relCat = categories.find((c) => c.slug === p.category)
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/30 transition-all p-4">
                    {p.coverImage && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    {relCat && <span className="text-xs font-semibold" style={{ color: relCat.color }}>{relCat.icon} {relCat.name}</span>}
                    <p className="text-sm font-semibold text-white mt-1 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">{p.title}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mt-12">
          <Comments slug={post.slug} />
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link href="/blog" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> All posts
          </Link>
        </div>
      </div>
    </div>
  )
}
