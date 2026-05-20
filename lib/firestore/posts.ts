import { db } from "@/lib/firebase"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore"

export interface PostStats {
  views: number
  likes: number
}

function postRef(slug: string) {
  return doc(db, "posts", slug)
}

export async function incrementView(slug: string): Promise<void> {
  const ref = postRef(slug)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    await updateDoc(ref, { views: increment(1) })
  } else {
    await setDoc(ref, { views: 1, likes: 0, likedBy: [] })
  }
}

export async function getPostStats(slug: string): Promise<PostStats> {
  const snap = await getDoc(postRef(slug))
  if (!snap.exists()) return { views: 0, likes: 0 }
  const data = snap.data()
  return { views: data.views ?? 0, likes: data.likes ?? 0 }
}

export async function hasUserLiked(slug: string, userId: string): Promise<boolean> {
  const snap = await getDoc(postRef(slug))
  if (!snap.exists()) return false
  const likedBy: string[] = snap.data().likedBy ?? []
  return likedBy.includes(userId)
}

export async function toggleLike(
  slug: string,
  userId: string
): Promise<{ liked: boolean; likes: number }> {
  const ref = postRef(slug)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, { views: 0, likes: 1, likedBy: [userId] })
    return { liked: true, likes: 1 }
  }

  const data = snap.data()
  const likedBy: string[] = data.likedBy ?? []
  const alreadyLiked = likedBy.includes(userId)

  if (alreadyLiked) {
    await updateDoc(ref, {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    })
    return { liked: false, likes: (data.likes ?? 1) - 1 }
  } else {
    await updateDoc(ref, {
      likes: increment(1),
      likedBy: arrayUnion(userId),
    })
    return { liked: true, likes: (data.likes ?? 0) + 1 }
  }
}
