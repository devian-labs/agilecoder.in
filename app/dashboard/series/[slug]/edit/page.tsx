"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getSeriesBySlug } from "@/lib/firestore/series-crud"
import { getAllPostsAdmin } from "@/lib/firestore/posts-crud"
import SeriesEditor from "@/components/dashboard/SeriesEditor"
import type { Post } from "@/lib/firestore/posts-crud"
import type { Series } from "@/lib/firestore/series-crud"
import { Loader2 } from "lucide-react"

export default function SeriesEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const isNew = slug === "new"

  const [series, setSeries] = useState<Series | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      isNew ? Promise.resolve(null) : getSeriesBySlug(slug),
      getAllPostsAdmin(),
    ]).then(([s, p]) => {
      setSeries(s)
      setPosts(p)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug, isNew])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-zinc-600">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <SeriesEditor
      isNew={isNew}
      initialSlug={isNew ? undefined : slug}
      initialData={series ? {
        title: series.title,
        description: series.description,
        coverImage: series.coverImage,
        published: series.published,
        items: series.items,
      } : undefined}
      posts={posts}
    />
  )
}
