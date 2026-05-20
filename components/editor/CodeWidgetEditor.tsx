"use client"

import { useState, useMemo } from "react"
import { Play, RefreshCw, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import type { CodeWidget } from "@/lib/firestore/posts-crud"

interface Props {
  value: CodeWidget | null | undefined
  onChange: (val: CodeWidget | null) => void
}

const DEFAULT_P5 = `function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 15);
}

function draw() {
  // your sketch here
}`

const DEFAULT_VANILLA = `const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// your code here`

function buildSrcdoc(code: string, runtime: "p5js" | "vanilla"): string {
  if (code.trimStart().startsWith("<!DOCTYPE")) return code

  const p5Script = runtime === "p5js"
    ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>`
    : ""
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}canvas{display:block;}</style>
${p5Script}</head><body><script>${code}</script></body></html>`
}

export function CodeWidgetEditor({ value, onChange }: Props) {
  const [open, setOpen] = useState(!!value)
  const [previewKey, setPreviewKey] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const code = value?.code ?? DEFAULT_P5
  const runtime = value?.runtime ?? "p5js"
  const height = value?.height ?? 480

  function update(patch: Partial<CodeWidget>) {
    onChange({ code, runtime, height, ...value, ...patch })
  }

  function handleEnable() {
    setOpen(true)
    if (!value) onChange({ code: DEFAULT_P5, runtime: "p5js", height: 480 })
  }

  function handleRemove() {
    setOpen(false)
    setShowPreview(false)
    onChange(null)
  }

  function handleRuntimeChange(r: "p5js" | "vanilla") {
    update({ runtime: r, code: r === "p5js" ? DEFAULT_P5 : DEFAULT_VANILLA })
  }

  const srcdoc = useMemo(() => buildSrcdoc(code, runtime), [code, runtime, previewKey])

  if (!open) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-zinc-200 p-5">
        <button
          type="button"
          onClick={handleEnable}
          className="w-full flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-zinc-700 transition-colors py-2"
        >
          <Play className="h-4 w-4" />
          Add interactive code widget
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-violet-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-violet-50 border-b border-violet-100">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-semibold text-zinc-800">Interactive Widget</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-violet-100 transition-colors"
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Remove widget"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Runtime + height row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Runtime</label>
            <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-sm">
              {(["p5js", "vanilla"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRuntimeChange(r)}
                  className={`flex-1 py-2 font-medium transition-colors ${
                    runtime === r
                      ? "bg-violet-600 text-white"
                      : "text-zinc-500 hover:bg-zinc-50"
                  }`}
                >
                  {r === "p5js" ? "p5.js" : "Vanilla JS"}
                </button>
              ))}
            </div>
          </div>
          <div className="w-28">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Height (px)</label>
            <input
              type="number"
              min={200}
              max={900}
              step={40}
              value={height}
              onChange={(e) => update({ height: Number(e.target.value) })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
            />
          </div>
        </div>

        {/* Code textarea */}
        <div>
          <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5 block">Code</label>
          <textarea
            value={code}
            onChange={(e) => update({ code: e.target.value })}
            rows={16}
            spellCheck={false}
            className="w-full px-3 py-2.5 text-sm font-mono rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-y bg-zinc-50 text-zinc-800 leading-relaxed"
          />
        </div>

        {/* Test button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setShowPreview(true); setPreviewKey((k) => k + 1) }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            Test widget
          </button>
          {showPreview && (
            <button
              type="button"
              onClick={() => setPreviewKey((k) => k + 1)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restart
            </button>
          )}
          {showPreview && (
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="ml-auto text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Hide preview
            </button>
          )}
        </div>

        {/* Live preview */}
        {showPreview && (
          <div className="rounded-xl border border-zinc-200 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border-b border-zinc-200">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span className="text-xs text-zinc-400 font-mono">
                Preview — {runtime === "p5js" ? "p5.js" : "Vanilla JS"}
              </span>
            </div>
            <iframe
              key={previewKey}
              srcDoc={srcdoc}
              sandbox="allow-scripts"
              style={{ width: "100%", height, border: "none", display: "block" }}
              title="Widget preview"
            />
          </div>
        )}
      </div>
    </div>
  )
}
