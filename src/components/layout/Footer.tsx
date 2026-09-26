import React from 'react';
import { trackEvent } from '../../services/analyticsService';
import { ProfitTraceLogo } from '../common/ProfitTraceLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings }) => {
  const handleNav = (path: string) => {
    trackEvent({ category: 'navigation', action: 'footer_nav_click', label: path });
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F2421] text-white border-t border-[#313A34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <ProfitTraceLogo height={38} variant="dark" />
            </div>
            <p className="text-[#A8CFA3] text-sm font-medium">
              See where your money is made. Trace where it leaks.
            </p>
            <p className="text-[#9BA59D] text-sm max-w-sm leading-relaxed">
              Business profitability and decision intelligence platform. Built for single-location retail stores, fuel station networks, restaurant chains, and multi-location enterprises.
            </p>
            <div className="pt-2 text-xs text-[#7A857D]">
              Demo environment clearly separated from live customer production data.
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8CFA3]">Product</h3>
            <ul className="space-y-2 text-sm text-[#CBD6CB]">
              <li>
                <button onClick={() => handleNav('/product')} className="hover:text-white transition-colors">
                  Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/dashboard')} className="hover:text-white transition-colors">
                  Interactive Demo Workspace
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#trace-engine')} className="hover:text-white transition-colors">
                  Profit Trace Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#what-if')} className="hover:text-white transition-colors">
                  What-If Simulator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#multi-location')} className="hover:text-white transition-colors">
                  Location Benchmarking
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8CFA3]">Solutions</h3>
            <ul className="space-y-2 text-sm text-[#CBD6CB]">
              <li>
                <button onClick={() => handleNav('/#solutions')} className="hover:text-white transition-colors">
                  Fuel Station Networks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#solutions')} className="hover:text-white transition-colors">
                  Retail Chains & Franchises
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#solutions')} className="hover:text-white transition-colors">
                  Food & Beverage Groups
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/enterprise')} className="hover:text-white transition-colors">
                  Enterprise Finance Teams
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/#data-import')} className="hover:text-white transition-colors">
                  CSV & POS Import
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8CFA3]">Trust & Legal</h3>
            <ul className="space-y-2 text-sm text-[#CBD6CB]">
              <li>
                <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors">
                  Contact Specialist
                </button>
              </li>
              <li>
                <button onClick={onOpenCookieSettings} className="hover:text-white transition-colors text-left">
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#313A34] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A857D] gap-4">
          <p>© {new Date().getFullYear()} ProfitTrace Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Independent business intelligence software. No customer data sold or trained on external open models.
          </p>
        </div>
      </div>
    </footer>
  );
};
