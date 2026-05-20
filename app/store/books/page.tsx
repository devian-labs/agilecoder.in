import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { books } from "@/data/books"

export const metadata: Metadata = {
  title: "Books & Guides | AgileCoder Store",
  description: "Practical developer books and guides from AgileCoder.",
  openGraph: {
    title: "Books & Guides | AgileCoder Store",
    description: "Practical developer books and guides from AgileCoder.",
    url: "https://www.agilecoder.in/store/books",
    siteName: "AgileCoder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Books & Guides | AgileCoder Store",
    description: "Practical developer books and guides from AgileCoder.",
    creator: "@agilecoder_in",
  },
}

export default function BooksPage() {
  const featuredBook = books.find((b) => b.featured)
  const otherBooks = books.filter((b) => !b.featured)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">

          <div className="mb-10">
            <Link
              href="/store"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Store
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Books & Guides</h1>
            <p className="text-muted-foreground">
              Practical books written by developers who&apos;ve shipped real products.
            </p>
          </div>

          {/* Featured Book */}
          {featuredBook && (
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20 mb-24 max-w-5xl">
              {/* 3D book cover */}
              <div className="relative w-[240px] md:w-[280px] lg:w-[320px] aspect-[2/3] flex-shrink-0">
                <div
                  className="w-full h-full rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
                  style={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="rounded-r-md rounded-l-sm w-full h-full object-cover bg-muted"
                  />
                  <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent rounded-l-sm pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 h-4 bg-black/15 blur-xl rounded-full" />
              </div>

              {/* Details */}
              <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">
                  Featured Book
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-5 leading-tight">
                  {featuredBook.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {featuredBook.description}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  {featuredBook.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 h-11 px-7 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                        link.primary
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Books */}
          {otherBooks.length > 0 && (
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-center mb-10">More Books</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherBooks.map((book) => (
                  <div key={book.id} className="group flex flex-col items-center">
                    <div className="w-[160px] aspect-[2/3] mb-5 shadow-lg rounded-lg overflow-hidden transition-transform group-hover:-translate-y-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover bg-muted"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">{book.title}</h3>
                    <div className="flex gap-3">
                      {book.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter strip */}
        <section className="bg-muted/30 py-16 border-t border-border">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Get discount codes</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe and receive exclusive discount codes for all our books on Gumroad.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
