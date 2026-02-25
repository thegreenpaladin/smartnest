// app/(admin)/admin/layout.tsx
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen overflow-hidden bg-neutral-50">

        {/* 1. Fixed Sidebar Container */}
        <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white">
          <AdminSidebar />
        </aside>

        {/* 2. Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
  );
}