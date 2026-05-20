import { db } from "@/lib/firebase"
import {
  collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp, Timestamp, QueryDocumentSnapshot,
} from "firebase/firestore"

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  coverImage?: string
  color?: string
  icon?: string
  postCount?: number
  featured?: boolean
  createdAt?: string
}

export interface CategoryInput {
  slug: string
  name: string
  description: string
  coverImage?: string
  color?: string
  icon?: string
  featured?: boolean
}

const col = collection(db, "categories")

function toCategory(d: QueryDocumentSnapshot): Category {
  const data = d.data()
  return {
    id: d.id,
    slug: data.slug ?? d.id,
    name: data.name ?? "",
    description: data.description ?? "",
    coverImage: data.coverImage,
    color: data.color ?? "#3b82f6",
    icon: data.icon,
    postCount: data.postCount ?? 0,
    featured: data.featured ?? false,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : undefined,
  }
}

export async function getAllCategories(): Promise<Category[]> {
  const snap = await getDocs(query(col, orderBy("name", "asc")))
  return snap.docs.map(toCategory)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const snap = await getDoc(doc(db, "categories", slug))
  if (!snap.exists()) return null
  return toCategory(snap as QueryDocumentSnapshot)
}

export async function createCategory(input: CategoryInput): Promise<void> {
  await setDoc(doc(db, "categories", input.slug), {
    ...input,
    postCount: 0,
    createdAt: serverTimestamp(),
  })
}

export async function updateCategory(slug: string, input: Partial<CategoryInput>): Promise<void> {
  await updateDoc(doc(db, "categories", slug), input)
}

export async function deleteCategory(slug: string): Promise<void> {
  await deleteDoc(doc(db, "categories", slug))
}

// Default categories to seed
export const DEFAULT_CATEGORIES: CategoryInput[] = [
  { slug: "web-dev", name: "Web Development", description: "Frontend, React, Next.js, CSS, browser APIs and everything web.", color: "#3b82f6", icon: "🌐" },
  { slug: "backend", name: "Backend & APIs", description: "Node.js, databases, REST, GraphQL, microservices.", color: "#8b5cf6", icon: "⚙️" },
  { slug: "devops", name: "DevOps & Cloud", description: "CI/CD, Docker, Kubernetes, AWS, Vercel, deployment.", color: "#06b6d4", icon: "☁️" },
  { slug: "architecture", name: "System Design", description: "Scalable systems, distributed architecture, patterns.", color: "#f59e0b", icon: "🏗️" },
  { slug: "creative-coding", name: "Creative Coding", description: "p5.js, generative art, canvas, visual experiments.", color: "#ec4899", icon: "🎨" },
  { slug: "career", name: "Career & Growth", description: "Productivity, interviews, career path, soft skills.", color: "#10b981", icon: "🚀" },
  { slug: "tools", name: "Tools & Libraries", description: "Developer tools, libraries, productivity stacks.", color: "#f97316", icon: "🛠️" },
  { slug: "ai", name: "AI & ML", description: "LLMs, machine learning, AI tools for developers.", color: "#6366f1", icon: "🤖" },
]
