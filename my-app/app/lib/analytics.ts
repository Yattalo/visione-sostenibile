"use client";

export const ANALYTICS_CONSENT_KEY = "cookie_consent";
export const ANALYTICS_CONSENT_EVENT = "vs:analytics-consent";
export const ANALYTICS_EVENT_NAME = "vs:analytics-event";
export const ANALYTICS_PREFERENCES_KEY = "cookie_preferences";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
type ConsentState = "accepted" | "rejected";
type GoogleConsentValue = "granted" | "denied";
export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  custom: boolean;
};

export const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID?.trim(),
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim(),
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim(),
  clarityId: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID?.trim(),
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID?.trim(),
  customScriptUrls: (process.env.NEXT_PUBLIC_CUSTOM_ANALYTICS_SCRIPTS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  debug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true",
} as const;

const DEFAULT_REJECTED_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  custom: false,
};

const DEFAULT_ACCEPTED_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  custom: true,
};

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    vsAnalytics?: {
      page: (url: string) => void;
      track: (eventName: string, params?: AnalyticsParams) => void;
    };
  }
}

function serializeParams(params?: AnalyticsParams) {
  if (!params) return {};
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );
}

function dispatchAnalyticsEvent(eventName: string, payload: Record<string, unknown>) {
  document.dispatchEvent(
    new CustomEvent(ANALYTICS_EVENT_NAME, {
      detail: {
        eventName,
        payload,
      },
    })
  );
}

function pushDataLayer(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function getAnalyticsConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const consent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return consent === "accepted" || consent === "rejected" ? consent : null;
}

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return DEFAULT_REJECTED_PREFERENCES;
  }

  const saved = localStorage.getItem(ANALYTICS_PREFERENCES_KEY);
  if (!saved) {
    return getAnalyticsConsent() === "accepted"
      ? DEFAULT_ACCEPTED_PREFERENCES
      : DEFAULT_REJECTED_PREFERENCES;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      custom: Boolean(parsed.custom),
    };
  } catch {
    return DEFAULT_REJECTED_PREFERENCES;
  }
}

export function hasAnalyticsConsent() {
  return getCookiePreferences().analytics;
}

export function hasMarketingConsent() {
  return getCookiePreferences().marketing;
}

export function hasCustomScriptConsent() {
  return getCookiePreferences().custom;
}

export function setAnalyticsConsent(consent: ConsentState) {
  setCookiePreferences(
    consent === "accepted" ? DEFAULT_ACCEPTED_PREFERENCES : DEFAULT_REJECTED_PREFERENCES
  );
}

export function setCookiePreferences(preferences: CookiePreferences) {
  if (typeof window === "undefined") return;
  const consent: ConsentState =
    preferences.analytics || preferences.marketing || preferences.custom
      ? "accepted"
      : "rejected";

  localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  localStorage.setItem(ANALYTICS_PREFERENCES_KEY, JSON.stringify(preferences));
  document.cookie = `${ANALYTICS_CONSENT_KEY}=${consent}; Max-Age=31536000; Path=/; SameSite=Lax`;
  document.cookie = `${ANALYTICS_PREFERENCES_KEY}=${encodeURIComponent(
    JSON.stringify(preferences)
  )}; Max-Age=31536000; Path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: consent }));
}

function toGoogleConsentValue(granted: boolean): GoogleConsentValue {
  return granted ? "granted" : "denied";
}

export function applyGoogleConsentMode(
  preferences: CookiePreferences,
  mode: "default" | "update" = "update"
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  const consentState = {
    analytics_storage: toGoogleConsentValue(preferences.analytics),
    ad_storage: toGoogleConsentValue(preferences.marketing),
    ad_user_data: toGoogleConsentValue(preferences.marketing),
    ad_personalization: toGoogleConsentValue(preferences.marketing),
  } as const;

  window.gtag("consent", mode, {
    ...consentState,
    ...(mode === "default" ? { wait_for_update: 500 } : {}),
  });
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  const payload = serializeParams(params);
  pushDataLayer({ event: eventName, ...payload });

  if (hasAnalyticsConsent() && analyticsConfig.ga4Id && typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (hasMarketingConsent() && analyticsConfig.metaPixelId && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }

  if (hasAnalyticsConsent() && analyticsConfig.clarityId && typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }

  dispatchAnalyticsEvent(eventName, payload);
}

export function trackPageView(url: string): void {
  if (typeof window === "undefined") return;

  const payload = {
    page_location: url,
    page_path: window.location.pathname,
    page_title: document.title,
  };

  pushDataLayer({ event: "page_view", ...payload });

  if (hasAnalyticsConsent() && analyticsConfig.ga4Id && typeof window.gtag === "function") {
    window.gtag("event", "page_view", payload);
  }

  if (hasMarketingConsent() && analyticsConfig.metaPixelId && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }

  dispatchAnalyticsEvent("page_view", payload);
}

export function trackLead(source: string): void {
  trackEvent("generate_lead", { source });

  if (
    typeof window !== "undefined" &&
    analyticsConfig.metaPixelId &&
    typeof window.fbq === "function" &&
    hasMarketingConsent()
  ) {
    window.fbq("track", "Lead", { source });
  }
}

export function trackQuizComplete(profile: string): void {
  trackEvent("quiz_completed", { profile, method: "quiz" });

  if (
    typeof window !== "undefined" &&
    analyticsConfig.metaPixelId &&
    typeof window.fbq === "function" &&
    hasMarketingConsent()
  ) {
    window.fbq("track", "CompleteRegistration", { profile });
  }
}

export function registerWindowAnalytics() {
  if (typeof window === "undefined") return;

  window.vsAnalytics = {
    page: trackPageView,
    track: trackEvent,
  };
}
