import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

function sign(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&")
  return crypto.createHash("sha256").update(sorted + API_SECRET).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const timestamp = String(Math.floor(Date.now() / 1000))
    const folder = "agilecoder"
    const signature = sign({ folder, timestamp })

    const upload = new FormData()
    upload.append("file", file)
    upload.append("api_key", API_KEY)
    upload.append("timestamp", timestamp)
    upload.append("signature", signature)
    upload.append("folder", folder)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
      method: "POST",
      body: upload,
    })

    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: data.error?.message }, { status: 400 })

    return NextResponse.json({ url: data.secure_url, public_id: data.public_id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
