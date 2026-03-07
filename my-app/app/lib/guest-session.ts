"use client";

const GUEST_SESSION_KEY = "vs_guest_session_id";
const GUEST_SESSION_COOKIE = "vs_guest_session_id";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function createGuestSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `guest_${crypto.randomUUID()}`;
  }

  return `guest_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function persistGuestSessionId(value: string) {
  localStorage.setItem(GUEST_SESSION_KEY, value);
  document.cookie = `${GUEST_SESSION_COOKIE}=${value}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; SameSite=Lax`;
}

export function getGuestSessionId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(GUEST_SESSION_KEY);
}

export function getOrCreateGuestSessionId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = getGuestSessionId();
  if (existing) {
    return existing;
  }

  const created = createGuestSessionId();
  persistGuestSessionId(created);
  return created;
}
