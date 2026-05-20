"use client"
import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { incrementView, getPostStats } from "@/lib/firestore/posts"

export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function track() {
      try {
        await incrementView(slug)
        const stats = await getPostStats(slug)
        if (!cancelled) setViews(stats.views)
      } catch {
        // Firebase not configured - silently skip
      }
    }

    track()
    return () => { cancelled = true }
  }, [slug])

  if (views === null) return null

  return (
    <span className="flex items-center gap-1 text-muted-foreground text-sm">
      <Eye className="h-4 w-4" />
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  )
}
