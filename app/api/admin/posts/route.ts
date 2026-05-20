import { NextResponse } from "next/server"
// This route is no longer needed - dashboard now reads directly from Firestore.
// Kept as a stub to avoid 404s from any cached references.
export async function GET() {
  return NextResponse.json([])
}
