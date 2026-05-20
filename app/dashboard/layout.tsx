import { AuthGuard } from "@/components/dashboard/AuthGuard"
import { Sidebar } from "@/components/dashboard/Sidebar"

export const metadata = {
  title: "Dashboard | AgileCoder",
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <Sidebar />
        <main className="ml-60 min-h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
