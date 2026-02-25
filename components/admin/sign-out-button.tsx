// components/admin/sign-out-button.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/sign-in" })}
      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all group"
    >
      <div className="p-2 rounded-lg group-hover:bg-red-100 transition-colors">
        <LogOut size={18} />
      </div>
      <span>Sign Out</span>
    </button>
  );
}