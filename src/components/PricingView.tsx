/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Clock, 
  Zap, 
  Calculator, 
  Users, 
  Gift, 
  ArrowRight, 
  AlertCircle, 
  Award,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from './AuthContext';
import TestimonialsSection from './TestimonialsSection';
import { openCheckout } from '../paddle';

interface PricingViewProps {
  onNavigate: (view: PageView) => void;
  density?: 'compact' | 'comfortable';
}

// Real Paddle Price IDs — map plan id + billing cycle to the actual Paddle price
const PRICE_IDS: Record<string, { monthly: string; annual: string }> = {
  creator: {
    monthly: 'pri_01kwv5b4y178pazf04d4q2g90e',
    annual: 'pri_01kwv5e5s3scr93xxq5zqk84wg',
  },
  agency: {
    monthly: 'pri_01kwv5m3ndx7rcmfhh7pv8sq55',
    annual: 'pri_01kwv5prfczvag1knhd4773yfs',
  },
};

export default function PricingView({ onNavigate, density = 'compact' }: PricingViewProps) {
  const { user } = useAuth();
  const isCompact = density === 'compact';

  // State for Billing Cycle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  
  // State for Interactive ROI Calculator
  const [videosPerMonth, setVideosPerMonth] = useState<number>(4);
  const [avgWritingHours, setAvgWritingHours] = useState<number>(6); // hours spent per script
  
  // State for promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percentage, e.g., 20
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Micro Scarcity Countdown Timer (psychological trigger)
  const [timeLeft, setTimeLeft] = useState<number>(894); // 14 mins 54 secs
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 894; // Loop back for persistent simulation
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Recent Purchase Social Proof notification (psychological trigger)
  const [recentNotification, setRecentNotification] = useState<string | null>(null);
  const buyers = [
    "Tech & Gadget creator from Seattle just upgraded to Creator Pro! 🚀",
    "Gaming Channel from Tokyo just locked in the Lifetime Annual Plan! 🎮",
    "Finance channel (120k subs) upgraded to Agency Script Suite! 📈",
    "Vlogger with 50k subs applied code VIRAL20 for Creator Pro! 🎥"
  ];
  
  useEffect(() => {
    // Show first notice after 3 seconds
    const timer1 = setTimeout(() => {
      setRecentNotification(buyers[0]);
    }, 3000);

    // Swap notice or hide
    const interval = setInterval(() => {
      setRecentNotification(null);
      setTimeout(() => {
        const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
        setRecentNotification(randomBuyer);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  // Pricing Plans Configurations (Decoy effect & high anchors)
  const plans = [
    {
      id: 'starter',
      name: 'Starter Creator',
      tagline: 'Ideal for weekend hobbyists starting their journey.',
      monthlyPrice: 0,
      annualPrice: 0, // equivalent per month
      features: [
        '5 AI YouTube Scripts per month',
        'Viral Hooks generator (Standard)',
        'Up to 15 Optimized SEO Titles',
        'Full description & tag templates',
        'Standard processing speed'
      ],
      ctaText: 'Start Scripting for Free',
      badge: 'Free Forever Choice 🎁',
      colorClass: 'border-gray-200 hover:border-gray-300'
    },
    {
      id: 'creator',
      name: 'Creator Pro',
      tagline: 'For active creators aiming for high retention & rapid growth.',
      monthlyPrice: 9,
      annualPrice: 6, // equivalent per month
      features: [
        'Unlimited AI YouTube Scripts',
        'Elite Retention Hook Optimizer ⚡',
        'Unlimited high-CTR Title alternatives',
        'Custom interactive pacing prompts',
        'Advanced Competitor SEO Keywords Analysis',
        'Priority high-speed generation',
        'Dedicated Discord masterclass community'
      ],
      ctaText: 'Claim Creator Pro (Save 33%)',
      badge: 'Most Popular Choice 🔥',
      colorClass: 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10 shadow-lg'
    },
    {
      id: 'agency',
      name: 'Agency & Studio',
      tagline: 'Designed for production agencies managing multiple clients.',
      monthlyPrice: 15,
      annualPrice: 10, // equivalent per month
      features: [
        'Everything in Creator Pro',
        'Manage up to 5 multi-channel profiles',
        'In-depth script competitor audit reports',
        'Brand voice custom cloning integration',
        'CSV/Bulk meta export formats',
        'Dedicated Account Strategist & 1-on-1 support'
      ],
      ctaText: 'Unlock Full Suite',
      badge: 'Best Value for Teams',
      colorClass: 'border-gray-200 hover:border-gray-300'
    }
  ];

  // Calculate savings using calculator inputs
  const monthlyCostOutsourcing = videosPerMonth * 120; // Average cost of hiring cheap script writers ($120 per script)
  const hoursSavedPerMonth = videosPerMonth * avgWritingHours;
  const scriptIQCost = billingCycle === 'annual' ? 6 * 12 : 9 * 12; // comparing to Creator Pro (our standard anchor)
  const equivalentOutsourceCostYearly = monthlyCostOutsourcing * 12;
  const directFinancialSavings = equivalentOutsourceCostYearly - scriptIQCost;

  // Handle Promo Code submission
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'VIRAL20') {
      setAppliedDiscount(20);
      setPromoStatus('valid');
    } else if (cleanCode === 'CREATOR50') {
      setAppliedDiscount(50);
      setPromoStatus('valid');
    } else {
      setPromoStatus('invalid');
      setAppliedDiscount(0);
      setTimeout(() => setPromoStatus('idle'), 2000);
    }
  };

  // Open REAL Paddle Checkout
  const handleOpenCheckout = (planId: string) => {
    // Free plan — no payment needed, just send them to sign up / dashboard
    if (planId === 'starter') {
      onNavigate('dashboard');
      return;
    }

    const priceId = PRICE_IDS[planId]?.[billingCycle];
    if (!priceId) {
      console.error('No Paddle price ID found for', planId, billingCycle);
      return;
    }

    openCheckout(priceId, user?.email, user?.id);
  };

  return (
    <div id="pricing-page" className={`bg-slate-50 min-h-screen transition-all ${isCompact ? 'pt-16 pb-12' : 'pt-24 pb-20'}`}>
      
      {/* Dynamic Purchase notification */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white p-3.5 rounded-xl shadow-2xl border border-slate-800 text-xs flex items-center gap-3 max-w-sm"
          >
            <div className="bg-[#4F46E5] text-white p-1.5 rounded-lg shrink-0">
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#A5B4FC] font-bold uppercase tracking-wider block mb-0.5">Live Creator Update</span>
              <p className="font-medium text-slate-100">{recentNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Psychological Urgency Banner */}
        <div className="mb-10 bg-linear-to-r from-red-600 to-amber-600 text-white px-4 py-3.5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 animate-bounce shrink-0" />
            <div className="text-xs">
              <span className="font-bold">EARLY BIRD LAUNCH:</span> Get <span className="underline font-bold">50% off</span> Creator Pro for life. Lock in before pricing updates tonight!
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/25 px-3 py-1 rounded-full font-mono text-xs font-bold shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Left to lock-in: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Pricing Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="font-mono text-[10px] text-[#4F46E5] font-extrabold uppercase tracking-widest bg-[#4F46E5]/10 px-3 py-1 rounded-full">
            Transparent Creator ROI Pricing
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Unlock Millions of Views for Less Than a <span className="text-[#4F46E5]">Single Latte</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Stop wasting hours staring at blank documents or overpaying expensive freelancers. Select the plan that matches your current video frequency.
          </p>

          {/* Monthly / Annual Toggle with clear 2 months Free Anchor */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold transition-colors ${billingCycle === 'monthly' ? 'text-[#4F46E5]' : 'text-slate-400'}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => {
                setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
              }}
              className="relative w-14 h-7 rounded-full bg-[#4F46E5] p-1 transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Toggle billing frequency"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold transition-colors flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-[#4F46E5]' : 'text-slate-400'}`}>
              Billed Annually
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
                Save 33% (Get 4 Months FREE equivalent)
              </span>
            </span>
          </div>
        </div>

        {/* Dynamic ROI & Time Savings Interactive Calculator (Nudge to Purchase) */}
        <div className="mb-14 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs max-w-4xl mx-auto">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-2.5 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">Interactive YouTube Creator Value Calculator</h3>
              <p className="font-sans text-[11px] text-slate-500">Calculate how much scriptwriter salary or personal production time you recover instantly.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Calculator Sliders */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Videos Published Per Month:</span>
                  <span className="text-[#4F46E5] font-mono font-bold">{videosPerMonth} videos</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={videosPerMonth}
                  onChange={(e) => setVideosPerMonth(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>1 / mo</span>
                  <span>10 / mo</span>
                  <span>20 / mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Hours spent writing each script manually:</span>
                  <span className="text-[#4F46E5] font-mono font-bold">{avgWritingHours} hours</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={15}
                  value={avgWritingHours}
                  onChange={(e) => setAvgWritingHours(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>2 hrs</span>
                  <span>8 hrs</span>
                  <span>15 hrs</span>
                </div>
              </div>
            </div>

            {/* Simulated ROI display */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="block font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time Recovered</span>
                <span className="font-mono text-2xl font-black text-[#4F46E5]">{hoursSavedPerMonth} hrs</span>
                <span className="block text-[9px] text-slate-500 mt-0.5">every month back to filming</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="block font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Outsource Savings</span>
                <span className="font-mono text-2xl font-black text-emerald-600">${monthlyCostOutsourcing}</span>
                <span className="block text-[9px] text-slate-500 mt-0.5">equivalent writer salary saved</span>
              </div>
              <div className="col-span-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl shadow-xs">
                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider opacity-90">Your Annual Return on Investment (ROI)</span>
                <span className="font-mono text-2xl font-black">${directFinancialSavings.toLocaleString()} Saved</span>
                <p className="text-[10px] opacity-90 mt-0.5">after replacing freelancers with Creator Pro!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-14">
          {plans.map((plan) => {
            const isPopular = plan.id === 'creator';
            const isStarter = plan.id === 'starter';
            const originalPrice = isStarter 
              ? (billingCycle === 'annual' ? 10 : 15) 
              : (billingCycle === 'annual' ? plan.monthlyPrice : plan.monthlyPrice + 4);
            const priceToDisplay = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`relative flex flex-col justify-between bg-white border rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.colorClass}`}
              >
                {/* Popular Highlight Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white text-[10px] font-mono font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5 animate-bounce text-yellow-300" />
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-sans font-bold text-xl text-slate-900">{plan.name}</h3>
                    <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed min-h-[32px]">{plan.tagline}</p>
                  </div>

                  {/* Price display with Strike-through Anchoring */}
                  <div className="mb-6 flex items-baseline gap-2">
                    <div className="font-mono text-4xl font-black text-slate-900">
                      {priceToDisplay === 0 ? 'Free' : `$${priceToDisplay}`}
                    </div>
                    <div className="text-slate-400 text-xs">
                      <span className="line-through font-mono">${originalPrice}</span>
                      <span className="block text-[10px]">
                        {priceToDisplay === 0 ? 'Free tier access' : `/ month ${billingCycle === 'annual' ? 'billed annually' : ''}`}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-slate-100 my-6" />

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <div className={`rounded-full p-0.5 mt-0.5 shrink-0 ${
                          isPopular ? 'bg-[#4F46E5]/15 text-[#4F46E5]' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-sans">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Trigger Button — now opens REAL Paddle checkout */}
                <button
                  id={`purchase-btn-${plan.id}`}
                  onClick={() => handleOpenCheckout(plan.id)}
                  className={`w-full font-sans text-xs font-bold py-3.5 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 ${
                    isPopular 
                      ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-md hover:shadow-[#4F46E5]/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Psychological Promos and Trust Seals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 items-center">
          {/* Interactive Promo coupon form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <h4 className="font-sans font-bold text-sm text-slate-900 flex items-center gap-2 mb-1">
              <Gift className="w-4.5 h-4.5 text-[#4F46E5]" />
              Have an Affiliate or Promo Code?
            </h4>
            <p className="font-sans text-[11px] text-slate-500 mb-4 leading-relaxed">
              Unlock secret additional pricing discounts. Try typing standard creator promo codes like <strong className="text-[#4F46E5]">VIRAL20</strong> (20% off) or <strong className="text-[#4F46E5]">CREATOR50</strong> (50% off) to test!
            </p>

            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. VIRAL20"
                className="flex-1 font-mono text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-sans text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Validation Feedback with Animation */}
            <AnimatePresence mode="wait">
              {promoStatus === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-[11px] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Success! <strong>{appliedDiscount}% Discount</strong> will automatically apply to checkout prices!</span>
                </motion.div>
              )}
              {promoStatus === 'invalid' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-2 text-red-700 bg-red-50 border border-red-100 p-2 rounded-xl text-[11px] font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>Invalid promo code. Try <strong>VIRAL20</strong> or <strong>CREATOR50</strong>!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Money Back Guarantee / Risk Reversal (Psychological anchor) */}
          <div className="flex gap-4 items-start bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <div className="bg-amber-50 border border-amber-100 text-amber-700 p-3 rounded-full shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-slate-900">100% Risk-Free Guarantee</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed">
                If ScriptIQ doesn't increase your YouTube average view duration or make scripting 10x faster within your first 14 days, just drop us an email via the contact form and we'll issue a <strong>100% instant refund</strong>. No tedious loops, no hard feelings.
              </p>
            </div>
          </div>
        </div>

        {/* Brand/Social Proof Authority Icons */}
        <div className="text-center pt-4 border-t border-slate-200 max-w-4xl mx-auto">
          <p className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-6 flex items-center justify-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" /> Trusted by creators featured on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-sans text-sm font-black tracking-widest text-slate-900 uppercase">📈 Forbes Creator</span>
            <span className="font-sans text-sm font-black tracking-widest text-slate-900 uppercase">🎙️ VidCon Sponsor</span>
            <span className="font-sans text-sm font-black tracking-widest text-slate-900 uppercase">🎥 TubeFilter</span>
            <span className="font-sans text-sm font-black tracking-widest text-slate-900 uppercase">💻 TechCrunch</span>
          </div>
        </div>

      </div>

      {/* CUSTOMER REVIEWS / TESTIMONIALS SECTION */}
      <TestimonialsSection density={density} />

    </div>
  );
}
