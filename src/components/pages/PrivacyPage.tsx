import React from 'react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
  onOpenCookieSettings: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  return (
    <div className="bg-white text-[#1F2421]">
      <section className="py-16 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Legal & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2421]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#68716B]">
            Effective Date: September 26, 2026 · ProfitTrace Inc.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-[#1F2421] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">1. Overview and Core Commitment</h2>
            <p className="text-[#68716B]">
              ProfitTrace ("ProfitTrace", "we", "our", or "us") provides a business profitability and decision intelligence software platform. We understand that your company financial ledgers, product acquisition costs, employee shift logs, and location metrics represent sensitive business assets. This Privacy Policy outlines what information we collect, how it is secured, and your rights concerning that data.
            </p>
            <div className="p-3 bg-[#F7FAF5] border border-[#CBD6CB] rounded font-medium text-[#587C55]">
              Core Commitment: We do not sell your proprietary business data, share it with advertising networks, or use your private transactions to train public artificial intelligence models.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">2. Information We Ingest and Process</h2>
            <p className="text-[#68716B]">We process information under two broad categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#68716B]">
              <li>
                <strong>Account & Profile Credentials:</strong> Your name, work email address, hashed authentication credentials, organization affiliation, and assigned role (e.g. Owner, Finance, Manager).
              </li>
              <li>
                <strong>Business & Operational Datasets:</strong> Transaction records, SKU volume numbers, unit retail prices, wholesale acquisition bills, shift logs, fuel dispenser delivery volumes, and location overhead entries that you upload via CSV, API, or POS integration.
              </li>
              <li>
                <strong>Technical Telemetry:</strong> IP addresses, browser types, session activity timestamps, and basic performance telemetry required to maintain service availability and prevent brute-force intrusion attempts.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">3. How Your Information is Utilized</h2>
            <p className="text-[#68716B]">Your data is utilized exclusively for providing the ProfitTrace software services:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#68716B]">
              <li>Executing value-chain calculations and waterfall contribution breakdowns.</li>
              <li>Benchmarking relative location and product margins within your private tenant.</li>
              <li>Simulating What-If financial adjustments based on your selected parameters.</li>
              <li>Generating downloadable CSV and printable audit reports for your organization.</li>
              <li>Dispatched automated margin leak alerts configured by your administrators.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">4. Multi-Tenant Logical Isolation & Security</h2>
            <p className="text-[#68716B]">
              We implement architectural defenses to ensure strict tenant isolation. All database records are keyed to specific organization identifiers verified by session tokens. Data in transit is protected using TLS 1.3 encryption, and data at rest is encrypted using AES-256 standard protocols.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">5. Cookie Policy & Preferences</h2>
            <p className="text-[#68716B]">
              We use strictly necessary cookies to sustain authentication sessions and CSRF protection. With your explicit consent, we may utilize minimal analytics cookies to gauge platform feature utilization. You can review or adjust your preferences at any time.
            </p>
            <button
              onClick={onOpenCookieSettings}
              className="text-[#587C55] font-semibold underline hover:text-[#1F2421]"
            >
              Adjust Cookie Preferences
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">6. Data Retention & Tenant Deletion</h2>
            <p className="text-[#68716B]">
              We retain business records only for as long as your workspace remains active. Upon written termination by an account Owner, all uploaded transaction ledgers, scenario runs, and location records are permanently scrubbed from production storage within 30 calendar days.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#1F2421] uppercase tracking-wide">7. Contact Information</h2>
            <p className="text-[#68716B]">
              For privacy inquiries, audit certifications, or data processing agreements (DPA), contact our Data Governance Officer:
            </p>
            <div className="p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded font-mono text-[11px] text-[#1F2421]">
              ProfitTrace Inc. · Data Protection & Privacy Office<br />
              Email: privacy@profittrace.app<br />
              Address: 100 Financial Intelligence Way, Suite 400
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
