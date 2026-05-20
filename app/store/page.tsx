import { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Code2, ArrowRight, ExternalLink } from "lucide-react"
import { books } from "@/data/books"
import { publishedBoilerplates, upcomingBoilerplates } from "@/data/boilerplates"

export const metadata: Metadata = {
  title: "Store | AgileCoder",
  description: "Books, boilerplates, and tools from AgileCoder - real products from a working software studio.",
}

const featuredBook = books.find((b) => b.featured)

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">

      {/* ── Page header ── */}
      <div className="border-b border-zinc-800/60 bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-6">
            AgileCoder Store
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Books, boilerplates, and tools.
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Real products from a working software studio. Built and used by the team at Devian Labs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* ── Books ── */}
        <section className="py-14 border-b border-zinc-800/60">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Books & Guides</h2>
          </div>

          {featuredBook ? (
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Cover */}
              <div className="shrink-0 w-44 md:w-52">
                <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800">
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium mb-3">
                  Featured
                </span>
                <h3 className="text-2xl font-bold text-white mb-1 leading-snug">{featuredBook.title}</h3>
                <p className="text-sm text-zinc-500 mb-4">by Smruti R. Badatya</p>
                <p className="text-zinc-400 mb-5 leading-relaxed">{featuredBook.description}</p>

                <div className="flex flex-wrap gap-3">
                  {featuredBook.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        link.primary
                          ? "border border-amber-500/35 text-amber-400 bg-amber-500/[0.08] hover:border-amber-400/65 hover:bg-amber-500/[0.14]"
                          : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600"
                      }`}
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-zinc-700 rounded-2xl p-10 text-center text-zinc-600">
              <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">First book dropping soon.</p>
            </div>
          )}

          <div className="mt-8 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-500 max-w-lg">
            More books in progress.{" "}
            <Link href="/#newsletter" className="text-cyan-400 hover:underline transition-colors">
              Subscribe to the newsletter
            </Link>{" "}
            to know when they ship.
          </div>
        </section>

        {/* ── Boilerplates ── */}
        <section className="py-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Code2 className="h-4 w-4 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Boilerplates & Starter Kits</h2>
          </div>
          <p className="text-zinc-400 mb-8 max-w-2xl leading-relaxed">
            Production-ready scaffolds built so AI agents can extend them without breaking them.
            Hosted on <span className="text-white font-medium">BUILD by Devian Labs</span>.
          </p>

          <div className="space-y-3 max-w-3xl mb-6">
            {/* Published */}
            {publishedBoilerplates.map((bp) => (
              <a
                key={bp.title}
                href={bp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between rounded-2xl border border-emerald-500/20 bg-zinc-900/60 p-5 hover:border-emerald-500/40 hover:bg-zinc-800/60 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="font-bold text-white group-hover:text-emerald-300 transition-colors">{bp.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium shrink-0">
                      Available
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3 leading-relaxed">{bp.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {bp.stack.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{s}</span>
                    ))}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-4 mt-1" />
              </a>
            ))}

            {/* Upcoming */}
            {upcomingBoilerplates.map((bp) => (
              <div
                key={bp.title}
                className="flex items-start justify-between rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-5 opacity-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="font-medium text-zinc-400">{bp.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700 font-medium shrink-0">
                      Coming soon
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {bp.stack.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-600 border border-zinc-800">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://devianlabs.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Browse all on BUILD by Devian Labs <ArrowRight className="h-4 w-4" />
          </a>
        </section>

      </div>
    </div>
  )
}
