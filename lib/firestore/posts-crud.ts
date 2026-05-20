import { db } from "@/lib/firebase"
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, where, limit, serverTimestamp, Timestamp,
  startAfter, QueryDocumentSnapshot, increment,
} from "firebase/firestore"

export interface CodeWidget {
  code: string
  runtime: "p5js" | "vanilla"
  height: number
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // HTML
  coverImage?: string
  author: string
  date: string
  category?: string
  tags?: string[]
  published: boolean
  featured?: boolean
  draft?: boolean
  difficulty?: "beginner" | "intermediate" | "advanced"
  learningPath?: string
  learningPathOrder?: number
  readingTime?: number
  codeWidget?: CodeWidget
  views: number
  likes: number
  likedBy?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface PostInput {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  author?: string
  date?: string
  category?: string
  tags?: string[]
  published?: boolean
  featured?: boolean
  draft?: boolean
  difficulty?: string
  learningPath?: string
  learningPathOrder?: number
  readingTime?: number
  codeWidget?: CodeWidget | null
}

const col = collection(db, "posts")

function toPost(d: QueryDocumentSnapshot): Post {
  const data = d.data()
  return {
    id: d.id,
    slug: data.slug ?? d.id,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    coverImage: data.coverImage,
    author: data.author ?? "AgileCoder",
    date: data.date instanceof Timestamp
      ? data.date.toDate().toISOString().slice(0, 10)
      : data.date ?? new Date().toISOString().slice(0, 10),
    category: data.category,
    tags: data.tags ?? [],
    published: data.published ?? false,
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    difficulty: data.difficulty,
    learningPath: data.learningPath,
    learningPathOrder: data.learningPathOrder,
    readingTime: data.readingTime,
    codeWidget: data.codeWidget ?? undefined,
    views: data.views ?? 0,
    likes: data.likes ?? 0,
    likedBy: data.likedBy ?? [],
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : undefined,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : undefined,
  }
}

// ── Public (reader-facing) ────────────────────────────────────────────────────

export async function getPublishedPosts(opts?: { limitN?: number; category?: string }): Promise<Post[]> {
  let q = query(col, where("published", "==", true), orderBy("date", "desc"))
  if (opts?.category) q = query(col, where("published", "==", true), where("category", "==", opts.category), orderBy("date", "desc"))
  if (opts?.limitN) q = query(q, limit(opts.limitN))
  const snap = await getDocs(q)
  return snap.docs.map(toPost)
}

export async function getFeaturedPosts(n = 3): Promise<Post[]> {
  const q = query(col, where("published", "==", true), where("featured", "==", true), orderBy("date", "desc"), limit(n))
  const snap = await getDocs(q)
  return snap.docs.map(toPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, "posts", slug))
  if (!snap.exists()) return null
  return toPost(snap as QueryDocumentSnapshot)
}

export async function getRelatedPosts(slug: string, category?: string, tags?: string[], n = 3): Promise<Post[]> {
  if (!category) return []
  const q = query(col, where("published", "==", true), where("category", "==", category), limit(n + 1))
  const snap = await getDocs(q)
  return snap.docs.map(toPost).filter((p) => p.slug !== slug).slice(0, n)
}

// ── Admin CRUD ────────────────────────────────────────────────────────────────

export async function getAllPostsAdmin(): Promise<Post[]> {
  const snap = await getDocs(query(col, orderBy("createdAt", "desc")))
  return snap.docs.map(toPost)
}

// Strip undefined values — Firestore rejects them
function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== "")
  ) as Partial<T>
}

export async function createPost(input: PostInput): Promise<string> {
  const { setDoc } = await import("firebase/firestore")
  const slug = input.slug || slugify(input.title)
  await setDoc(doc(db, "posts", slug), {
    ...clean(input),
    slug,
    views: 0,
    likes: 0,
    likedBy: [],
    published: input.published ?? false,
    author: input.author || "Smruti Ranjan",
    date: input.date || new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return slug
}

export async function updatePost(slug: string, input: Partial<PostInput>): Promise<void> {
  const { deleteField } = await import("firebase/firestore")
  const data: Record<string, unknown> = { ...clean(input), updatedAt: serverTimestamp() }
  // null means "remove the field" for optional objects like codeWidget
  if (input.codeWidget === null) data.codeWidget = deleteField()
  await updateDoc(doc(db, "posts", slug), data)
}

export async function deletePost(slug: string): Promise<void> {
  await deleteDoc(doc(db, "posts", slug))
}

export async function publishPost(slug: string): Promise<void> {
  await updateDoc(doc(db, "posts", slug), { published: true, updatedAt: serverTimestamp() })
}

export async function unpublishPost(slug: string): Promise<void> {
  await updateDoc(doc(db, "posts", slug), { published: false, updatedAt: serverTimestamp() })
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, "")
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}
