import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 bg-[#0a0a0f] text-white">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-8">
        404
      </div>
      <h1 className="text-6xl font-bold mb-4 bg-[linear-gradient(90deg,#fff_0%,#67e8f9_40%,#c084fc_70%,#fff_100%)] bg-[size:200%_auto] bg-clip-text text-transparent">
        Page not found.
      </h1>
      <p className="text-zinc-400 mb-10 text-lg max-w-sm leading-relaxed">
        Looks like this tutorial isn&apos;t shipping yet. Let&apos;s get you back on track.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-cyan-500/35 text-cyan-400 bg-cyan-500/[0.08] hover:border-cyan-400/65 hover:bg-cyan-500/[0.14] transition-all duration-300"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
        >
          Read the Blog
        </Link>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
        >
          Visit the Store
        </Link>
      </div>
    </div>
  )
}

export default NotFound
