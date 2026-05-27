/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "public-files.gumroad.com" },
      { protocol: "https", hostname: "*.gumroad.com" },
    ],
  },
  async redirects() {
    return [
      // Merge code-and-art into tech-blog/creative-coding
      {
        source: "/code-and-art",
        destination: "/tech-blog?category=creative-coding",
        permanent: true,
      },
      {
        source: "/code-and-art/blog",
        destination: "/tech-blog?category=creative-coding",
        permanent: true,
      },
      // Individual sketch posts: /code-and-art/blog/:category/:slug → /tech-blog/creative-coding/:slug
      {
        source: "/code-and-art/blog/:category/:slug",
        destination: "/tech-blog/creative-coding/:slug",
        permanent: true,
      },
      // /books now lives under /store/books
      {
        source: "/books",
        destination: "/store/books",
        permanent: true,
      },
      // /store/snippets redirects to external BUILD store
      {
        source: "/store/snippets",
        destination: "https://build.devianlabs.com",
        permanent: false,
      },
      // /admin → dashboard (Decap CMS stays at /admin/index.html)
      {
        source: "/admin",
        destination: "/dashboard",
        permanent: false,
      },
      // old blog URLs → new /blog
      {
        source: "/tech-blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tech-blog/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
