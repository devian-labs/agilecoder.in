"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getPostBySlug } from "@/lib/firestore/posts-crud"
import { PostForm } from "@/components/editor/PostForm"
import { Loader2 } from "lucide-react"

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPostBySlug(slug).then((p) => { setPost(p); setLoading(false) }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    )
  }

  if (!post) {
    return <div className="p-8 text-zinc-500">Post not found.</div>
  }

  return <PostForm mode="edit" initialData={post} />
}
