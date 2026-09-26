import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Layers,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  Building2,
  Fuel,
  Store,
  Utensils,
  ChevronDown,
  Check,
  Shield,
  Lock,
  Database,
  LineChart,
  ArrowUpRight,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';

interface LandingPageProps {
  onNavigate: (path: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenDemo: (target?: { view: string; targetId?: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenAuth, onOpenDemo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeScaleTab, setActiveScaleTab] = useState<'small' | 'medium' | 'large'>('medium');

  const faqs = [
    {
      q: 'How is ProfitTrace different from traditional accounting software or BI dashboards?',
      a: 'Accounting software reports what happened in aggregate for tax and compliance. Traditional BI dashboards show charts of sales and expenses. ProfitTrace specifically identifies where margin is leaking across locations, products, and shifts by computing step-by-step contribution waterfalls and pinpointing root causes such as wholesale cost creep, excessive discounts, or labor overtime.',
    },
    {
      q: 'Can ProfitTrace connect to our existing POS or fuel dispenser automation system?',
      a: 'Yes. ProfitTrace ingests transaction files via clean CSV mapping, direct database staging tables, or automated API endpoints. We support standard retail POS export structures, fuel terminal dispenser telemetry, and ERP expense extracts.',
    },
    {
      q: 'How does the "Trace Profit" engine work?',
      a: 'When you select any product, branch, or station, the Trace engine decomposes realized revenue through units sold, wholesale cost of goods, transaction-level discounts, direct location operating expenses, and net contribution. It automatically calculates the variance drivers against prior benchmarks.',
    },
    {
      q: 'Is ProfitTrace suited for a single location or only multi-site networks?',
      a: 'ProfitTrace is designed for businesses of all scales. A single petrol pump or retail shop uses ProfitTrace to track product margin dilution and daily cash-to-credit leakages. Multi-location enterprise chains use it to benchmark performance variance and enforce regional pricing discipline.',
    },
    {
      q: 'How is our business financial data protected?',
      a: 'We enforce strict multi-tenant isolation, encrypted storage at rest with AES-256, and TLS 1.3 in transit. We do not sell data, share numbers with third parties, or use your private transactions to train shared AI models.',
    },
  ];

  return (
    <div className="bg-white text-[#1F2421]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
              <span className="w-2 h-2 rounded-full bg-[#587C55]"></span>
              <span>Decision Intelligence & Profitability Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2421] leading-tight">
              Trace where your business makes money, and where it loses it.
            </h1>

            <p className="text-base sm:text-lg text-[#68716B] leading-relaxed max-w-2xl mx-auto">
              ProfitTrace turns sales, cost, inventory, and operational data into clear profitability signals, helping teams identify margin pressure, cost increases, weak products, underperforming locations, and opportunities worth investigating.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  trackEvent({ category: 'conversion', action: 'hero_explore_click' });
                  onOpenDemo();
                }}
                className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] transition-all rounded-md shadow-xs flex items-center justify-center gap-2"
              >
                <span>Explore ProfitTrace</span>
                <ArrowRight className="w-4 h-4 text-[#A8CFA3]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('product-preview');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 text-base font-medium text-[#1F2421] bg-white border border-[#CBD6CB] hover:bg-[#F7FAF5] transition-colors rounded-md"
              >
                See the product
              </button>
            </div>

            <p className="text-xs text-[#68716B] pt-1">
              Built for businesses from one location to enterprise networks.
            </p>
          </div>

          {/* Realistic Dashboard Preview */}
          <div id="product-preview" className="mt-14 max-w-5xl mx-auto bg-white rounded-lg border border-[#E3E9E3] shadow-lg overflow-hidden">
            {/* Window bar */}
            <div className="bg-[#1F2421] px-4 py-2.5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3E9E3]/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3E9E3]/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3E9E3]/30"></span>
                <span className="ml-2 font-mono text-[11px] text-[#A8CFA3]">ProfitTrace Demo Workspace: GreenFuel Network</span>
              </div>
              <div className="flex items-center gap-3 text-[#A8CFA3]">
                <span className="font-mono text-[11px]">Period: Last 30 Days</span>
                <button
                  onClick={() => onOpenDemo()}
                  className="px-2 py-0.5 bg-[#587C55] text-white rounded text-[11px] font-medium hover:bg-[#6a9566] transition-colors"
                >
                  Open Full Interactive App
                </button>
              </div>
            </div>

            {/* Dashboard Content Teaser */}
            <div className="p-6 bg-white space-y-6">
              {/* Top KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md">
                  <div className="text-xs text-[#68716B] font-medium">Monthly Revenue</div>
                  <div className="text-xl font-bold text-[#1F2421] mt-1 font-mono">₹1,42,80,000</div>
                  <div className="text-[11px] text-[#587C55] font-medium mt-1">↑ +8.2% vs prior month</div>
                </div>

                <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md">
                  <div className="text-xs text-[#68716B] font-medium">Gross Trading Profit</div>
                  <div className="text-xl font-bold text-[#1F2421] mt-1 font-mono">₹14,99,400</div>
                  <div className="text-[11px] text-[#D96B43] font-medium mt-1">↓ -1.2% profit compression</div>
                </div>

                <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md">
                  <div className="text-xs text-[#68716B] font-medium">Blended Profit Margin</div>
                  <div className="text-xl font-bold text-[#1F2421] mt-1 font-mono">10.5%</div>
                  <div className="text-[11px] text-[#D96B43] font-medium mt-1">↓ 100 bps margin contraction</div>
                </div>

                <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md">
                  <div className="text-xs text-[#68716B] font-medium">Active Margin Leaks</div>
                  <div className="text-xl font-bold text-[#D96B43] mt-1 font-mono">2 Sites Flagged</div>
                  <div className="text-[11px] text-[#68716B] mt-1">Station B & Station D</div>
                </div>
              </div>

              {/* Profit Trace Interactive Preview Banner */}
              <div className="p-4 bg-[#F7FAF5] border border-[#A8CFA3] rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#D96B43]/15 text-[#D96B43] text-[11px] font-semibold rounded">
                      Leak Signal Detected
                    </span>
                    <span className="font-semibold text-sm text-[#1F2421]">Station B (Industrial Bypass)</span>
                  </div>
                  <p className="text-xs text-[#68716B]">
                    Highest top-line sales (₹48.6L), but lowest net contribution margin (8.5%). Fuel acquisition surge, fleet discounts, and overtime staffing.
                  </p>
                </div>
                <button
                  onClick={() => onOpenDemo({ view: 'profit-trace', targetId: 'loc-sta-b' })}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Trace This Result</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
                </button>
              </div>

              {/* Trace Waterfall Graphic snippet */}
              <div className="border border-[#E3E9E3] rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#68716B]">
                  <span>HOW THE TRACE WATERFALL DECOMPOSES REVENUE INTO NET CASH</span>
                  <span className="font-mono text-[#587C55]">Data → Analysis → Trace → Action</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white border border-[#E3E9E3] rounded">
                    <div className="text-[11px] text-[#68716B]">1. Revenue</div>
                    <div className="font-bold font-mono text-[#1F2421] mt-0.5">₹48.6L</div>
                    <div className="text-[10px] text-[#587C55]">Top Volume</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E3E9E3] rounded">
                    <div className="text-[11px] text-[#68716B]">2. Realized Price</div>
                    <div className="font-bold font-mono text-[#1F2421] mt-0.5">₹88.0/L</div>
                    <div className="text-[10px] text-[#68716B]">Diesel Mix</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E3E9E3] rounded">
                    <div className="text-[11px] text-[#68716B]">3. Acquisition Cost</div>
                    <div className="font-bold font-mono text-[#D96B43] mt-0.5">₹44.4L</div>
                    <div className="text-[10px] text-[#D96B43]">Wholesale +9.8%</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E3E9E3] rounded">
                    <div className="text-[11px] text-[#68716B]">4. Gross Margin</div>
                    <div className="font-bold font-mono text-[#1F2421] mt-0.5">₹4.13L</div>
                    <div className="text-[10px] text-[#D96B43]">8.5% Rate</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E3E9E3] rounded">
                    <div className="text-[11px] text-[#68716B]">5. Direct OpEx</div>
                    <div className="font-bold font-mono text-[#D96B43] mt-0.5">₹2.78L</div>
                    <div className="text-[10px] text-[#D96B43]">Overtime Peak</div>
                  </div>
                  <div className="p-2.5 bg-[#F7FAF5] border border-[#587C55] rounded">
                    <div className="text-[11px] text-[#587C55] font-semibold">6. Net Contribution</div>
                    <div className="font-bold font-mono text-[#1F2421] mt-0.5">₹1.35L</div>
                    <div className="text-[10px] text-[#D96B43]">Leak Source</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-20 bg-white border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">The Profitability Dilemma</h2>
            <p className="text-2xl sm:text-4xl font-bold text-[#1F2421]">
              Why growing sales does not guarantee growing profit
            </p>
            <p className="text-sm sm:text-base text-[#68716B] leading-relaxed">
              Most businesses monitor revenue through POS terminals and bank receipts. But without granular margin attribution, quiet leaks compound across locations and products unnoticed.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#E3E9E3] flex items-center justify-center text-[#D96B43]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2421]">The Top-Line Illusion</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Sales numbers can show record growth while actual retained margin dollars shrink due to shifting product mix and unmonitored discount concessions.
              </p>
            </div>

            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#E3E9E3] flex items-center justify-center text-[#D96B43]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2421]">Hidden Cost Creeping</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Wholesale acquisition costs, freight surcharges, and payment gateway fees rise incrementally without immediate retail pricing adjustments.
              </p>
            </div>

            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#E3E9E3] flex items-center justify-center text-[#587C55]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2421]">Location Variance</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                One high-performing branch often masks substantial operational waste, excessive shift overtime, or inventory theft in another branch.
              </p>
            </div>

            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#E3E9E3] flex items-center justify-center text-[#587C55]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2421]">Locked Working Capital</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Slow-moving inventory items sit in storage for 45 or more days, draining cash flow through holding fees and risk of physical spoilage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW PROFITTRACE WORKS: 5 STAGES */}
      <section id="how-it-works" className="py-20 bg-[#F7FAF5] border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">The Architecture of Investigation</h2>
            <p className="text-2xl sm:text-4xl font-bold text-[#1F2421]">
              From raw transactions to decisive operational action
            </p>
            <p className="text-sm text-[#68716B]">
              ProfitTrace connects every financial line item to the exact operational decision that influenced it.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 bg-white border border-[#E3E9E3] rounded-md space-y-2">
              <span className="font-mono text-xs font-bold text-[#587C55]">01. DATA</span>
              <h4 className="text-sm font-bold text-[#1F2421]">Ingest Reality</h4>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Aggregate daily sales, POS slips, dispenser liters, supplier bills, and shift payroll.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E3E9E3] rounded-md space-y-2">
              <span className="font-mono text-xs font-bold text-[#587C55]">02. ANALYSIS</span>
              <h4 className="text-sm font-bold text-[#1F2421]">Normalize Margins</h4>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Isolate gross profit, discounts, direct handling overhead, and net contribution per unit.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#A8CFA3] rounded-md space-y-2 relative shadow-xs">
              <span className="font-mono text-xs font-bold text-[#587C55]">03. TRACE</span>
              <h4 className="text-sm font-bold text-[#1F2421]">Pinpoint the Leak</h4>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Walk through the waterfall to identify if margin was lost to acquisition, discounts, or labor.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E3E9E3] rounded-md space-y-2">
              <span className="font-mono text-xs font-bold text-[#587C55]">04. INSIGHT</span>
              <h4 className="text-sm font-bold text-[#1F2421]">Contextual Signals</h4>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Explain what happened, the supporting numbers, and the potential operational drivers.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E3E9E3] rounded-md space-y-2">
              <span className="font-mono text-xs font-bold text-[#587C55]">05. ACTION</span>
              <h4 className="text-sm font-bold text-[#1F2421]">Simulate & Execute</h4>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Model price adjustments in What-If simulator and export prioritized audit directives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS SIZE / USE CASES */}
      <section id="solutions" className="py-20 bg-white border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">Engineered for Any Operational Scale</h2>
            <p className="text-2xl sm:text-4xl font-bold text-[#1F2421]">
              Whether you run a single outlet or manage regional franchises
            </p>
          </div>

          {/* Scale Tabs */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex p-1 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md gap-1">
              <button
                onClick={() => setActiveScaleTab('small')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                  activeScaleTab === 'small' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
                }`}
              >
                Small Businesses (1 to 3 Locations)
              </button>
              <button
                onClick={() => setActiveScaleTab('medium')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                  activeScaleTab === 'medium' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
                }`}
              >
                Medium Chains (Fuel & Retail Networks)
              </button>
              <button
                onClick={() => setActiveScaleTab('large')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                  activeScaleTab === 'large' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
                }`}
              >
                Multi-Location Enterprise Groups
              </button>
            </div>
          </div>

          {/* Scale Detail Card */}
          <div className="mt-8 max-w-4xl mx-auto p-8 bg-[#F7FAF5] border border-[#E3E9E3] rounded-lg">
            {activeScaleTab === 'small' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#587C55] font-semibold text-sm">
                    <Store className="w-5 h-5" />
                    <span>Single Outlets, Cafes, Salons & Independent Retail</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2421]">Stop guessing your real take-home cash</h3>
                  <p className="text-xs text-[#68716B] leading-relaxed">
                    Small business owners often calculate profits only at tax filing time. ProfitTrace reveals weekly gross margin per SKU, flags supplier invoice increases immediately, and identifies slow-moving inventory draining cash.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1F2421]">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Pinpoint which menu items or products actually generate margin dollars</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Detect supplier price creep before bills compound</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Clean CSV import from Square, Clover, or simple Excel sheets</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onOpenDemo({ view: 'overview' })}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors"
                  >
                    View Small Business Café Demo
                  </button>
                </div>
                <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-3 font-mono text-xs">
                  <div className="text-[11px] font-sans font-bold text-[#68716B] uppercase">Harbor Café Sample Trace</div>
                  <div className="flex justify-between py-1 border-b border-[#E3E9E3]">
                    <span>Espresso & Beans Margin:</span>
                    <span className="font-bold text-[#587C55]">78.4%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E3E9E3]">
                    <span>Delivery Brunch Box Margin:</span>
                    <span className="font-bold text-[#D96B43]">0.7% (Leak)</span>
                  </div>
                  <div className="p-2 bg-[#F7FAF5] rounded text-[11px] font-sans text-[#68716B]">
                    Aggregator 30% take-rate wipes out food box contribution.
                  </div>
                </div>
              </div>
            )}

            {activeScaleTab === 'medium' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#587C55] font-semibold text-sm">
                    <Fuel className="w-5 h-5" />
                    <span>Fuel Stations, Regional Retail & Franchisees</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2421]">Reconcile pump volume with bank contribution</h3>
                  <p className="text-xs text-[#68716B] leading-relaxed">
                    Designed specifically for tight margin businesses where fractions of a percent dictate viability. Benchmark stations across shifts, track tank deliveries against dispenser sales, and evaluate commercial fleet credit exposure.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1F2421]">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Shift-by-shift performance breakdown and nozzle variance tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Fuel tank level and reorder threshold monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Fleet credit card discount analysis and reconciliation</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onOpenDemo({ view: 'profit-trace', targetId: 'loc-sta-b' })}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors"
                  >
                    Open GreenFuel Network Demo
                  </button>
                </div>
                <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-3 font-mono text-xs">
                  <div className="text-[11px] font-sans font-bold text-[#68716B] uppercase">Fuel Network Benchmark</div>
                  <div className="flex justify-between py-1 border-b border-[#E3E9E3]">
                    <span>Station A (Expressway):</span>
                    <span className="font-bold text-[#587C55]">12.0% Margin (Healthy)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E3E9E3]">
                    <span>Station B (Bypass):</span>
                    <span className="font-bold text-[#D96B43]">8.5% Margin (Leak)</span>
                  </div>
                  <div className="p-2 bg-[#F7FAF5] rounded text-[11px] font-sans text-[#68716B]">
                    Station B has highest revenue but lowest net contribution due to fleet rebates and overtime.
                  </div>
                </div>
              </div>
            )}

            {activeScaleTab === 'large' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#587C55] font-semibold text-sm">
                    <Building2 className="w-5 h-5" />
                    <span>Multi-Location Enterprises, CFOs & Operations Teams</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2421]">Unified decision control across 50+ sites</h3>
                  <p className="text-xs text-[#68716B] leading-relaxed">
                    Provide regional directors, finance analysts, and executive teams with role-based access. Drill down from conglomerate consolidated statements to individual warehouse or station nozzles with tenant isolation.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1F2421]">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Multi-tenant hierarchy: Organization → Businesses → Locations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Granular RBAC: Owner, Admin, Finance, Manager, Analyst, Viewer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#587C55]" />
                      <span>Enterprise ERP connectors (SAP, Oracle, Dynamics, NetSuite)</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onNavigate('/enterprise')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors"
                  >
                    Explore Enterprise Architecture
                  </button>
                </div>
                <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-3 font-mono text-xs">
                  <div className="text-[11px] font-sans font-bold text-[#68716B] uppercase">Enterprise Hierarchy</div>
                  <div className="p-2 bg-[#F7FAF5] rounded text-[11px] space-y-1">
                    <div>Apex Holdings Ltd. (Organization)</div>
                    <div className="pl-3">↳ GreenFuel Corp (14 Stations)</div>
                    <div className="pl-3">↳ Apex QuickMart (28 Stores)</div>
                    <div className="pl-6 text-[#587C55]">↳ Centralized Contribution Waterfall</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE WHAT-IF TEASER */}
      <section id="what-if" className="py-20 bg-white border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">Decision Simulation</h2>
            <p className="text-2xl sm:text-4xl font-bold text-[#1F2421]">
              Simulate pricing, cost increases, and volume elasticity
            </p>
            <p className="text-sm text-[#68716B]">
              Never make pricing adjustments blindly. The ProfitTrace What-If simulator models how nominal changes in selling price, discounts, or wholesale costs cascade directly into net margin dollars.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-lg space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[#E3E9E3]">
              <div>
                <span className="text-xs text-[#68716B]">Simulation Target</span>
                <div className="font-bold text-sm text-[#1F2421]">Premium Fuel (XP95) · Current: ₹104.0 / Liter</div>
              </div>
              <div className="text-xs font-mono text-[#587C55] bg-white px-2.5 py-1 rounded border border-[#CBD6CB]">
                Status: Scenario Model
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white border border-[#E3E9E3] rounded">
                <div className="text-[#68716B]">Proposed Price Adjustment</div>
                <div className="text-lg font-bold font-mono text-[#1F2421] mt-1">+₹2.50 / L</div>
                <div className="text-[11px] text-[#587C55]">New list price: ₹106.50</div>
              </div>
              <div className="p-3 bg-white border border-[#E3E9E3] rounded">
                <div className="text-[#68716B]">Estimated Volume Response</div>
                <div className="text-lg font-bold font-mono text-[#D96B43] mt-1">-2.0% Volume</div>
                <div className="text-[11px] text-[#68716B]">31,360 L projected</div>
              </div>
              <div className="p-3 bg-white border border-[#E3E9E3] rounded">
                <div className="text-[#68716B]">Projected Net Margin Gain</div>
                <div className="text-lg font-bold font-mono text-[#587C55] mt-1">+₹68,400 / mo</div>
                <div className="text-[11px] text-[#587C55]">Contribution +18.6%</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68716B]">
              <p>Actual results may differ because demand and operating conditions can change.</p>
              <button
                onClick={() => onOpenDemo({ view: 'what-if' })}
                className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors whitespace-nowrap"
              >
                Launch Simulator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ENTERPRISE & SECURITY */}
      <section className="py-20 bg-[#F7FAF5] border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">Enterprise Integrity</h2>
            <p className="text-2xl sm:text-4xl font-bold text-[#1F2421]">
              Strict isolation, audited access, zero data training
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#E3E9E3] rounded-md space-y-3">
              <Shield className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-base font-bold text-[#1F2421]">Tenant Isolation</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Every organization workspace maintains discrete logical and encryption boundaries. Cross-tenant leakage is architecturally prohibited at the query engine level.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E3E9E3] rounded-md space-y-3">
              <Lock className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-base font-bold text-[#1F2421]">Strict Privacy Standards</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Your invoices, margins, and payroll numbers belong solely to your organization. Data is never aggregated, sold to brokers, or fed into public LLM training datasets.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E3E9E3] rounded-md space-y-3">
              <Database className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-base font-bold text-[#1F2421]">Audit-Ready Records</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Export comprehensive, unalterable PDF and CSV reports for board packs, external audits, debt covenant monitoring, and bank reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-20 bg-white border-b border-[#E3E9E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">Questions & Answers</h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2421]">Frequently Asked Questions</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border border-[#E3E9E3] rounded-md overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-semibold text-sm text-[#1F2421] bg-white hover:bg-[#F7FAF5] transition-colors flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#68716B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 bg-white text-xs text-[#68716B] leading-relaxed border-t border-[#E3E9E3]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-[#1F2421] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Start tracing profitability across your business.
          </h2>
          <p className="text-base text-[#CBD6CB] max-w-2xl mx-auto leading-relaxed">
            Test the live demo workspace right now with realistic fuel network and retail datasets, or connect your own sales records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onOpenDemo()}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#1F2421] bg-[#A8CFA3] hover:bg-[#97BF92] transition-colors rounded-md shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Demo Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#1F2421]" />
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white border border-[#49544D] hover:bg-[#2A312D] transition-colors rounded-md"
            >
              Create Organization Account
            </button>
          </div>

          <div className="pt-4 text-xs text-[#7A857D]">
            No credit card required for demo environment. Multi-currency and multi-location enabled.
          </div>
        </div>
      </section>
    </div>
  );
};
