import React from 'react';
import { GitFork, ArrowLeft, Home, LayoutDashboard } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
  onGoDashboard: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome, onGoDashboard }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-md bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center mx-auto text-[#587C55]">
          <GitFork className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#587C55] uppercase tracking-wider">Error 404</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">Page not found</h1>
          <p className="text-xs text-[#68716B] leading-relaxed">
            Looks like this trace went somewhere else. The requested URL could not be resolved against the ProfitTrace route table.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGoDashboard}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center justify-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#A8CFA3]" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] bg-white hover:bg-[#F7FAF5] rounded-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-[#68716B]" />
            <span>Go to Home Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
