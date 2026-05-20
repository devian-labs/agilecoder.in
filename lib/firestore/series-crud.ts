import { db } from "@/lib/firebase"
import {
  collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp, Timestamp, QueryDocumentSnapshot,
} from "firebase/firestore"

export interface SeriesItem {
  type: "post" | "text"
  postSlug?: string
  content?: string
  order: number
}

export interface Series {
  id: string
  slug: string
  title: string
  description: string
  coverImage?: string
  published: boolean
  items: SeriesItem[]
  postCount: number
  createdAt?: string
  updatedAt?: string
}

export interface SeriesInput {
  slug: string
  title: string
  description: string
  coverImage?: string
  published?: boolean
  items?: SeriesItem[]
}

const col = collection(db, "series")

function toSeries(d: QueryDocumentSnapshot): Series {
  const data = d.data()
  const items: SeriesItem[] = [...(data.items ?? [])].sort(
    (a: SeriesItem, b: SeriesItem) => a.order - b.order
  )
  return {
    id: d.id,
    slug: data.slug ?? d.id,
    title: data.title ?? "",
    description: data.description ?? "",
    coverImage: data.coverImage,
    published: data.published ?? false,
    items,
    postCount: items.filter((i) => i.type === "post").length,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : undefined,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : undefined,
  }
}

export async function getPublishedSeries(): Promise<Series[]> {
  try {
    const snap = await getDocs(
      query(col, where("published", "==", true), orderBy("createdAt", "desc"))
    )
    return snap.docs.map(toSeries)
  } catch {
    return []
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const snap = await getDoc(doc(db, "series", slug))
  if (!snap.exists()) return null
  return toSeries(snap as QueryDocumentSnapshot)
}

export async function getAllSeriesAdmin(): Promise<Series[]> {
  const snap = await getDocs(query(col, orderBy("createdAt", "desc")))
  return snap.docs.map(toSeries)
}

export async function createSeries(input: SeriesInput): Promise<void> {
  await setDoc(doc(db, "series", input.slug), {
    ...input,
    published: input.published ?? false,
    items: input.items ?? [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateSeries(slug: string, input: Partial<SeriesInput>): Promise<void> {
  await updateDoc(doc(db, "series", slug), {
    ...input,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteSeries(slug: string): Promise<void> {
  await deleteDoc(doc(db, "series", slug))
}
