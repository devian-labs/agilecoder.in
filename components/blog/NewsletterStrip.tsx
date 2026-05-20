"use client"
import { useState } from "react"
import { Mail, Loader2, CheckCircle } from "lucide-react"
import { addSubscriber } from "@/lib/firestore/subscribers"
import { toast } from "sonner"

export function NewsletterStrip() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [msg, setMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState("loading")
    try {
      await addSubscriber(email.trim())
      setState("done")
      setEmail("")
      setMsg("You're in! Expect occasional drops of quality content.")
      toast.success("Subscribed! Welcome aboard.")
    } catch {
      setState("error")
      setMsg("Something went wrong. Try again.")
      toast.error("Subscription failed - please try again.")
    }
  }

  return (
    <div className="my-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-8 py-7">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <Mail className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-white mb-0.5">
            Behind-the-build, in your inbox.
          </h3>
          <p className="text-sm text-zinc-500 mb-4">
            New tutorials, book updates, and behind-the-scenes notes from the studio. No schedule, no spam.
          </p>

          {state === "done" ? (
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
              <CheckCircle className="h-4 w-4" />
              {msg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                {state === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Subscribe
              </button>
            </form>
          )}

          {state === "error" && (
            <p className="mt-2 text-xs text-red-400">{msg}</p>
          )}
        </div>
      </div>
    </div>
  )
}
