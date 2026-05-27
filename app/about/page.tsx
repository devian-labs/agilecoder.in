import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "About | AgileCoder",
  description: "AgileCoder is where Devian Labs shares what it builds and learns - practical engineering, creative coding, and the craft of shipping software.",
  alternates: { canonical: "https://www.agilecoder.in/about" },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Hero */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-5">About AgileCoder</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Real software.<br />
            <span className="text-zinc-500">Real lessons. No filler.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            AgileCoder is where{" "}
            <a href="https://devianlabs.com" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors underline underline-offset-4 decoration-zinc-700">
              Devian Labs
            </a>{" "}
            documents the process of building software - the decisions, the dead ends, and the patterns that actually hold up.
          </p>
        </div>

        {/* Two-col layout: story + author */}
        <div className="grid lg:grid-cols-5 gap-10 mb-20">

          {/* Story - wider col */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">The idea</h2>
              <p className="text-zinc-300 leading-relaxed">
                Most tutorials stop right before things get hard. They show the happy path, skip the edge cases, and leave you stranded the moment reality diverges from the script. AgileCoder exists to fill that gap - with writing that doesn&apos;t flatten the complexity out.
              </p>
            </div>
            <div>
              <p className="text-zinc-300 leading-relaxed">
                Every post here traces back to something we actually shipped, debugged, or rebuilt from scratch. The goal isn&apos;t coverage - it&apos;s depth. One well-understood concept beats ten skimmed ones.
              </p>
            </div>
            <div>
              <p className="text-zinc-300 leading-relaxed">
                If a post is useful to you today, it should still be useful in two years. That&apos;s the bar we write to.
              </p>
            </div>
          </div>

          {/* Author - narrower col */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  S
                </div>
                <div>
                  <p className="font-semibold text-white">Smruti Ranjan</p>
                  <p className="text-xs text-zinc-500">Founder, Devian Labs</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                I build products at the intersection of code, design, and delivery. AgileCoder is my public notebook - the place where the lessons from shipping become something you can actually use.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <a href="https://twitter.com/agilecoder_in" target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  Twitter / X
                </a>
                <a href="https://devianlabs.com" target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  Devian Labs
                </a>
                <a href="mailto:hello@devianlabs.com"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* What's here - horizontal strips instead of cards */}
        <div className="mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-8">What&apos;s here</h2>

          <div className="divide-y divide-zinc-800/60 border-y border-zinc-800/60">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6 group">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tabular-nums">01</span>
                <p className="font-semibold text-white">Engineering Blog</p>
              </div>
              <p className="sm:col-span-2 text-zinc-400 text-sm leading-relaxed">
                Backend architecture, auth systems, APIs, databases - written like a postmortem, not a syllabus. Each post answers a question that came up while building something real.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6 group">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tabular-nums">02</span>
                <p className="font-semibold text-white">Creative Coding</p>
              </div>
              <p className="sm:col-span-2 text-zinc-400 text-sm leading-relaxed">
                Fractals, generative art, and mathematical patterns brought to life with p5.js. Interactive sketches you can play with and dissect - because code can be beautiful.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6 group">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tabular-nums">03</span>
                <p className="font-semibold text-white">Books & Boilerplates</p>
              </div>
              <p className="sm:col-span-2 text-zinc-400 text-sm leading-relaxed">
                Condensed thinking in purchasable form. The AI Toolkit for Modern Developers is on Kindle now. Production-ready starter kits are on Gumroad for when you want to skip the setup and get straight to building.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6 group">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tabular-nums">04</span>
                <p className="font-semibold text-white">Newsletter</p>
              </div>
              <p className="sm:col-span-2 text-zinc-400 text-sm leading-relaxed">
                When something worth sharing comes together - a new post, a new build, a lesson that didn&apos;t fit anywhere else - it goes in the newsletter. No schedule. No noise.
              </p>
            </div>

          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Read something useful? Share it. Found a mistake? Email us.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
              Start reading <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://devianlabs.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors">
              Visit Devian Labs
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
