"use client"
import { useState } from "react"
import Link from "next/link"
import { GraduationCap, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"

const upcomingCourses = [
  {
    title: "Backend Engineering with Node.js & TypeScript",
    description: "Build production-grade APIs from scratch — auth, databases, queues, monitoring.",
    topics: ["REST & GraphQL APIs", "JWT + OAuth", "PostgreSQL & Redis", "Docker & CI/CD"],
    color: "border-cyan-500/20 bg-cyan-500/[0.03]",
    iconColor: "text-cyan-400",
  },
  {
    title: "System Design for Developers",
    description: "Learn to design scalable, fault-tolerant systems the way senior engineers do.",
    topics: ["Scalability patterns", "Database design", "Caching strategies", "Distributed systems"],
    color: "border-violet-500/20 bg-violet-500/[0.03]",
    iconColor: "text-violet-400",
  },
  {
    title: "Creative Coding with p5.js",
    description: "Turn code into art — generative visuals, simulations, and interactive experiments.",
    topics: ["p5.js fundamentals", "Generative art", "Physics simulations", "WebGL basics"],
    color: "border-emerald-500/20 bg-emerald-500/[0.03]",
    iconColor: "text-emerald-400",
  },
]

export default function CoursesPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/50 mb-6">
            Courses
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Structured learning for working developers.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-5">
            No fluff, just real skills. Practical courses built from what the team at Devian Labs actually uses.
          </p>
          <div className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/[0.07] text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Currently in development
          </div>
        </div>

        {/* Upcoming courses */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xl font-bold text-white mb-5">What&apos;s coming</h2>
          {upcomingCourses.map((course) => (
            <div key={course.title} className={`rounded-2xl border ${course.color} p-6 space-y-3`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${course.iconColor}`}>
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{course.description}</p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-zinc-500">
                        <CheckCircle className={`h-3.5 w-3.5 ${course.iconColor} shrink-0`} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-8 text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold text-white mb-2">Get early access</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Join the waitlist and be the first to know when courses drop — plus early-bird pricing.
          </p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 font-medium">
              <CheckCircle className="h-4 w-4" />
              You&apos;re on the list! We&apos;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2.5 text-sm rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-cyan-500/35 bg-cyan-500/[0.08] text-cyan-400 text-sm font-semibold hover:bg-cyan-500/[0.15] transition-all disabled:opacity-50 shrink-0 flex items-center gap-1.5"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Notify me
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
