import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { getCookieConsent, saveCookieConsent } from '../../services/analyticsService';
import { CookiePreferences } from '../../types';

interface CookieConsentProps {
  forceOpenSettings?: boolean;
  onCloseSettings?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  forceOpenSettings = false,
  onCloseSettings,
}) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(getCookieConsent());
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const current = getCookieConsent();
    setPreferences(current);
    if (!current.hasConsented) {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (forceOpenSettings) {
      setShowModal(true);
    }
  }, [forceOpenSettings]);

  const handleAcceptAll = () => {
    const updated = saveCookieConsent({ essential: true, analytics: true, marketing: false });
    setPreferences(updated);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseSettings) onCloseSettings();
  };

  const handleRejectNonEssential = () => {
    const updated = saveCookieConsent({ essential: true, analytics: false, marketing: false });
    setPreferences(updated);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseSettings) onCloseSettings();
  };

  const handleSaveCustom = () => {
    const updated = saveCookieConsent(preferences);
    setPreferences(updated);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseSettings) onCloseSettings();
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      {showBanner && !showModal && (
        <aside
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-[#1F2421] text-white p-5 rounded-lg border border-[#313A34] shadow-xl"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#A8CFA3] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white">Privacy and Cookie Preferences</h3>
                <p className="text-xs text-[#CBD6CB] mt-1 leading-relaxed">
                  ProfitTrace uses strictly necessary cookies for application state and authentication. Optional analytics help us understand feature utilization to refine profitability workflows. We never sell data.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#313A34]">
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-1.5 text-xs text-[#CBD6CB] hover:text-white transition-colors underline focus-visible:outline-none"
              >
                Manage Preferences
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 text-xs font-medium text-white border border-[#49544D] hover:bg-[#2A312D] rounded-md transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-3.5 py-1.5 text-xs font-medium text-[#1F2421] bg-[#A8CFA3] hover:bg-[#97BF92] rounded-md transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
          <div className="bg-white rounded-lg border border-[#E3E9E3] max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E9E3]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#587C55]" />
                <h2 id="cookie-modal-title" className="text-base font-bold text-[#1F2421]">Cookie & Privacy Settings</h2>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  if (onCloseSettings) onCloseSettings();
                }}
                className="text-[#68716B] hover:text-[#1F2421] p-1 rounded-md"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#1F2421]">
              <div className="p-3 bg-[#F7FAF5] rounded-md border border-[#E3E9E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Essential Cookies</span>
                  <span className="text-[11px] font-mono text-[#587C55] font-semibold">Always Active</span>
                </div>
                <p className="text-[#68716B]">
                  Required for core platform navigation, active session tokens, security verification, and workspace state storage.
                </p>
              </div>

              <div className="p-3 bg-white rounded-md border border-[#E3E9E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Product Performance & Usage Analytics</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#587C55] focus:ring-[#587C55]"
                    id="analytics-cookie-toggle"
                  />
                </div>
                <p className="text-[#68716B]">
                  Helps analyze which calculation modules, export templates, and What-If models are most effective. No financial data or identifiers are shared.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E3E9E3]">
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-2 text-xs font-medium text-[#68716B] hover:text-[#1F2421] transition-colors"
              >
                Reject Non-Essential
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 text-xs font-medium text-[#1F2421] border border-[#E3E9E3] hover:bg-[#F7FAF5] rounded-md transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
