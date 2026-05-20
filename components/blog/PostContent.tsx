"use client"
import DOMPurify from "isomorphic-dompurify"

interface Props {
  html: string
}

export default function PostContent({ html }: Props) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","pre","code",
      "strong","em","u","s","mark","a","img","figure","figcaption","hr","br",
      "table","thead","tbody","tr","th","td","div","span","iframe","youtube",
    ],
    ALLOWED_ATTR: ["href","src","alt","class","target","rel","width","height","frameborder","allowfullscreen","style"],
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allowfullscreen"],
  })

  return (
    <div
      className="prose prose-lg prose-invert max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-zinc-300 prose-p:leading-relaxed
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-em:text-zinc-300
        prose-code:text-blue-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
        prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-400 prose-blockquote:bg-zinc-900 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:pr-4
        prose-img:rounded-xl prose-img:border prose-img:border-zinc-800
        prose-hr:border-zinc-800
        prose-li:text-zinc-300
        prose-th:text-white prose-td:text-zinc-300
        prose-mark:bg-yellow-400/20 prose-mark:text-yellow-200"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
