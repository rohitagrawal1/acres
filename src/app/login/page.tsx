"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "invalid_credentials") {
      setError("Invalid email or password.");
    } else if (err === "missing_fields") {
      setError("Email and password are required.");
    } else if (err === "google_not_configured") {
      setError("Google Sign-In is not configured yet. Please add GOOGLE_CLIENT_ID to .env or log in using email/password.");
    } else if (err === "google_cancelled") {
      setError("Google Sign-In was cancelled.");
    } else if (err === "google_auth_failed" || err === "google_token_failed") {
      setError("Failed to authenticate with Google. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-sm space-y-6 bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800/80 shadow-[0_0_50px_rgba(0,163,224,0.1)] backdrop-blur-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center mx-auto mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="ACRES Logo"
            className="h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,163,224,0.7)]"
          />
        </div>
        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
          ACRES Rescue Logger
        </h2>
        <p className="text-zinc-400 mt-1.5 text-xs font-medium">Animal Concerns Research & Education Society</p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-2xl text-xs leading-relaxed">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <a
        href="/api/auth/google"
        className="w-full flex items-center justify-center gap-3 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 font-medium text-sm py-3 px-4 rounded-xl border border-zinc-700/60 transition-all active:scale-[0.98] shadow-sm hover:border-zinc-600"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign in with Google</span>
      </a>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-zinc-800 w-full" />
        <span className="bg-zinc-900 px-3 text-xs text-zinc-500 font-medium uppercase tracking-wider absolute">
          or
        </span>
      </div>

      {/* Native Form Post for Maximum Cross-Device/Mobile Browser Compatibility */}
      <form method="POST" action="/api/auth/login" className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-zinc-600 text-sm"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-zinc-600 text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-base py-3 rounded-xl mt-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          Sign In with Email
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-zinc-500 text-sm">Loading...</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
