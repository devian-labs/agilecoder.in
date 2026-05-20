"use client"
import { useEffect, useState, useMemo } from "react"
import { Trash2, Download, Users, Search, Mail } from "lucide-react"
import { getAllSubscribers, deleteSubscriber, Subscriber } from "@/lib/firestore/subscribers"
import { toast } from "sonner"
import { formatDate } from "@/utils/formatDate"

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-zinc-100 rounded ${className}`} />
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    getAllSubscribers()
      .then((subs) => { setSubscribers(subs); setLoading(false) })
      .catch(() => { toast.error("Failed to load subscribers"); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return subscribers
    return subscribers.filter((s) => s.email.toLowerCase().includes(q))
  }, [subscribers, search])

  async function handleDelete(sub: Subscriber) {
    if (!confirm(`Remove ${sub.email}?`)) return
    setDeleting(sub.id)
    try {
      await deleteSubscriber(sub.id)
      setSubscribers((s) => s.filter((x) => x.id !== sub.id))
      toast.success(`${sub.email} removed`)
    } catch {
      toast.error("Failed to remove subscriber")
    } finally {
      setDeleting(null)
    }
  }

  function exportCSV() {
    const header = "email,subscribedAt\n"
    const rows = subscribers.map((s) => `${s.email},${s.subscribedAt}`).join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Subscribers</h1>
          <p className="text-zinc-500 text-sm mt-1">{subscribers.length} subscribers</p>
        </div>
        <button
          onClick={exportCSV}
          disabled={loading || subscribers.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search emails…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_160px_40px] px-6 py-3 border-b border-zinc-100 bg-zinc-50 text-xs font-medium text-zinc-400 uppercase tracking-wide">
          <span>Email</span>
          <span>Subscribed</span>
          <span />
        </div>

        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[1fr_160px_40px] px-6 py-4 border-b border-zinc-50 items-center">
              <Skeleton className="h-3.5 w-48" />
              <Skeleton className="h-3 w-24" />
              <div />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-zinc-400">
            <Users className="h-8 w-8 opacity-30" />
            <p className="text-sm">{search ? "No subscribers match your search." : "No subscribers yet."}</p>
          </div>
        ) : (
          filtered.map((sub) => (
            <div
              key={sub.id}
              className="grid grid-cols-[1fr_160px_40px] px-6 py-3.5 border-b border-zinc-50 last:border-0 items-center hover:bg-zinc-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-blue-500" />
                </div>
                <span className="text-sm text-zinc-800 truncate">{sub.email}</span>
              </div>
              <span className="text-xs text-zinc-400">{formatDate(sub.subscribedAt)}</span>
              <button
                onClick={() => handleDelete(sub)}
                disabled={deleting === sub.id}
                className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                title="Remove subscriber"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
