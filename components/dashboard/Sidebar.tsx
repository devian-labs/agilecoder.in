"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase-auth"
import {
  LayoutDashboard, FileText, MessageSquare, Users,
  ExternalLink, LogOut, Rss, Tag, Plus, BookOpen,
} from "lucide-react"

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Posts", href: "/dashboard/posts", icon: FileText },
  { label: "Series", href: "/dashboard/series", icon: BookOpen },
  { label: "Categories", href: "/dashboard/categories", icon: Tag },
  { label: "Comments", href: "/dashboard/comments", icon: MessageSquare },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img src="/agilecoder-dark.png" className="w-8 h-8 rounded-full" alt="" />
          <div>
            <p className="text-sm font-bold text-white leading-none">AgileCoder</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Quick action */}
      <div className="px-3 pt-3">
        <Link
          href="/dashboard/posts/new"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors w-full"
        >
          <Plus className="h-4 w-4 shrink-0" />
          New post
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-zinc-800 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Rss className="h-4 w-4 shrink-0" />
            View Site
            <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
          </a>
        </div>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-zinc-800">
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
