import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (path: string) => void;
  onOpenContact: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      category: 'Product Capabilities',
      q: 'What is the difference between ProfitTrace and traditional accounting software?',
      a: 'Accounting software reports aggregated historic books for compliance, statutory audit, and tax calculation. It does not explain why a specific petrol pump station had an 8.5% margin while another achieved 12.0%. ProfitTrace analyzes transaction-level volume, unit pricing, wholesale acquisition cost shifts, discount structures, and direct location overhead to identify exactly where profit is made and where it leaks.',
    },
    {
      category: 'Product Capabilities',
      q: 'How does the "Trace Profit" waterfall work?',
      a: 'The Trace Profit engine deconstructs top-line revenue through every intermediary step: gross sales, unit volume delivered, realized unit price, direct supplier acquisition cost, gross margin percentage, forecourt operating expenses, and net contribution. It automatically compares these values against prior benchmark periods to reveal variance drivers.',
    },
    {
      category: 'Product Capabilities',
      q: 'Can ProfitTrace support multi-location businesses with dozens of branches?',
      a: 'Yes. ProfitTrace was built from the ground up for multi-tenant and multi-location operations. You can manage multiple businesses and locations under one enterprise organization, compare locations side by side, and identify branch-specific margin variances.',
    },
    {
      category: 'Data & Integrations',
      q: 'How does data get ingested into ProfitTrace?',
      a: 'You can import transactions via our built-in CSV mapper, connect direct API staging endpoints, or integrate with existing POS systems, fuel dispenser automation consoles, and ERP platforms such as SAP, Oracle, and Dynamics.',
    },
    {
      category: 'Data & Integrations',
      q: 'What happens if my CSV has missing columns or invalid data formatting?',
      a: 'Our built-in validation layer inspects every uploaded record, highlighting missing rows, duplicate records, number formatting errors, and schema mismatches with actionable line-by-line feedback before any data is ingested into your live database.',
    },
    {
      category: 'Privacy & Governance',
      q: 'Is our financial data used to train AI models?',
      a: 'No. We have an unyielding privacy policy: customer data is never sold, shared with third parties, or fed into public LLM training datasets. Your proprietary transactions, margins, and payroll numbers remain isolated within your private tenant perimeter.',
    },
    {
      category: 'Privacy & Governance',
      q: 'What user roles and permissions are supported?',
      a: 'ProfitTrace provides six distinct roles: Owner, Admin, Finance, Manager, Analyst, and Viewer. Site managers can be restricted to their assigned branch, while corporate finance retains network-wide audit visibility.',
    },
    {
      category: 'What-If Simulation',
      q: 'How accurate is the What-If Simulator?',
      a: 'The simulator calculates exact mathematical outcomes based on user-defined pricing, unit costs, discounts, and volume elasticity assumptions. All projections are clearly labeled as "Scenario estimates", noting that actual market results can vary with external economic conditions.',
    },
  ];

  const filteredFaqs = faqData.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-[#1F2421]">
      <section className="py-16 md:py-20 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2421]">
            Clear answers about ProfitTrace
          </h1>
          <p className="text-sm text-[#68716B] max-w-xl mx-auto">
            Find answers regarding profitability tracing, data ingestion, location benchmarking, security protocols, and operational workflows.
          </p>

          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#68716B] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword..."
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#CBD6CB] bg-white rounded-md focus:border-[#587C55] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-[#68716B] text-sm">
              No matching questions found. Try a different keyword or contact our team directly.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border border-[#E3E9E3] rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-sm text-[#1F2421] hover:bg-[#F7FAF5] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#587C55] uppercase block mb-0.5">{faq.category}</span>
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#68716B] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 text-xs text-[#68716B] leading-relaxed border-t border-[#E3E9E3]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}

          <div className="mt-12 p-6 bg-[#F7FAF5] border border-[#CBD6CB] rounded-md text-center space-y-3">
            <h3 className="text-base font-bold text-[#1F2421]">Have a specific business architecture question?</h3>
            <p className="text-xs text-[#68716B] max-w-md mx-auto">
              Our financial engineering specialists can walk through custom transaction formats and multi-site deployment requirements.
            </p>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <span>Contact Decision Support</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
