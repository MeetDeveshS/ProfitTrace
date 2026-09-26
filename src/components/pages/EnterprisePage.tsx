import React from 'react';
import { ArrowRight, Building2, Shield, Lock, Database, Server, Check, Users, FileCheck } from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';

interface EnterprisePageProps {
  onNavigate: (path: string) => void;
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

export const EnterprisePage: React.FC<EnterprisePageProps> = ({ onNavigate, onOpenContact, onOpenDemo }) => {
  return (
    <div className="bg-white text-[#1F2421]">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[#E3E9E3] bg-[#F7FAF5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Enterprise Infrastructure & Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1F2421]">
            Decision intelligence across dozens of operating locations
          </h1>
          <p className="text-base text-[#68716B] max-w-2xl mx-auto leading-relaxed">
            ProfitTrace scales from regional franchise networks to nationwide fuel and retail groups with complete logical tenant isolation, granular role permissions, and unalterable audit trails.
          </p>
          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={() => {
                trackEvent({ category: 'conversion', action: 'enterprise_contact_click' });
                onOpenContact();
              }}
              className="px-6 py-3 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-2"
            >
              <span>Schedule Enterprise Briefing</span>
              <ArrowRight className="w-4 h-4 text-[#A8CFA3]" />
            </button>
            <button
              onClick={onOpenDemo}
              className="px-6 py-3 font-semibold text-[#1F2421] border border-[#CBD6CB] bg-white hover:bg-[#F7FAF5] rounded-md transition-colors"
            >
              Test Multi-Location Demo
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Pillars */}
      <section className="py-20 border-b border-[#E3E9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <Building2 className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-lg font-bold text-[#1F2421]">Hierarchical Data Architecture</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Structured multi-tenant data model: Organization → Businesses → Locations → Products → Ledgers. Roll up performance for the Board while isolating location managers to their specific sites.
              </p>
            </div>

            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <Users className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-lg font-bold text-[#1F2421]">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Six strict permission profiles (Owner, Admin, Finance, Manager, Analyst, Viewer) ensure site supervisors only view their own shifts, while corporate treasury conducts macro waterfalls.
              </p>
            </div>

            <div className="p-6 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-3">
              <Server className="w-6 h-6 text-[#587C55]" />
              <h3 className="text-lg font-bold text-[#1F2421]">POS & ERP Connectors</h3>
              <p className="text-xs text-[#68716B] leading-relaxed">
                Pre-built integration adapters for enterprise systems including SAP, Oracle NetSuite, Microsoft Dynamics, Petronic fuel systems, and custom legacy SQL transaction pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Grid */}
      <section className="py-20 border-b border-[#E3E9E3] bg-[#F7FAF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#587C55]">Data Integrity Standards</h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2421]">Financial Data Governance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-[#E3E9E3] rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1F2421]">
                <Shield className="w-4 h-4 text-[#587C55]" />
                <span>Logical & Physical Tenant Boundary Enforcement</span>
              </div>
              <p className="text-[#68716B] leading-relaxed">
                Queries are scoped by cryptographically verified organization identifiers at the database engine level, preventing cross-tenant leakage.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E3E9E3] rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1F2421]">
                <Lock className="w-4 h-4 text-[#587C55]" />
                <span>Zero Third-Party Training Ingestion</span>
              </div>
              <p className="text-[#68716B] leading-relaxed">
                Your invoices, margins, and customer discounts belong exclusively to your enterprise. We do not use client records to train public AI models.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E3E9E3] rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1F2421]">
                <FileCheck className="w-4 h-4 text-[#587C55]" />
                <span>Covenant & Audit Export Compatibility</span>
              </div>
              <p className="text-[#68716B] leading-relaxed">
                Generate immutable PDF and CSV statements suitable for external bank audits, syndicate lenders, and board presentation packs.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E3E9E3] rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1F2421]">
                <Database className="w-4 h-4 text-[#587C55]" />
                <span>Dedicated VPC & On-Premises Staging</span>
              </div>
              <p className="text-[#68716B] leading-relaxed">
                Available deployment architectures include dedicated cloud tenant clusters, private VPC endpoints, and on-premises data collector agents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
