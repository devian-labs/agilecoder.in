import { Metadata } from "next"
import { ExternalLink, BookOpen, Code2, ShoppingBag, Tag, ArrowRight } from "lucide-react"
import { getGumroadProducts } from "@/lib/gumroad"
import { books } from "@/data/books"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Store | AgileCoder",
  description: "Books, boilerplates, and tools from AgileCoder — real products from a working software studio.",
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim()
}

export default async function StorePage() {
  const gumroadProducts = await getGumroadProducts()

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">

      {/* Hero */}
      <div className="border-b border-zinc-800/60 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-5">
              Store
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Books, boilerplates, and tools.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Real products from a working software studio. Built and used by the team at Devian Labs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Written ── */}
        <section className="py-14 border-b border-zinc-800/60">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Written</h2>
          </div>
          <p className="text-zinc-500 text-sm mb-8 ml-12">Books, PDFs, and guides.</p>

          {books.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-600">
              <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">First book dropping soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-gradient-to-br from-amber-600/20 to-orange-600/20 overflow-hidden relative">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-amber-400/30" />
                      </div>
                    )}
                    {book.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1 mb-4">
                      {book.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {book.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                            link.primary
                              ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400/50"
                              : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                          }`}
                        >
                          {link.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Code ── */}
        <section className="py-14 border-b border-zinc-800/60">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Code2 className="h-4 w-4 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Code</h2>
          </div>
          <p className="text-zinc-500 text-sm mb-8 ml-12">Boilerplates, starter kits, and templates. Hosted on Gumroad.</p>

          {gumroadProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-600">
              <Code2 className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm mb-3">No products available yet.</p>
              <a
                href="https://devianlabs.gumroad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Browse on Gumroad <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gumroadProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/30 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 overflow-hidden relative">
                    {product.thumbnail_url ? (
                      <img
                        src={product.thumbnail_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="h-10 w-10 text-emerald-400/30" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-white text-xs font-bold backdrop-blur-sm border border-zinc-700/60">
                        {product.price === 0 ? "Free" : product.formatted_price}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1 mb-4">
                        {stripHtml(product.description).slice(0, 200)}
                      </p>
                    )}
                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                            <Tag className="h-2.5 w-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <span className="text-xs text-zinc-600">
                        {product.sales_count > 0 ? `${product.sales_count} sold` : ""}
                      </span>
                      <span className="text-xs text-zinc-600 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                        Get on Gumroad <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ── Merch ── */}
        <section className="py-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-4 w-4 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Merch</h2>
          </div>
          <p className="text-zinc-500 text-sm mb-8 ml-12">T-shirts, mugs, and more.</p>

          <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center text-zinc-600">
            <ShoppingBag className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium mb-1">Coming soon.</p>
            <p className="text-xs">Merch drop in the works.</p>
          </div>
        </section>

      </div>
    </div>
  )
}
