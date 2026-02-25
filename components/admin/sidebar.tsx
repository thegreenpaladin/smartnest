import { LayoutDashboard, Package, Layers, Settings, Users } from "lucide-react";
import Link from "next/link";
import { SidebarProfile } from "./sidebar-profile";

export function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/products", icon: Package },
    { name: "Collections", href: "/admin/collections", icon: Layers },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-white border-r border-neutral-100">
      <div className="mb-10 px-2 text-2xl font-serif tracking-tighter">
        SmartNest<span className="text-blue-600">.</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-black transition-all"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-50">
        <SidebarProfile />
      </div>
    </div>
  );
}
