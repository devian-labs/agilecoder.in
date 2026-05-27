import { getPublishedPosts } from "@/lib/firestore/posts-crud"
import { getGumroadProducts } from "@/lib/gumroad"
import { FEATURED_VIDEOS } from "@/data/videos"
import Link from "next/link"
import { formatDate } from "@/utils/formatDate"
import {
  ArrowRight, Clock, Eye, Code2, PlayCircle, BookOpen,
  Package, FileText, ExternalLink, Play,
} from "lucide-react"
import { HomeNewsletter } from "@/components/HomeNewsletter"

export const revalidate = 3600

const OFFERINGS = [
  {
    icon: PlayCircle,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "Video Tutorials",
    body: "Walkthroughs, project builds, and code-alongs on the AgileCoder YouTube channel.",
    cta: "Watch on YouTube →",
    href: "https://www.youtube.com/@AgileCoderYT",
    external: true,
  },
  {
    icon: FileText,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    title: "Written Tutorials & Deep-Dives",
    body: "Practical guides on web development, system design, and the craft of shipping software.",
    cta: "Read the blog →",
    href: "/blog",
    external: false,
  },
  {
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "Books",
    body: "Field guides for working developers. The AI Toolkit for Modern Developers is available now on Amazon Kindle.",
    cta: "Browse books →",
    href: "/store",
    external: false,
  },
  {
    icon: Package,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    title: "Boilerplates & Starter Kits",
    body: "Production-ready scaffolds built so AI agents can extend them without breaking them. Hosted on BUILD by Devian Labs.",
    cta: "Get a boilerplate →",
    href: "https://devianlabs.gumroad.com",
    external: true,
  },
]

export default async function HomePage() {
  const [recent, gumroadProducts] = await Promise.all([
    getPublishedPosts({ limitN: 3 }).catch(() => []),
    getGumroadProducts(),
  ])
  const latestBoilerplates = gumroadProducts.slice(0, 3)

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_30%,transparent_100%)]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[100px] -top-48 -right-32 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px] -bottom-40 -left-24 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-cyan-500/25 text-cyan-400 bg-cyan-500/[0.07] mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring flex-shrink-0" />
                By Devian Labs
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Learn. Build.{" "}
                <span className="bg-[linear-gradient(90deg,#fff_0%,#67e8f9_25%,#c084fc_55%,#fff_80%,#67e8f9_100%)] bg-[size:250%_auto] bg-clip-text text-transparent animate-shimmer">
                  Ship.
                </span>
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                AgileCoder is where Devian Labs shares what it builds. Tutorials,
                deep-dives, books, and production-ready boilerplates - for developers
                who get things done by actually shipping.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@AgileCoderYT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-cyan-500/35 text-cyan-400 bg-cyan-500/[0.08] hover:border-cyan-400/65 hover:bg-cyan-500/[0.14] hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] transition-all duration-300"
                >
                  Watch on YouTube <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300"
                >
                  Read the Blog
                </Link>
              </div>
            </div>

            {/* Decorative terminal panel */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-zinc-600 text-xs font-mono">agilecoder.in</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <p className="text-zinc-600 mb-1"># what we do here</p>
                  <p><span className="text-cyan-400">const</span> <span className="text-white">mission</span> <span className="text-zinc-500">= {`{`}</span></p>
                  <p className="ml-4"><span className="text-violet-400">write</span><span className="text-zinc-500">:</span> <span className="text-amber-300">&quot;tutorials &amp; deep-dives&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="ml-4"><span className="text-violet-400">build</span><span className="text-zinc-500">:</span> <span className="text-amber-300">&quot;books &amp; boilerplates&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="ml-4"><span className="text-violet-400">ship</span><span className="text-zinc-500">:</span> <span className="text-amber-300">&quot;things that actually work&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="ml-4"><span className="text-violet-400">by</span><span className="text-zinc-500">:</span> <span className="text-emerald-400">&quot;Devian Labs&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="text-zinc-500">{`}`}</p>
                  <p className="mt-4 text-zinc-600"># from the studio</p>
                  <p><span className="text-cyan-400">export</span> <span className="text-white">default</span> <span className="text-violet-400">mission</span></p>
                  <p className="mt-4 text-emerald-400 animate-pulse">▋</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What you'll find here ── */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-5">
              What you&apos;ll find here
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Four things we make.</h2>
            <p className="text-zinc-500">Pick the format that works for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {OFFERINGS.map(({ icon: Icon, color, bg, border, title, body, cta, href, external }) => (
              <div key={title} className={`group rounded-2xl border ${border} bg-zinc-900/60 p-6 hover:bg-zinc-800/60 transition-all duration-300`}>
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{body}</p>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className={`text-sm font-semibold ${color} hover:underline inline-flex items-center gap-1`}>
                    {cta} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link href={href} className={`text-sm font-semibold ${color} hover:underline`}>
                    {cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From the Channel ── */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-4">
                From the channel
              </div>
              <h2 className="text-3xl font-bold text-white">Latest videos.</h2>
              <p className="text-zinc-500 mt-2">Project walkthroughs, tech explainers, and behind-the-build content from the studio.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {FEATURED_VIDEOS.map((video) => (
              <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} width={640} height={360}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-mono">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-600">{video.views} views</p>
                </div>
              </a>
            ))}
          </div>

          <a href="https://www.youtube.com/@AgileCoderYT" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Subscribe on YouTube <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Latest Articles ── */}
      {recent.length > 0 && (
        <section className="border-t border-zinc-800/60 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-4">
                  Latest articles
                </div>
                <h2 className="text-3xl font-bold text-white">Fresh off the press.</h2>
              </div>
              <Link href="/blog" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-violet-500/30 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="aspect-video bg-zinc-800 overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} width={640} height={360}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
                        <Code2 className="h-10 w-10 text-zinc-600" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span>{formatDate(post.date)}</span>
                      {post.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}m</span>}
                      <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Boilerplates ── */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-emerald-500/25 text-emerald-400 bg-emerald-500/[0.07] mb-6">
            Build by Devian Labs
          </div>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
                Production-ready scaffolds for AI-assisted development.
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-2xl">
                Boilerplates built so AI agents can extend them without breaking them.
                Opinionated folder structures, typed APIs, and design patterns that hold up under iteration.
              </p>
            </div>
            <Link href="/store" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors shrink-0 ml-6">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {latestBoilerplates.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {latestBoilerplates.map((product) => (
                <a key={product.id} href={product.short_url} target="_blank" rel="noopener noreferrer"
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="aspect-square bg-zinc-800 overflow-hidden relative">
                    {product.thumbnail_url ? (
                      <img src={product.thumbnail_url} alt={product.name} width={300} height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="h-10 w-10 text-zinc-700" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 text-white text-xs font-bold backdrop-blur-sm">
                        {product.price === 0 ? "Free" : product.formatted_price}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500 group-hover:text-emerald-400 flex items-center gap-1 transition-colors ml-auto">
                      Get on Gumroad <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-600">
              <Code2 className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Boilerplates coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-6">
            Newsletter
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Behind-the-build, in your inbox.
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            New tutorials, book updates, and behind-the-scenes notes from the studio.
            Sent when there&apos;s something worth sending - no schedule, no spam.
          </p>
          <HomeNewsletter />
        </div>
      </section>

    </main>
  )
}
