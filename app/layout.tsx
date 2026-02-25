// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/cart-context";
// import { Navbar } from "@/components/layout/navbar";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F0F0F0]">
        <SessionProvider>
          <CartProvider>
            <main>{children}</main>
            <Toaster position="bottom-right" richColors />
            {/* <Footer /> */}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}