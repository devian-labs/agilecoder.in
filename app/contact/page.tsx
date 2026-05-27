import { Metadata } from "next"
import Link from "next/link"
import { Mail, ExternalLink, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | AgileCoder",
  description: "Get in touch with AgileCoder. Reach out for collaborations, questions, or just to say hello.",
  alternates: { canonical: "https://www.agilecoder.in/contact" },
}

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@AgileCoderYT" },
  { label: "Instagram", href: "https://www.instagram.com/agilecoder_" },
  { label: "Devian Labs", href: "https://devianlabs.com" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="max-w-xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-5">Contact</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Get in touch
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12">
            Questions, collaborations, feedback, or just want to say hello - we&apos;re reachable.
          </p>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Email</p>
                <a
                  href="mailto:hello@devianlabs.com"
                  className="text-white text-lg font-semibold hover:text-blue-400 transition-colors"
                >
                  hello@devianlabs.com
                </a>
                <p className="text-sm text-zinc-500 mt-1">We typically respond within 1–2 business days.</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Find us online</p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                >
                  {s.label} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
