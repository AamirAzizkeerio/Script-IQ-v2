/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight, LayoutGrid, Sliders, Sun, Moon } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from './AuthContext';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView, sectionId?: string) => void;
  density?: 'compact' | 'comfortable';
  onSetDensity?: (density: 'compact' | 'comfortable') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function Navbar({ 
  currentView, 
  onNavigate, 
  density = 'compact', 
  onSetDensity,
  theme = 'light',
  onToggleTheme 
}: NavbarProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (view: PageView, sectionId?: string) => {
    setIsOpen(false);
    onNavigate(view, sectionId);
  };

  const isCompact = density === 'compact';

  return (
    <nav
      id="navbar-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        isScrolled
          ? isCompact
            ? 'bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 py-2 shadow-xs'
            : 'bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 py-3 shadow-xs'
          : isCompact
            ? 'bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-xs border-b border-gray-100 dark:border-slate-800 py-2.5'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="bg-[#4F46E5] text-white p-1.5 rounded-lg transition-transform group-hover:scale-105 duration-150">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-black dark:text-white">
              Script<span className="text-[#4F46E5]">IQ</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              id="nav-link-features"
              onClick={() => handleLinkClick('home', 'features')}
              className="font-sans text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              id="nav-link-howitworks"
              onClick={() => handleLinkClick('home', 'how-it-works')}
              className="font-sans text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              id="nav-link-faq"
              onClick={() => handleLinkClick('home', 'faq')}
              className="font-sans text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              id="nav-link-pricing"
              onClick={() => handleLinkClick('pricing')}
              className={`font-sans text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'pricing' ? 'text-[#4F46E5] font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              Pricing
            </button>
            <button
              id="nav-link-title-generator"
              onClick={() => handleLinkClick('title-generator')}
              className="font-sans text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Title Generator
            </button>
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            )}

            {/* Density Mode Control */}
            {onSetDensity && (
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-0.5 rounded-md border border-gray-200/50 dark:border-slate-700 text-[10px] font-mono mr-1">
                <button
                  type="button"
                  onClick={() => onSetDensity('comfortable')}
                  className={`px-1.5 py-0.5 rounded-sm transition-all cursor-pointer ${
                    density === 'comfortable'
                      ? 'bg-white dark:bg-slate-700 text-black dark:text-white font-semibold shadow-2xs'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Comfortable spacing theme"
                >
                  Comfort
                </button>
                <button
                  type="button"
                  onClick={() => onSetDensity('compact')}
                  className={`px-1.5 py-0.5 rounded-sm transition-all cursor-pointer ${
                    density === 'compact'
                      ? 'bg-white dark:bg-slate-700 text-black dark:text-white font-semibold shadow-2xs'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="High Density compact theme"
                >
                  High Density
                </button>
              </div>
            )}

            {(currentView === 'dashboard' || user) ? (
              <button
                id="nav-btn-dashboard"
                onClick={() => handleLinkClick('dashboard')}
                className="font-sans text-sm font-medium px-4 py-2 text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-lg transition-all duration-150 cursor-pointer shadow-xs"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  id="nav-btn-signin"
                  onClick={() => handleLinkClick('signin')}
                  className="font-sans text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-btn-getstarted"
                  onClick={() => handleLinkClick('dashboard')}
                  className="font-sans text-sm font-medium flex items-center gap-1 px-4 py-2 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Dark Mode Toggle on Mobile */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            )}

            <button
              id="nav-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          id="nav-mobile-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0B0F19] border-b border-gray-100 dark:border-slate-800 shadow-lg px-4 py-6 space-y-4 animate-fade-in"
        >
          <div className="flex flex-col gap-4">
            <button
              id="mobile-link-features"
              onClick={() => handleLinkClick('home', 'features')}
              className="font-sans text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white py-1 cursor-pointer"
            >
              Features
            </button>
            <button
              id="mobile-link-howitworks"
              onClick={() => handleLinkClick('home', 'how-it-works')}
              className="font-sans text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white py-1 cursor-pointer"
            >
              How It Works
            </button>
            <button
              id="mobile-link-faq"
              onClick={() => handleLinkClick('home', 'faq')}
              className="font-sans text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white py-1 cursor-pointer"
            >
              FAQ
            </button>
            <button
              id="mobile-link-pricing"
              onClick={() => handleLinkClick('pricing')}
              className={`font-sans text-left text-base font-medium py-1 cursor-pointer ${
                currentView === 'pricing' ? 'text-[#4F46E5] font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              Pricing
            </button>
            <button
              id="mobile-link-title-generator"
              onClick={() => handleLinkClick('title-generator')}
              className="font-sans text-left text-base font-semibold text-[#4F46E5] hover:text-[#4338CA] py-1 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" /> YouTube Title Generator
            </button>
            
            {onSetDensity && (
              <div className="flex flex-col gap-1.5 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-750">
                <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">Layout Spacing</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onSetDensity('comfortable')}
                    className={`flex-1 text-center font-sans text-xs py-1.5 rounded-md cursor-pointer border ${
                      density === 'comfortable'
                        ? 'bg-white dark:bg-slate-700 text-black dark:text-white font-semibold border-gray-200 dark:border-slate-600 shadow-2xs'
                        : 'text-gray-500 border-transparent hover:bg-gray-100/50'
                    }`}
                  >
                    Comfort
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetDensity('compact')}
                    className={`flex-1 text-center font-sans text-xs py-1.5 rounded-md cursor-pointer border ${
                      density === 'compact'
                        ? 'bg-white dark:bg-slate-700 text-black dark:text-white font-semibold border-gray-200 dark:border-slate-600 shadow-2xs'
                        : 'text-gray-500 border-transparent hover:bg-gray-100/50'
                    }`}
                  >
                    High Density
                  </button>
                </div>
              </div>
            )}

            <div className="h-[1px] bg-gray-100 dark:bg-slate-800 my-2" />

            {(currentView === 'dashboard' || user) ? (
              <button
                id="mobile-btn-dashboard"
                onClick={() => handleLinkClick('dashboard')}
                className="font-sans text-center text-base font-medium w-full py-2.5 text-white dark:text-black bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  id="mobile-btn-signin"
                  onClick={() => handleLinkClick('signin')}
                  className="font-sans text-center text-base font-medium w-full py-2.5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Sign In
                </button>
                <button
                  id="mobile-btn-getstarted"
                  onClick={() => handleLinkClick('dashboard')}
                  className="font-sans text-center text-base font-medium flex items-center justify-center gap-1.5 w-full py-2.5 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  Get Started
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
