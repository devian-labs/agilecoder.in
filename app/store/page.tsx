import { Metadata } from "next"
import { getGumroadProducts } from "@/lib/gumroad"
import { books } from "@/data/books"
import StoreClient, { type StoreProduct } from "@/components/store/StoreClient"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Store | AgileCoder",
  description: "Books, boilerplates, and tools from AgileCoder — real products from a working software studio.",
}

export default async function StorePage() {
  const gumroadProducts = await getGumroadProducts()

  const products: StoreProduct[] = [
    ...books.map((book) => ({
      id: book.id,
      name: book.title,
      price: 0,
      formattedPrice: "Free",
      thumbnail: book.coverImage ?? null,
      url: book.links.find((l) => l.primary)?.url ?? book.links[0]?.url ?? "#",
      category: "book" as const,
      featured: book.featured,
    })),
    ...gumroadProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      formattedPrice: p.formatted_price,
      thumbnail: p.thumbnail_url,
      url: p.short_url,
      category: "code" as const,
      featured: false,
    })),
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Hero */}
      <div className="border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 py-14">
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

      <StoreClient products={products} />
    </div>
  )
}
