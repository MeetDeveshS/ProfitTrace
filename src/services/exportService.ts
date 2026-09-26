import { BusinessWorkspace } from '../types';

export function downloadCSV(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateProfitabilityCSV(workspace: BusinessWorkspace): string {
  const headers = ['Entity Type', 'Name', 'Code/Category', 'Revenue', 'Gross Profit', 'Margin %', 'OpEx', 'Net Contribution'];
  const rows: (string | number)[][] = [];

  // Locations
  workspace.locations.forEach((loc) => {
    rows.push([
      'Location',
      `"${loc.name}"`,
      loc.code,
      loc.revenue,
      loc.grossProfit,
      loc.marginPercent.toFixed(1),
      loc.opex,
      loc.netContribution,
    ]);
  });

  // Products
  workspace.products.forEach((prod) => {
    rows.push([
      'Product',
      `"${prod.name}"`,
      prod.category,
      prod.revenue,
      prod.grossProfit,
      prod.grossMarginPercent.toFixed(1),
      prod.opexAllocation,
      prod.netContribution,
    ]);
  });

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function generateLocationCSV(workspace: BusinessWorkspace): string {
  const headers = ['Location Name', 'Code', 'City', 'Manager', 'Revenue', 'Gross Profit', 'Margin %', 'OpEx', 'Net Contribution', 'Status', 'Top Leak Reason'];
  const rows = workspace.locations.map((loc) => [
    `"${loc.name}"`,
    loc.code,
    `"${loc.city}"`,
    `"${loc.manager}"`,
    loc.revenue,
    loc.grossProfit,
    loc.marginPercent.toFixed(1),
    loc.opex,
    loc.netContribution,
    loc.status,
    `"${loc.topLeakReason || 'None'}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function generateProductCSV(workspace: BusinessWorkspace): string {
  const headers = ['Product Name', 'Category', 'Unit', 'Unit Price', 'Unit Cost', 'Gross Margin %', 'Monthly Volume', 'Total Revenue', 'Gross Profit', 'Status'];
  const rows = workspace.products.map((p) => [
    `"${p.name}"`,
    `"${p.category}"`,
    p.unit,
    p.unitPrice.toFixed(2),
    p.unitCost.toFixed(2),
    p.grossMarginPercent.toFixed(1),
    p.monthlyVolume,
    p.revenue,
    p.grossProfit,
    p.status,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function generateSampleUploadCSV(): string {
  const headers = ['Date', 'Location_Code', 'Product_SKU', 'Product_Name', 'Units_Sold', 'Unit_Price', 'Unit_Cost', 'Direct_OpEx'];
  const rows = [
    ['2026-09-01', 'GF-01', 'SKU-XP95', 'Premium Fuel', '1250', '104.00', '92.50', '4800.00'],
    ['2026-09-01', 'GF-01', 'SKU-REG', 'Regular Petrol', '2400', '96.00', '86.80', '6200.00'],
    ['2026-09-01', 'GF-02', 'SKU-HSD', 'High Speed Diesel', '3100', '88.00', '80.20', '8400.00'],
    ['2026-09-02', 'GF-02', 'SKU-XP95', 'Premium Fuel', '980', '104.00', '92.50', '4200.00'],
    ['2026-09-02', 'GF-03', 'SKU-CNG', 'Compressed Natural Gas', '640', '78.00', '65.00', '1800.00'],
  ];

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
