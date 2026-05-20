"use client"
import { useEffect, useRef, useState } from "react"
import { Play, Pause, Square, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  text: string
  title: string
}

export function AudioPlayer({ text, title }: AudioPlayerProps) {
  const [supported, setSupported] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window)
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  function buildUtterance() {
    // Strip markdown symbols for cleaner TTS
    const cleaned = text
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, " ")
      .slice(0, 4000)

    const u = new SpeechSynthesisUtterance(cleaned)
    u.rate = 0.95
    u.pitch = 1
    u.onend = () => { setPlaying(false); setPaused(false) }
    u.onerror = () => { setPlaying(false); setPaused(false) }
    return u
  }

  function handlePlay() {
    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
      return
    }
    window.speechSynthesis.cancel()
    const u = buildUtterance()
    utteranceRef.current = u
    window.speechSynthesis.speak(u)
    setPlaying(true)
    setPaused(false)
  }

  function handlePause() {
    window.speechSynthesis.pause()
    setPaused(true)
  }

  function handleStop() {
    window.speechSynthesis.cancel()
    setPlaying(false)
    setPaused(false)
  }

  if (!supported) return null

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/40 w-fit">
      <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground hidden sm:block">Listen to article</span>
      <div className="flex items-center gap-1">
        {!playing || paused ? (
          <button
            onClick={handlePlay}
            className="p-1.5 rounded-lg hover:bg-background transition-colors text-foreground"
            aria-label="Play"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="p-1.5 rounded-lg hover:bg-background transition-colors text-foreground"
            aria-label="Pause"
          >
            <Pause className="h-4 w-4 fill-current" />
          </button>
        )}
        {playing && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-lg hover:bg-background transition-colors text-muted-foreground"
            aria-label="Stop"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>
        )}
      </div>
      {playing && !paused && (
        <span className="flex gap-0.5 items-end h-4">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-0.5 bg-primary rounded-full animate-pulse"
              style={{
                height: `${[60, 100, 80, 40][i - 1]}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </span>
      )}
    </div>
  )
}
