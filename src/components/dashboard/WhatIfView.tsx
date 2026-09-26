import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { BusinessWorkspace, WhatIfScenarioInputs } from '../../types';
import { simulateScenario } from '../../services/profitEngine';
import { trackEvent } from '../../services/analyticsService';

interface WhatIfViewProps {
  workspace: BusinessWorkspace;
  initialProductId?: string;
  onNavigateToReports: () => void;
}

export const WhatIfView: React.FC<WhatIfViewProps> = ({
  workspace,
  initialProductId,
  onNavigateToReports,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || workspace.products[0].id
  );

  const product = workspace.products.find((p) => p.id === selectedProductId) || workspace.products[0];
  const currency = workspace.currencySymbol;

  // Baseline state initialized from current product
  const baselineInputs: WhatIfScenarioInputs = {
    sellingPrice: product.unitPrice,
    unitCost: product.unitCost,
    monthlyVolume: product.monthlyVolume,
    discountPercent: 0,
    opex: product.opexAllocation,
  };

  // Proposed inputs state that user can adjust
  const [proposedInputs, setProposedInputs] = useState<WhatIfScenarioInputs>({ ...baselineInputs });

  // Update proposed when product selector changes
  useEffect(() => {
    setProposedInputs({
      sellingPrice: product.unitPrice,
      unitCost: product.unitCost,
      monthlyVolume: product.monthlyVolume,
      discountPercent: 0,
      opex: product.opexAllocation,
    });
  }, [selectedProductId, product]);

  const simulation = simulateScenario(baselineInputs, proposedInputs);

  const handleReset = () => {
    setProposedInputs({ ...baselineInputs });
    trackEvent({ category: 'feature', action: 'whatif_reset' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">What-If Financial Decision Simulator</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
              Scenario Estimate
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Model how price increases, discount allowances, wholesale cost inflation, and volume elasticity impact your bottom-line cash contribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] bg-white hover:bg-[#F7FAF5] rounded-md transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Current Baseline</span>
          </button>
        </div>
      </div>

      {/* Target Selector */}
      <div className="bg-white p-4 border border-[#E3E9E3] rounded-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#1F2421]">Select Product to Simulate:</span>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="border border-[#CBD6CB] bg-[#F7FAF5] text-[#1F2421] font-semibold rounded-md px-3 py-1.5 focus:border-[#587C55] focus:outline-none"
          >
            {workspace.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({currency}{p.unitPrice.toFixed(2)} / {p.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-[#68716B] font-mono">
          Current Volume: {product.monthlyVolume.toLocaleString()} {product.unit} · Baseline Margin: {product.grossMarginPercent.toFixed(1)}%
        </div>
      </div>

      {/* Simulator Inputs & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 border border-[#E3E9E3] rounded-md space-y-6">
          <div>
            <h2 className="text-sm font-bold text-[#1F2421]">Adjust Decision Variables</h2>
            <p className="text-xs text-[#68716B]">Modify pricing, volume elasticity assumptions, cost changes, and overhead</p>
          </div>

          <div className="space-y-5 text-xs">
            {/* 1. Selling Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#1F2421]">Average Selling Price ({currency} / {product.unit})</label>
                <div className="flex items-center gap-2">
                  <span className="text-[#68716B]">Baseline: {currency}{baselineInputs.sellingPrice.toFixed(2)}</span>
                  <input
                    type="number"
                    step="0.5"
                    value={proposedInputs.sellingPrice}
                    onChange={(e) => setProposedInputs({ ...proposedInputs, sellingPrice: parseFloat(e.target.value) || 0 })}
                    className="w-24 px-2 py-1 border border-[#CBD6CB] rounded font-mono font-bold text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={baselineInputs.sellingPrice * 0.7}
                max={baselineInputs.sellingPrice * 1.4}
                step={0.5}
                value={proposedInputs.sellingPrice}
                onChange={(e) => setProposedInputs({ ...proposedInputs, sellingPrice: parseFloat(e.target.value) })}
                className="w-full accent-[#587C55]"
              />
            </div>

            {/* 2. Direct Unit Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#1F2421]">Wholesale Unit Cost ({currency} / {product.unit})</label>
                <div className="flex items-center gap-2">
                  <span className="text-[#68716B]">Baseline: {currency}{baselineInputs.unitCost.toFixed(2)}</span>
                  <input
                    type="number"
                    step="0.5"
                    value={proposedInputs.unitCost}
                    onChange={(e) => setProposedInputs({ ...proposedInputs, unitCost: parseFloat(e.target.value) || 0 })}
                    className="w-24 px-2 py-1 border border-[#CBD6CB] rounded font-mono font-bold text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={baselineInputs.unitCost * 0.7}
                max={baselineInputs.unitCost * 1.4}
                step={0.5}
                value={proposedInputs.unitCost}
                onChange={(e) => setProposedInputs({ ...proposedInputs, unitCost: parseFloat(e.target.value) })}
                className="w-full accent-[#587C55]"
              />
            </div>

            {/* 3. Monthly Volume */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#1F2421]">Expected Monthly Volume ({product.unit})</label>
                <div className="flex items-center gap-2">
                  <span className="text-[#68716B]">Baseline: {baselineInputs.monthlyVolume.toLocaleString()}</span>
                  <input
                    type="number"
                    step="500"
                    value={proposedInputs.monthlyVolume}
                    onChange={(e) => setProposedInputs({ ...proposedInputs, monthlyVolume: parseFloat(e.target.value) || 0 })}
                    className="w-28 px-2 py-1 border border-[#CBD6CB] rounded font-mono font-bold text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={baselineInputs.monthlyVolume * 0.5}
                max={baselineInputs.monthlyVolume * 1.5}
                step={500}
                value={proposedInputs.monthlyVolume}
                onChange={(e) => setProposedInputs({ ...proposedInputs, monthlyVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#587C55]"
              />
            </div>

            {/* 4. Commercial Discount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#1F2421]">Promotional / Fleet Discount Rate (%)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="30"
                    value={proposedInputs.discountPercent}
                    onChange={(e) => setProposedInputs({ ...proposedInputs, discountPercent: parseFloat(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 border border-[#CBD6CB] rounded font-mono font-bold text-right"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={0.5}
                value={proposedInputs.discountPercent}
                onChange={(e) => setProposedInputs({ ...proposedInputs, discountPercent: parseFloat(e.target.value) })}
                className="w-full accent-[#587C55]"
              />
            </div>

            {/* 5. Allocated Operating Expenses */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#1F2421]">Allocated Direct OpEx ({currency})</label>
                <div className="flex items-center gap-2">
                  <span className="text-[#68716B]">Baseline: {currency}{baselineInputs.opex.toLocaleString()}</span>
                  <input
                    type="number"
                    step="5000"
                    value={proposedInputs.opex}
                    onChange={(e) => setProposedInputs({ ...proposedInputs, opex: parseFloat(e.target.value) || 0 })}
                    className="w-28 px-2 py-1 border border-[#CBD6CB] rounded font-mono font-bold text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={baselineInputs.opex * 0.5}
                max={baselineInputs.opex * 1.8}
                step={2000}
                value={proposedInputs.opex}
                onChange={(e) => setProposedInputs({ ...proposedInputs, opex: parseFloat(e.target.value) })}
                className="w-full accent-[#587C55]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Projected Impact & Scenario Estimate (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#1F2421]">Projected Outcome</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] font-semibold rounded">
                  Scenario estimate
                </span>
              </div>
              <p className="text-xs text-[#68716B] mt-0.5">Calculated financial contribution delta</p>
            </div>

            {/* Net Contribution Card */}
            <div className="p-4 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md space-y-2">
              <span className="text-xs text-[#68716B]">Projected Net Monthly Contribution</span>
              <div className="text-3xl font-bold font-mono text-[#1F2421]">
                {currency}{Math.round(simulation.projected.projectedNetContribution).toLocaleString()}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold">
                {simulation.deltaNetContribution >= 0 ? (
                  <span className="text-[#587C55] flex items-center gap-1 font-mono">
                    <TrendingUp className="w-4 h-4" />
                    +{currency}{Math.round(simulation.deltaNetContribution).toLocaleString()} (+{simulation.deltaContributionPercent}%)
                  </span>
                ) : (
                  <span className="text-[#D96B43] flex items-center gap-1 font-mono">
                    <TrendingDown className="w-4 h-4" />
                    {currency}{Math.round(simulation.deltaNetContribution).toLocaleString()} ({simulation.deltaContributionPercent}%)
                  </span>
                )}
                <span className="text-[#68716B] text-[11px] font-normal">vs current baseline</span>
              </div>
            </div>

            {/* Metric Comparison Table */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E3E9E3]">
                <span className="text-[#68716B]">Projected Revenue:</span>
                <span className="font-mono font-bold text-[#1F2421]">
                  {currency}{Math.round(simulation.projected.projectedRevenue).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#E3E9E3]">
                <span className="text-[#68716B]">Projected Gross Profit:</span>
                <span className="font-mono font-bold text-[#1F2421]">
                  {currency}{Math.round(simulation.projected.projectedGrossProfit).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#E3E9E3]">
                <span className="text-[#68716B]">Projected Gross Margin:</span>
                <span className={`font-mono font-bold ${
                  simulation.projected.projectedMarginPercent < baselineInputs.sellingPrice
                    ? 'text-[#1F2421]'
                    : 'text-[#587C55]'
                }`}>
                  {simulation.projected.projectedMarginPercent.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#E3E9E3]">
                <span className="text-[#68716B]">Trading Margin Shift:</span>
                <span className="font-mono font-bold text-[#1F2421]">
                  {simulation.deltaMarginPercent >= 0 ? `+${simulation.deltaMarginPercent}%` : `${simulation.deltaMarginPercent}%`}
                </span>
              </div>
            </div>

            {/* Verdict Explanation */}
            <div className={`p-3 rounded-md text-xs leading-relaxed ${
              simulation.verdict === 'favorable'
                ? 'bg-[#F7FAF5] text-[#587C55] border border-[#A8CFA3]'
                : simulation.verdict === 'unfavorable'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {simulation.verdict === 'favorable' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{simulation.verdict === 'favorable' ? 'Favorable Scenario' : 'Margin Compression Warning'}</span>
              </div>
              <p>{simulation.explanation}</p>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-3 bg-white border border-[#E3E9E3] rounded text-[11px] text-[#68716B] leading-relaxed">
              <strong>Important Disclosure:</strong> Actual results may differ because demand and operating conditions can change. Scenario estimates are modeled based on static elasticity inputs and historical operational cost allocations.
            </div>

            <button
              onClick={onNavigateToReports}
              className="w-full py-2 px-4 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] rounded-md transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Scenario Summary to PDF / CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
