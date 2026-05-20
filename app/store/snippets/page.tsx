import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Code2, ExternalLink, Terminal } from "lucide-react"

export const metadata: Metadata = {
  title: "Code Snippets & Boilerplates | AgileCoder Store",
  description: "Production-ready starter kits, boilerplates, and reusable code packages.",
}

// Seed from existing Gumroad products — add more as they're created
const snippets: {
  title: string
  description: string
  price: string
  href: string
  badge?: string
  tags?: string[]
}[] = [
  {
    title: "node-ts-starter",
    description: "Production-ready boilerplate for TypeScript and Node.js with Express, Jest, ESLint, and Docker.",
    price: "Free",
    href: "https://agilecoder.gumroad.com/l/node-ts-starter",
    badge: "Popular",
    tags: ["Node.js", "TypeScript", "Express"],
  },
]

export default function SnippetsPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-3">
          <Link href="/store" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Store
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Code Snippets & Boilerplates</h1>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Skip the setup. Start with production-ready starters and reusable code packages built for real-world use.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {snippets.map((snippet) => (
            <a
              key={snippet.href}
              href={snippet.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border rounded-2xl p-6 bg-card hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Terminal className="h-5 w-5 text-muted-foreground" />
                </div>
                {snippet.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {snippet.badge}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold font-mono mb-1.5 group-hover:text-primary transition-colors">{snippet.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{snippet.description}</p>
              </div>
              {snippet.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {snippet.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-border">
                <span className="font-bold text-primary">{snippet.price}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Get it <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
