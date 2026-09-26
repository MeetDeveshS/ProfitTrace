import React, { useState } from 'react';
import { Layers, Menu, X, ArrowRight, ShieldCheck, ChevronRight, Download } from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';
import { ProfitTraceLogo } from '../common/ProfitTraceLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', path: '/product' },
    { label: 'Solutions', path: '/#solutions' },
    { label: 'How it works', path: '/#how-it-works' },
    { label: 'Enterprise', path: '/enterprise' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    trackEvent({ category: 'navigation', action: 'header_nav_click', label: path });
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#E3E9E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center text-left group focus-visible:outline-none"
              aria-label="ProfitTrace home"
            >
              <ProfitTraceLogo height={38} variant="full" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#1F2421] ${
                    isActive ? 'text-[#1F2421] font-semibold' : 'text-[#68716B]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/profittrace-project.zip"
              download="profittrace-project.zip"
              className="px-3 py-1.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] transition-colors rounded-md flex items-center gap-1.5"
              title="Download full project ZIP for VS Code"
            >
              <Download className="w-3.5 h-3.5 text-[#587C55]" />
              <span>Download for VS Code</span>
            </a>

            <button
              onClick={() => {
                trackEvent({ category: 'conversion', action: 'open_demo_workspace' });
                onNavigate('/dashboard');
              }}
              className="px-3.5 py-2 text-sm font-medium text-[#1F2421] hover:text-[#587C55] transition-colors rounded-md hover:bg-[#F7FAF5]"
            >
              Live Demo Workspace
            </button>

            <button
              onClick={() => {
                trackEvent({ category: 'auth', action: 'header_login_click' });
                onOpenAuth('login');
              }}
              className="px-3.5 py-2 text-sm font-medium text-[#68716B] hover:text-[#1F2421] transition-colors rounded-md"
            >
              Log in
            </button>

            <button
              onClick={() => {
                trackEvent({ category: 'conversion', action: 'header_try_click' });
                onNavigate('/dashboard');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1F2421] hover:bg-[#2e3631] transition-all rounded-md flex items-center gap-1.5 shadow-xs"
            >
              <span>Try ProfitTrace</span>
              <ArrowRight className="w-4 h-4 text-[#A8CFA3]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#1F2421] rounded-md"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#68716B] hover:text-[#1F2421] rounded-md focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E3E9E3] bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="flex items-center justify-between w-full py-2.5 px-3 text-left text-base font-medium text-[#1F2421] hover:bg-[#F7FAF5] rounded-md"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#68716B]" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E3E9E3] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/dashboard');
              }}
              className="w-full py-2.5 px-4 text-center font-medium text-white bg-[#1F2421] rounded-md"
            >
              Explore Live Demo Workspace
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2 px-4 text-center font-medium text-[#1F2421] border border-[#E3E9E3] rounded-md"
            >
              Account Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
