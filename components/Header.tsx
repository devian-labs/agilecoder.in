'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const links = [
  { name: "Home", url: "/", external: false },
  { name: "Blog", url: "/blog", external: false },
  { name: "Store", url: "/store", external: false },
  { name: "YouTube", url: "https://www.youtube.com/@AgileCoderYT", external: true, youtube: true },
]

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (url: string) =>
    url === "/" ? pathname === url : pathname.startsWith(url);

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.25, ease: "easeInOut" } },
  } as const;

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <img className="rounded-full w-8 md:w-9" src="/agilecoder-dark.png" alt="Agile Coder Logo" />
          <div className="flex flex-col leading-none">
            <span className="text-foreground text-base md:text-lg font-bold">AgileCoder</span>
            <a
              href="https://devianlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 text-[10px] hidden md:block hover:text-zinc-300 transition-colors tracking-wide uppercase font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              by Devian Labs
            </a>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            if (link.youtube) {
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors ml-1"
                >
                  <YouTubeIcon className="h-4 w-4 text-red-400" />
                  YouTube
                </a>
              )
            }
            return (
              <Link
                key={link.url}
                href={link.url}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.url)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 pb-6 pt-2 space-y-1">
              {links.map((link) => {
                if (link.youtube) {
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 text-base font-semibold py-2.5 px-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 w-fit mt-1"
                    >
                      <YouTubeIcon className="h-4 w-4 text-red-400" />
                      YouTube
                    </a>
                  )
                }
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-2.5 px-2 rounded-lg transition-colors ${
                      isActive(link.url) ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="pt-3 border-t border-border mt-2">
                <p className="text-xs text-muted-foreground px-2">
                  Part of{" "}
                  <a href="https://devianlabs.com" target="_blank" rel="noopener noreferrer" className="underline">
                    Devian Labs
                  </a>
                </p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
