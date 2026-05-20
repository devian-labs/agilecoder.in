export type PostCategory =
  | "web-dev"
  | "backend"
  | "devops"
  | "architecture"
  | "creative-coding"
  | "career"
  | "tools"
  | "ai"

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  "web-dev": "Web Development",
  "backend": "Backend & APIs",
  "devops": "DevOps & Cloud",
  "architecture": "System Design",
  "creative-coding": "Creative Coding",
  "career": "Career & Productivity",
  "tools": "Tools & Libraries",
  "ai": "AI & ML",
}

export type PostDifficulty = "beginner" | "intermediate" | "advanced"

export interface PostData {
  slug: string
  title: string
  date: string
  coverImage?: string
  author?: string
  excerpt?: string
  content: string
  tags?: string[]
  readingTime?: number
  thread?: string
  category?: PostCategory
  learningPath?: string
  learningPathOrder?: number
  featured?: boolean
  difficulty?: PostDifficulty
  draft?: boolean
}

export interface PageData {
  title: string
  description: string
  slug: string
  coverImage?: string
  featuredPosts?: string[]
  featuredThreads?: string[]
  content: string
}

export interface ThreadData {
  title: string
  description: string
  slug: string
  coverImage?: string
  posts: string[]
  content: string
}

export interface LearningPath {
  slug: string
  title: string
  description: string
  posts: string[]
  coverImage?: string
}
