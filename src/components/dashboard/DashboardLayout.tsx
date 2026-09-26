import React, { useState } from 'react';
import {
  LayoutDashboard,
  GitFork,
  MapPin,
  Package,
  Layers,
  SlidersHorizontal,
  Sparkles,
  FileSpreadsheet,
  FileText,
  Settings,
  ChevronDown,
  Search,
  Bell,
  LogOut,
  ArrowLeft,
  Download,
  Menu,
  X,
  AlertCircle,
  HelpCircle,
  Building,
} from 'lucide-react';
import { BusinessWorkspace, UserProfile } from '../../types';
import { demoWorkspaces } from '../../data/demoData';
import { trackEvent } from '../../services/analyticsService';
import { ProfitTraceLogo } from '../common/ProfitTraceLogo';

export type DashboardViewType =
  | 'overview'
  | 'profit-trace'
  | 'locations'
  | 'products'
  | 'inventory'
  | 'what-if'
  | 'insights'
  | 'data-import'
  | 'reports'
  | 'settings';

interface DashboardLayoutProps {
  currentView: DashboardViewType;
  onViewChange: (view: DashboardViewType) => void;
  activeWorkspace: BusinessWorkspace;
  onWorkspaceChange: (workspace: BusinessWorkspace) => void;
  user: UserProfile;
  onSignOut: () => void;
  onExitToWebsite: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentView,
  onViewChange,
  activeWorkspace,
  onWorkspaceChange,
  user,
  onSignOut,
  onExitToWebsite,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profit-trace', label: 'Profit Analysis (Trace)', icon: GitFork, badge: 'Core' },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'products', label: 'Products & Margins', icon: Package },
    { id: 'inventory', label: 'Inventory Exposure', icon: Layers },
    { id: 'what-if', label: 'What-If Analysis', icon: SlidersHorizontal },
    { id: 'insights', label: 'Insights & AI Analysis', icon: Sparkles, alertCount: activeWorkspace.insights.length },
    { id: 'data-import', label: 'Data & CSV Import', icon: FileSpreadsheet },
    { id: 'reports', label: 'Financial Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (id: string) => {
    trackEvent({ category: 'navigation', action: 'dashboard_tab_click', label: id });
    onViewChange(id as DashboardViewType);
    setMobileMenuOpen(false);
  };

  const handleSelectWorkspace = (wsId: string) => {
    const ws = demoWorkspaces[wsId];
    if (ws) {
      onWorkspaceChange(ws);
      setBusinessDropdownOpen(false);
      trackEvent({ category: 'feature', action: 'switch_workspace', label: ws.name });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF5] flex flex-col text-[#1F2421]">
      {/* Top Banner indicating Demo Workspace */}
      <div className="bg-[#1F2421] text-[#CBD6CB] text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#313A34] no-print">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#A8CFA3]"></span>
          <span className="font-semibold text-white">DEMO WORKSPACE:</span>
          <span>{activeWorkspace.name}</span>
          <span className="text-[#A8CFA3] hidden sm:inline">({activeWorkspace.scale.toUpperCase()} SCALE · {activeWorkspace.type.replace('_', ' ').toUpperCase()})</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/profittrace-project.zip"
            download="profittrace-project.zip"
            className="text-xs text-[#CBD6CB] hover:text-white transition-colors flex items-center gap-1 border border-[#313A34] bg-[#2A332B] px-2 py-0.5 rounded"
            title="Download complete codebase as ZIP to run locally in VS Code"
          >
            <Download className="w-3.5 h-3.5 text-[#A8CFA3]" />
            <span className="hidden sm:inline">Download Code (VS Code)</span>
          </a>
          <button
            onClick={onExitToWebsite}
            className="text-xs text-[#A8CFA3] hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E3E9E3] hidden lg:flex flex-col justify-between shrink-0 no-print">
          <div>
            {/* Logo / Brand */}
            <div className="h-14 px-4 border-b border-[#E3E9E3] flex items-center justify-between">
              <button onClick={onExitToWebsite} className="flex items-center text-left group" aria-label="ProfitTrace home">
                <ProfitTraceLogo height={32} variant="full" />
              </button>
              <span className="text-[10px] font-mono text-[#68716B] uppercase bg-[#F7FAF5] px-1.5 py-0.5 rounded border border-[#E3E9E3]">
                v1.0
              </span>
            </div>

            {/* Business Selector Button */}
            <div className="p-3 border-b border-[#E3E9E3] relative">
              <button
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                className="w-full p-2 bg-[#F7FAF5] hover:bg-[#EEF3EC] border border-[#CBD6CB] rounded-md text-left transition-colors flex items-center justify-between"
              >
                <div className="truncate">
                  <div className="text-[10px] uppercase font-semibold text-[#68716B]">Active Business</div>
                  <div className="text-xs font-bold text-[#1F2421] truncate">{activeWorkspace.name}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#68716B] shrink-0" />
              </button>

              {/* Business Dropdown Menu */}
              {businessDropdownOpen && (
                <div className="absolute top-16 left-3 right-3 bg-white border border-[#CBD6CB] rounded-md shadow-lg z-30 p-1 space-y-1">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#68716B]">Switch Demo Business</div>
                  {Object.values(demoWorkspaces).map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => handleSelectWorkspace(ws.id)}
                      className={`w-full p-2 text-left rounded text-xs transition-colors flex items-center justify-between ${
                        activeWorkspace.id === ws.id ? 'bg-[#F7FAF5] font-bold text-[#1F2421]' : 'hover:bg-[#F7FAF5] text-[#1F2421]'
                      }`}
                    >
                      <div>
                        <div>{ws.name}</div>
                        <div className="text-[10px] text-[#68716B] font-normal">{ws.type.replace('_', ' ')} · {ws.locations.length} locations</div>
                      </div>
                      {activeWorkspace.id === ws.id && <span className="w-1.5 h-1.5 rounded-full bg-[#587C55]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-0.5 text-xs">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-[#1F2421] text-white shadow-xs'
                        : 'text-[#1F2421] hover:bg-[#F7FAF5]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#A8CFA3]' : 'text-[#68716B]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-[#587C55] text-white' : 'bg-[#E3E9E3] text-[#587C55]'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {item.alertCount !== undefined && item.alertCount > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-[#D96B43] text-white' : 'bg-red-50 text-[#D96B43] border border-red-200'
                      }`}>
                        {item.alertCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Sign Out */}
          <div className="p-3 border-t border-[#E3E9E3] bg-[#F7FAF5]">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <div className="text-xs font-bold text-[#1F2421] truncate">{user.name}</div>
                <div className="text-[10px] text-[#68716B] font-mono capitalize">{user.role} role</div>
              </div>
              <button
                onClick={onSignOut}
                title="Log out"
                className="p-1.5 text-[#68716B] hover:text-[#1F2421] rounded hover:bg-white transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="h-14 bg-white border-b border-[#E3E9E3] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 no-print">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#68716B] hover:text-[#1F2421] rounded"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="hidden sm:block">
                <span className="text-xs text-[#68716B]">Workspace</span>
                <div className="text-sm font-bold text-[#1F2421]">{activeWorkspace.name}</div>
              </div>
            </div>

            {/* Actions: Time Range, Search, Notification Trigger */}
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-xs border border-[#CBD6CB] bg-[#F7FAF5] text-[#1F2421] rounded-md px-2.5 py-1.5 focus:border-[#587C55] focus:outline-none"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days (Demo Period)</option>
                <option value="Quarter to Date">Quarter to Date</option>
                <option value="Full Year 2026">Full Year 2026</option>
              </select>

              <button
                onClick={() => onViewChange('insights')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-[#68716B] bg-[#F7FAF5] border border-[#CBD6CB] hover:bg-[#EEF3EC] rounded-md transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Ask ProfitTrace...</span>
              </button>

              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-[#68716B] hover:text-[#1F2421] hover:bg-[#F7FAF5] rounded-md relative transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D96B43]"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-white border border-[#CBD6CB] rounded-md shadow-xl p-3 z-30 space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E3E9E3]">
                      <span className="font-bold text-[#1F2421]">Profit Signals & Alerts</span>
                      <button onClick={() => setNotificationsOpen(false)} className="text-[#68716B] hover:text-[#1F2421]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {activeWorkspace.insights.slice(0, 3).map((ins) => (
                        <div
                          key={ins.id}
                          onClick={() => {
                            setNotificationsOpen(false);
                            onViewChange('insights');
                          }}
                          className="p-2 bg-[#F7FAF5] rounded border border-[#E3E9E3] hover:border-[#587C55] cursor-pointer transition-colors"
                        >
                          <div className="font-semibold text-[#1F2421]">{ins.title}</div>
                          <div className="text-[11px] text-[#68716B] mt-0.5 line-clamp-2">{ins.whatHappened}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-[#E3E9E3] p-4 space-y-3 z-30">
              <div className="p-2 bg-[#F7FAF5] rounded border border-[#CBD6CB] text-xs">
                <div className="text-[10px] font-semibold text-[#68716B]">CURRENT BUSINESS</div>
                <div className="font-bold text-[#1F2421]">{activeWorkspace.name}</div>
              </div>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded text-xs text-left ${
                      currentView === item.id ? 'bg-[#1F2421] text-white' : 'text-[#1F2421] hover:bg-[#F7FAF5]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span className="text-[10px] px-1 bg-[#587C55] text-white rounded">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subview Viewport */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
