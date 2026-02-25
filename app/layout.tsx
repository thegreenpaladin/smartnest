import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F0F0F0]">
        <Providers>
          <main>{children}</main>
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
