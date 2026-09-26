import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2,
  GitFork,
  HelpCircle,
  Search,
} from 'lucide-react';
import { BusinessWorkspace, BusinessInsight } from '../../types';
import { askProfitTrace, samplePresetQuestions, QueryAnalysisResponse } from '../../services/aiQueryService';
import { trackEvent } from '../../services/analyticsService';

interface InsightsViewProps {
  workspace: BusinessWorkspace;
  onNavigateToTrace: (targetId: string, targetType: 'product' | 'location') => void;
  onNavigateView: (view: any) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  workspace,
  onNavigateToTrace,
  onNavigateView,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<QueryAnalysisResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleRunQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    trackEvent({ category: 'feature', action: 'ask_profittrace_query', label: queryText });

    try {
      const response = await askProfitTrace(queryText, workspace);
      setActiveAnalysis(response);
    } catch {
      // safe fallback
    } finally {
      setLoading(false);
    }
  };

  const filteredInsights = workspace.insights.filter(
    (ins) => selectedCategory === 'all' || ins.category === selectedCategory
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Insights & Decision Intelligence</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
              Audited Signals
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Grounded operational findings generated from sales telemetry, shift labor logs, and wholesale procurement records.
          </p>
        </div>
      </div>

      {/* "Ask ProfitTrace" Interactive Analysis Panel */}
      <div className="bg-white p-6 border border-[#CBD6CB] rounded-lg shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#1F2421] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#A8CFA3]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2421]">Ask ProfitTrace</h2>
            <p className="text-xs text-[#68716B]">Conversational decision support grounded in active workspace data</p>
          </div>
        </div>

        {/* Query Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunQuery(queryInput);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#68716B] absolute left-3 top-3" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask anything, e.g. Why did profit fall this month? Which location has the highest margin?"
              className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#CBD6CB] bg-[#F7FAF5] rounded-md focus:border-[#587C55] focus:outline-none focus:bg-white transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <span>Analyzing...</span> : <><span>Analyze</span><Send className="w-3.5 h-3.5 text-[#A8CFA3]" /></>}
          </button>
        </form>

        {/* Preset Prompt Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-[#68716B] mr-1">Quick Inquiries:</span>
          {samplePresetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryInput(q);
                handleRunQuery(q);
              }}
              className="px-2.5 py-1 bg-[#F7FAF5] border border-[#CBD6CB] hover:border-[#587C55] hover:bg-white text-[#1F2421] rounded text-[11px] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Conversational Output Display */}
        {activeAnalysis && (
          <div className="p-5 bg-[#F7FAF5] border border-[#A8CFA3] rounded-md space-y-4 text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#CBD6CB]/60 pb-2">
              <span className="font-mono text-[11px] font-semibold text-[#587C55] uppercase">
                ProfitTrace Intelligence Synthesis
              </span>
              <span className="text-[11px] font-mono text-[#68716B]">
                Confidence: {activeAnalysis.sourceConfidence.toUpperCase()} (Direct Ledger Reconciliation)
              </span>
            </div>

            <p className="text-sm font-medium text-[#1F2421] leading-relaxed">
              {activeAnalysis.answer}
            </p>

            {/* Evidence Data Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {activeAnalysis.dataPoints.map((dp, i) => (
                <div key={i} className="p-2.5 bg-white border border-[#E3E9E3] rounded space-y-0.5">
                  <div className="text-[10px] text-[#68716B]">{dp.label}</div>
                  <div className="font-mono font-bold text-sm text-[#1F2421]">{dp.value}</div>
                  {dp.context && <div className="text-[10px] text-[#68716B]">{dp.context}</div>}
                </div>
              ))}
            </div>

            {/* Suggested Next Action */}
            <div className="pt-2 border-t border-[#CBD6CB]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#587C55] font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Suggested Action: {activeAnalysis.suggestedAction}</span>
              </div>
              <button
                onClick={() => {
                  if (activeAnalysis.relatedView === 'profit-trace') {
                    onNavigateToTrace(activeAnalysis.relatedEntityId || workspace.locations[1].id, 'location');
                  } else {
                    onNavigateView(activeAnalysis.relatedView);
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded transition-colors whitespace-nowrap"
              >
                Inspect in {activeAnalysis.relatedView.toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audited System Insights Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E3E9E3]">
          <div>
            <h2 className="text-base font-bold text-[#1F2421]">Detected Margin & Cost Variances</h2>
            <p className="text-xs text-[#68716B]">Audited anomalies requiring operational verification</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#68716B]">Filter Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#CBD6CB] bg-white rounded px-2.5 py-1 text-xs"
            >
              <option value="all">All Insights ({workspace.insights.length})</option>
              <option value="location">Location Leaks</option>
              <option value="margin">Margin Compression</option>
              <option value="inventory">Inventory Exposure</option>
              <option value="cost">Operating Cost Shifts</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="p-6 bg-white border border-[#E3E9E3] rounded-md space-y-4 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#68716B] uppercase">{insight.affectedEntityName}</span>
                  <h3 className="text-base font-bold text-[#1F2421] mt-0.5">{insight.title}</h3>
                </div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase ${
                  insight.severity === 'high'
                    ? 'bg-red-50 text-[#D96B43] border border-red-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {insight.severity} Priority
                </span>
              </div>

              {/* 1. What Happened */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#1F2421] block">What happened:</span>
                <p className="text-xs text-[#68716B] leading-relaxed">{insight.whatHappened}</p>
              </div>

              {/* 2. Data Behind Observation */}
              <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3] space-y-1">
                <span className="text-[11px] font-mono font-semibold text-[#587C55] block">Data Behind Observation:</span>
                <p className="text-xs text-[#1F2421] font-mono">{insight.dataBehindObservation}</p>
              </div>

              {/* 3. Possible Drivers */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#1F2421] block">Possible drivers:</span>
                <ul className="space-y-1 text-xs text-[#68716B]">
                  {insight.possibleDrivers.map((driver, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBD6CB] shrink-0 mt-1.5"></span>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Suggested Investigation */}
              <div className="space-y-1.5 pt-2 border-t border-[#E3E9E3]">
                <span className="text-[11px] font-bold text-[#1F2421] block">Suggested investigation:</span>
                <ul className="space-y-1 text-xs text-[#1F2421]">
                  {insight.suggestedInvestigation.map((action, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#587C55] shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trace Trigger */}
              {insight.traceTargetId && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateToTrace(insight.traceTargetId!, insight.traceTargetType || 'location')}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded transition-colors flex items-center gap-1.5"
                  >
                    <span>Trace this signal</span>
                    <ArrowRight className="w-3 h-3 text-[#A8CFA3]" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
