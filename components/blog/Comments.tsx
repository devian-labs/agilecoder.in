"use client"
import { useEffect, useState } from "react"
import { MessageCircle, Send, User } from "lucide-react"
import { getApprovedComments, addComment, Comment } from "@/lib/firestore/comments"
import { formatDate } from "@/utils/formatDate"
import { toast } from "sonner"

export function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getApprovedComments(slug)
      .then(setComments)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim()) { toast.error("Please enter your name"); return }
    if (!content.trim() || content.trim().length < 10) { toast.error("Comment must be at least 10 characters"); return }
    setSubmitting(true)
    try {
      await addComment(slug, author, content)
      setSubmitted(true)
      setAuthor("")
      setContent("")
      toast.success("Comment submitted - it'll appear after review")
    } catch {
      toast.error("Failed to submit comment. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-12 space-y-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">
          {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? "s" : ""}` : "Comments"}
        </h2>
      </div>

      {!loading && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-4">
              <div className="shrink-0 w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-white">{c.author}</span>
                  <span className="text-xs text-zinc-500">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && comments.length === 0 && (
        <p className="text-sm text-zinc-500">No comments yet. Be the first to share your thoughts.</p>
      )}

      <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 space-y-4">
        <h3 className="font-semibold text-sm text-white">Leave a comment</h3>

        {submitted ? (
          <div className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-lg px-4 py-3">
            Thanks! Your comment will appear after review.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
            />
            <textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition resize-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">Comments are moderated before appearing.</p>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
