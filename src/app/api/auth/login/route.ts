import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function getRedirectUrl(request: Request, path: string): URL {
  const host = request.headers.get("host") || request.headers.get("x-forwarded-host");
  const proto = request.headers.get("x-forwarded-proto") || "http";
  if (host) {
    return new URL(path, `${proto}://${host}`);
  }
  return new URL(path, request.url);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let email = "";
    let password = "";
    let isJson = false;

    if (contentType.includes("application/json")) {
      isJson = true;
      const body = await request.json();
      email = body.email || "";
      password = body.password || "";
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      email = params.get("email") || "";
      password = params.get("password") || "";
    } else {
      const formData = await request.formData();
      email = (formData.get("email") as string) || "";
      password = (formData.get("password") as string) || "";
    }

    if (!email || !password) {
      if (isJson) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
      }
      return NextResponse.redirect(getRedirectUrl(request, "/login?error=missing_fields"), 303);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash || !(await comparePassword(password, user.passwordHash))) {
      if (isJson) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      return NextResponse.redirect(getRedirectUrl(request, "/login?error=invalid_credentials"), 303);
    }

    // Create session JWT
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ id: user.id, email: user.email, role: user.role, name: user.name });

    // Set cookie using next/headers cookieStore (guarantees cookie is preserved across redirects!)
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    if (isJson) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(getRedirectUrl(request, "/"), 303);
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.redirect(getRedirectUrl(request, "/login?error=server_error"), 303);
  }
}
