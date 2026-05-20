import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
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
  const q = query(commentsRef(slug), where("approved", "==", true))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => toComment(d, slug))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
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

async function getAllCommentsForSlugs(slugs: string[]): Promise<Comment[]> {
  if (slugs.length === 0) return []
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const snap = await getDocs(commentsRef(slug))
      return snap.docs.map((d) => toComment(d, slug))
    })
  )
  return results.flat()
}

export async function getAllPendingComments(slugs: string[]): Promise<Comment[]> {
  const all = await getAllCommentsForSlugs(slugs)
  return all
    .filter((c) => !c.approved)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getAllApprovedComments(slugs: string[]): Promise<Comment[]> {
  const all = await getAllCommentsForSlugs(slugs)
  return all
    .filter((c) => c.approved)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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
