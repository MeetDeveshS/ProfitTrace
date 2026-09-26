export type BusinessScale = 'small' | 'medium' | 'large';

export type BusinessType = 
  | 'fuel_station' 
  | 'retail' 
  | 'restaurant' 
  | 'manufacturing' 
  | 'ecommerce' 
  | 'services' 
  | 'distribution';

export type UserRole = 
  | 'owner' 
  | 'admin' 
  | 'finance' 
  | 'manager' 
  | 'analyst' 
  | 'viewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
}

export interface FuelTank {
  id: string;
  fuelType: string;
  capacityLiters: number;
  currentLevelLiters: number;
  reorderLevelLiters: number;
  lastDelivery: string;
}

export interface ShiftPerformance {
  shiftName: string;
  startTime: string;
  endTime: string;
  staffCount: number;
  volumeSold: number;
  revenue: number;
  marginPercent: number;
  variancePercent: number;
}

export interface PaymentBreakdown {
  cashPercent: number;
  cardPercent: number;
  upiOrDigitalPercent: number;
  fleetCardCreditPercent: number;
  creditReconciliationVariance: number;
}

export interface LocationData {
  id: string;
  name: string;
  code: string;
  city: string;
  manager: string;
  revenue: number;
  grossProfit: number;
  marginPercent: number;
  opex: number;
  netContribution: number;
  volumeUnits: number;
  volumeUnitLabel: string;
  status: 'healthy' | 'review' | 'leak_detected';
  varianceNote?: string;
  fuelTanks?: FuelTank[];
  shifts?: ShiftPerformance[];
  paymentBreakdown?: PaymentBreakdown;
  topLeakReason?: string;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  unitCost: number;
  grossMarginPercent: number;
  monthlyVolume: number;
  revenue: number;
  grossProfit: number;
  opexAllocation: number;
  netContribution: number;
  capitalTiedUp: number;
  daysOfInventory: number;
  status: 'optimal' | 'margin_pressure' | 'review';
  varianceNote?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  locationId: string;
  locationName: string;
  quantityOnHand: number;
  unit: string;
  unitCost: number;
  totalValuation: number;
  holdingCostMonthly: number;
  turnoverDays: number;
  status: 'optimal' | 'excess' | 'low';
}

export interface ExpenseCategory {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  changePercent: number;
  allocationPercent: number;
  isLeakRisk: boolean;
  notes: string;
}

export interface TraceFactor {
  factor: string;
  impactPercent: number;
  impactValue: number;
  severity: 'high' | 'medium' | 'low';
  direction: 'negative' | 'positive';
  explanation: string;
}

export interface TraceStep {
  step: string;
  label: string;
  value: number;
  formattedValue: string;
  deltaPercent?: number;
  note: string;
}

export interface ProfitTraceResult {
  targetId: string;
  targetName: string;
  targetType: 'product' | 'location' | 'business_unit';
  benchmarkPeriod: string;
  headlineSummary: string;
  revenueChangePercent: number;
  marginChangePercent: number;
  steps: TraceStep[];
  contributingFactors: TraceFactor[];
  investigationSteps: string[];
}

export interface WhatIfScenarioInputs {
  sellingPrice: number;
  unitCost: number;
  monthlyVolume: number;
  discountPercent: number;
  opex: number;
}

export interface WhatIfScenarioOutputs {
  currentRevenue: number;
  currentGrossProfit: number;
  currentMarginPercent: number;
  currentNetContribution: number;
  projectedRevenue: number;
  projectedGrossProfit: number;
  projectedMarginPercent: number;
  projectedNetContribution: number;
  deltaRevenue: number;
  deltaGrossProfit: number;
  deltaMarginPercent: number;
  deltaNetContribution: number;
}

export interface BusinessInsight {
  id: string;
  title: string;
  category: 'margin' | 'cost' | 'inventory' | 'location' | 'pricing';
  severity: 'high' | 'medium' | 'low';
  whatHappened: string;
  possibleDrivers: string[];
  dataBehindObservation: string;
  suggestedInvestigation: string[];
  affectedEntityName: string;
  traceTargetId?: string;
  traceTargetType?: 'product' | 'location';
}

export interface BusinessWorkspace {
  id: string;
  name: string;
  scale: BusinessScale;
  type: BusinessType;
  currency: string;
  currencySymbol: string;
  periodLabel: string;
  revenue: number;
  previousRevenue: number;
  grossProfit: number;
  previousGrossProfit: number;
  profitMarginPercent: number;
  previousMarginPercent: number;
  operatingCosts: number;
  previousOperatingCosts: number;
  locations: LocationData[];
  products: ProductData[];
  inventory: InventoryItem[];
  expenses: ExpenseCategory[];
  insights: BusinessInsight[];
  trendMonthly: {
    month: string;
    revenue: number;
    grossProfit: number;
    marginPercent: number;
    opex: number;
  }[];
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  updatedAt: string;
}
