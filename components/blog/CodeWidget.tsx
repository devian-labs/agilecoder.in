"use client"

import { useMemo, useRef, useState } from "react"
import { Maximize2, Minimize2, RefreshCw } from "lucide-react"

interface Props {
  code: string
  runtime: "p5js" | "vanilla"
  height?: number
}

function buildSrcdoc(code: string, runtime: "p5js" | "vanilla"): string {
  if (code.trimStart().startsWith("<!DOCTYPE")) return code

  const p5Script = runtime === "p5js"
    ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>`
    : ""

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; background: #0a0a0f; overflow: hidden; }
  canvas { display: block; }
</style>
${p5Script}
</head>
<body>
<script>
${code}
</script>
</body>
</html>`
}

export function CodeWidget({ code, runtime, height = 480 }: Props) {
  const [key, setKey] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const iframeHeight = expanded ? 640 : height

  const srcdoc = useMemo(() => buildSrcdoc(code, runtime), [code, runtime])

  return (
    <div className="my-10 rounded-2xl border border-zinc-700/60 overflow-hidden bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">
            {runtime === "p5js" ? "p5.js sketch" : "JavaScript"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Restart sketch"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Sandboxed iframe */}
      <iframe
        key={key}
        srcDoc={srcdoc}
        sandbox="allow-scripts"
        style={{ width: "100%", height: iframeHeight, border: "none", display: "block" }}
        title="Interactive code widget"
      />
    </div>
  )
}
