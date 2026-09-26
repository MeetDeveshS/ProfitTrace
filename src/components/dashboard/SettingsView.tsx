import React, { useState } from 'react';
import {
  Building,
  Users,
  Shield,
  Bell,
  Lock,
  Database,
  CheckCircle2,
  Key,
} from 'lucide-react';
import { BusinessWorkspace, UserProfile, UserRole } from '../../types';
import { trackEvent } from '../../services/analyticsService';

interface SettingsViewProps {
  workspace: BusinessWorkspace;
  user: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ workspace, user }) => {
  const [activeTab, setActiveTab] = useState<'organization' | 'users' | 'security' | 'notifications'>('organization');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const [teamMembers, setTeamMembers] = useState<{ id: string; name: string; email: string; role: UserRole }[]>([
    { id: '1', name: 'Dev Sharma', email: 'owner@greenfuel.demo', role: 'owner' },
    { id: '2', name: 'Rohan Mehta', email: 'analyst@greenfuel.demo', role: 'analyst' },
    { id: '3', name: 'R. Sharma', email: 'station.a@greenfuel.demo', role: 'manager' },
    { id: '4', name: 'A. Kulkarni', email: 'station.b@greenfuel.demo', role: 'manager' },
    { id: '5', name: 'Kavita Rao', email: 'finance@greenfuel.demo', role: 'finance' },
  ]);

  const handleSave = () => {
    setSaveNotice('Settings updated successfully.');
    trackEvent({ category: 'feature', action: 'save_settings', label: activeTab });
    setTimeout(() => setSaveNotice(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Workspace Settings</h1>
          <p className="text-xs text-[#68716B] mt-0.5">
            Configure organization profiles, multi-location roles, security policies, and alerting triggers.
          </p>
        </div>

        {saveNotice && (
          <div className="flex items-center gap-1.5 text-xs text-[#587C55] font-semibold bg-[#F7FAF5] px-3 py-1.5 rounded border border-[#A8CFA3]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveNotice}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E9E3] gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('organization')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'organization' ? 'border-[#587C55] text-[#1F2421]' : 'border-transparent text-[#68716B]'
          }`}
        >
          Organization & Businesses
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'users' ? 'border-[#587C55] text-[#1F2421]' : 'border-transparent text-[#68716B]'
          }`}
        >
          Team & Role-Based Access
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'security' ? 'border-[#587C55] text-[#1F2421]' : 'border-transparent text-[#68716B]'
          }`}
        >
          Security & Tenant Isolation
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'notifications' ? 'border-[#587C55] text-[#1F2421]' : 'border-transparent text-[#68716B]'
          }`}
        >
          Alerts & Margin Thresholds
        </button>
      </div>

      {/* Tab 1: Organization */}
      {activeTab === 'organization' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5 text-xs">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#1F2421]">Enterprise Entity Details</h2>
            <p className="text-[#68716B]">Manage the overarching holding group and registered operating businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#1F2421] mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue={user.organizationName}
                className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-[#1F2421] mb-1">Operating Business Name</label>
              <input
                type="text"
                defaultValue={workspace.name}
                className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-[#1F2421] mb-1">Functional Scale</label>
              <select
                defaultValue={workspace.scale}
                className="w-full px-3 py-2 border border-[#CBD6CB] rounded focus:border-[#587C55] focus:outline-none capitalize"
              >
                <option value="small">Small (Single Outlet or Local Group)</option>
                <option value="medium">Medium (Regional Network or Chain)</option>
                <option value="large">Large (Multi-Location Enterprise Group)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-[#1F2421] mb-1">Primary Base Currency</label>
              <input
                type="text"
                defaultValue={`${workspace.currency} (${workspace.currencySymbol})`}
                disabled
                className="w-full px-3 py-2 border border-[#E3E9E3] bg-[#F7FAF5] text-[#68716B] rounded font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3E9E3] flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded transition-colors"
            >
              Save Organization Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Users & Roles */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F2421]">Role-Based Access Control (RBAC)</h2>
              <p className="text-[#68716B]">Supported roles: Owner, Admin, Finance, Manager, Analyst, Viewer</p>
            </div>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded transition-colors"
            >
              + Invite Team Member
            </button>
          </div>

          <div className="border border-[#E3E9E3] rounded overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B]">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">System Role</th>
                  <th className="p-3">Access Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F7FAF5]/50">
                    <td className="p-3 font-bold text-[#1F2421]">{member.name}</td>
                    <td className="p-3 font-mono text-[#68716B]">{member.email}</td>
                    <td className="p-3">
                      <select
                        defaultValue={member.role}
                        className="border border-[#CBD6CB] bg-white rounded px-2 py-1 text-xs capitalize font-medium"
                      >
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                        <option value="finance">Finance</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="p-3 text-[#68716B]">
                      {member.role === 'owner' ? 'All Businesses & Corporate General' : member.role === 'manager' ? 'Assigned Location Only' : 'Financial Waterfalls & Simulations'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5 text-xs">
          <div>
            <h2 className="text-sm font-bold text-[#1F2421]">Enterprise Security Architecture</h2>
            <p className="text-[#68716B]">Tenant isolation and cryptographic controls</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#F7FAF5] border border-[#E3E9E3] rounded flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#587C55] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1F2421] block">Tenant Isolation Enforced</span>
                <p className="text-[#68716B] mt-0.5">
                  Database queries strictly validate organization and business tenancy at the query routing middleware layer.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-[#F7FAF5] border border-[#E3E9E3] rounded flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#587C55] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1F2421] block">Zero Open AI Training Guarantee</span>
                <p className="text-[#68716B] mt-0.5">
                  Internal sales figures, margins, and customer identifiers are never submitted to public LLM training corpuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5 text-xs">
          <div>
            <h2 className="text-sm font-bold text-[#1F2421]">Automated Margin Leak Alerts</h2>
            <p className="text-[#68716B]">Configure automated triggers for operational divergence</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-[#E3E9E3] rounded">
              <div>
                <span className="font-bold text-[#1F2421] block">Gross Margin Compression Alert</span>
                <span className="text-[#68716B]">Dispatch alert if any location trading margin drops &gt;1.5% below benchmark</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#587C55] focus:ring-[#587C55] rounded" />
            </div>

            <div className="flex items-center justify-between p-3 border border-[#E3E9E3] rounded">
              <div>
                <span className="font-bold text-[#1F2421] block">Shift Labor Overtime Spike</span>
                <span className="text-[#68716B]">Alert executive team when location overtime exceeds 20% of shift budget</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#587C55] focus:ring-[#587C55] rounded" />
            </div>

            <div className="flex items-center justify-between p-3 border border-[#E3E9E3] rounded">
              <div>
                <span className="font-bold text-[#1F2421] block">Inventory Capital Stagnation</span>
                <span className="text-[#68716B]">Flag SKU positions where turnover exceeds 30 days of supply</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#587C55] focus:ring-[#587C55] rounded" />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3E9E3] flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded transition-colors"
            >
              Update Notification Rules
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
