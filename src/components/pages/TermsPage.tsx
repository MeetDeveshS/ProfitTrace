import React from 'react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white text-[#1F2421]">
      <section className="py-16 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2421]">
            Terms and Conditions
          </h1>
          <p className="text-xs text-[#68716B]">
            Last Updated: September 26, 2026 · ProfitTrace Inc.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-[#1F2421] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">1. Acceptance of Terms</h2>
            <p className="text-[#68716B]">
              By accessing, browsing, or utilizing the ProfitTrace software application, website, or associated API endpoints, you agree to be legally bound by these Terms and Conditions. If you are entering into these terms on behalf of a company, retail chain, fuel station network, or enterprise organization, you represent that you hold the legal authority to bind that entity.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">2. Service Description</h2>
            <p className="text-[#68716B]">
              ProfitTrace provides an analytical decision intelligence platform designed to decompose business revenues, compute contribution margin waterfalls, identify operational leaks, and simulate pricing outcomes. ProfitTrace is a decision-support tool and does not provide certified accounting, tax, or legal advisory services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">3. Account Responsibilities & Security</h2>
            <p className="text-[#68716B]">
              Users are responsible for safeguarding their login credentials. Organization administrators must ensure that role assignments (Owner, Admin, Finance, Manager, Analyst, Viewer) reflect appropriate corporate governance within their business hierarchy.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">4. Proprietary Data Ownership</h2>
            <p className="text-[#68716B]">
              You retain sole and exclusive ownership of all transaction records, supplier invoices, margin figures, and business operational files uploaded to ProfitTrace. ProfitTrace acquires no intellectual property rights or ownership claims over your uploaded business data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">5. Simulation & Forecast Disclaimers</h2>
            <div className="p-3 bg-[#F7FAF5] border border-[#CBD6CB] rounded text-[#68716B] leading-relaxed">
              <strong>Important Simulation Notice:</strong> What-If scenarios, elasticity models, and forecasted profit impacts represent mathematical estimates based on user-supplied variables. Actual real-world results may vary due to customer behavior, competitor pricing, supplier volatility, and macroeconomic factors. ProfitTrace makes no warranties or guarantees regarding business financial performance.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">6. Limitation of Liability</h2>
            <p className="text-[#68716B]">
              To the maximum extent permitted by applicable law, ProfitTrace and its officers shall not be liable for any indirect, consequential, punitive, or operational business losses resulting from pricing decisions, inventory orders, or staffing adjustments undertaken using platform analytics.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">7. Termination</h2>
            <p className="text-[#68716B]">
              Either party may terminate workspace access at any time upon notice. Upon termination, client data will be handled in accordance with the deletion schedule specified in our Privacy Policy.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">8. Contact Legal Counsel</h2>
            <p className="text-[#68716B]">
              Direct questions regarding these terms to: legal@profittrace.app
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
