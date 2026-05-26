"use client"
import Link from "next/link"
import { Mail, ExternalLink } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] text-white border-t border-zinc-800/60 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/agilecoder-dark.png" alt="AgileCoder Logo" className="w-8 h-8 rounded-full" />
              <span className="text-lg font-bold">AgileCoder</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              Tutorials, tools, and insights - crafted by Devian Labs.
            </p>
            <a href="https://devianlabs.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors font-medium tracking-wide uppercase">
              Visit Devian Labs <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Column 2 - Learn */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Learn</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <a href="https://www.youtube.com/@AgileCoderYT" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors">YouTube</a>
              </li>
              <li>
                <Link href="#newsletter" className="text-sm text-zinc-400 hover:text-white transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Store */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Store</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/store" className="text-sm text-zinc-400 hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/store?category=book" className="text-sm text-zinc-400 hover:text-white transition-colors">Books</Link>
              </li>
              <li>
                <Link href="/store?category=code" className="text-sm text-zinc-400 hover:text-white transition-colors">Boilerplates</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="https://www.youtube.com/@AgileCoderYT" target="_blank" rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                <YouTubeIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/agilecoder_" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="mailto:hello@devianlabs.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-zinc-600">hello@devianlabs.com</p>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-zinc-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} AgileCoder · A Devian Labs project</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/dashboard" className="hover:text-zinc-400 transition-colors opacity-40">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
