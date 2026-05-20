"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { CREATIVE_CODING_SKETCHES, type SketchPost } from "@/data/creative-coding-sketches"
import { SKETCH_CONTENT } from "@/data/sketch-content"
import { ArrowLeft, CheckCircle, Loader2, Play, SkipForward, XCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type Status = "pending" | "exists" | "migrated" | "error" | "running"

interface Row {
  sketch: SketchPost
  status: Status
  error?: string
}

function buildSrcdoc(code: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}canvas{display:block;}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head><body><script>${code}</script></body></html>`
}

function SketchRow({ row, force, onDone }: { row: Row; force: boolean; onDone: (slug: string, status: Status, err?: string) => void }) {
  const [previewKey, setPreviewKey] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  async function run() {
    onDone(row.sketch.slug, "running")
    try {
      const ref = doc(db, "posts", row.sketch.slug)
      if (!force) {
        const existing = await getDoc(ref)
        if (existing.exists()) { onDone(row.sketch.slug, "exists"); return }
      }
      const content = SKETCH_CONTENT[row.sketch.slug] ?? `<p>${row.sketch.excerpt}</p>`
      await setDoc(ref, {
        slug: row.sketch.slug,
        title: row.sketch.title,
        excerpt: row.sketch.excerpt,
        content,
        coverImage: row.sketch.coverImage,
        author: "Smruti Ranjan",
        date: new Date().toISOString().slice(0, 10),
        category: "creative-coding",
        tags: row.sketch.tags,
        published: true,
        featured: false,
        draft: false,
        difficulty: "intermediate",
        readingTime: 3,
        codeWidget: { code: row.sketch.code, runtime: "p5js", height: row.sketch.height },
        views: 0, likes: 0, likedBy: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      onDone(row.sketch.slug, "migrated")
    } catch (e: any) {
      onDone(row.sketch.slug, "error", e.message)
    }
  }

  const status = row.status
  const isRunning = status === "running"

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="shrink-0">
          {status === "pending" && <div className="w-5 h-5 rounded-full border-2 border-zinc-300" />}
          {status === "running" && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
          {status === "migrated" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
          {status === "exists" && <SkipForward className="w-5 h-5 text-zinc-400" />}
          {status === "error" && <XCircle className="w-5 h-5 text-red-500" />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 text-sm truncate">{row.sketch.title}</p>
          <p className="text-xs text-zinc-400 font-mono">{row.sketch.slug}</p>
          {status === "error" && <p className="text-xs text-red-500 mt-0.5">{row.error}</p>}
          {status === "exists" && <p className="text-xs text-zinc-400 mt-0.5">Already in Firestore - skipped</p>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => { setShowPreview((s) => !s); setPreviewKey((k) => k + 1) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Play className="h-3 w-3" />
            {showPreview ? "Hide" : "Preview"}
          </button>
          <button
            type="button"
            onClick={run}
            disabled={isRunning || status === "migrated"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            {status === "migrated" ? "Done" : status === "exists" && !force ? "Exists" : "Migrate"}
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="border-t border-zinc-100">
          <iframe
            key={previewKey}
            srcDoc={buildSrcdoc(row.sketch.code)}
            sandbox="allow-scripts"
            style={{ width: "100%", height: row.sketch.height, border: "none", display: "block" }}
            title={row.sketch.title}
          />
        </div>
      )}
    </div>
  )
}

export default function MigrateSketchesPage() {
  const [rows, setRows] = useState<Row[]>(
    CREATIVE_CODING_SKETCHES.map((s) => ({ sketch: s, status: "pending" }))
  )
  const [force, setForce] = useState(false)
  const [running, setRunning] = useState(false)

  function updateRow(slug: string, status: Status, error?: string) {
    setRows((prev) => prev.map((r) => r.sketch.slug === slug ? { ...r, status, error } : r))
  }

  async function runAll() {
    setRunning(true)
    for (const row of rows) {
      if (!force && row.status === "migrated") continue
      // fire sequentially to avoid Firestore rate limits
      await new Promise<void>((resolve) => {
        const handler = (slug: string, status: Status, err?: string) => {
          updateRow(slug, status, err)
          if (slug === row.sketch.slug) resolve()
        }
        migrateOne(row.sketch, force, handler)
      })
    }
    setRunning(false)
    toast.success("Migration complete!")
  }

  const counts = rows.reduce((acc, r) => { acc[r.status] = (acc[r.status] ?? 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 mb-6">
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>

      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold mb-1">Migrate Creative Coding Sketches</h1>
          <p className="text-zinc-500 text-sm">
            Creates {CREATIVE_CODING_SKETCHES.length} Firestore posts - one per fractal sketch - with the p5.js widget code embedded.
          </p>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2 my-5 text-xs font-semibold">
        <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600">{rows.length} total</span>
        {(counts.migrated ?? 0) > 0 && <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{counts.migrated} migrated</span>}
        {(counts.exists ?? 0) > 0 && <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500">{counts.exists} skipped</span>}
        {(counts.error ?? 0) > 0 && <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">{counts.error} errors</span>}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={runAll}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {running && <Loader2 className="h-4 w-4 animate-spin" />}
          {running ? "Migrating…" : "Migrate All"}
        </button>
        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer select-none">
          <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} className="rounded" disabled={running} />
          Overwrite existing posts
        </label>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <SketchRow key={row.sketch.slug} row={row} force={force} onDone={updateRow} />
        ))}
      </div>
    </div>
  )
}

// Extracted so it can be called from the parent closure
async function migrateOne(sketch: SketchPost, force: boolean, onDone: (slug: string, status: Status, err?: string) => void) {
  onDone(sketch.slug, "running")
  try {
    const ref = doc(db, "posts", sketch.slug)
    if (!force) {
      const existing = await getDoc(ref)
      if (existing.exists()) { onDone(sketch.slug, "exists"); return }
    }
    const content = SKETCH_CONTENT[sketch.slug] ?? `<p>${sketch.excerpt}</p>`
    await setDoc(ref, {
      slug: sketch.slug,
      title: sketch.title,
      excerpt: sketch.excerpt,
      content,
      coverImage: sketch.coverImage,
      author: "Smruti Ranjan",
      date: new Date().toISOString().slice(0, 10),
      category: "creative-coding",
      tags: sketch.tags,
      published: true,
      featured: false,
      draft: false,
      difficulty: "intermediate",
      readingTime: 3,
      codeWidget: { code: sketch.code, runtime: "p5js", height: sketch.height },
      views: 0, likes: 0, likedBy: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    onDone(sketch.slug, "migrated")
  } catch (e: any) {
    onDone(sketch.slug, "error", e.message)
  }
}
