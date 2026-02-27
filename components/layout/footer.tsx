import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-300 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <p className="text-lg font-semibold tracking-tight">SmartNest™</p>
          <p className="text-sm text-neutral-500">Smart gadgets and electronics for modern everyday living.</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Company</p>
          <div className="space-y-1 text-sm">
            <Link href="/about" className="block hover:underline">About</Link>
            <Link href="/collections" className="block hover:underline">Collections</Link>
            <Link href="/shop" className="block hover:underline">Shop</Link>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Social</p>
          <div className="space-y-1 text-sm">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block hover:underline">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="block hover:underline">Facebook</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="block hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-6 py-4 text-xs text-neutral-500 text-center">
        © {new Date().getFullYear()} SmartNest™. All rights reserved.
      </div>
    </footer>
  );
}
