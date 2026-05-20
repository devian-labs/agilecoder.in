import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"

export interface PostStatsRecord {
  slug: string
  views: number
  likes: number
}

export async function getAllPostStats(): Promise<Record<string, PostStatsRecord>> {
  const snap = await getDocs(collection(db, "posts"))
  const result: Record<string, PostStatsRecord> = {}
  snap.docs.forEach((d) => {
    const data = d.data()
    result[d.id] = {
      slug: d.id,
      views: data.views ?? 0,
      likes: data.likes ?? 0,
    }
  })
  return result
}

export async function getTopPostsByViews(n = 5): Promise<PostStatsRecord[]> {
  const q = query(collection(db, "posts"), orderBy("views", "desc"), limit(n))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({
    slug: d.id,
    views: d.data().views ?? 0,
    likes: d.data().likes ?? 0,
  }))
}

export async function getSiteTotals(): Promise<{ totalViews: number; totalLikes: number }> {
  const snap = await getDocs(collection(db, "posts"))
  let totalViews = 0
  let totalLikes = 0
  snap.docs.forEach((d) => {
    totalViews += d.data().views ?? 0
    totalLikes += d.data().likes ?? 0
  })
  return { totalViews, totalLikes }
}
