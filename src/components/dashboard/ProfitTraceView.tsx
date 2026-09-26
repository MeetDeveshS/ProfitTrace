import React, { useState } from 'react';
import {
  GitFork,
  ArrowDown,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  SlidersHorizontal,
  FileText,
  Search,
  ChevronRight,
  Info,
} from 'lucide-react';
import { BusinessWorkspace, ProfitTraceResult } from '../../types';
import { runProfitTrace } from '../../services/profitEngine';
import { trackEvent } from '../../services/analyticsService';

interface ProfitTraceViewProps {
  workspace: BusinessWorkspace;
  initialTargetId?: string;
  initialTargetType?: 'product' | 'location';
  onNavigateToWhatIf: (targetId: string) => void;
  onNavigateToReports: () => void;
}

export const ProfitTraceView: React.FC<ProfitTraceViewProps> = ({
  workspace,
  initialTargetId,
  initialTargetType = 'location',
  onNavigateToWhatIf,
  onNavigateToReports,
}) => {
  const [targetType, setTargetType] = useState<'product' | 'location'>(initialTargetType);
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    initialTargetId ||
      (initialTargetType === 'location'
        ? workspace.locations.find((l) => l.status === 'leak_detected')?.id || workspace.locations[0].id
        : workspace.products[0].id)
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to Gross Margin step

  const traceResult: ProfitTraceResult = runProfitTrace(workspace, selectedTargetId, targetType);
  const currency = workspace.currencySymbol;

  const handleSelectEntity = (id: string) => {
    setSelectedTargetId(id);
    trackEvent({ category: 'feature', action: 'trace_entity_selected', label: id });
  };

  const handleSwitchTargetType = (type: 'product' | 'location') => {
    setTargetType(type);
    const newId = type === 'location' ? workspace.locations[1].id : workspace.products[0].id;
    setSelectedTargetId(newId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Profit Trace Engine</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
              Waterfall Breakdown
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Trace realized cash from top-line sales through unit prices, wholesale acquisition, discount allowances, and operating overhead.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Target Type Selector */}
          <div className="inline-flex p-1 bg-white border border-[#CBD6CB] rounded-md text-xs">
            <button
              onClick={() => handleSwitchTargetType('location')}
              className={`px-3 py-1 font-medium rounded transition-colors ${
                targetType === 'location' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
              }`}
            >
              Trace Location
            </button>
            <button
              onClick={() => handleSwitchTargetType('product')}
              className={`px-3 py-1 font-medium rounded transition-colors ${
                targetType === 'product' ? 'bg-[#1F2421] text-white' : 'text-[#68716B] hover:text-[#1F2421]'
              }`}
            >
              Trace Product
            </button>
          </div>
        </div>
      </div>

      {/* Entity Selector Bar */}
      <div className="bg-white p-4 border border-[#E3E9E3] rounded-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#1F2421]">
            Select {targetType === 'location' ? 'Station / Branch:' : 'Product / SKU:'}
          </span>
          <select
            value={selectedTargetId}
            onChange={(e) => handleSelectEntity(e.target.value)}
            className="text-xs border border-[#CBD6CB] bg-[#F7FAF5] text-[#1F2421] font-semibold rounded-md px-3 py-1.5 focus:border-[#587C55] focus:outline-none"
          >
            {targetType === 'location'
              ? workspace.locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.status === 'leak_detected' ? '⚠️ LEAK DETECTED' : 'HEALTHY'})
                  </option>
                ))
              : workspace.products.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} (Margin: {prod.grossMarginPercent.toFixed(1)}%)
                  </option>
                ))}
          </select>
        </div>

        <div className="text-xs font-mono text-[#68716B]">
          Benchmark Period: <span className="text-[#1F2421] font-semibold">{traceResult.benchmarkPeriod}</span>
        </div>
      </div>

      {/* Headline Trace Finding */}
      <div className="p-4 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white border border-[#D96B43] text-[#D96B43] rounded-md shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D96B43]">
              Trace Finding for {traceResult.targetName}
            </span>
            <div className="text-sm font-bold text-[#1F2421] mt-0.5">{traceResult.headlineSummary}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToWhatIf(selectedTargetId)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A8CFA3]" />
            <span>Simulate What-If</span>
          </button>
        </div>
      </div>

      {/* Main Trace Waterfall Chain & Contributing Factors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Waterfall Steps (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#68716B] px-1">
            <span className="font-bold uppercase tracking-wider">Step-by-Step Value Decomposition</span>
            <span>Click any step to inspect</span>
          </div>

          <div className="space-y-2">
            {traceResult.steps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div key={idx}>
                  <div
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 bg-white border rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#587C55] ring-1 ring-[#587C55] shadow-xs'
                        : 'border-[#E3E9E3] hover:border-[#CBD6CB]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#68716B]">{step.step}</div>
                        <div className="text-sm font-bold text-[#1F2421] mt-0.5">{step.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold font-mono text-[#1F2421]">{step.formattedValue}</div>
                        {step.deltaPercent !== undefined && (
                          <div className={`text-[11px] font-mono font-medium ${
                            step.deltaPercent >= 0 ? 'text-[#587C55]' : 'text-[#D96B43]'
                          }`}>
                            {step.deltaPercent > 0 ? `+${step.deltaPercent}%` : `${step.deltaPercent}%`} variance
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-[#68716B] mt-2 pt-2 border-t border-[#E3E9E3]/60 flex items-center justify-between">
                      <span>{step.note}</span>
                      <ChevronRight className={`w-3.5 h-3.5 text-[#68716B] transition-transform ${isSelected ? 'rotate-90 text-[#587C55]' : ''}`} />
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {idx < traceResult.steps.length - 1 && (
                    <div className="flex justify-center py-1 text-[#CBD6CB]">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contributing Factors & Investigation Actions (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Factor Attribution */}
          <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#1F2421]">Contributing Margin Leak Factors</h2>
              <p className="text-xs text-[#68716B]">Estimated percentage impact on net margin dilution</p>
            </div>

            <div className="space-y-3">
              {traceResult.contributingFactors.map((factor, fIdx) => (
                <div key={fIdx} className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1F2421]">{factor.factor}</span>
                    <span className={`font-mono font-semibold ${
                      factor.direction === 'negative' ? 'text-[#D96B43]' : 'text-[#587C55]'
                    }`}>
                      {factor.impactPercent > 0 ? `+${factor.impactPercent}%` : `${factor.impactPercent}%`}
                    </span>
                  </div>
                  <p className="text-xs text-[#68716B] leading-relaxed">
                    {factor.explanation}
                  </p>
                  <div className="text-[11px] font-mono text-[#1F2421] font-semibold pt-1 border-t border-[#E3E9E3]">
                    Estimated value impact: {currency}{factor.impactValue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Investigation Protocol */}
          <div className="bg-white p-5 border border-[#E3E9E3] rounded-md space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#587C55]" />
              <h2 className="text-sm font-bold text-[#1F2421]">Recommended Management Investigation</h2>
            </div>

            <ul className="space-y-2.5 text-xs text-[#1F2421]">
              {traceResult.investigationSteps.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-[#F7FAF5] border border-[#CBD6CB] text-[10px] font-mono flex items-center justify-center text-[#587C55] shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-[#E3E9E3] flex justify-between items-center text-xs">
              <span className="text-[#68716B]">Share findings with branch managers:</span>
              <button
                onClick={onNavigateToReports}
                className="text-[#587C55] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Export Audit Sheet</span>
                <FileText className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
