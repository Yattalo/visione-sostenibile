"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import {
  ANALYTICS_CONSENT_EVENT,
  CookiePreferences as CookiePreferencesType,
  getCookiePreferences,
  setCookiePreferences,
} from "../lib/analytics";

export const COOKIE_PREFERENCES_OPEN_EVENT = "vs:cookie-preferences-open";

const defaultPreferences = (): CookiePreferencesType => getCookiePreferences();

export function CookiePreferences() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferencesType>(defaultPreferences);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setPreferences(getCookiePreferences());
    const openPanel = () => {
      sync();
      setOpen(true);
    };

    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPanel);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);

    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPanel);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-forest-950/60 backdrop-blur-sm px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        aria-describedby="cookie-preferences-description"
        className="mx-auto max-w-2xl rounded-[28px] border border-paper-300 bg-paper-50 p-6 shadow-floating outline-none md:p-8"
      >
        <div className="mb-6">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-leaf-600">
            Preferenze Cookie
          </p>
          <h2 id="cookie-preferences-title" className="mt-2 font-display text-3xl text-forest-950">
            Scegli cosa attivare
          </h2>
          <p
            id="cookie-preferences-description"
            className="mt-3 font-body text-sm leading-relaxed text-forest-800/75"
          >
            I cookie necessari restano sempre attivi. Puoi attivare o disattivare analytics,
            marketing e script custom in qualsiasi momento.
          </p>
        </div>

        <div className="space-y-4">
          <PreferenceRow
            title="Necessari"
            description="Servono al funzionamento del sito, del consenso e del salvataggio della sessione guest."
            checked
            disabled
            onChange={() => undefined}
          />
          <PreferenceRow
            title="Analytics"
            description="GA4, Clarity e misurazioni aggregate su navigazione, funnel e performance."
            checked={preferences.analytics}
            onChange={(checked) => setPreferences((prev) => ({ ...prev, analytics: checked }))}
          />
          <PreferenceRow
            title="Marketing"
            description="Pixel pubblicitari e misurazione campagne, inclusi Meta e LinkedIn."
            checked={preferences.marketing}
            onChange={(checked) => setPreferences((prev) => ({ ...prev, marketing: checked }))}
          />
          <PreferenceRow
            title="Script custom"
            description="Script analitici o di misurazione aggiuntivi caricati via configurazione."
            checked={preferences.custom}
            onChange={(checked) => setPreferences((prev) => ({ ...prev, custom: checked }))}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Chiudi
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const next = {
                necessary: true as const,
                analytics: false,
                marketing: false,
                custom: false,
              };
              setPreferences(next);
              setCookiePreferences(next);
              setOpen(false);
            }}
          >
            Solo necessari
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setCookiePreferences(preferences);
              setOpen(false);
            }}
          >
            Salva preferenze
          </Button>
        </div>
      </div>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-paper-300 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-forest-950">
            {title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-forest-800/70">
            {description}
          </p>
        </div>
        <label className="inline-flex items-center gap-2">
          <span className="sr-only">{title}</span>
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-paper-400 text-leaf-600 focus:ring-leaf-500"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
