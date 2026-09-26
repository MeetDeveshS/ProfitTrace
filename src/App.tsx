import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CookieConsent } from './components/layout/CookieConsent';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardLayout, DashboardViewType } from './components/dashboard/DashboardLayout';
import { OverviewView } from './components/dashboard/OverviewView';
import { ProfitTraceView } from './components/dashboard/ProfitTraceView';
import { LocationsView } from './components/dashboard/LocationsView';
import { ProductsView } from './components/dashboard/ProductsView';
import { InventoryView } from './components/dashboard/InventoryView';
import { WhatIfView } from './components/dashboard/WhatIfView';
import { InsightsView } from './components/dashboard/InsightsView';
import { DataImportView } from './components/dashboard/DataImportView';
import { ReportsView } from './components/dashboard/ReportsView';
import { SettingsView } from './components/dashboard/SettingsView';
import { ProductPage } from './components/pages/ProductPage';
import { EnterprisePage } from './components/pages/EnterprisePage';
import { FAQPage } from './components/pages/FAQPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { demoFuelNetwork, demoWorkspaces } from './data/demoData';
import { BusinessWorkspace, UserProfile } from './types';
import { trackPageView } from './services/analyticsService';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [dashboardView, setDashboardView] = useState<DashboardViewType>('overview');
  const [activeWorkspace, setActiveWorkspace] = useState<BusinessWorkspace>(demoFuelNetwork);
  const [traceTarget, setTraceTarget] = useState<{ id: string; type: 'product' | 'location' }>({
    id: 'loc-sta-b',
    type: 'location',
  });
  const [whatIfTargetId, setWhatIfTargetId] = useState<string>('prod-prem-fuel');

  // Authentication State
  const [user, setUser] = useState<UserProfile>({
    id: 'usr-default',
    name: 'Dev Sharma',
    email: 'dev@greenfuel.demo',
    role: 'owner',
    organizationId: 'org-greenfuel',
    organizationName: 'GreenFuel Network',
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Cookie Settings Modal State
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  // Sync with browser URL / hash if present on mount
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path && path !== '/') {
        setCurrentPath(path);
      }
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track page views on route changes
  useEffect(() => {
    trackPageView(currentPath, `ProfitTrace - ${currentPath}`);
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    // Handle anchor links on home
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        setCurrentPath('/');
      }
      setTimeout(() => {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenDemo = (target?: { view?: string; targetId?: string; targetType?: 'product' | 'location' }) => {
    setCurrentPath('/dashboard');
    if (target?.view) {
      setDashboardView(target.view as DashboardViewType);
    } else {
      setDashboardView('overview');
    }
    if (target?.targetId) {
      if (target.view === 'what-if') {
        setWhatIfTargetId(target.targetId);
      } else {
        setTraceTarget({
          id: target.targetId,
          type: target.targetType || 'location',
        });
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTrace = (targetId: string, targetType: 'product' | 'location' = 'location') => {
    setTraceTarget({ id: targetId, type: targetType });
    setDashboardView('profit-trace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToWhatIf = (productId: string) => {
    setWhatIfTargetId(productId);
    setDashboardView('what-if');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Dashboard View Router
  const renderDashboardContent = () => {
    switch (dashboardView) {
      case 'overview':
        return (
          <OverviewView
            workspace={activeWorkspace}
            onNavigateToTrace={handleNavigateToTrace}
            onNavigateView={(view) => setDashboardView(view)}
          />
        );
      case 'profit-trace':
        return (
          <ProfitTraceView
            workspace={activeWorkspace}
            initialTargetId={traceTarget.id}
            initialTargetType={traceTarget.type}
            onNavigateToWhatIf={handleNavigateToWhatIf}
            onNavigateToReports={() => setDashboardView('reports')}
          />
        );
      case 'locations':
        return (
          <LocationsView
            workspace={activeWorkspace}
            onNavigateToTrace={(locId) => handleNavigateToTrace(locId, 'location')}
          />
        );
      case 'products':
        return (
          <ProductsView
            workspace={activeWorkspace}
            onNavigateToTrace={(prodId) => handleNavigateToTrace(prodId, 'product')}
            onNavigateToWhatIf={handleNavigateToWhatIf}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            workspace={activeWorkspace}
            onNavigateToTrace={(prodId) => handleNavigateToTrace(prodId, 'product')}
          />
        );
      case 'what-if':
        return (
          <WhatIfView
            workspace={activeWorkspace}
            initialProductId={whatIfTargetId}
            onNavigateToReports={() => setDashboardView('reports')}
          />
        );
      case 'insights':
        return (
          <InsightsView
            workspace={activeWorkspace}
            onNavigateToTrace={handleNavigateToTrace}
            onNavigateView={(view) => setDashboardView(view)}
          />
        );
      case 'data-import':
        return (
          <DataImportView
            workspace={activeWorkspace}
            onNavigateToOverview={() => setDashboardView('overview')}
          />
        );
      case 'reports':
        return <ReportsView workspace={activeWorkspace} />;
      case 'settings':
        return <SettingsView workspace={activeWorkspace} user={user} />;
      default:
        return (
          <OverviewView
            workspace={activeWorkspace}
            onNavigateToTrace={handleNavigateToTrace}
            onNavigateView={(view) => setDashboardView(view)}
          />
        );
    }
  };

  // Render Top-level Route View
  const renderMainContent = () => {
    switch (currentPath) {
      case '/':
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenDemo={handleOpenDemo}
          />
        );
      case '/product':
        return (
          <ProductPage
            onNavigate={handleNavigate}
            onOpenDemo={handleOpenDemo}
          />
        );
      case '/enterprise':
        return (
          <EnterprisePage
            onNavigate={handleNavigate}
            onOpenContact={() => handleNavigate('/contact')}
            onOpenDemo={handleOpenDemo}
          />
        );
      case '/faq':
        return (
          <FAQPage
            onNavigate={handleNavigate}
            onOpenContact={() => handleNavigate('/contact')}
          />
        );
      case '/contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case '/privacy':
        return (
          <PrivacyPage
            onNavigate={handleNavigate}
            onOpenCookieSettings={() => setCookieSettingsOpen(true)}
          />
        );
      case '/terms':
      case '/terms-and-conditions':
        return <TermsPage onNavigate={handleNavigate} />;
      case '/dashboard':
        return (
          <DashboardLayout
            currentView={dashboardView}
            onViewChange={setDashboardView}
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={setActiveWorkspace}
            user={user}
            onSignOut={() => {
              handleOpenAuth('login');
            }}
            onExitToWebsite={() => handleNavigate('/')}
          >
            {renderDashboardContent()}
          </DashboardLayout>
        );
      default:
        return (
          <NotFoundPage
            onGoHome={() => handleNavigate('/')}
            onGoDashboard={() => handleNavigate('/dashboard')}
          />
        );
    }
  };

  const isDashboard = currentPath === '/dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2421]">
      {/* Universal Header (hidden in full dashboard view for maximal workspace presence) */}
      {!isDashboard && (
        <Header
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">{renderMainContent()}</main>

      {/* Universal Footer (hidden in dashboard view) */}
      {!isDashboard && (
        <Footer
          onNavigate={handleNavigate}
          onOpenCookieSettings={() => setCookieSettingsOpen(true)}
        />
      )}

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(authedUser) => {
          setUser(authedUser);
          setAuthModalOpen(false);
          handleNavigate('/dashboard');
        }}
      />

      {/* Cookie Consent & Preferences Management */}
      <CookieConsent
        forceOpenSettings={cookieSettingsOpen}
        onCloseSettings={() => setCookieSettingsOpen(false)}
      />
    </div>
  );
}
