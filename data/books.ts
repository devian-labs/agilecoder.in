export interface Book {
  id: string
  title: string
  description: string
  coverImage: string
  featured: boolean
  links: {
    label: string
    url: string
    primary?: boolean
  }[]
}

export const books: Book[] = [
  {
    id: "ai-toolkit",
    title: "The AI Toolkit for Modern Developers",
    description: "A practical field guide for thriving in the age of AI. Learn how to actually build with tools like GPT-4, Claude, and open-source models — not just talk about them. Gather the mindset required to leverage AI and ship faster than ever before.",
    coverImage: "/assets/books/ai-toolkit.png",
    featured: true,
    links: [
      {
        label: "Buy on Amazon Kindle",
        url: "https://amazon.com", // Update with real Amazon Kindle URL
        primary: true,
      },
    ],
  },
]
