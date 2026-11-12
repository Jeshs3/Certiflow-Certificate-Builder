import React, { useState } from 'react';
import {
  Baby,
  Heart,
  FolderOpen,
  LayoutDashboard,
  Info,
  HelpCircle,
  Menu,
  X,
  FileCheck2,
  Printer,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'dashboard' | 'birth' | 'marriage' | 'drafts' | 'about' | 'help';
  onNavigate: (view: 'dashboard' | 'birth' | 'marriage' | 'drafts' | 'about' | 'help') => void;
  draftsCount: number;
  sessionCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  draftsCount,
  sessionCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'birth', label: 'Birth Certificate', icon: Baby },
    { id: 'marriage', label: 'Marriage Certificate', icon: Heart },
    { id: 'drafts', label: 'Saved Drafts', icon: FolderOpen, count: draftsCount },
    { id: 'about', label: 'About', icon: Info },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const handleItemClick = (id: any) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-3">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleItemClick('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-navy-900 bg-[#1E3A8A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight block leading-tight">
              Certiflow: Sagbayan Documents
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide block">
              Certificate Template Generator
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors relative ${
                  isActive
                    ? 'bg-sky-50 text-sky-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-700' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-sky-200 text-sky-800 font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Header: Session Exports & Saved Local Drafts (Near hamburger / end of bar) */}
        <div className="flex items-center gap-2">
          {/* Quick Stats Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/90 text-slate-700 text-[11px] font-medium"
              title="Certificates printed or exported this session"
            >
              <Printer className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span className="hidden sm:inline text-slate-500">Exports:</span>
              <strong className="font-bold text-slate-900 font-mono">{sessionCount}</strong>
            </div>

            <div
              onClick={() => handleItemClick('drafts')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200/90 text-sky-900 text-[11px] font-medium cursor-pointer transition-colors"
              title="Saved Local Drafts in Browser Storage"
            >
              <FolderOpen className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span className="hidden sm:inline text-sky-800">Drafts:</span>
              <strong className="font-bold text-sky-950 font-mono">{draftsCount}</strong>
            </div>
          </div>

          {/* Mobile Hamburger Menu Toggle (Three Lines) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-200 text-sky-800 font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
