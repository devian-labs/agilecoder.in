export interface GumroadProduct {
  id: string
  name: string
  description: string
  price: number          // in cents (USD) or paise (INR)
  currency: string
  formatted_price: string
  short_url: string
  thumbnail_url: string | null
  preview_url: string | null
  published: boolean
  tags: string[]
  sales_count: number
  custom_permalink: string | null
}

export async function getGumroadProducts(): Promise<GumroadProduct[]> {
  const token = process.env.GUMROAD_ACCESS_TOKEN
  if (!token) return []

  try {
    const res = await fetch("https://api.gumroad.com/v2/products", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    if (!data.success) return []
    return (data.products as GumroadProduct[]).filter((p) => p.published)
  } catch {
    return []
  }
}
