import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "Merch | AgileCoder Store",
  description: "Developer-themed apparel and accessories from AgileCoder.",
}

export default function MerchPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-3">
          <Link href="/store" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Store
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Merch</h1>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Developer-themed apparel and accessories. Wear your craft.
        </p>

        <div className="border border-dashed border-border rounded-2xl p-12 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h2 className="text-lg font-semibold mb-2">Merch dropping soon</h2>
          <p className="text-sm text-muted-foreground">
            We&apos;re designing the first collection. Follow{" "}
            <a
              href="https://www.youtube.com/@AgileCoderYT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @AgileCoderYT
            </a>{" "}
            to be the first to know.
          </p>
        </div>
      </div>
    </div>
  )
}
