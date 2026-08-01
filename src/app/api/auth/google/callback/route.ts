import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=google_cancelled", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", request.url));
  }

  try {
    // 1. Exchange code for access & ID tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token exchange error:", tokenData);
      return NextResponse.redirect(new URL("/login?error=google_token_failed", request.url));
    }

    // 2. Fetch user profile using access_token
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userResponse.json();

    if (!googleUser.email) {
      return NextResponse.redirect(new URL("/login?error=google_no_email", request.url));
    }

    // 3. Upsert user in database
    const user = await prisma.user.upsert({
      where: { email: googleUser.email },
      update: {
        googleId: googleUser.id,
        name: googleUser.name || googleUser.email.split("@")[0],
      },
      create: {
        email: googleUser.email,
        name: googleUser.name || googleUser.email.split("@")[0],
        googleId: googleUser.id,
        role: "RESCUER",
      },
    });

    // 4. Create JWT session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ id: user.id, email: user.email, role: user.role, name: user.name });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (err: any) {
    console.error("Google auth callback error:", err);
    return NextResponse.redirect(new URL("/login?error=google_auth_failed", request.url));
  }
}
