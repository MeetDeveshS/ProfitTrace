import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';
import { BusinessWorkspace, ProductData } from '../../types';

interface ProductsViewProps {
  workspace: BusinessWorkspace;
  onNavigateToTrace: (productId: string) => void;
  onNavigateToWhatIf: (productId: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  workspace,
  onNavigateToTrace,
  onNavigateToWhatIf,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const currency = workspace.currencySymbol;

  const categories = ['all', ...Array.from(new Set(workspace.products.map((p) => p.category)))];

  const filteredProducts = workspace.products.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Products & Margin Realization</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#CBD6CB] text-[#587C55] rounded">
              {workspace.products.length} SKUs Tracked
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Identify which product lines generate healthy cash contributions and which suffer margin pressure from wholesale cost creep or heavy discounts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#68716B]">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#CBD6CB] bg-white rounded px-2.5 py-1.5 focus:border-[#587C55] focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const isMarginPressure = prod.status === 'margin_pressure';
          return (
            <div
              key={prod.id}
              className={`p-5 bg-white border rounded-md space-y-4 transition-all ${
                isMarginPressure ? 'border-[#D96B43]/50 shadow-xs' : 'border-[#E3E9E3]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#68716B] uppercase">{prod.category}</span>
                  <h3 className="text-base font-bold text-[#1F2421] mt-0.5">{prod.name}</h3>
                </div>
                {isMarginPressure ? (
                  <span className="px-2 py-0.5 bg-red-50 text-[#D96B43] border border-red-200 text-[10px] font-semibold rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Margin Alert
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-[#F7FAF5] text-[#587C55] border border-[#A8CFA3] text-[10px] font-semibold rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Healthy
                  </span>
                )}
              </div>

              {/* Price & Cost Matrix */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#68716B] block">Selling Price</span>
                  <span className="font-bold text-[#1F2421]">{currency}{prod.unitPrice.toFixed(2)}</span>
                  <span className="text-[9px] text-[#68716B] block">per {prod.unit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#68716B] block">Direct Cost</span>
                  <span className="font-bold text-[#68716B]">{currency}{prod.unitCost.toFixed(2)}</span>
                  <span className="text-[9px] text-[#68716B] block">per {prod.unit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#68716B] block">Trading Margin</span>
                  <span className={`font-bold ${isMarginPressure ? 'text-[#D96B43]' : 'text-[#587C55]'}`}>
                    {prod.grossMarginPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#68716B]">Monthly Volume:</span>
                  <span className="font-mono text-[#1F2421]">{prod.monthlyVolume.toLocaleString()} {prod.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68716B]">Total Revenue:</span>
                  <span className="font-mono font-semibold text-[#1F2421]">{currency}{prod.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68716B]">Gross Profit:</span>
                  <span className="font-mono font-semibold text-[#587C55]">{currency}{prod.grossProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E3E9E3]">
                  <span className="text-[#1F2421] font-semibold">Net Contribution:</span>
                  <span className="font-mono font-bold text-[#1F2421]">{currency}{prod.netContribution.toLocaleString()}</span>
                </div>
              </div>

              {/* Variance note */}
              {prod.varianceNote && (
                <div className="p-2.5 bg-amber-50/60 border border-amber-200/60 rounded text-[11px] text-[#68716B] leading-relaxed">
                  {prod.varianceNote}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#E3E9E3] flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToWhatIf(prod.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] rounded transition-colors flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Simulate</span>
                </button>
                <button
                  onClick={() => onNavigateToTrace(prod.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded transition-colors flex items-center gap-1"
                >
                  <span>Trace Value Chain</span>
                  <ArrowRight className="w-3 h-3 text-[#A8CFA3]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
