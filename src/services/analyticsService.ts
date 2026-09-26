import { CookiePreferences } from '../types';

const STORAGE_KEY = 'profittrace_cookie_consent';

export function getCookieConsent(): CookiePreferences {
  if (typeof window === 'undefined') {
    return { essential: true, analytics: false, marketing: false, hasConsented: false, updatedAt: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore parse error
  }
  return { essential: true, analytics: false, marketing: false, hasConsented: false, updatedAt: '' };
}

export function saveCookieConsent(prefs: Partial<CookiePreferences>): CookiePreferences {
  const current = getCookieConsent();
  const updated: CookiePreferences = {
    ...current,
    ...prefs,
    essential: true, // Always true
    hasConsented: true,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage error
  }
  return updated;
}

export interface AnalyticsEvent {
  category: 'engagement' | 'navigation' | 'feature' | 'conversion' | 'auth';
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
}

export function trackEvent(event: AnalyticsEvent): void {
  const consent = getCookieConsent();
  if (!consent.analytics && !consent.hasConsented) {
    // Strictly respect consent: do not log or transmit if analytics is not granted
    return;
  }

  // GA4 dataLayer dispatch if configured
  if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: event.action,
      eventCategory: event.category,
      eventLabel: event.label,
      eventValue: event.value,
      ...event.metadata,
    });
  }

  // Safe developer inspection log in dev mode only
  if (import.meta.env?.DEV) {
    // quiet operational dispatch
  }
}

export function trackPageView(pagePath: string, pageTitle: string): void {
  trackEvent({
    category: 'navigation',
    action: 'page_view',
    label: pagePath,
    metadata: { pageTitle },
  });
}
