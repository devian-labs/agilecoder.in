import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/firestore/posts-crud"

const SITE_URL = "https://www.agilecoder.in"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; date?: string }[] = []
  try {
    posts = await getPublishedPosts()
  } catch {
    // Firestore unavailable at build time — skip post URLs
  }

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/store`, lastModified: new Date() },
    { url: `${SITE_URL}/store/books`, lastModified: new Date() },
    { url: `${SITE_URL}/courses`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${SITE_URL}/terms-of-service`, lastModified: new Date() },
  ]

  const postUrls: MetadataRoute.Sitemap = posts
    .filter((p) => p?.slug)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
    }))

  return [...pages, ...postUrls]
}
