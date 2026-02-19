'use client';

import Script from 'next/script';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent') === 'accepted';
}

export function trackEvent(eventName: string, params?: Record<string, string>): void {
  if (!GA4_ID || !hasConsent()) return;
  (window as unknown as { gtag: (command: string, eventName: string, params?: Record<string, string>) => void }).gtag('event', eventName, params);
}

export function trackFBEvent(eventName: string, params?: Record<string, string>): void {
  if (!META_PIXEL_ID || !hasConsent()) return;
  (window as unknown as { fbq: (command: string, eventName: string, params?: Record<string, string>) => void }).fbq('track', eventName, params);
}

export function trackLead(source: string): void {
  trackEvent('generate_lead', { source });
  trackFBEvent('Lead', { source });
}

export function trackQuizComplete(profile: string): void {
  trackEvent('sign_up', { profile, method: 'quiz' });
  trackFBEvent('CompleteRegistration', { profile });
}

export function Analytics() {
  const consent = hasConsent();

  if (!consent) return null;

  return (
    <>
      {META_PIXEL_ID && (
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
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
      {GA4_ID && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
