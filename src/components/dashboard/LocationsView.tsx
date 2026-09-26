import React, { useState } from 'react';
import {
  MapPin,
  ArrowUpDown,
  SlidersHorizontal,
  ArrowRight,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  Droplets,
  Layers,
} from 'lucide-react';
import { BusinessWorkspace, LocationData } from '../../types';
import { trackEvent } from '../../services/analyticsService';

interface LocationsViewProps {
  workspace: BusinessWorkspace;
  onNavigateToTrace: (locationId: string) => void;
}

export const LocationsView: React.FC<LocationsViewProps> = ({ workspace, onNavigateToTrace }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [comparingLocations, setComparingLocations] = useState<string[]>(['loc-sta-a', 'loc-sta-b']);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'revenue' | 'margin' | 'contribution'>('margin');
  const [filterStatus, setFilterStatus] = useState<'all' | 'healthy' | 'leak_detected' | 'review'>('all');

  const currency = workspace.currencySymbol;

  const filteredLocations = workspace.locations
    .filter((loc) => filterStatus === 'all' || loc.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'margin') return b.marginPercent - a.marginPercent;
      return b.netContribution - a.netContribution;
    });

  const toggleCompare = (id: string) => {
    if (comparingLocations.includes(id)) {
      if (comparingLocations.length > 2) {
        setComparingLocations(comparingLocations.filter((item) => item !== id));
      }
    } else {
      if (comparingLocations.length < 3) {
        setComparingLocations([...comparingLocations, id]);
      }
    }
  };

  const comparedLocationObjects = workspace.locations.filter((l) => comparingLocations.includes(l.id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Location Performance & Benchmarking</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#CBD6CB] text-[#587C55] rounded">
              {workspace.locations.length} Sites Operational
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Audit trading performance, shift variances, tank inventories, and payment settlement costs across all operating locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A8CFA3]" />
            <span>Compare Locations ({comparingLocations.length})</span>
          </button>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 border border-[#E3E9E3] rounded-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#68716B] font-medium">Filter by Status:</span>
          <div className="inline-flex p-0.5 bg-[#F7FAF5] border border-[#CBD6CB] rounded">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded transition-colors ${filterStatus === 'all' ? 'bg-[#1F2421] text-white font-medium' : 'text-[#68716B]'}`}
            >
              All Sites
            </button>
            <button
              onClick={() => setFilterStatus('healthy')}
              className={`px-2.5 py-1 rounded transition-colors ${filterStatus === 'healthy' ? 'bg-[#1F2421] text-white font-medium' : 'text-[#68716B]'}`}
            >
              Healthy
            </button>
            <button
              onClick={() => setFilterStatus('leak_detected')}
              className={`px-2.5 py-1 rounded transition-colors ${filterStatus === 'leak_detected' ? 'bg-[#1F2421] text-white font-medium' : 'text-[#68716B]'}`}
            >
              Leak Detected
            </button>
            <button
              onClick={() => setFilterStatus('review')}
              className={`px-2.5 py-1 rounded transition-colors ${filterStatus === 'review' ? 'bg-[#1F2421] text-white font-medium' : 'text-[#68716B]'}`}
            >
              Review
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#68716B] font-medium">Sort Order:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-[#CBD6CB] bg-[#F7FAF5] text-[#1F2421] rounded px-2.5 py-1 focus:border-[#587C55] focus:outline-none"
          >
            <option value="margin">Gross Margin % (Highest First)</option>
            <option value="revenue">Total Revenue</option>
            <option value="contribution">Net Contribution Cash</option>
          </select>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white border border-[#E3E9E3] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B] font-medium">
              <tr>
                <th className="py-3 px-4">Compare</th>
                <th className="py-3 px-4">Location Name</th>
                <th className="py-3 px-4">Manager & City</th>
                <th className="py-3 px-4 font-mono">Gross Revenue</th>
                <th className="py-3 px-4 font-mono">Gross Margin %</th>
                <th className="py-3 px-4 font-mono">Operating Costs</th>
                <th className="py-3 px-4 font-mono">Net Contribution</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E9E3]">
              {filteredLocations.map((loc) => {
                const isCompared = comparingLocations.includes(loc.id);
                return (
                  <tr key={loc.id} className="hover:bg-[#F7FAF5]/80 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => toggleCompare(loc.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#587C55] focus:ring-[#587C55]"
                        aria-label={`Select ${loc.name} for comparison`}
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-[#1F2421]">
                      <button
                        onClick={() => setSelectedLocation(loc)}
                        className="text-left font-bold hover:text-[#587C55] hover:underline"
                      >
                        {loc.name}
                      </button>
                      <div className="text-[10px] font-mono text-[#68716B]">{loc.code}</div>
                    </td>
                    <td className="py-3 px-4 text-[#68716B]">
                      <div>{loc.manager}</div>
                      <div className="text-[10px]">{loc.city}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-[#1F2421]">
                      {currency}{loc.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      <span className={loc.marginPercent < 10 ? 'text-[#D96B43]' : 'text-[#587C55]'}>
                        {loc.marginPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#68716B]">
                      {currency}{loc.opex.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#1F2421]">
                      {currency}{loc.netContribution.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {loc.status === 'healthy' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#587C55] font-semibold bg-[#F7FAF5] px-2 py-0.5 rounded border border-[#A8CFA3]">
                          <CheckCircle2 className="w-3 h-3" /> Healthy
                        </span>
                      )}
                      {loc.status === 'leak_detected' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#D96B43] font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          <AlertTriangle className="w-3 h-3" /> Leak Signal
                        </span>
                      )}
                      {loc.status === 'review' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#B87A28] font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Review
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLocation(loc)}
                        className="text-[#1F2421] font-semibold hover:underline"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onNavigateToTrace(loc.id)}
                        className="text-[#587C55] font-semibold hover:underline"
                      >
                        Trace Leak
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Detailed Inspection Drawer/Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-[#E3E9E3] max-w-3xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#E3E9E3]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#1F2421]">{selectedLocation.name}</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
                    {selectedLocation.code}
                  </span>
                </div>
                <p className="text-xs text-[#68716B] mt-0.5">
                  Managed by {selectedLocation.manager} · {selectedLocation.city}
                </p>
              </div>
              <button onClick={() => setSelectedLocation(null)} className="text-[#68716B] hover:text-[#1F2421] p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Variance note */}
            {selectedLocation.varianceNote && (
              <div className="p-3 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md text-xs text-[#1F2421] space-y-1">
                <span className="font-semibold text-[#587C55]">Operational Audit Observation:</span>
                <p className="text-[#68716B]">{selectedLocation.varianceNote}</p>
              </div>
            )}

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3]">
                <div className="text-[#68716B]">Total Revenue</div>
                <div className="font-mono text-base font-bold text-[#1F2421] mt-1">{currency}{selectedLocation.revenue.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3]">
                <div className="text-[#68716B]">Gross Margin</div>
                <div className={`font-mono text-base font-bold mt-1 ${selectedLocation.marginPercent < 10 ? 'text-[#D96B43]' : 'text-[#587C55]'}`}>
                  {selectedLocation.marginPercent.toFixed(1)}%
                </div>
              </div>
              <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3]">
                <div className="text-[#68716B]">Operating Expenses</div>
                <div className="font-mono text-base font-bold text-[#1F2421] mt-1">{currency}{selectedLocation.opex.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3]">
                <div className="text-[#68716B]">Net Contribution</div>
                <div className="font-mono text-base font-bold text-[#1F2421] mt-1">{currency}{selectedLocation.netContribution.toLocaleString()}</div>
              </div>
            </div>

            {/* Shift Performance (if fuel network) */}
            {selectedLocation.shifts && selectedLocation.shifts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#587C55]" /> Shift Performance Breakdown
                </h3>
                <div className="border border-[#E3E9E3] rounded-md overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                      <tr>
                        <th className="p-2.5">Shift Window</th>
                        <th className="p-2.5">Staff</th>
                        <th className="p-2.5 font-mono">Volume (L)</th>
                        <th className="p-2.5 font-mono">Revenue</th>
                        <th className="p-2.5 font-mono">Margin %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3E9E3]">
                      {selectedLocation.shifts.map((s, idx) => (
                        <tr key={idx} className="hover:bg-[#F7FAF5]/50">
                          <td className="p-2.5 font-medium">{s.shiftName}</td>
                          <td className="p-2.5">{s.staffCount} Attendants</td>
                          <td className="p-2.5 font-mono">{s.volumeSold.toLocaleString()} L</td>
                          <td className="p-2.5 font-mono">{currency}{s.revenue.toLocaleString()}</td>
                          <td className="p-2.5 font-mono font-semibold">
                            <span className={s.marginPercent < 9 ? 'text-[#D96B43]' : 'text-[#587C55]'}>
                              {s.marginPercent.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fuel Tanks / Inventory (if available) */}
            {selectedLocation.fuelTanks && selectedLocation.fuelTanks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#587C55]" /> Underground Tank Levels & Capacity
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {selectedLocation.fuelTanks.map((tank) => {
                    const fillPercent = Math.round((tank.currentLevelLiters / tank.capacityLiters) * 100);
                    return (
                      <div key={tank.id} className="p-2.5 bg-white border border-[#E3E9E3] rounded space-y-1">
                        <div className="font-semibold text-[#1F2421] truncate">{tank.fuelType}</div>
                        <div className="flex justify-between font-mono text-[11px] text-[#68716B]">
                          <span>{tank.currentLevelLiters.toLocaleString()} L</span>
                          <span>{fillPercent}%</span>
                        </div>
                        <div className="w-full bg-[#F7FAF5] h-1.5 rounded overflow-hidden border border-[#E3E9E3]">
                          <div
                            style={{ width: `${fillPercent}%` }}
                            className={`h-full ${fillPercent < 25 ? 'bg-[#D96B43]' : 'bg-[#587C55]'}`}
                          ></div>
                        </div>
                        <div className="text-[10px] text-[#68716B]">Last: {tank.lastDelivery}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Breakdown (if available) */}
            {selectedLocation.paymentBreakdown && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#587C55]" /> Settlement & Payment Channels
                </h3>
                <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#68716B] block">Cash</span>
                    <span className="font-bold">{selectedLocation.paymentBreakdown.cashPercent}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#68716B] block">Digital / UPI</span>
                    <span className="font-bold">{selectedLocation.paymentBreakdown.upiOrDigitalPercent}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#68716B] block">Cards</span>
                    <span className="font-bold">{selectedLocation.paymentBreakdown.cardPercent}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#68716B] block">Fleet Credit</span>
                    <span className="font-bold text-[#D96B43]">{selectedLocation.paymentBreakdown.fleetCardCreditPercent}%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-[#E3E9E3]">
              <button
                onClick={() => setSelectedLocation(null)}
                className="px-4 py-2 text-xs font-medium text-[#68716B] hover:text-[#1F2421]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedLocation.id;
                  setSelectedLocation(null);
                  onNavigateToTrace(id);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Run Profit Trace for this Location</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Location Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-[#E3E9E3] max-w-4xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E9E3]">
              <div>
                <h2 className="text-base font-bold text-[#1F2421]">Side-by-Side Location Comparison</h2>
                <p className="text-xs text-[#68716B]">Benchmarking variance in revenue realization, margins, and operational costs</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-[#68716B] hover:text-[#1F2421] p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E3E9E3] text-[#68716B]">
                    <th className="p-3 bg-[#F7FAF5] w-1/4">Metric</th>
                    {comparedLocationObjects.map((loc) => (
                      <th key={loc.id} className="p-3 font-bold text-[#1F2421] text-center">
                        <div>{loc.name}</div>
                        <div className="text-[10px] font-mono font-normal text-[#68716B]">{loc.code} · {loc.city}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E9E3]">
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Gross Revenue</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center font-mono font-bold text-[#1F2421]">
                        {currency}{loc.revenue.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Gross Profit Margin</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center font-mono font-bold">
                        <span className={loc.marginPercent < 10 ? 'text-[#D96B43]' : 'text-[#587C55]'}>
                          {loc.marginPercent.toFixed(1)}%
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Volume Delivered</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center font-mono">
                        {loc.volumeUnits.toLocaleString()} {loc.volumeUnitLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Operating Costs</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center font-mono text-[#68716B]">
                        {currency}{loc.opex.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Net Contribution</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center font-mono font-bold text-[#1F2421]">
                        {currency}{loc.netContribution.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Status Signal</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          loc.status === 'healthy' ? 'bg-[#F7FAF5] text-[#587C55]' : 'bg-red-50 text-[#D96B43]'
                        }`}>
                          {loc.status === 'healthy' ? 'Healthy' : 'Margin Leak'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[#F7FAF5]">Action</td>
                    {comparedLocationObjects.map((loc) => (
                      <td key={loc.id} className="p-3 text-center">
                        <button
                          onClick={() => {
                            setShowCompareModal(false);
                            onNavigateToTrace(loc.id);
                          }}
                          className="px-3 py-1 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded text-[11px]"
                        >
                          Trace {loc.code}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#F7FAF5] rounded border border-[#E3E9E3] text-xs text-[#68716B]">
              <strong>Benchmarking Insight:</strong> Station B delivers 10% higher top-line volume than Station A, but Station A produces 146% more retained net profit ({currency}3,32,400 vs {currency}1,35,100) due to Station B heavy commercial diesel blend and peak shift overtime.
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] rounded hover:bg-[#F7FAF5]"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
