import React from 'react';
import { ArrowRight, Check, GitFork, SlidersHorizontal, MapPin, Layers, FileSpreadsheet, Shield } from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';

interface ProductPageProps {
  onNavigate: (path: string) => void;
  onOpenDemo: (target?: any) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate, onOpenDemo }) => {
  return (
    <div className="bg-white text-[#1F2421]">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Platform Overview
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1F2421]">
            Decision intelligence built around the profit waterfall
          </h1>
          <p className="text-base text-[#68716B] max-w-2xl mx-auto leading-relaxed">
            ProfitTrace replaces static charts with an active investigation chain, dissecting revenue through direct product costs, discount leakages, location operating burdens, and bottom-line retained cash.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                trackEvent({ category: 'conversion', action: 'product_page_demo_click' });
                onOpenDemo();
              }}
              className="px-6 py-3 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-2"
            >
              <span>Launch Demo Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#A8CFA3]" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive 1: Trace Engine */}
      <section className="py-20 border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-md bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center text-[#587C55]">
                <GitFork className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2421]">The Profit Trace Waterfall</h2>
              <p className="text-sm text-[#68716B] leading-relaxed">
                Traditional reporting groups revenue and expenses into monolithic monthly totals. ProfitTrace traces each product SKU or branch location through a rigorous 6-step value decomposition:
              </p>
              <ul className="space-y-2 text-xs text-[#1F2421]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#587C55] shrink-0 mt-0.5" />
                  <span><strong>1. Realized Revenue:</strong> Exact cash and credit realization before customer deductions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#587C55] shrink-0 mt-0.5" />
                  <span><strong>2. Direct Acquisition Cost:</strong> Wholesale invoices reconciled against physical meter throughput.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#587C55] shrink-0 mt-0.5" />
                  <span><strong>3. Commercial Discount Surcharges:</strong> Settlement rebates, card processing, and fleet allowances.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#587C55] shrink-0 mt-0.5" />
                  <span><strong>4. Site Operational Overhead:</strong> Direct shift labor, overtime, utilities, and location upkeep.</span>
                </li>
              </ul>
              <button
                onClick={() => onOpenDemo({ view: 'profit-trace' })}
                className="px-4 py-2 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] rounded-md transition-colors"
              >
                Inspect Live Trace Engine
              </button>
            </div>

            <div className="bg-[#F7FAF5] p-6 rounded-lg border border-[#E3E9E3] space-y-3 font-mono text-xs">
              <div className="font-bold text-[#587C55] uppercase text-[11px]">Trace Decomposition Example</div>
              <div className="p-3 bg-white border border-[#E3E9E3] rounded flex justify-between">
                <span>Gross Volume Revenue:</span>
                <span className="font-bold">₹48,60,000</span>
              </div>
              <div className="p-3 bg-white border border-[#E3E9E3] rounded flex justify-between">
                <span>Wholesale Acquisition:</span>
                <span className="text-[#D96B43] font-bold">-₹44,46,900</span>
              </div>
              <div className="p-3 bg-white border border-[#E3E9E3] rounded flex justify-between">
                <span>Direct Site OpEx:</span>
                <span className="text-[#D96B43] font-bold">-₹2,78,000</span>
              </div>
              <div className="p-3 bg-white border border-[#587C55] rounded flex justify-between font-bold text-[#587C55]">
                <span>Retained Net Contribution:</span>
                <span>₹1,35,100 (8.5% Margin)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive 2: What-If Simulator */}
      <section className="py-20 border-b border-[#E3E9E3] bg-[#F7FAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-6 rounded-lg border border-[#E3E9E3] space-y-4">
              <span className="text-xs font-mono text-[#587C55] uppercase font-bold">Simulator Interface Preview</span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#F7FAF5] rounded flex justify-between">
                  <span>Target: Premium Fuel (XP95)</span>
                  <span className="font-bold">List: ₹104.0 / L</span>
                </div>
                <div className="p-2.5 bg-[#F7FAF5] rounded flex justify-between">
                  <span>Proposed Selling Price:</span>
                  <span className="font-bold text-[#587C55]">₹106.50 (+₹2.50)</span>
                </div>
                <div className="p-2.5 bg-[#F7FAF5] rounded flex justify-between">
                  <span>Assumed Volume Elasticity:</span>
                  <span className="font-bold text-[#D96B43]">-2.0% Volume</span>
                </div>
                <div className="p-3 bg-[#F7FAF5] border border-[#A8CFA3] rounded flex justify-between font-bold text-[#1F2421]">
                  <span>Projected Contribution Gain:</span>
                  <span className="text-[#587C55]">+₹68,400 / month</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-md bg-white border border-[#CBD6CB] flex items-center justify-center text-[#587C55]">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2421]">Dynamic What-If Simulation</h2>
              <p className="text-sm text-[#68716B] leading-relaxed">
                Before altering retail prices, committing to supplier contracts, or granting commercial fleet discounts, simulate the cascading outcome. ProfitTrace dynamically recalibrates gross profits, margins, and bottom-line contributions in real time.
              </p>
              <button
                onClick={() => onOpenDemo({ view: 'what-if' })}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors"
              >
                Launch What-If Simulator
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
