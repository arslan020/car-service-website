"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef4ff] via-[#f5f9ff] to-white px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/business-logo.png"
            alt={site.name}
            width={160}
            height={48}
            className="h-auto w-36 object-contain"
            priority
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#e0ebff] bg-white p-8 shadow-lg shadow-[#3f63ff]/5">
          <h1 className="text-xl font-extrabold text-[#101a56]">Admin login</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to your dashboard</p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#d0dcea] bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#d0dcea] bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full rounded-xl bg-[#101a56] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] disabled:opacity-60"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          {site.name} &mdash; Admin area
        </p>
      </div>
    </div>
  );
}
