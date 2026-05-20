"use client"
import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { toggleLike, hasUserLiked, getPostStats } from "@/lib/firestore/posts"

function getUserId(): string {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("ac_uid")
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem("ac_uid", id)
  }
  return id
}

export function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const uid = getUserId()
        const [stats, userLiked] = await Promise.all([
          getPostStats(slug),
          hasUserLiked(slug, uid),
        ])
        setLikes(stats.likes)
        setLiked(userLiked)
      } catch {
        // Firebase not configured
      } finally {
        setReady(true)
      }
    }
    load()
  }, [slug])

  async function handleLike() {
    if (loading) return
    setLoading(true)
    try {
      const uid = getUserId()
      const result = await toggleLike(slug, uid)
      setLikes(result.likes)
      setLiked(result.liked)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (!ready) return null

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "Unlike this post" : "Like this post"}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
        ${liked
          ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-400"
          : "border-border text-muted-foreground hover:border-rose-300 hover:text-rose-500"
        }`}
    >
      <Heart
        className={`h-4 w-4 transition-all ${liked ? "fill-current scale-110" : ""}`}
      />
      <span>{likes > 0 ? likes.toLocaleString() : ""} {liked ? "Liked" : "Like"}</span>
    </button>
  )
}
