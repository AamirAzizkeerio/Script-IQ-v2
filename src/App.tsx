/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import SignInView from './components/SignInView';
import { PrivacyView, TermsView, RefundView } from './components/LegalViews';
import NotFoundView from './components/NotFoundView';
import YoutubeTitleGeneratorView from './components/YoutubeTitleGeneratorView';
import AIPresentationRobot from './components/AIPresentationRobot';
import PricingView from './components/PricingView';
import { useAuth } from './components/AuthContext';

export default function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<PageView>('home');
  const [userEmail, setUserEmail] = useState('amirkeerio3@gmail.com');
  const [authRedirectMessage, setAuthRedirectMessage] = useState<string | null>(null);
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  // Sync theme class with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle cross-page and single-page navigation and scrolling
  const handleNavigation = (targetView: PageView, sectionId?: string) => {
    if (targetView === 'dashboard') {
      if (!loading && !user) {
        setAuthRedirectMessage('Please sign in or create an account to access the creator dashboard.');
        setView('signin');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }

    if (targetView !== 'signin') {
      setAuthRedirectMessage(null);
    }

    setView(targetView);
    
    if (sectionId) {
      if (targetView === 'home') {
        // If already on home, scroll immediately
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Auto-redirect to dashboard when user logs in, or back to signin when logged out
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (view === 'signin') {
          setView('dashboard');
        }
      } else {
        if (view === 'dashboard') {
          setView('signin');
          setAuthRedirectMessage('Please sign in or create an account to access the creator dashboard.');
        }
      }
    }
  }, [user, loading, view]);

  // Sync email when user authenticates
  useEffect(() => {
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  // Scroll to top on standard page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  // Determine if general layout chrome (Navbar & Footer) should be shown
  const showMainChrome = view !== 'dashboard' && view !== 'signin';

  return (
    <div className={`min-h-screen bg-white dark:bg-[#0B0F19] font-sans text-black dark:text-white transition-colors duration-200 selection:bg-[#4F46E5]/10 selection:text-[#4F46E5] ${density === 'compact' ? 'text-xs' : 'text-sm'}`}>
      {/* 1. Global Navigation header */}
      {showMainChrome && (
        <Navbar 
          currentView={view} 
          onNavigate={handleNavigation} 
          density={density} 
          onSetDensity={setDensity}
          theme={theme}
          onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        />
      )}

      {/* 2. Main Page views */}
      <main className="transition-all duration-150 ease-in-out">
        {view === 'home' && (
          <HomeView onNavigate={handleNavigation} density={density} />
        )}
        {view === 'signin' && (
          <SignInView 
            onNavigate={handleNavigation} 
            onSetUserEmail={setUserEmail} 
            density={density} 
            onSetDensity={setDensity} 
            redirectMessage={authRedirectMessage}
          />
        )}
        {view === 'dashboard' && (
          <DashboardView onNavigate={handleNavigation} userEmail={userEmail} density={density} onSetDensity={setDensity} />
        )}
        {view === 'privacy' && (
          <PrivacyView onNavigate={handleNavigation} />
        )}
        {view === 'terms' && (
          <TermsView onNavigate={handleNavigation} />
        )}
        {view === 'refund' && (
          <RefundView onNavigate={handleNavigation} />
        )}
        {view === 'notfound' && (
          <NotFoundView onNavigate={handleNavigation} />
        )}
        {view === 'title-generator' && (
          <YoutubeTitleGeneratorView onNavigate={handleNavigation} density={density} />
        )}
        {view === 'pricing' && (
          <PricingView onNavigate={handleNavigation} density={density} />
        )}
      </main>

      {/* 3. Global Footer */}
      {showMainChrome && (
        <Footer onNavigate={handleNavigation} density={density} />
      )}

      {/* 4. Interactive Cute Robot Companion Guide */}
      <AIPresentationRobot currentView={view} onNavigate={handleNavigation} />
    </div>
  );
}

