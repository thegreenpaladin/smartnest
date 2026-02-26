import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth?.user;
  const role = req.auth?.user?.role;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminSignIn = pathname === "/admin/sign-in";
  const isAccountRoute = pathname.startsWith("/account");
  const isAccountSignIn = pathname === "/account/sign-in";
  const isAccountRegister = pathname === "/account/register";

  if (isAdminRoute && !isAdminSignIn) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  if (isAdminSignIn && isLoggedIn && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isAccountRoute && !isAccountSignIn && !isAccountRegister && !isLoggedIn) {
    return NextResponse.redirect(new URL("/account/sign-in", req.url));
  }

  if ((isAccountSignIn || isAccountRegister) && isLoggedIn) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
