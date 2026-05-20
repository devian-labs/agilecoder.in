"use client"
import { useRef, useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Props {
  value?: string
  onChange: (url: string) => void
}

export function CoverImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  async function upload(file: File) {
    setUploading(true)
    const id = toast.loading("Uploading image…")
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/cloudinary/upload", { method: "POST", body: form })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
        toast.success("Image uploaded", { id })
      } else {
        toast.error(data.error ?? "Upload failed", { id })
      }
    } catch {
      toast.error("Upload failed — check your connection", { id })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      {value ? (
        <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-100">
          <img src={value} alt="Cover" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-xs hover:bg-black/70 transition-colors"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-zinc-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-3 text-zinc-400 hover:text-blue-500 transition-all"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-sm font-medium">Upload cover image</span>
              <span className="text-xs">PNG, JPG, WebP — recommended 1200×630</span>
            </>
          )}
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) upload(f)
          e.target.value = ""
        }}
      />
    </div>
  )
}
