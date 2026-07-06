/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, MessageSquare, Send, Sparkles, X, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  density?: 'compact' | 'comfortable';
}

export default function Footer({ onNavigate, density = 'comfortable' }: FooterProps) {
  const isCompact = density === 'compact';
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsContactOpen(false);
        setIsSubmitted(false);
        setEmail('');
        setMessage('');
      }, 2000);
    }, 1000);
  };

  return (
    <footer id="footer-container" className={`bg-white dark:bg-[#0B0F19] border-t border-gray-100 dark:border-slate-800 transition-all ${isCompact ? 'py-8' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo Brand */}
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2">
            <div className="bg-black dark:bg-slate-800 text-white p-1 rounded-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight text-black dark:text-white">
              Script<span className="text-[#4F46E5]">IQ</span>
            </span>
          </a>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              id="footer-link-privacy"
              href="/privacy"
              onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              id="footer-link-terms"
              href="/terms"
              onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              id="footer-link-refund"
              href="/refund"
              onClick={(e) => { e.preventDefault(); onNavigate('refund'); }}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </a>
            <a
              id="footer-link-pricing"
              href="/pricing"
              onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Pricing Plans
            </a>
            <a
              id="footer-link-title-generator"
              href="/title-generator"
              onClick={(e) => { e.preventDefault(); onNavigate('title-generator'); }}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer font-medium text-[#4F46E5] hover:text-[#4338CA]"
            >
              YouTube Title Generator
            </a>
            <button
              id="footer-link-contact"
              onClick={() => setIsContactOpen(true)}
              className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contact Drawer Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#111827] w-full max-w-md rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden p-6 relative">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-2 rounded-xl">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-black dark:text-white">Contact Support</h3>
                <p className="font-sans text-xs text-gray-500 dark:text-gray-400">We usually reply within a few hours.</p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center text-black dark:text-white">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-full mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-semibold text-gray-900 dark:text-white mb-1">Message Sent!</h4>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400">Thank you for reaching out. We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-black dark:text-white">
                <div>
                  <label htmlFor="contact-email" className="block font-sans text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full font-sans text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-750 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    How can we help you?
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know your question, feedback, or custom request..."
                    className="w-full font-sans text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-750 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-sans text-sm font-semibold flex items-center justify-center gap-2 px-4 py-3 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl cursor-pointer disabled:opacity-50 transition-colors shadow-xs"
                >
                  {isSubmitting ? (
                    <span className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
