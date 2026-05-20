import { db } from "@/lib/firebase"
import {
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  limit,
} from "firebase/firestore"

export interface Comment {
  id: string
  slug: string        // which post this belongs to
  author: string
  content: string
  createdAt: string
  approved: boolean
}

function commentsRef(slug: string) {
  return collection(db, "posts", slug, "comments")
}

function commentDocRef(slug: string, commentId: string) {
  return doc(db, "posts", slug, "comments", commentId)
}

function toComment(d: any, slug: string): Comment {
  const data = d.data()
  return {
    id: d.id,
    slug,
    author: data.author,
    content: data.content,
    approved: data.approved ?? false,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
  }
}

// ── Public (reader-facing) ────────────────────────────────────────────────────

export async function getApprovedComments(slug: string): Promise<Comment[]> {
  const q = query(commentsRef(slug), where("approved", "==", true), orderBy("createdAt", "asc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => toComment(d, slug))
}

export async function addComment(slug: string, author: string, content: string): Promise<void> {
  await addDoc(commentsRef(slug), {
    author: author.trim(),
    content: content.trim(),
    approved: false,
    createdAt: serverTimestamp(),
  })
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export async function getAllPendingComments(maxResults = 100): Promise<Comment[]> {
  const q = query(
    collectionGroup(db, "comments"),
    where("approved", "==", false),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const slug = d.ref.parent.parent?.id ?? ""
    return toComment(d, slug)
  })
}

export async function getAllApprovedComments(maxResults = 200): Promise<Comment[]> {
  const q = query(
    collectionGroup(db, "comments"),
    where("approved", "==", true),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const slug = d.ref.parent.parent?.id ?? ""
    return toComment(d, slug)
  })
}

export async function getCommentCountBySlug(slug: string): Promise<{ pending: number; approved: number }> {
  const [pendingSnap, approvedSnap] = await Promise.all([
    getDocs(query(commentsRef(slug), where("approved", "==", false))),
    getDocs(query(commentsRef(slug), where("approved", "==", true))),
  ])
  return { pending: pendingSnap.size, approved: approvedSnap.size }
}

export async function approveComment(slug: string, commentId: string): Promise<void> {
  await updateDoc(commentDocRef(slug, commentId), { approved: true })
}

export async function deleteComment(slug: string, commentId: string): Promise<void> {
  await deleteDoc(commentDocRef(slug, commentId))
}
