"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, MoreVertical, User } from "lucide-react";
import { useState } from "react";

export function SidebarProfile() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 w-full p-2 animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-neutral-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-neutral-100 rounded w-1/2" />
          <div className="h-2 bg-neutral-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-2 p-2 bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => signOut({ callbackUrl: "/account/sign-in" })}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 w-full p-2 rounded-2xl transition-all ${
          isOpen ? "bg-neutral-50" : "hover:bg-neutral-50"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
          <User size={20} />
        </div>

        <div className="flex-1 text-left overflow-hidden">
          <p className="text-sm font-bold truncate">{session.user.role === "ADMIN" ? "Administrator" : "Customer"}</p>
          <p className="text-[10px] text-neutral-400 truncate uppercase tracking-tighter">{session.user.email}</p>
        </div>

        <MoreVertical size={16} className="text-neutral-400 shrink-0" />
      </button>
    </div>
  );
}
