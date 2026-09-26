import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Package,
  Layers,
  Fuel,
  Info,
  ExternalLink,
} from 'lucide-react';
import { BusinessWorkspace } from '../../types';

interface OverviewViewProps {
  workspace: BusinessWorkspace;
  onNavigateToTrace: (targetId: string, targetType: 'product' | 'location') => void;
  onNavigateView: (view: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  workspace,
  onNavigateToTrace,
  onNavigateView,
}) => {
  const currency = workspace.currencySymbol;

  // KPI Calculations
  const revGrowth = Number((((workspace.revenue - workspace.previousRevenue) / workspace.previousRevenue) * 100).toFixed(1));
  const gpGrowth = Number((((workspace.grossProfit - workspace.previousGrossProfit) / workspace.previousGrossProfit) * 100).toFixed(1));
  const marginDelta = Number((workspace.profitMarginPercent - workspace.previousMarginPercent).toFixed(1));
  const opexGrowth = Number((((workspace.operatingCosts - workspace.previousOperatingCosts) / workspace.previousOperatingCosts) * 100).toFixed(1));

  // Find primary leak entity (e.g. Station B)
  const leakLocation = workspace.locations.find((l) => l.status === 'leak_detected') || workspace.locations[1];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Workspace Header Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Executive Profitability Overview</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#CBD6CB] text-[#587C55] rounded">
              Demo Workspace
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Realized cash flow, trading margins, cost allocations, and active variance signals for {workspace.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateToTrace(leakLocation.id, 'location')}
            className="px-3.5 py-1.5 font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Trace Active Margin Leak</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
          </button>
        </div>
      </div>

      {/* 4 Core Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[#68716B]">
            <span>Gross Revenue</span>
            <span className="font-mono text-[11px]">{workspace.periodLabel}</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1F2421]">
            {currency}{workspace.revenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#587C55] font-medium">
            <span>↑ +{revGrowth}%</span>
            <span className="text-[#68716B] text-[11px]">vs prior benchmark</span>
          </div>
        </div>

        {/* Gross Profit */}
        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[#68716B]">
            <span>Gross Trading Profit</span>
            <span className="font-mono text-[11px]">Sales minus COGS</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1F2421]">
            {currency}{workspace.grossProfit.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#D96B43] font-medium">
            <span>{gpGrowth >= 0 ? `↑ +${gpGrowth}%` : `↓ ${gpGrowth}%`}</span>
            <span className="text-[#68716B] text-[11px]">profit contraction</span>
          </div>
        </div>

        {/* Blended Margin */}
        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[#68716B]">
            <span>Profit Margin Rate</span>
            <span className="font-mono text-[11px]">Target: &gt;11.5%</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1F2421]">
            {workspace.profitMarginPercent.toFixed(1)}%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#D96B43] font-medium">
            <span>↓ {marginDelta}%</span>
            <span className="text-[#68716B] text-[11px]">margin compression</span>
          </div>
        </div>

        {/* Operating Costs */}
        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[#68716B]">
            <span>Direct Operating Costs</span>
            <span className="font-mono text-[11px]">Forecourt & payroll</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1F2421]">
            {currency}{workspace.operatingCosts.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#D96B43] font-medium">
            <span>↑ +{opexGrowth}%</span>
            <span className="text-[#68716B] text-[11px]">cost escalation</span>
          </div>
        </div>
      </div>

      {/* Primary Leak Signal Banner */}
      <div className="p-4 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white border border-[#D96B43] text-[#D96B43] rounded-md shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#1F2421]">{leakLocation.name} Margin Leak Detected</span>
              <span className="text-[10px] font-mono px-2 py-0.2 bg-[#D96B43]/15 text-[#D96B43] font-semibold rounded">
                8.5% Margin vs 12.0% Benchmark
              </span>
            </div>
            <p className="text-xs text-[#68716B] mt-1 max-w-2xl leading-relaxed">
              Station B contributes the largest share of top-line revenue ({currency}{leakLocation.revenue.toLocaleString()}), but retained net profit is only {currency}{leakLocation.netContribution.toLocaleString()} due to commercial fleet discounts, diesel concentration, and overtime staffing.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTrace(leakLocation.id, 'location')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Trace This Result</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
        </button>
      </div>

      {/* Visual Analytics Grid: Trends and Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F2421]">Monthly Financial Trajectory</h2>
              <p className="text-xs text-[#68716B]">Revenue growth vs Gross Profit realization over 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#68716B]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#A8CFA3] rounded-xs"></span> Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#587C55] rounded-xs"></span> Gross Profit
              </span>
            </div>
          </div>

          {/* Clean CSS-driven responsive bar visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#E3E9E3]">
            {workspace.trendMonthly.map((m) => {
              const maxRev = 15000000;
              const revHeight = Math.round((m.revenue / maxRev) * 100);
              const gpHolder = Math.round(((m.grossProfit * 8) / maxRev) * 100); // scaled visually for clear comparison

              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-40">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className="w-1/2 bg-[#A8CFA3]/60 group-hover:bg-[#A8CFA3] rounded-t-xs transition-all relative"
                      title={`${m.month} Revenue: ${currency}${m.revenue.toLocaleString()}`}
                    ></div>
                    {/* Gross Profit Bar */}
                    <div
                      style={{ height: `${gpHolder}%` }}
                      className="w-1/2 bg-[#587C55] rounded-t-xs transition-all"
                      title={`${m.month} Gross Profit: ${currency}${m.grossProfit.toLocaleString()} (${m.marginPercent}%)`}
                    ></div>
                  </div>
                  <div className="text-center font-mono text-[11px] text-[#68716B]">
                    <div>{m.month}</div>
                    <div className="text-[10px] text-[#1F2421] font-semibold">{m.marginPercent}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#68716B] pt-1">
            <span>Insight: Top-line revenue expanded 15.1% since April, while gross margin compressed from 12.0% to 10.5%.</span>
            <button
              onClick={() => onNavigateView('reports')}
              className="text-[#587C55] font-semibold hover:underline inline-flex items-center gap-1"
            >
              Export Report <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Operating Cost Breakdown */}
        <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F2421]">Operating Cost Structure</h2>
              <p className="text-xs text-[#68716B]">Breakdown of site expenses</p>
            </div>
            <button onClick={() => onNavigateView('reports')} className="text-xs text-[#587C55] hover:underline">
              Audit
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {workspace.expenses.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1F2421] truncate max-w-[180px]">{exp.name}</span>
                  <span className="font-mono text-[#1F2421]">{currency}{exp.currentAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#F7FAF5] h-2 rounded overflow-hidden border border-[#E3E9E3]">
                  <div
                    style={{ width: `${exp.allocationPercent}%` }}
                    className={`h-full rounded ${exp.isLeakRisk ? 'bg-[#D96B43]' : 'bg-[#587C55]'}`}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#68716B]">
                  <span>{exp.allocationPercent}% of total OpEx</span>
                  <span className={exp.changePercent > 10 ? 'text-[#D96B43] font-semibold' : ''}>
                    {exp.changePercent > 0 ? `+${exp.changePercent}%` : `${exp.changePercent}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Entities Performance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Performance Preview */}
        <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#587C55]" />
              <h2 className="text-sm font-bold text-[#1F2421]">Location Benchmarking</h2>
            </div>
            <button
              onClick={() => onNavigateView('locations')}
              className="text-xs text-[#587C55] font-semibold hover:underline"
            >
              Compare All {workspace.locations.length} Locations →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3E9E3] text-[#68716B] font-medium">
                  <th className="pb-2">Location</th>
                  <th className="pb-2">Revenue</th>
                  <th className="pb-2">Margin</th>
                  <th className="pb-2">Contribution</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.locations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-[#F7FAF5] transition-colors">
                    <td className="py-2.5 font-medium text-[#1F2421]">
                      <div>{loc.name}</div>
                      <div className="text-[10px] text-[#68716B]">{loc.code} · {loc.city}</div>
                    </td>
                    <td className="py-2.5 font-mono text-[#1F2421]">
                      {currency}{loc.revenue.toLocaleString()}
                    </td>
                    <td className="py-2.5">
                      <span className={`font-mono font-semibold ${
                        loc.marginPercent < 10 ? 'text-[#D96B43]' : 'text-[#587C55]'
                      }`}>
                        {loc.marginPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-[#1F2421]">
                      {currency}{loc.netContribution.toLocaleString()}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => onNavigateToTrace(loc.id, 'location')}
                        className="text-[11px] font-semibold text-[#587C55] hover:underline"
                      >
                        Trace
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Profitability & Margins */}
        <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#587C55]" />
              <h2 className="text-sm font-bold text-[#1F2421]">Product Margin Matrix</h2>
            </div>
            <button
              onClick={() => onNavigateView('products')}
              className="text-xs text-[#587C55] font-semibold hover:underline"
            >
              View Products & Inventory →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3E9E3] text-[#68716B] font-medium">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Unit Price</th>
                  <th className="pb-2">Unit Cost</th>
                  <th className="pb-2">Gross Margin</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#F7FAF5] transition-colors">
                    <td className="py-2.5 font-medium text-[#1F2421]">
                      <div>{prod.name}</div>
                      <div className="text-[10px] text-[#68716B]">{prod.category}</div>
                    </td>
                    <td className="py-2.5 font-mono text-[#1F2421]">
                      {currency}{prod.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-2.5 font-mono text-[#68716B]">
                      {currency}{prod.unitCost.toFixed(2)}
                    </td>
                    <td className="py-2.5 font-mono font-semibold text-[#1F2421]">
                      {prod.grossMarginPercent.toFixed(1)}%
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => onNavigateToTrace(prod.id, 'product')}
                        className="text-[11px] font-semibold text-[#587C55] hover:underline"
                      >
                        Trace
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
