"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Maximize2, Minimize2, RefreshCw, Download, Shuffle } from "lucide-react"

interface Props {
  code: string
  runtime: "p5js" | "vanilla"
  height?: number
}

// Injected into every iframe to handle postMessage commands from the toolbar
const MSG_HANDLER = `<script>
var __z=1;
window.addEventListener('message',function(e){
  var d=e.data;
  if(d==='__zi'){__z=Math.min(__z*1.3,6);document.body.style.transform='scale('+__z+')';document.body.style.transformOrigin='top left';document.body.style.width=(100/__z)+'%';}
  if(d==='__zo'){__z=Math.max(__z/1.3,0.25);document.body.style.transform='scale('+__z+')';document.body.style.transformOrigin='top left';document.body.style.width=(100/__z)+'%';}
  if(d==='__zr'){__z=1;document.body.style.transform='';document.body.style.width='';}
  if(d==='__dl'){var c=document.querySelector('canvas');if(!c)return;try{window.parent.postMessage({type:'__dl',url:c.toDataURL('image/png')},'*');}catch(ex){}}
  if(d==='__rc'){var c=document.querySelector('canvas');if(c){var h=Math.floor(Math.random()*360);c.style.filter='hue-rotate('+h+'deg) saturate(1.4)';}}
});
</script>`

function buildSrcdoc(code: string, runtime: "p5js" | "vanilla"): string {
  if (code.trimStart().startsWith("<!DOCTYPE")) {
    // Inject handler into full HTML sketches before </body>
    return code.replace(/<\/body>/i, MSG_HANDLER + "\n</body>")
  }

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
${MSG_HANDLER}
</body>
</html>`
}

const BTN = "p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
const DIVIDER = <span className="w-px h-3.5 bg-zinc-700 mx-0.5" />

export function CodeWidget({ code, runtime, height = 480 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [key, setKey] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const iframeHeight = expanded ? Math.max(height, 640) : height

  const srcdoc = useMemo(() => buildSrcdoc(code, runtime), [code, runtime])

  // Listen for download response from iframe
  useEffect(() => {
    function onMessage(evt: MessageEvent) {
      if (evt.data?.type === "__dl" && typeof evt.data.url === "string") {
        const a = document.createElement("a")
        a.href = evt.data.url
        a.download = "sketch.png"
        a.click()
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  function send(msg: string) {
    iframeRef.current?.contentWindow?.postMessage(msg, "*")
  }

  function restart() {
    setKey((k) => k + 1)
  }

  return (
    <div className="my-10 rounded-2xl border border-zinc-700/60 overflow-hidden bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
        {/* Left - runtime label */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">
            {runtime === "p5js" ? "p5.js sketch" : "JavaScript"}
          </span>
        </div>

        {/* Right - controls */}
        <div className="flex items-center gap-0.5">
          {/* Color + Download */}
          <button onClick={() => send("__rc")} className={BTN} title="Random colors">
            <Shuffle className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => send("__dl")} className={BTN} title="Download as PNG">
            <Download className="h-3.5 w-3.5" />
          </button>

          {DIVIDER}

          {/* Restart + Expand */}
          <button onClick={restart} className={BTN} title="Restart sketch">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className={BTN}
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Sandboxed iframe */}
      <iframe
        key={key}
        ref={iframeRef}
        srcDoc={srcdoc}
        sandbox="allow-scripts"
        style={{ width: "100%", height: iframeHeight, border: "none", display: "block" }}
        title="Interactive code widget"
      />
    </div>
  )
}
