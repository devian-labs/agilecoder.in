import { Github, Twitter, Globe } from "lucide-react"

interface Author {
  name: string
  avatar?: string
  bio?: string
  github?: string
  twitter?: string
  website?: string
}

const AUTHORS: Record<string, Author> = {
  "Smruti Ranjan": {
    name: "Smruti Ranjan",
    bio: "Founder of Devian Labs. Building products at the intersection of code, design, and delivery. I write about engineering, systems thinking, and the craft of building software.",
    github: "https://github.com/smruti-ranjan-badatya",
    twitter: "https://twitter.com/agilecoder_in",
    website: "https://www.agilecoder.in",
  },
  "AgileCoder": {
    name: "AgileCoder",
    bio: "The AgileCoder team - bringing you the latest on web dev, architecture, and creative coding.",
    website: "https://www.agilecoder.in",
  },
}

interface Props {
  author?: string
}

export function AuthorBio({ author }: Props) {
  const profile = author ? (AUTHORS[author] ?? { name: author }) : AUTHORS["Smruti Ranjan"]

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-6 flex items-start gap-5">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
        {profile.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">{profile.name}</p>
        {profile.bio && (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{profile.bio}</p>
        )}
        <div className="flex items-center gap-3 mt-3">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
