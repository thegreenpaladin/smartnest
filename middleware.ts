export { auth as middleware } from "@/auth";

export const config = {
  // Protect all routes under /admin except for the sign-in page itself
  matcher: ["/admin/:path*"],
};