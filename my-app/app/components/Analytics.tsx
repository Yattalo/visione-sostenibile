"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  ANALYTICS_CONSENT_EVENT,
  applyGoogleConsentMode,
  analyticsConfig,
  getAnalyticsConsent,
  getCookiePreferences,
  hasCustomScriptConsent,
  registerWindowAnalytics,
  trackPageView,
} from "../lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [preferences, setPreferences] = useState(getCookiePreferences());
  const hasInitializedConsentMode = useRef(false);

  const currentUrl = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
    registerWindowAnalytics();

    const onConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<"accepted" | "rejected">;
      setConsent(customEvent.detail ?? getAnalyticsConsent());
      setPreferences(getCookiePreferences());
    };

    const onStorage = () => {
      setConsent(getAnalyticsConsent());
      setPreferences(getCookiePreferences());
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, onConsentChange as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, onConsentChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    applyGoogleConsentMode(
      preferences,
      hasInitializedConsentMode.current ? "update" : "default"
    );
    hasInitializedConsentMode.current = true;
  }, [preferences]);

  useEffect(() => {
    if (consent !== "accepted") return;
    trackPageView(currentUrl);
  }, [consent, currentUrl]);

  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      {preferences.analytics && analyticsConfig.gtmId && (
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${analyticsConfig.gtmId}');
            `,
          }}
        />
      )}

      {preferences.analytics && analyticsConfig.ga4Id && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4Id}`}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){window.dataLayer.push(arguments);};
                gtag('js', new Date());
                gtag('config', '${analyticsConfig.ga4Id}', { send_page_view: false });
              `,
            }}
          />
        </>
      )}

      {preferences.marketing && analyticsConfig.metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${analyticsConfig.metaPixelId}');
            `,
          }}
        />
      )}

      {preferences.analytics && analyticsConfig.clarityId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${analyticsConfig.clarityId}");
            `,
          }}
        />
      )}

      {preferences.marketing && analyticsConfig.linkedInPartnerId && (
        <>
          <Script
            id="linkedin-partner"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window._linkedin_partner_id = "${analyticsConfig.linkedInPartnerId}";
                window.lintrk = window.lintrk || function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q = window.lintrk.q || [];
              `,
            }}
          />
          <Script
            id="linkedin-insight"
            strategy="afterInteractive"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
          />
        </>
      )}

      {hasCustomScriptConsent() && analyticsConfig.customScriptUrls.map((src, index) => (
        <Script
          key={src}
          id={`custom-analytics-${index}`}
          src={src}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
