export interface FeaturedVideo {
  id: string
  title: string
  duration: string
  views: string
  url: string
  thumbnail: string
}

export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: "XMv-wWO5RKQ",
    title: "NX Monorepo: Manage Multiple React Apps & Libraries in One Codebase",
    duration: "17:31",
    views: "2.9K",
    url: "https://www.youtube.com/watch?v=XMv-wWO5RKQ",
    thumbnail: "https://img.youtube.com/vi/XMv-wWO5RKQ/maxresdefault.jpg",
  },
  {
    id: "oODlPLfnTIk",
    title: "Setting Up Node.js + Express + TypeScript the Right Way",
    duration: "5:37",
    views: "19K",
    url: "https://www.youtube.com/watch?v=oODlPLfnTIk",
    thumbnail: "https://img.youtube.com/vi/oODlPLfnTIk/maxresdefault.jpg",
  },
  {
    id: "KKbaIoU4a_E",
    title: "Turn Your Old MacBook Into a Linux Server (Protect Your Data!)",
    duration: "10:19",
    views: "1.3K",
    url: "https://www.youtube.com/watch?v=KKbaIoU4a_E",
    thumbnail: "https://img.youtube.com/vi/KKbaIoU4a_E/maxresdefault.jpg",
  },
]
