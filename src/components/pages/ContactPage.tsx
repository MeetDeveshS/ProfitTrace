import React, { useState } from 'react';
import { Mail, Phone, Building, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [scale, setScale] = useState('medium');
  const [businessType, setBusinessType] = useState('fuel_station');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setStatus({ type: 'error', text: 'Please fill in your name, corporate email, and message.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Call backend or simulate dispatch
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        text: 'Thank you for reaching out. A ProfitTrace decision intelligence specialist has received your inquiry and will respond within 1 business day.',
      });
      trackEvent({
        category: 'conversion',
        action: 'contact_form_submitted',
        metadata: { company, scale, businessType },
      });
      setFullName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="bg-white text-[#1F2421]">
      <section className="py-16 md:py-20 border-b border-[#E3E9E3] bg-[#F7FAF5]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#CBD6CB] rounded-md text-xs font-medium text-[#587C55]">
            Enterprise Decision Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2421]">
            Contact our financial engineering team
          </h1>
          <p className="text-sm text-[#68716B] max-w-xl mx-auto">
            Discuss integration feasibility for your fuel station network, retail chain, restaurant group, or franchise organization.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left contact info */}
          <div className="md:col-span-5 space-y-6 text-xs text-[#68716B]">
            <div>
              <h2 className="text-base font-bold text-[#1F2421]">Direct Consultation</h2>
              <p className="mt-1 leading-relaxed">
                Connect with specialists experienced in forecourt telemetry, multi-location POS consolidation, and gross margin optimization.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-1">
                <span className="font-bold text-[#1F2421] text-xs block">Corporate Email</span>
                <span className="font-mono text-[#587C55]">inquiries@profittrace.app</span>
              </div>

              <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-1">
                <span className="font-bold text-[#1F2421] text-xs block">Operational Response Standard</span>
                <span>Inquiries reviewed by Senior Financial Analysts within 24 hours.</span>
              </div>

              <div className="p-4 bg-[#F7FAF5] border border-[#E3E9E3] rounded-md space-y-1">
                <span className="font-bold text-[#1F2421] text-xs block">Data Privacy Guarantee</span>
                <span>Non-disclosure agreements executed before ingesting proprietary CSV extracts.</span>
              </div>
            </div>
          </div>

          {/* Right contact form */}
          <div className="md:col-span-7 bg-white p-6 border border-[#E3E9E3] rounded-md shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#1F2421]">Request Consultation or Demo Walkthrough</h3>

            {status && (
              <div
                className={`p-3 rounded-md text-xs flex items-start gap-2 ${
                  status.type === 'success'
                    ? 'bg-[#F7FAF5] text-[#587C55] border border-[#A8CFA3]'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#1F2421] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Patel"
                    className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#1F2421] mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#1F2421] mb-1">Business or Organization</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Express Fuel Network"
                    className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#1F2421] mb-1">Industry Sector</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                  >
                    <option value="fuel_station">Fuel Stations / Petrol Pumps</option>
                    <option value="retail">Retail Chain or Supermarkets</option>
                    <option value="restaurant">Restaurants or Cafés</option>
                    <option value="manufacturing">Manufacturing & Assembly</option>
                    <option value="distribution">Wholesale & Distribution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#1F2421] mb-1">Operational Scale</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                >
                  <option value="small">Single Location (1 to 2 Sites)</option>
                  <option value="medium">Regional Network (3 to 15 Locations)</option>
                  <option value="large">Enterprise Group (15+ Locations)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#1F2421] mb-1">What challenges or margin leaks are you investigating? *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your current reporting setup, POS systems, or specific margin leak concerns..."
                  className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <span>Dispatching...</span> : <><span>Submit Inquiry</span><ArrowRight className="w-4 h-4 text-[#A8CFA3]" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
