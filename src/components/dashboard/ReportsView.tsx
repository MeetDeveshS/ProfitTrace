import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Package,
} from 'lucide-react';
import { BusinessWorkspace } from '../../types';
import {
  downloadCSV,
  generateProfitabilityCSV,
  generateLocationCSV,
  generateProductCSV,
} from '../../services/exportService';
import { trackEvent } from '../../services/analyticsService';

interface ReportsViewProps {
  workspace: BusinessWorkspace;
}

type ReportType = 'profitability' | 'location' | 'product' | 'cost' | 'inventory';

export const ReportsView: React.FC<ReportsViewProps> = ({ workspace }) => {
  const [activeReport, setActiveReport] = useState<ReportType>('profitability');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days (Standard Audit)');
  const currency = workspace.currencySymbol;

  const handleExportCSV = () => {
    trackEvent({ category: 'feature', action: 'export_report_csv', label: activeReport });
    let csvData = '';
    let filename = '';

    if (activeReport === 'profitability') {
      csvData = generateProfitabilityCSV(workspace);
      filename = `${workspace.id}_profitability_report.csv`;
    } else if (activeReport === 'location') {
      csvData = generateLocationCSV(workspace);
      filename = `${workspace.id}_location_benchmarking.csv`;
    } else if (activeReport === 'product') {
      csvData = generateProductCSV(workspace);
      filename = `${workspace.id}_product_margins.csv`;
    } else {
      csvData = generateProfitabilityCSV(workspace);
      filename = `${workspace.id}_${activeReport}_report.csv`;
    }

    downloadCSV(filename, csvData);
  };

  const handlePrint = () => {
    trackEvent({ category: 'feature', action: 'print_report', label: activeReport });
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Financial & Operational Reports</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
              Audit Architecture
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Export structured audits of net contribution waterfalls, location variances, and product trading realization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] rounded-md transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Printable View</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#A8CFA3]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Report Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E9E3] pb-3 no-print">
        <button
          onClick={() => setActiveReport('profitability')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
            activeReport === 'profitability' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
          }`}
        >
          Consolidated Profitability Report
        </button>
        <button
          onClick={() => setActiveReport('location')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
            activeReport === 'location' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
          }`}
        >
          Location Benchmarking Audit
        </button>
        <button
          onClick={() => setActiveReport('product')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
            activeReport === 'product' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
          }`}
        >
          Product Margin & Volume Statement
        </button>
        <button
          onClick={() => setActiveReport('cost')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
            activeReport === 'cost' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
          }`}
        >
          Operating Cost Schedule
        </button>
        <button
          onClick={() => setActiveReport('inventory')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
            activeReport === 'inventory' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
          }`}
        >
          Inventory Exposure Schedule
        </button>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-white p-8 border border-[#E3E9E3] rounded-md shadow-xs space-y-6 print-page">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-[#1F2421] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#1F2421]">ProfitTrace Intelligence Report</span>
              <span className="text-[10px] font-mono text-[#587C55] bg-[#F7FAF5] px-2 py-0.5 border border-[#CBD6CB] rounded">
                Verified
              </span>
            </div>
            <div className="text-sm font-semibold text-[#1F2421] mt-1">{workspace.name}</div>
            <div className="text-xs text-[#68716B]">Scale: {workspace.scale.toUpperCase()} · Sector: {workspace.type.replace('_', ' ').toUpperCase()}</div>
          </div>
          <div className="text-right text-xs text-[#68716B] space-y-0.5">
            <div>Period: <strong className="text-[#1F2421]">{selectedPeriod}</strong></div>
            <div>Generated: <strong className="text-[#1F2421]">{new Date().toLocaleDateString()}</strong></div>
            <div className="font-mono text-[10px]">Currency: {workspace.currency} ({currency})</div>
          </div>
        </div>

        {/* 1. Profitability Report View */}
        {activeReport === 'profitability' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">1. Executive Financial Summary</h3>
              <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
                <div className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded">
                  <span className="text-[#68716B]">Gross Sales Realization:</span>
                  <div className="font-bold font-mono text-sm mt-1">{currency}{workspace.revenue.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded">
                  <span className="text-[#68716B]">Cost of Direct Supply:</span>
                  <div className="font-bold font-mono text-sm mt-1">{currency}{(workspace.revenue - workspace.grossProfit).toLocaleString()}</div>
                </div>
                <div className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded">
                  <span className="text-[#68716B]">Gross Trading Profit:</span>
                  <div className="font-bold font-mono text-sm mt-1 text-[#587C55]">{currency}{workspace.grossProfit.toLocaleString()} ({workspace.profitMarginPercent.toFixed(1)}%)</div>
                </div>
                <div className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded">
                  <span className="text-[#68716B]">Net Cash Contribution:</span>
                  <div className="font-bold font-mono text-sm mt-1 text-[#1F2421]">{currency}{(workspace.grossProfit - workspace.operatingCosts).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">2. Location Margin Contributions</h3>
              <table className="w-full text-left text-xs mt-3">
                <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                  <tr>
                    <th className="p-2.5">Location</th>
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5 font-mono">Revenue</th>
                    <th className="p-2.5 font-mono">Gross Profit</th>
                    <th className="p-2.5 font-mono">Margin %</th>
                    <th className="p-2.5 font-mono">OpEx Allocation</th>
                    <th className="p-2.5 font-mono">Net Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E9E3]">
                  {workspace.locations.map((loc) => (
                    <tr key={loc.id}>
                      <td className="p-2.5 font-medium">{loc.name}</td>
                      <td className="p-2.5 font-mono text-[#68716B]">{loc.code}</td>
                      <td className="p-2.5 font-mono">{currency}{loc.revenue.toLocaleString()}</td>
                      <td className="p-2.5 font-mono">{currency}{loc.grossProfit.toLocaleString()}</td>
                      <td className="p-2.5 font-mono font-bold">
                        <span className={loc.marginPercent < 10 ? 'text-[#D96B43]' : 'text-[#587C55]'}>
                          {loc.marginPercent.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-[#68716B]">{currency}{loc.opex.toLocaleString()}</td>
                      <td className="p-2.5 font-mono font-bold text-[#1F2421]">{currency}{loc.netContribution.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Location Benchmarking Audit */}
        {activeReport === 'location' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">Operating Location Performance Audit</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                <tr>
                  <th className="p-2.5">Site Name</th>
                  <th className="p-2.5">Manager</th>
                  <th className="p-2.5 font-mono">Revenue</th>
                  <th className="p-2.5 font-mono">Margin %</th>
                  <th className="p-2.5 font-mono">Volume</th>
                  <th className="p-2.5">Audit Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.locations.map((loc) => (
                  <tr key={loc.id}>
                    <td className="p-2.5 font-bold">{loc.name}</td>
                    <td className="p-2.5 text-[#68716B]">{loc.manager} ({loc.city})</td>
                    <td className="p-2.5 font-mono">{currency}{loc.revenue.toLocaleString()}</td>
                    <td className="p-2.5 font-mono font-semibold">{loc.marginPercent.toFixed(1)}%</td>
                    <td className="p-2.5 font-mono">{loc.volumeUnits.toLocaleString()} {loc.volumeUnitLabel}</td>
                    <td className="p-2.5 text-[#68716B] max-w-xs">{loc.varianceNote || loc.topLeakReason || 'Operating as planned.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Product Margin Statement */}
        {activeReport === 'product' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">Product Line Unit Margin & Volume Statement</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                <tr>
                  <th className="p-2.5">Product SKU</th>
                  <th className="p-2.5 font-mono">Unit Selling Price</th>
                  <th className="p-2.5 font-mono">Unit Direct Cost</th>
                  <th className="p-2.5 font-mono">Gross Margin %</th>
                  <th className="p-2.5 font-mono">Volume Sold</th>
                  <th className="p-2.5 font-mono">Total Revenue</th>
                  <th className="p-2.5 font-mono">Net Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2.5 font-bold">{p.name}</td>
                    <td className="p-2.5 font-mono">{currency}{p.unitPrice.toFixed(2)}</td>
                    <td className="p-2.5 font-mono">{currency}{p.unitCost.toFixed(2)}</td>
                    <td className="p-2.5 font-mono font-semibold">{p.grossMarginPercent.toFixed(1)}%</td>
                    <td className="p-2.5 font-mono">{p.monthlyVolume.toLocaleString()} {p.unit}</td>
                    <td className="p-2.5 font-mono">{currency}{p.revenue.toLocaleString()}</td>
                    <td className="p-2.5 font-mono font-bold text-[#1F2421]">{currency}{p.netContribution.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Cost Schedule */}
        {activeReport === 'cost' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">Operating Expense Schedule</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                <tr>
                  <th className="p-2.5">Expense Category</th>
                  <th className="p-2.5 font-mono">Current Month</th>
                  <th className="p-2.5 font-mono">Prior Month</th>
                  <th className="p-2.5 font-mono">Variance %</th>
                  <th className="p-2.5 font-mono">Allocation %</th>
                  <th className="p-2.5">Investigation Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.expenses.map((e) => (
                  <tr key={e.id}>
                    <td className="p-2.5 font-bold">{e.name}</td>
                    <td className="p-2.5 font-mono">{currency}{e.currentAmount.toLocaleString()}</td>
                    <td className="p-2.5 font-mono text-[#68716B]">{currency}{e.previousAmount.toLocaleString()}</td>
                    <td className="p-2.5 font-mono">
                      <span className={e.changePercent > 10 ? 'text-[#D96B43] font-bold' : ''}>
                        {e.changePercent > 0 ? `+${e.changePercent}%` : `${e.changePercent}%`}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono">{e.allocationPercent}%</td>
                    <td className="p-2.5 text-[#68716B]">{e.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Inventory Schedule */}
        {activeReport === 'inventory' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">Working Capital Inventory Schedule</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                <tr>
                  <th className="p-2.5">Product SKU</th>
                  <th className="p-2.5">Location</th>
                  <th className="p-2.5 font-mono">Quantity</th>
                  <th className="p-2.5 font-mono">Valuation</th>
                  <th className="p-2.5 font-mono">Turnover Velocity</th>
                  <th className="p-2.5">Holding Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {workspace.inventory.map((inv) => (
                  <tr key={inv.id}>
                    <td className="p-2.5 font-bold">{inv.productName}</td>
                    <td className="p-2.5 text-[#68716B]">{inv.locationName}</td>
                    <td className="p-2.5 font-mono">{inv.quantityOnHand.toLocaleString()} {inv.unit}</td>
                    <td className="p-2.5 font-mono font-bold">{currency}{inv.totalValuation.toLocaleString()}</td>
                    <td className="p-2.5 font-mono">{inv.turnoverDays} days</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inv.status === 'excess' ? 'bg-red-50 text-[#D96B43]' : 'bg-[#F7FAF5] text-[#587C55]'
                      }`}>
                        {inv.status === 'excess' ? 'Slow Turnover Drag' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sign-off footer */}
        <div className="pt-6 border-t border-[#E3E9E3] flex justify-between items-center text-xs text-[#68716B]">
          <span>ProfitTrace Autonomous Financial Intelligence System · Unalterable Audit Output</span>
          <span className="font-mono">Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
};
