import React, { useState } from 'react';
import { X, Lock, Mail, Building, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { trackEvent } from '../../services/analyticsService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup' | 'forgot';
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [role, setRole] = useState<UserRole>('finance');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'forgot') {
        setMessage({
          type: 'success',
          text: `Password reset instructions dispatched to ${email || 'your email'}. Check your inbox.`,
        });
        trackEvent({ category: 'auth', action: 'password_reset_requested' });
        return;
      }

      if (mode === 'signup') {
        if (!email || !fullName) {
          setMessage({ type: 'error', text: 'Please complete all required fields.' });
          return;
        }
        const newUser: UserProfile = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          name: fullName,
          email,
          role: 'owner',
          organizationId: 'org-demo',
          organizationName: businessName || 'My Enterprise Network',
        };
        trackEvent({ category: 'auth', action: 'signup_success' });
        onAuthSuccess(newUser);
        onClose();
        return;
      }

      // Login
      const user: UserProfile = {
        id: 'usr-default',
        name: fullName || 'Dev Sharma',
        email: email || 'finance@greenfuel.demo',
        role,
        organizationId: 'org-greenfuel',
        organizationName: 'GreenFuel Network',
      };
      trackEvent({ category: 'auth', action: 'login_success' });
      onAuthSuccess(user);
      onClose();
    }, 450);
  };

  const fillDemoCredentials = (selectedRole: UserRole) => {
    if (selectedRole === 'owner') {
      setEmail('owner@greenfuel.demo');
      setFullName('Dev Sharma (Executive)');
      setRole('owner');
    } else {
      setEmail('analyst@greenfuel.demo');
      setFullName('Rohan Mehta (Financial Analyst)');
      setRole('analyst');
    }
    setPassword('••••••••••••');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg border border-[#E3E9E3] max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E9E3]">
          <div>
            <h2 className="text-lg font-bold text-[#1F2421]">
              {mode === 'login' && 'Sign in to ProfitTrace'}
              {mode === 'signup' && 'Create your workspace'}
              {mode === 'forgot' && 'Reset your password'}
            </h2>
            <p className="text-xs text-[#68716B] mt-0.5">
              Secure decision intelligence workspace access.
            </p>
          </div>
          <button onClick={onClose} className="text-[#68716B] hover:text-[#1F2421] p-1 rounded-md" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded-md text-xs flex items-start gap-2 ${
            message.type === 'success' ? 'bg-[#F7FAF5] text-[#587C55] border border-[#A8CFA3]' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block font-medium text-[#1F2421] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#68716B] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rachel Sterling"
                    className="w-full pl-9 pr-3 py-2 border border-[#E3E9E3] rounded-md focus:border-[#587C55] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-[#1F2421] mb-1">Business or Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#68716B] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Fuels or Metro Retail"
                    className="w-full pl-9 pr-3 py-2 border border-[#E3E9E3] rounded-md focus:border-[#587C55] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block font-medium text-[#1F2421] mb-1">Corporate or Business Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#68716B] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 border border-[#E3E9E3] rounded-md focus:border-[#587C55] focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-[#1F2421]">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMessage(null); setMode('forgot'); }}
                    className="text-[#587C55] hover:underline text-[11px]"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#68716B] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-[#E3E9E3] rounded-md focus:border-[#587C55] focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-medium text-white bg-[#1F2421] hover:bg-[#2e3631] transition-colors rounded-md text-sm disabled:opacity-60"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create Account' : 'Send Instructions'}
          </button>
        </form>

        {/* Quick Demo Access Switcher */}
        {mode === 'login' && (
          <div className="pt-3 border-t border-[#E3E9E3] space-y-2">
            <span className="text-[11px] font-medium text-[#68716B] block">Quick test credentials:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoCredentials('owner')}
                className="p-2 border border-[#E3E9E3] rounded-md hover:bg-[#F7FAF5] text-left transition-colors"
              >
                <div className="font-medium text-[#1F2421]">Executive / Owner</div>
                <div className="text-[10px] text-[#68716B]">Full permissions</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('analyst')}
                className="p-2 border border-[#E3E9E3] rounded-md hover:bg-[#F7FAF5] text-left transition-colors"
              >
                <div className="font-medium text-[#1F2421]">Financial Analyst</div>
                <div className="text-[10px] text-[#68716B]">Analysis & simulation</div>
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-2 text-xs text-[#68716B]">
          {mode === 'login' && (
            <span>
              Need a new organization workspace?{' '}
              <button type="button" onClick={() => { setMessage(null); setMode('signup'); }} className="text-[#587C55] font-semibold hover:underline">
                Create one here
              </button>
            </span>
          )}
          {mode === 'signup' && (
            <span>
              Already have an account?{' '}
              <button type="button" onClick={() => { setMessage(null); setMode('login'); }} className="text-[#587C55] font-semibold hover:underline">
                Sign in
              </button>
            </span>
          )}
          {mode === 'forgot' && (
            <button type="button" onClick={() => { setMessage(null); setMode('login'); }} className="text-[#587C55] font-semibold hover:underline">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
