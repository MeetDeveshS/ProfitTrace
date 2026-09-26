import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, TrendingUp, RefreshCw, Clock } from 'lucide-react';
import { BusinessWorkspace } from '../../types';

interface InventoryViewProps {
  workspace: BusinessWorkspace;
  onNavigateToTrace: (productId: string) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ workspace, onNavigateToTrace }) => {
  const currency = workspace.currencySymbol;

  const totalCapitalTied = workspace.inventory.reduce((sum, item) => sum + item.totalValuation, 0);
  const totalMonthlyHoldingCost = workspace.inventory.reduce((sum, item) => sum + item.holdingCostMonthly, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Inventory Capital Exposure</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#CBD6CB] text-[#587C55] rounded">
              Working Capital Risk
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Audit working capital tied up in stockrooms and underground tanks, turnover velocity, and monthly inventory holding drag.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-1">
          <span className="text-xs text-[#68716B]">Total Capital Locked in Stock</span>
          <div className="text-2xl font-bold font-mono text-[#1F2421]">
            {currency}{totalCapitalTied.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#587C55]">Physical valuation across active locations</div>
        </div>

        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-1">
          <span className="text-xs text-[#68716B]">Estimated Monthly Carrying Cost</span>
          <div className="text-2xl font-bold font-mono text-[#D96B43]">
            {currency}{totalMonthlyHoldingCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#68716B]">Storage, insurance, shrinkage & capital interest</div>
        </div>

        <div className="p-4 bg-white border border-[#E3E9E3] rounded-md space-y-1">
          <span className="text-xs text-[#68716B]">Slow-Moving Exposure Alert</span>
          <div className="text-2xl font-bold font-mono text-[#D96B43]">
            1 Stockpile Flagged
          </div>
          <div className="text-[11px] text-[#68716B]">Station B: 45 days supply of lubricants</div>
        </div>
      </div>

      {/* Inventory Item Table */}
      <div className="bg-white border border-[#E3E9E3] rounded-md overflow-hidden">
        <div className="p-4 border-b border-[#E3E9E3] flex justify-between items-center">
          <h2 className="text-sm font-bold text-[#1F2421]">Location Stock Positions & Turnover Velocity</h2>
          <span className="text-xs text-[#68716B]">Updated with recent shifts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Location</th>
                <th className="p-3 font-mono">Quantity on Hand</th>
                <th className="p-3 font-mono">Unit Cost</th>
                <th className="p-3 font-mono">Total Capital Tied</th>
                <th className="p-3 font-mono">Turnover (Days)</th>
                <th className="p-3 font-mono">Monthly Carrying Drag</th>
                <th className="p-3">Exposure Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E9E3]">
              {workspace.inventory.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7FAF5]/70 transition-colors">
                  <td className="p-3 font-bold text-[#1F2421]">{item.productName}</td>
                  <td className="p-3 text-[#68716B]">{item.locationName}</td>
                  <td className="p-3 font-mono text-[#1F2421]">
                    {item.quantityOnHand.toLocaleString()} {item.unit}
                  </td>
                  <td className="p-3 font-mono text-[#68716B]">{currency}{item.unitCost.toFixed(2)}</td>
                  <td className="p-3 font-mono font-bold text-[#1F2421]">
                    {currency}{item.totalValuation.toLocaleString()}
                  </td>
                  <td className="p-3 font-mono">
                    <span className={item.turnoverDays > 30 ? 'text-[#D96B43] font-bold' : 'text-[#1F2421]'}>
                      {item.turnoverDays} days
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[#68716B]">
                    {currency}{item.holdingCostMonthly.toLocaleString()}
                  </td>
                  <td className="p-3">
                    {item.status === 'optimal' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#587C55] bg-[#F7FAF5] px-2 py-0.5 rounded border border-[#A8CFA3]">
                        <CheckCircle2 className="w-3 h-3" /> Healthy Turnover
                      </span>
                    )}
                    {item.status === 'excess' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D96B43] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        <AlertTriangle className="w-3 h-3" /> Excess Capital
                      </span>
                    )}
                    {item.status === 'low' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Reorder Buffer
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigateToTrace(item.productId)}
                      className="text-[#587C55] font-semibold hover:underline"
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
  );
};
