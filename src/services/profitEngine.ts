import { BusinessWorkspace, LocationData, ProductData, ProfitTraceResult, WhatIfScenarioInputs, WhatIfScenarioOutputs } from '../types';

export function runProfitTrace(workspace: BusinessWorkspace, targetId: string, targetType: 'product' | 'location'): ProfitTraceResult {
  const currency = workspace.currencySymbol;

  if (targetType === 'product') {
    const product = workspace.products.find((p) => p.id === targetId) || workspace.products[0];
    const prevRev = product.revenue * 0.924; // Benchmark previous month
    const prevCost = prevRev * (1 - (product.grossMarginPercent + 2.1) / 100);
    const prevGrossProfit = prevRev - prevCost;
    const prevContribution = prevGrossProfit - (product.opexAllocation * 0.88);

    const revChangePercent = Number((((product.revenue - prevRev) / prevRev) * 100).toFixed(1));
    const grossProfitChangePercent = Number((((product.grossProfit - prevGrossProfit) / prevGrossProfit) * 100).toFixed(1));
    const marginChangePercent = -2.1;

    const steps = [
      {
        step: '1. Gross Revenue',
        label: 'Top-line sales realization',
        value: product.revenue,
        formattedValue: `${currency}${product.revenue.toLocaleString()}`,
        deltaPercent: revChangePercent,
        note: `Total volume of ${product.monthlyVolume.toLocaleString()} ${product.unit} sold.`,
      },
      {
        step: '2. Volume & Realized Price',
        label: 'Average price per unit',
        value: product.unitPrice,
        formattedValue: `${currency}${product.unitPrice.toFixed(2)} / ${product.unit}`,
        deltaPercent: 0.0,
        note: 'Nominal list price maintained without base tariff increase.',
      },
      {
        step: '3. Direct Acquisition & COGS',
        label: 'Wholesale acquisition cost',
        value: product.unitCost * product.monthlyVolume,
        formattedValue: `${currency}${(product.unitCost * product.monthlyVolume).toLocaleString()}`,
        deltaPercent: 9.8,
        note: `Wholesale cost per ${product.unit} increased to ${currency}${product.unitCost.toFixed(2)}.`,
      },
      {
        step: '4. Gross Margin',
        label: 'Trading margin after direct cost',
        value: product.grossProfit,
        formattedValue: `${currency}${product.grossProfit.toLocaleString()} (${product.grossMarginPercent.toFixed(1)}%)`,
        deltaPercent: grossProfitChangePercent,
        note: 'Margin compressed by 2.1 percentage points compared with prior benchmark.',
      },
      {
        step: '5. Operating Expense Allocation',
        label: 'Forecourt labor, handling & utilities',
        value: product.opexAllocation,
        formattedValue: `${currency}${product.opexAllocation.toLocaleString()}`,
        deltaPercent: 12.4,
        note: 'Direct handling, pump power, and dedicated attendant shifts.',
      },
      {
        step: '6. Net Contribution',
        label: 'Bottom-line cash contribution',
        value: product.netContribution,
        formattedValue: `${currency}${product.netContribution.toLocaleString()}`,
        deltaPercent: Number((((product.netContribution - prevContribution) / prevContribution) * 100).toFixed(1)),
        note: 'Net retained earnings before corporate general overhead.',
      },
    ];

    const contributingFactors = [
      {
        factor: 'Direct Wholesale Cost Surge',
        impactPercent: -5.4,
        impactValue: Math.round(product.monthlyVolume * 3.3),
        severity: 'high' as const,
        direction: 'negative' as const,
        explanation: `Terminal supply pricing rose by ${currency}3.30 per ${product.unit} while retail pump prices remained constant.`,
      },
      {
        factor: 'Commercial Fleet & Card Discounting',
        impactPercent: -2.3,
        impactValue: Math.round(product.revenue * 0.018),
        severity: 'medium' as const,
        direction: 'negative' as const,
        explanation: 'Fleet card accounts absorbed 1.8% of gross realizations via settlement allowances.',
      },
      {
        factor: 'Attendant Shift Allocation',
        impactPercent: -1.6,
        impactValue: Math.round(product.opexAllocation * 0.12),
        severity: 'medium' as const,
        direction: 'negative' as const,
        explanation: 'Overtime hours allocated to dedicated premium dispensers.',
      },
      {
        factor: 'Volume Expansion Offset',
        impactPercent: 3.2,
        impactValue: Math.round(prevRev * 0.082),
        severity: 'low' as const,
        direction: 'positive' as const,
        explanation: 'Higher commuter throughput partially counterbalanced unit margin compression.',
      },
    ];

    return {
      targetId: product.id,
      targetName: product.name,
      targetType: 'product',
      benchmarkPeriod: 'Month over Month Comparison',
      headlineSummary: `Revenue increased ${revChangePercent}%, but contribution margin decreased ${Math.abs(marginChangePercent)}%.`,
      revenueChangePercent: revChangePercent,
      marginChangePercent: marginChangePercent,
      steps,
      contributingFactors,
      investigationSteps: [
        'Audit supplier terminal invoices for unannounced transport or regional surcharge variations.',
        'Run the What-If simulator to measure elasticity if retail price is adjusted by 2% to 3%.',
        'Review fleet contract discount tiers: enforce minimum volume thresholds before granting rebates.',
        'Audit nozzle meter calibration to ensure zero dispenser delivery variance.',
      ],
    };
  }

  // Target is Location
  const location = workspace.locations.find((l) => l.id === targetId) || workspace.locations[1] || workspace.locations[0];
  const networkAvgMargin = Number((workspace.grossProfit / workspace.revenue * 100).toFixed(1));
  const marginDelta = Number((location.marginPercent - networkAvgMargin).toFixed(1));

  const steps = [
    {
      step: '1. Location Gross Revenue',
      label: 'Total sales across all bays',
      value: location.revenue,
      formattedValue: `${currency}${location.revenue.toLocaleString()}`,
      deltaPercent: 11.2,
      note: `Generated ${((location.revenue / workspace.revenue) * 100).toFixed(1)}% of total business revenue.`,
    },
    {
      step: '2. Volume Throughput',
      label: `Total units delivered (${location.volumeUnitLabel})`,
      value: location.volumeUnits,
      formattedValue: `${location.volumeUnits.toLocaleString()} ${location.volumeUnitLabel}`,
      deltaPercent: 9.4,
      note: 'High highway or industrial traffic density.',
    },
    {
      step: '3. Product Sales Mix',
      label: 'Realized gross margin percentage',
      value: location.marginPercent,
      formattedValue: `${location.marginPercent.toFixed(1)}%`,
      deltaPercent: marginDelta,
      note: `Below network average of ${networkAvgMargin.toFixed(1)}% due to low-margin product concentration.`,
    },
    {
      step: '4. Location Operating Expenses',
      label: 'Staffing, lease, power and upkeep',
      value: location.opex,
      formattedValue: `${currency}${location.opex.toLocaleString()}`,
      deltaPercent: 18.5,
      note: `OpEx ratio of ${((location.opex / location.revenue) * 100).toFixed(1)}% exceeds standard target of 4.5%.`,
    },
    {
      step: '5. Net Contribution',
      label: 'Retained site earnings',
      value: location.netContribution,
      formattedValue: `${currency}${location.netContribution.toLocaleString()}`,
      deltaPercent: -14.2,
      note: `Net margin is ${((location.netContribution / location.revenue) * 100).toFixed(1)}% of sales.`,
    },
  ];

  const contributingFactors = [
    {
      factor: 'Unfavorable Product Mix',
      impactPercent: -4.2,
      impactValue: Math.round(location.revenue * 0.035),
      severity: 'high' as const,
      direction: 'negative' as const,
      explanation: 'Over-reliance on commercial diesel and low-margin bulk sales rather than high-margin premium blends or store products.',
    },
    {
      factor: 'Extended Fleet Credit Allowances',
      impactPercent: -2.8,
      impactValue: Math.round(location.revenue * 0.021),
      severity: 'high' as const,
      direction: 'negative' as const,
      explanation: '44% of volume transacted on 30-day deferred credit terms with negotiated settlement discounts.',
    },
    {
      factor: 'Shift Labor Overtime Burden',
      impactPercent: -2.1,
      impactValue: 42000,
      severity: 'medium' as const,
      direction: 'negative' as const,
      explanation: 'Unscheduled attendant overtime during morning peak shift without proportional volume gain.',
    },
    {
      factor: 'High Gross Traffic Volume',
      impactPercent: 3.5,
      impactValue: Math.round(location.revenue * 0.08),
      severity: 'low' as const,
      direction: 'positive' as const,
      explanation: 'Steady footfall prevents inventory stagnation and maintains working capital velocity.',
    },
  ];

  return {
    targetId: location.id,
    targetName: location.name,
    targetType: 'location',
    benchmarkPeriod: 'Network Benchmark Comparison',
    headlineSummary: `${location.name} delivers ${((location.revenue / workspace.revenue) * 100).toFixed(0)}% of network sales, but margins are compressed by ${Math.abs(marginDelta)}% below network baseline.`,
    revenueChangePercent: 11.2,
    marginChangePercent: marginDelta,
    steps,
    contributingFactors,
    investigationSteps: [
      'Compare shift labor schedules against hourly vehicle transaction queues.',
      'Re-negotiate fleet card settlement terms to cap discount at 0.5% with prompt payment criteria.',
      'Train forecourt staff to upsell lubricants and premium grade fuels during pump stops.',
      'Check underground fuel tank calibration logs for physical loss or evaporation variance.',
    ],
  };
}

export function calculateWhatIf(inputs: WhatIfScenarioInputs): WhatIfScenarioOutputs {
  const { sellingPrice, unitCost, monthlyVolume, discountPercent, opex } = inputs;

  const currentPrice = sellingPrice;
  const currentCost = unitCost;
  const currentVol = monthlyVolume;
  const currentDisc = discountPercent;
  const currentOpex = opex;

  // Realized unit price after discount
  const effectivePrice = currentPrice * (1 - currentDisc / 100);
  const revenue = effectivePrice * currentVol;
  const totalCost = currentCost * currentVol;
  const grossProfit = revenue - totalCost;
  const marginPercent = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const netContribution = grossProfit - currentOpex;

  return {
    currentRevenue: revenue,
    currentGrossProfit: grossProfit,
    currentMarginPercent: Number(marginPercent.toFixed(2)),
    currentNetContribution: netContribution,
    projectedRevenue: revenue,
    projectedGrossProfit: grossProfit,
    projectedMarginPercent: Number(marginPercent.toFixed(2)),
    projectedNetContribution: netContribution,
    deltaRevenue: 0,
    deltaGrossProfit: 0,
    deltaMarginPercent: 0,
    deltaNetContribution: 0,
  };
}

export function simulateScenario(baseline: WhatIfScenarioInputs, proposed: WhatIfScenarioInputs): {
  baseline: WhatIfScenarioOutputs;
  projected: WhatIfScenarioOutputs;
  deltaRevenue: number;
  deltaRevenuePercent: number;
  deltaGrossProfit: number;
  deltaGrossProfitPercent: number;
  deltaMarginPercent: number;
  deltaNetContribution: number;
  deltaContributionPercent: number;
  verdict: 'favorable' | 'unfavorable' | 'neutral';
  explanation: string;
} {
  const baseOut = calculateWhatIf(baseline);
  const projOut = calculateWhatIf(proposed);

  const deltaRev = projOut.currentRevenue - baseOut.currentRevenue;
  const deltaRevPct = baseOut.currentRevenue > 0 ? (deltaRev / baseOut.currentRevenue) * 100 : 0;

  const deltaGP = projOut.currentGrossProfit - baseOut.currentGrossProfit;
  const deltaGPPct = baseOut.currentGrossProfit > 0 ? (deltaGP / baseOut.currentGrossProfit) * 100 : 0;

  const deltaMargin = projOut.currentMarginPercent - baseOut.currentMarginPercent;
  const deltaContrib = projOut.currentNetContribution - baseOut.currentNetContribution;
  const deltaContribPct = baseOut.currentNetContribution > 0 ? (deltaContrib / baseOut.currentNetContribution) * 100 : 0;

  let verdict: 'favorable' | 'unfavorable' | 'neutral' = 'neutral';
  if (deltaContrib > 0 && deltaMargin >= 0) {
    verdict = 'favorable';
  } else if (deltaContrib < 0) {
    verdict = 'unfavorable';
  }

  let explanation = '';
  if (deltaContrib > 0) {
    explanation = `Projected to expand net contribution by ${deltaContribPct.toFixed(1)}%, yielding an estimated extra net gain of ${Math.round(deltaContrib).toLocaleString()}.`;
  } else if (deltaContrib < 0) {
    explanation = `Caution: Proposed changes erode net contribution by ${Math.abs(deltaContribPct).toFixed(1)}% due to volume or cost resistance.`;
  } else {
    explanation = 'Projected financial impact is flat relative to existing operating baseline.';
  }

  return {
    baseline: baseOut,
    projected: projOut,
    deltaRevenue: deltaRev,
    deltaRevenuePercent: Number(deltaRevPct.toFixed(1)),
    deltaGrossProfit: deltaGP,
    deltaGrossProfitPercent: Number(deltaGPPct.toFixed(1)),
    deltaMarginPercent: Number(deltaMargin.toFixed(2)),
    deltaNetContribution: deltaContrib,
    deltaContributionPercent: Number(deltaContribPct.toFixed(1)),
    verdict,
    explanation,
  };
}
