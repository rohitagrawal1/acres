import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secretKey = process.env.SESSION_SECRET || "super-secret-local-fallback-key-acres-rescue-logger";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  if (!input) return null;
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
      clockTolerance: 60, // 60 seconds tolerance for system clock drift
    });
    return payload;
  } catch (error) {
    console.error("JWT decrypt error:", error);
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
