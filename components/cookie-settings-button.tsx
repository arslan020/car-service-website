"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("msc-cookie-settings"))}
      className="transition hover:text-slate-300"
    >
      Cookie settings
    </button>
  );
}
