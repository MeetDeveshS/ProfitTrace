import { BusinessWorkspace } from '../types';

export interface QueryAnalysisResponse {
  answer: string;
  dataPoints: { label: string; value: string; context?: string }[];
  suggestedAction: string;
  relatedView: 'overview' | 'profit-trace' | 'locations' | 'products' | 'inventory' | 'what-if' | 'insights' | 'reports';
  relatedEntityId?: string;
  sourceConfidence: 'high' | 'medium';
}

export const samplePresetQuestions = [
  'Why did profit fall this month?',
  'Which location has the highest margin?',
  'Which products are tying up inventory?',
  'What changed compared with last month?',
  'What happens if I increase the price by 5%?',
  'Where is the biggest margin leak right now?',
];

export async function askProfitTrace(
  query: string,
  workspace: BusinessWorkspace
): Promise<QueryAnalysisResponse> {
  const normalized = query.toLowerCase().trim();
  const currency = workspace.currencySymbol;

  // Simulate network latency for realistic feel
  await new Promise((resolve) => setTimeout(resolve, 450));

  if (normalized.includes('why') && (normalized.includes('profit') || normalized.includes('fall') || normalized.includes('decline') || normalized.includes('drop'))) {
    const marginDiff = (workspace.profitMarginPercent - workspace.previousMarginPercent).toFixed(1);
    return {
      answer: `Overall profit margin contracted by ${Math.abs(Number(marginDiff))}% (from ${workspace.previousMarginPercent}% to ${workspace.profitMarginPercent}%) despite top-line revenue increasing by ${(((workspace.revenue - workspace.previousRevenue) / workspace.previousRevenue) * 100).toFixed(1)}%. The primary driver is Station B (Industrial Bypass), where wholesale acquisition costs rose faster than pump price adjustments, coupled with a 38% increase in peak-shift overtime labor and fleet discount concessions.`,
      dataPoints: [
        { label: 'Revenue Growth', value: `+${(((workspace.revenue - workspace.previousRevenue) / workspace.previousRevenue) * 100).toFixed(1)}%`, context: 'Top-line expansion' },
        { label: 'Gross Margin Shift', value: `${marginDiff}%`, context: 'Margin compression' },
        { label: 'Key Leak Source', value: 'Station B', context: '8.5% margin vs 12.0% at Station A' },
        { label: 'Labor Overtime', value: '+16.4%', context: 'Station attendant expense' },
      ],
      suggestedAction: 'Open the Trace Profit view for Station B to audit the cost waterfall and discount structures.',
      relatedView: 'profit-trace',
      relatedEntityId: 'loc-sta-b',
      sourceConfidence: 'high',
    };
  }

  if (normalized.includes('highest margin') || normalized.includes('best location') || (normalized.includes('which location') && normalized.includes('margin'))) {
    const sorted = [...workspace.locations].sort((a, b) => b.marginPercent - a.marginPercent);
    const top = sorted[0];
    const bottom = sorted[sorted.length - 1];

    return {
      answer: `${top.name} has the highest margin at ${top.marginPercent.toFixed(1)}%, generating ${currency}${top.grossProfit.toLocaleString()} gross profit from ${currency}${top.revenue.toLocaleString()} revenue. In contrast, ${bottom.name} has the lowest margin at ${bottom.marginPercent.toFixed(1)}%, revealing a ${((top.marginPercent - bottom.marginPercent)).toFixed(1)} percentage point performance gap across locations.`,
      dataPoints: [
        { label: 'Top Margin Location', value: `${top.name}`, context: `${top.marginPercent.toFixed(1)}% gross margin` },
        { label: 'Net Contribution', value: `${currency}${top.netContribution.toLocaleString()}`, context: `${((top.netContribution / top.revenue) * 100).toFixed(1)}% net rate` },
        { label: 'Lowest Margin Location', value: `${bottom.name}`, context: `${bottom.marginPercent.toFixed(1)}% gross margin` },
        { label: 'Variance Spread', value: `${(top.marginPercent - bottom.marginPercent).toFixed(1)}%`, context: 'Location spread' },
      ],
      suggestedAction: 'Compare Station A and Station B side by side in the Locations module to benchmark shift labor and fuel blend differences.',
      relatedView: 'locations',
      relatedEntityId: top.id,
      sourceConfidence: 'high',
    };
  }

  if (normalized.includes('inventory') || normalized.includes('tying') || normalized.includes('stock') || normalized.includes('capital')) {
    const highestInvProduct = [...workspace.products].sort((a, b) => b.daysOfInventory - a.daysOfInventory)[0];
    const highestCapProduct = [...workspace.products].sort((a, b) => b.capitalTiedUp - a.capitalTiedUp)[0];

    return {
      answer: `${highestInvProduct.name} is tying up the longest capital cycle with ${highestInvProduct.daysOfInventory} days of inventory on hand (${currency}${highestInvProduct.capitalTiedUp.toLocaleString()} tied capital). Meanwhile, ${highestCapProduct.name} holds the largest absolute working capital at ${currency}${highestCapProduct.capitalTiedUp.toLocaleString()}, rotating every ${highestCapProduct.daysOfInventory} days.`,
      dataPoints: [
        { label: 'Slowest Turnover', value: `${highestInvProduct.name}`, context: `${highestInvProduct.daysOfInventory} days of supply` },
        { label: 'Highest Capital Tied', value: `${currency}${highestCapProduct.capitalTiedUp.toLocaleString()}`, context: highestCapProduct.name },
        { label: 'Excess Stock Alert', value: 'Station B Stockpile', context: '45 days of supply in lubricants' },
      ],
      suggestedAction: 'Review the Inventory module to rebalance stock from Station B to Station A and Station C.',
      relatedView: 'inventory',
      relatedEntityId: highestInvProduct.id,
      sourceConfidence: 'high',
    };
  }

  if (normalized.includes('what changed') || normalized.includes('last month') || normalized.includes('compared')) {
    const revDiff = workspace.revenue - workspace.previousRevenue;
    const gpDiff = workspace.grossProfit - workspace.previousGrossProfit;
    const opexDiff = workspace.operatingCosts - workspace.previousOperatingCosts;

    return {
      answer: `Compared with the prior benchmark period, top-line revenue increased by ${currency}${Math.abs(revDiff).toLocaleString()} (+${(((revDiff) / workspace.previousRevenue) * 100).toFixed(1)}%), but gross profit dropped by ${currency}${Math.abs(gpDiff).toLocaleString()} (-${(((Math.abs(gpDiff)) / workspace.previousGrossProfit) * 100).toFixed(1)}%). Operating costs simultaneously climbed by ${currency}${opexDiff.toLocaleString()} (+${(((opexDiff) / workspace.previousOperatingCosts) * 100).toFixed(1)}%), led by attendant overtime and fleet card processing fees.`,
      dataPoints: [
        { label: 'Revenue Delta', value: `+${currency}${revDiff.toLocaleString()}`, context: 'Top-line sales' },
        { label: 'Gross Profit Delta', value: `${currency}${gpDiff.toLocaleString()}`, context: 'Negative variance' },
        { label: 'OpEx Delta', value: `+${currency}${opexDiff.toLocaleString()}`, context: 'Cost expansion' },
        { label: 'Net Profit Impact', value: `${currency}${(gpDiff - opexDiff).toLocaleString()}`, context: 'Bottom-line squeeze' },
      ],
      suggestedAction: 'Inspect the monthly trend chart and expense breakdown on the Overview dashboard.',
      relatedView: 'overview',
      sourceConfidence: 'high',
    };
  }

  if (normalized.includes('increase') || normalized.includes('price') || normalized.includes('what happens') || normalized.includes('what if') || normalized.includes('5')) {
    const sampleProduct = workspace.products[0];
    const newPrice = sampleProduct.unitPrice * 1.05;
    const estVolLoss = sampleProduct.monthlyVolume * 0.97; // 3% volume elasticity
    const newRev = newPrice * estVolLoss;
    const newCost = sampleProduct.unitCost * estVolLoss;
    const newGross = newRev - newCost;
    const deltaGross = newGross - sampleProduct.grossProfit;

    return {
      answer: `If you increase the average selling price of ${sampleProduct.name} by 5% (from ${currency}${sampleProduct.unitPrice.toFixed(2)} to ${currency}${newPrice.toFixed(2)}), assuming an estimated 3% volume elasticity reduction, gross profit is projected to increase by ${currency}${Math.round(deltaGross).toLocaleString()} per month (+${(((deltaGross) / sampleProduct.grossProfit) * 100).toFixed(1)}%). Contribution margin expands by 1.8 percentage points.`,
      dataPoints: [
        { label: 'Proposed Price', value: `${currency}${newPrice.toFixed(2)}`, context: `Current: ${currency}${sampleProduct.unitPrice.toFixed(2)}` },
        { label: 'Estimated Volume', value: `${Math.round(estVolLoss).toLocaleString()} ${sampleProduct.unit}`, context: '-3% elastic response' },
        { label: 'Projected Net Gain', value: `+${currency}${Math.round(deltaGross).toLocaleString()}`, context: 'Monthly addition' },
        { label: 'Gross Margin Impact', value: '+1.8%', context: 'Margin restoration' },
      ],
      suggestedAction: 'Launch the What-If Simulator to fine-tune exact price points and volume elasticity assumptions.',
      relatedView: 'what-if',
      relatedEntityId: sampleProduct.id,
      sourceConfidence: 'high',
    };
  }

  // Default intelligent analysis fallback
  return {
    answer: `Analysis for "${query}": In ${workspace.name}, total monthly revenue is ${currency}${workspace.revenue.toLocaleString()} with a gross margin of ${workspace.profitMarginPercent.toFixed(1)}%. The primary operational variance identified across the network is margin compression at ${workspace.locations[1]?.name || 'Station B'}, where volume is healthy but net contribution has been eroded by wholesale supply cost increases and elevated site operating expenses.`,
    dataPoints: [
      { label: 'Active Workspace', value: workspace.name, context: workspace.periodLabel },
      { label: 'Current Revenue', value: `${currency}${workspace.revenue.toLocaleString()}`, context: 'Monthly total' },
      { label: 'Average Margin', value: `${workspace.profitMarginPercent.toFixed(1)}%`, context: 'Gross trading margin' },
      { label: 'Locations Tracked', value: `${workspace.locations.length} Sites`, context: 'All operational' },
    ],
    suggestedAction: 'Explore the Insights tab to see prioritized leak investigations detected by the platform.',
    relatedView: 'insights',
    sourceConfidence: 'medium',
  };
}
