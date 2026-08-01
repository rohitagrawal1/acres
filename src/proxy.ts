import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  // Verify the session
  const parsed = await decrypt(session || "");

  const isAuthRoute = pathname.startsWith("/login");
  const isPublicRoute =
    isAuthRoute ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/manifest") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webmanifest");

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access a protected route
  if (!parsed && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access login page
  if (parsed && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest|icon-|logo).*)"],
};
