"use client"
import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { addSubscriber } from "@/lib/firestore/subscribers"
import { toast } from "sonner"

export function HomeNewsletter() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState("loading")
    try {
      await addSubscriber(email.trim())
      setState("done")
      setEmail("")
      toast.success("Subscribed! Welcome aboard.")
    } catch {
      setState("error")
      toast.error("Subscription failed — please try again.")
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
        <CheckCircle className="h-5 w-5" />
        You&apos;re in. Expect occasional drops of quality content.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 text-sm"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 font-semibold text-sm hover:bg-cyan-500/20 hover:border-cyan-400/65 transition-all disabled:opacity-50"
      >
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </button>
    </form>
  )
}
