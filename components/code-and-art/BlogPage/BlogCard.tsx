"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
    blog: {
        name: string
        description: string
        category: string
        slug: string
        headerImg: string
    }
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const href = `/tech-blog/creative-coding/${blog.slug}`

    return (
        <Link href={href} className="group block border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    src={blog.headerImg}
                    fill
                    alt={`${blog.name} preview`}
                />
            </div>
            <div className="p-4">
                <h4 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {blog.name}
                </h4>
                <p className="line-clamp-2 text-muted-foreground text-sm mt-1.5 leading-relaxed">
                    {blog.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                    Explore →
                </span>
            </div>
        </Link>
    )
}

export default BlogCard
