/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, FeatureItem, FaqItem } from '../types';
import { FEATURES, FAQS, SCRIPT_PRESETS } from '../data/mockData';
import FeaturePlaygroundModal from './FeaturePlaygroundModal';
import TestimonialsSection from './TestimonialsSection';
import { 
  FileText, 
  Search, 
  TrendingUp, 
  Sparkles, 
  FileSpreadsheet, 
  MessageSquare, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Eye, 
  Settings, 
  Folder, 
  User, 
  Copy, 
  Check, 
  Loader2, 
  Video, 
  Sliders,
  Sparkle
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  density?: 'compact' | 'comfortable';
}

// Icon mapper for FEATURES list
const IconMap: { [key: string]: React.ComponentType<any> } = {
  FileText,
  Search,
  TrendingUp,
  Sparkles,
  FileSpreadsheet,
  MessageSquare,
};

// 1. Simulated Script Writer Demo Widget (Pure React/CSS, lightweight)
function ScriptWriterDemoWidget() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    let interval: any;
    let timer: any;
    
    const runSequence = () => {
      setStep(0);
      setTypedText('');
      
      const fullText = "Create a script on productivity hacks";
      let currentIndex = 0;
      
      interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(prev => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          
          timer = setTimeout(() => {
            setStep(1); // Show analyzing spinner
            
            timer = setTimeout(() => {
              setStep(2); // Show results
            }, 1500);
          }, 800);
        }
      }, 60);
    };
    
    runSequence();
    const mainLoop = setInterval(runSequence, 12000);
    
    return () => {
      clearInterval(interval);
      clearInterval(mainLoop);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-4 font-sans text-left text-xs text-slate-800 dark:text-slate-200">
      {/* Window Header */}
      <div className="flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-3 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">script_generator.sh</span>
      </div>

      {/* Input box */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Input Prompt</span>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex items-center gap-1.5 min-h-[38px]">
          <span className="text-slate-400 dark:text-slate-500 shrink-0">⚡</span>
          <p className="text-slate-700 dark:text-slate-200 text-[11px] font-medium leading-none">
            {typedText}
            <span className="inline-block w-1.5 h-3.5 bg-[#4F46E5] ml-0.5 animate-pulse" />
          </p>
        </div>
      </div>

      {/* Output simulation */}
      <div className="mt-4 min-h-[160px] flex flex-col justify-center">
        {step === 0 && (
          <div className="text-center text-slate-400 dark:text-slate-500 py-6 font-mono text-[10px]">
            Waiting for prompt typing...
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center space-y-2 py-6">
            <Loader2 className="w-6 h-6 animate-spin text-[#4F46E5]" />
            <span className="text-[10px] font-mono text-[#4F46E5] dark:text-[#6366F1] animate-pulse">Formulating SEO Hook...</span>
          </div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-[#4F46E5]/10 dark:bg-[#4F46E5]/10 border border-[#4F46E5]/20 dark:border-[#4F46E5]/20 rounded-lg p-2.5">
              <span className="text-[8px] font-bold text-[#4F46E5] dark:text-[#818CF8] uppercase tracking-wide block mb-1">
                Viral Hook (0:00 - 0:15)
              </span>
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                "Most productivity guides are full of useless fluff. In this video, we outline the 10 micro-habits that restored 2 hours to my calendar daily."
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-lg p-2.5">
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block mb-1">
                Visual & Pacing Cue
              </span>
              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-normal">
                [VISUAL: Fast-cut of alarm ringing. Founder closes laptop. Transition to crisp minimalist office setup.]
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// 2. Simulated Title Generator Demo Widget
function TitleGeneratorDemoWidget() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    let timer1: any;
    let timer2: any;
    
    const runSequence = () => {
      setStep(0);
      
      timer1 = setTimeout(() => {
        setStep(1); // Show button active click
        
        timer2 = setTimeout(() => {
          setStep(2); // Show CTR optimised results
        }, 1100);
      }, 1400);
    };
    
    runSequence();
    const mainLoop = setInterval(runSequence, 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(mainLoop);
    };
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-4 font-sans text-left text-xs text-slate-800 dark:text-slate-200">
      {/* Window Header */}
      <div className="flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-3 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">title_optimizer_suite</span>
      </div>

      <div className="space-y-3">
        {/* Mock input display */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex justify-between items-center gap-2">
          <div className="flex flex-col truncate">
            <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Video Topic</span>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">How to learn Python fast</span>
          </div>
          <button 
            className={`font-sans text-[10px] font-bold px-3 py-1.5 rounded-md text-white transition-all duration-150 shrink-0 ${
              step >= 1 ? 'bg-[#4338CA] scale-95' : 'bg-[#4F46E5] hover:bg-[#4338CA]'
            }`}
          >
            {step === 1 ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>

        {/* Results Area */}
        <div className="min-h-[140px] flex flex-col justify-center">
          {step < 2 ? (
            <div className="flex flex-col items-center justify-center space-y-1.5 py-6">
              <Loader2 className={`w-5 h-5 animate-spin text-[#4F46E5] ${step === 1 ? 'opacity-100' : 'opacity-0'}`} />
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Simulating live CTR estimation...</span>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              {[
                { title: "I Tried Learning Python in 30 Days (And Actually Succeeded)", ctr: "12.8%", badge: "🔥 VIRAL CTR" },
                { title: "The ONLY Python Roadmap You Need for 2026", ctr: "9.4%", badge: "RECOMMENDED" },
                { title: "Stop Wasting Time: How to Learn Python Fast", ctr: "8.1%", badge: "STANDARD" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-lg p-2 flex items-center justify-between shadow-2xs gap-3"
                >
                  <p className="font-bold text-[10px] text-slate-800 dark:text-slate-200 max-w-[70%] leading-snug">
                    {item.title}
                  </p>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-black text-[#4F46E5] dark:text-[#818CF8] block">{item.ctr}</span>
                    <span className="text-[7px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase">{item.badge}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// 3. Simulated Retention Hook Demo Widget
function RetentionHooksDemoWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-4 font-sans text-left text-xs text-slate-800 dark:text-slate-200">
      {/* Window Header */}
      <div className="flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-3 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">retention_optimizer</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Hook Angle Comparison</span>
          <div className="inline-flex rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-0.5 shrink-0">
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm transition-colors ${step === 0 ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>Standard</span>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm transition-colors ${step === 1 ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>Optimized</span>
          </div>
        </div>

        {/* Comparison Boxes */}
        <div className="min-h-[110px] flex items-center">
          {step === 0 ? (
            <motion.div 
              key="standard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-950 rounded-xl p-3 space-y-1.5 w-full"
            >
              <span className="text-red-600 dark:text-red-400 font-bold text-[8px] uppercase tracking-wider block">⚠️ Weak Pacing (CTR Impact: -3.8%)</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Hey guys, today I am going to talk about cooking steaks. Cooking steak is easy but first you need to buy a pan. Let me show you my favorite..."
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="optimized"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950 rounded-xl p-3 space-y-1.5 w-full"
            >
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[8px] uppercase tracking-wider block">⚡ Elite Pattern (CTR Impact: +12.4%)</span>
              <p className="text-[10px] text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                "90% of home cooks ruin expensive steaks before they even touch the pan. Here is the single temperature secret five-star chefs use..."
              </p>
            </motion.div>
          )}
        </div>

        {/* Simulated Graph */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-lg p-2 space-y-1">
          <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Real-time Watch Time Retention</span>
          <div className="h-8 w-full relative">
            <svg viewBox="0 0 100 20" className="h-full w-full overflow-visible">
              {/* Weak hook drop */}
              <motion.path 
                d="M0,5 Q20,18 100,18" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="1.5" 
                strokeDasharray={step === 0 ? "none" : "2"}
                className="opacity-40"
              />
              {/* Premium hook line */}
              <motion.path 
                d="M0,5 Q20,6 100,8" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="1.8" 
                strokeDasharray={step === 1 ? "none" : "2"}
                className="opacity-90"
              />
              <circle cx="100" cy={step === 0 ? "18" : "8"} r="2" fill={step === 0 ? "#EF4444" : "#10B981"} />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[7px] font-mono text-slate-400 px-1 pointer-events-none">
              <span>0:00</span>
              <span>1:00 (Hook Mark)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeView({ onNavigate, density = 'compact' }: HomeViewProps) {
  // Active feature sandbox modal state
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Home Page Mini interactive playground state
  const [demoTopic, setDemoTopic] = useState('Life hacks to save time');
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [demoResult, setDemoResult] = useState<typeof SCRIPT_PRESETS[0] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunDemo = () => {
    setIsGeneratingDemo(true);
    setDemoResult(null);
    setTimeout(() => {
      // Find preset or use default
      const matched = SCRIPT_PRESETS.find(p => p.topic.toLowerCase().includes(demoTopic.toLowerCase())) || SCRIPT_PRESETS[0];
      setDemoResult(matched);
      setIsGeneratingDemo(false);
    }, 1800);
  };

  const isCompact = density === 'compact';

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 180 }
    }
  };

  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100, delay: 0.3 }
    }
  };

  return (
    <div id="home-view" className={`bg-white transition-all duration-150 ${isCompact ? 'pt-16' : 'pt-24'}`}>
      {/* 1. HERO SECTION */}
      <section id="hero" className={`relative overflow-hidden transition-all duration-150 ${isCompact ? 'py-8 md:py-12 border-b border-gray-100/60' : 'py-16 md:py-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Hero Texts with staggered loading */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`lg:col-span-5 text-center lg:text-left ${isCompact ? 'space-y-3' : 'space-y-6'}`}
            >
              <motion.div 
                variants={itemVariants}
                className={`inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-md ${isCompact ? 'px-2 py-0.5' : 'px-3 py-1 rounded-full'}`}
              >
                <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
                <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                  The Next Gen of Creator Tools
                </span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className={`font-sans tracking-tight text-black leading-[1.1] ${
                  isCompact 
                    ? 'text-2xl sm:text-3xl lg:text-4xl font-bold' 
                    : 'text-4xl sm:text-5xl lg:text-6xl font-extrabold'
                }`}
              >
                Create Better YouTube Scripts <span className="text-[#4F46E5]">with AI</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className={`font-sans text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed ${
                  isCompact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
                }`}
              >
                Generate professional YouTube scripts, SEO-optimized titles, descriptions, and keywords in seconds using AI. Designed for high retention and organic search growth.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 ${isCompact ? 'pt-1' : 'pt-2'}`}
              >
                <button
                  id="hero-start-free"
                  onClick={() => onNavigate('dashboard')}
                  className={`w-full sm:w-auto font-sans font-semibold text-xs flex items-center justify-center gap-1.5 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-md cursor-pointer transition-all duration-150 shadow-2xs ${
                    isCompact ? 'px-4 py-2' : 'px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md'
                  }`}
                >
                  Start Free
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="hero-watch-demo"
                  onClick={() => {
                    const el = document.getElementById('try-it-now');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full sm:w-auto font-sans font-semibold text-xs flex items-center justify-center gap-1.5 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 rounded-md cursor-pointer transition-all duration-150 ${
                    isCompact ? 'px-4 py-2' : 'px-6 py-3.5 rounded-xl'
                  }`}
                >
                  Try Interactive Demo
                </button>
              </motion.div>

              {/* Minimalist social proof */}
              <motion.div 
                variants={itemVariants}
                className={`border-t border-gray-100/80 flex items-center justify-center lg:justify-start gap-4 ${isCompact ? 'pt-3' : 'pt-6'}`}
              >
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>10x</span>
                  <span className="block font-sans text-[10px] text-gray-400">Faster Scripting</span>
                </div>
                <div className="w-[1px] h-6 bg-gray-100" />
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>45%</span>
                  <span className="block font-sans text-[10px] text-gray-400">CTR Average Increase</span>
                </div>
                <div className="w-[1px] h-6 bg-gray-100" />
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>10k+</span>
                  <span className="block font-sans text-[10px] text-gray-400">Creators Empowered</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Dashboard Mockup Card with physical hover tilting effect */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
              <motion.div 
                id="hero-mockup"
                variants={mockupVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.25 } }}
                className="w-full max-w-2xl bg-white border border-gray-200/80 rounded-2xl shadow-xl overflow-hidden p-1 bg-linear-to-b from-gray-50 to-white"
              >
                {/* Simulated Window Frame */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-mono text-gray-400">
                    scriptiq.site/workspace
                  </div>
                  <div className="w-12" />
                </div>

                {/* Simulated App Workspace */}
                <div className="grid grid-cols-4 h-[340px] bg-white">
                  {/* Mock Sidebar */}
                  <div className="col-span-1 border-r border-gray-100 p-3 flex flex-col gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-1.5 px-1.5 py-1 text-xs font-bold text-black">
                      <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                      ScriptIQ Workspace
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-white border border-gray-100 p-1.5 rounded-md text-[10px] text-[#4F46E5] font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#4F46E5]" /> New Script
                      </div>
                      <div className="w-full p-1.5 rounded-md text-[10px] text-gray-400 flex items-center gap-1 hover:bg-gray-100/50 transition-colors">
                        <Folder className="w-3 h-3" /> Projects
                      </div>
                      <div className="w-full p-1.5 rounded-md text-[10px] text-gray-400 flex items-center gap-1 hover:bg-gray-100/50 transition-colors">
                        <TrendingUp className="w-3 h-3" /> SEO Keywords
                      </div>
                    </div>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-1.5 px-1">
                      <div className="w-5 h-5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center text-[9px] font-bold">
                        JD
                      </div>
                      <div className="truncate">
                        <p className="text-[9px] font-semibold text-black leading-none">Jon Doe</p>
                        <span className="text-[8px] text-gray-400">Free Tier</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Workspace Content */}
                  <div className="col-span-3 p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span className="text-xs font-semibold text-gray-800">Untitled Youtube Script</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium animate-pulse">Ready</span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-hidden">
                      <div className="p-2.5 bg-[#4F46E5]/5 rounded-lg border border-[#4F46E5]/10">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#4F46E5] mb-1">
                          <Sparkles className="w-3 h-3" />
                          Title Suggestion #1
                        </div>
                        <p className="text-[10px] text-black font-semibold">10 Life Hacks to Save 2 Hours Every Day</p>
                      </div>

                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-1.5">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Generated Script [Hook]</span>
                        <p className="text-[9px] text-gray-600 line-clamp-4 leading-relaxed">
                          "[VISUAL: Fast-paced montage of clock spinning, stressed builder looking at to-do list. Upbeat background lofi hum.] Imagine what you could do with an extra 730 hours this year. That is an entire month of waking hours, fully restored to you. That is not science fiction—it is the direct result..."
                        </p>
                      </div>
                    </div>

                    {/* Copy/Export simulated action bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                      <span>1,240 Words Generated</span>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md flex items-center gap-1 font-medium text-black">
                          <Copy className="w-2.5 h-2.5 text-gray-400" /> Copy Script
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className={`bg-gray-50 border-t border-b border-gray-200/60 transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-10' : 'mb-20'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Platform Intelligence
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Everything you need to capture attention
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              Ditch the writer's block. ScriptIQ provides structured, optimized, live-simulated tools to maximize video impressions and viewer watch-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Feature Block 1: Script Generator */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4 mb-6">
                <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-10 h-10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold text-[#4F46E5] uppercase tracking-wider">Plan Access: Starter Creator</span>
                  <h4 className="font-sans font-bold text-lg text-black mt-0.5 group-hover:text-[#4F46E5] transition-colors">
                    AI Script Generator
                  </h4>
                  <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
                    Instantly draft fully sequenced camera-ready scripts from simple prompts. Includes precise visual cues, audio prompts, and structured paragraph breaks.
                  </p>
                </div>
                
                {/* Live typing visual representation */}
                <div className="pt-2">
                  <ScriptWriterDemoWidget />
                </div>
              </div>

              <button
                onClick={() => onNavigate('signin')}
                className="w-full mt-auto font-sans font-bold text-xs bg-black text-white hover:bg-gray-900 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-1"
              >
                Start Writing Free
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Feature Block 2: Title Optimizer */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4 mb-6">
                <div className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold text-indigo-600 uppercase tracking-wider">Plan Access: Starter Creator</span>
                  <h4 className="font-sans font-bold text-lg text-black mt-0.5 group-hover:text-[#4F46E5] transition-colors">
                    High-CTR Title Optimizer
                  </h4>
                  <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
                    Test dozens of potential titles against high-CTR neural filters. Score title variants on curiosity-gap, fear of missing out, and raw feed impression power.
                  </p>
                </div>

                {/* CTR results interactive list representation */}
                <div className="pt-2">
                  <TitleGeneratorDemoWidget />
                </div>
              </div>

              <button
                onClick={() => onNavigate('signin')}
                className="w-full mt-auto font-sans font-bold text-xs bg-black text-white hover:bg-gray-900 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-1"
              >
                Generate Titles Free
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Feature Block 3: Retention Hooks */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4 mb-6">
                <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Plan Access: Creator Pro ⚡</span>
                  <h4 className="font-sans font-bold text-lg text-black mt-0.5 group-hover:text-[#4F46E5] transition-colors">
                    Elite Retention Hook Optimizer
                  </h4>
                  <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
                    Hook your viewers within the critical first 15 seconds. Convert passive scrollers into passionate subscribers with pattern-interruption script formats.
                  </p>
                </div>

                {/* Retention graphs comparing standard vs optimized hooks */}
                <div className="pt-2">
                  <RetentionHooksDemoWidget />
                </div>
              </div>

              <button
                onClick={() => onNavigate('signin')}
                className="w-full mt-auto font-sans font-bold text-xs bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-xs"
              >
                Claim Pro Access
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className={`bg-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-8' : 'mb-16'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Workflow
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Three steps to creator success
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              We stripped the friction from video production. Go from raw idea to launch-ready script packages faster than ever.
            </p>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`grid grid-cols-1 md:grid-cols-3 relative ${isCompact ? 'gap-6' : 'gap-12'}`}
          >
            {/* Step 1 */}
            <motion.div 
              id="step-1" 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18 } }
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}
            >
              <div className={`bg-black text-white rounded-full flex items-center justify-center font-mono font-bold ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                01
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>Enter your topic</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Provide a basic video idea, keywords, or niche direction. Set your target audience and desired tone.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              id="step-2" 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18 } }
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}
            >
              <div className={`bg-[#4F46E5] text-white rounded-full flex items-center justify-center font-mono font-bold shadow-sm shadow-[#4F46E5]/40 ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                02
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>AI analyzes your request</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Our model maps high-CTR structures, viral hooks, SEO search values, and custom engagement loops.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              id="step-3" 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18 } }
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}
            >
              <div className={`bg-black text-white rounded-full flex items-center justify-center font-mono font-bold ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                03
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>Generate optimized scripts</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Get full scripts (complete with hook, body, CTA, visual cues), title suggestions, descriptions, and tag sets.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 4. DASHBOARD PREVIEW / TRY IT LIVE SECTION */}
      <section id="try-it-now" className={`bg-gray-50 border-t border-b border-gray-200/60 transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-6' : 'mb-12'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Interactive Sandbox
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Test drive the generator instantly
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              Pick a trending YouTube topic below or type your own, then click generate to preview our structured AI output.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto bg-white border border-gray-200 overflow-hidden ${
            isCompact ? 'rounded-lg shadow-2xs' : 'rounded-2xl shadow-lg'
          }`}>
            {/* Control Bar */}
            <div className={`bg-white border-b border-gray-100 ${isCompact ? 'p-4' : 'p-6'}`}>
              <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="w-full md:flex-1">
                  <label htmlFor="sandbox-topic" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Select or Type a Topic
                  </label>
                  <div className={`flex flex-wrap gap-1.5 ${isCompact ? 'mb-2' : 'mb-3'}`}>
                    {['Life hacks to save time', 'Why everyone is leaving Silicon Valley', 'Learn coding in 30 days'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setDemoTopic(t)}
                        className={`font-sans transition-all cursor-pointer border ${
                          isCompact 
                            ? `text-[10px] px-2 py-1 rounded-md ${demoTopic === t ? 'bg-[#4F46E5] text-white border-[#4F46E5] font-semibold' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`
                            : `text-xs px-3 py-1.5 rounded-lg ${demoTopic === t ? 'bg-[#4F46E5] text-white border-[#4F46E5] font-semibold' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    id="sandbox-topic"
                    value={demoTopic}
                    onChange={(e) => setDemoTopic(e.target.value)}
                    placeholder="Enter your custom topic idea..."
                    className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent transition-all ${
                      isCompact ? 'text-xs px-3 py-2 rounded-md' : 'text-sm px-4 py-3 rounded-xl'
                    }`}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={handleRunDemo}
                    disabled={isGeneratingDemo || !demoTopic.trim()}
                    className={`w-full md:w-auto font-sans font-semibold flex items-center justify-center gap-1.5 text-white bg-black hover:bg-gray-950 cursor-pointer transition-colors disabled:opacity-50 ${
                      isCompact ? 'text-xs px-4 py-2 rounded-md' : 'text-sm px-6 py-3.5 rounded-xl'
                    }`}
                  >
                    {isGeneratingDemo ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkle className="w-3.5 h-3.5 text-white" />
                        Run Script Engine
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Output Preview Area */}
            <div className={`bg-gray-50/50 flex flex-col justify-center ${isCompact ? 'p-4 min-h-[240px]' : 'p-6 min-h-[300px]'}`}>
              {isGeneratingDemo ? (
                /* Skeleton Loader */
                <div className="space-y-3 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded-sm w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-sm w-1/2" />
                  <div className="space-y-1.5 pt-3">
                    <div className="h-3 bg-gray-200 rounded-sm w-full" />
                    <div className="h-3 bg-gray-200 rounded-sm w-11/12" />
                    <div className="h-3 bg-gray-200 rounded-sm w-10/12" />
                  </div>
                  <div className="space-y-1.5 pt-3">
                    <div className="h-3 bg-gray-200 rounded-sm w-full" />
                    <div className="h-3 bg-gray-200 rounded-sm w-9/12" />
                  </div>
                </div>
              ) : demoResult ? (
                /* Generated results with slide-up reveal */
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`${isCompact ? 'space-y-4' : 'space-y-6'}`}
                >
                  <div className="flex items-center justify-between border-b border-gray-200/85 pb-3">
                    <div>
                      <span className="font-mono text-[9px] text-[#4F46E5] font-bold uppercase tracking-wider block mb-0.5">
                        Success • Optimized Workspace
                      </span>
                      <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>
                        {demoResult.topic}
                      </h4>
                    </div>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="font-sans text-[11px] font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-0.5"
                    >
                      Open in Full Workspace
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Generated Items Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                    {/* Column 1: Metadata */}
                    <div className={`md:col-span-1 ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
                      <div className={`bg-white border border-gray-200 shadow-2xs relative ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <button 
                          onClick={() => handleCopy(demoResult.titles[0], 'sandbox-title')}
                          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-black cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1">
                          Optimized Title Variant
                        </span>
                        <p className={`font-sans font-bold text-black leading-snug ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                          {demoResult.titles[0]}
                        </p>
                      </div>

                      <div className={`bg-white border border-gray-200 shadow-2xs relative ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <button 
                          onClick={() => handleCopy(demoResult.description, 'sandbox-desc')}
                          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-black cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-desc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1">
                          SEO Description Suggestion
                        </span>
                        <p className={`font-sans text-gray-500 line-clamp-4 leading-relaxed ${isCompact ? 'text-[10px]' : 'text-[11px]'}`}>
                          {demoResult.description}
                        </p>
                      </div>

                      <div className={`bg-white border border-gray-200 shadow-2xs ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1.5">
                          Tags & Keywords
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {demoResult.keywords.slice(0, 5).map((kw, idx) => (
                            <span key={idx} className="font-mono text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm">
                              #{kw.replace(/\s+/g, '')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Column 2 & 3: Script Panel */}
                    <div className={`md:col-span-2 bg-white border border-gray-200 shadow-2xs flex flex-col ${isCompact ? 'rounded-md' : 'rounded-xl'}`}>
                      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-sans text-[9px] font-bold text-gray-400 uppercase">
                          Camera Ready Script
                        </span>
                        <button
                          onClick={() => handleCopy(demoResult.script, 'sandbox-script')}
                          className="font-sans text-[11px] text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-script' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Complete Script
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 max-h-[300px] overflow-y-auto text-xs font-sans text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                        {demoResult.script}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Empty/Initial Sandbox State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12 space-y-3"
                >
                  <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-gray-800">
                    Your generated script package will appear here
                  </h4>
                  <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto">
                    Click "Run Script Engine" above to trigger a simulated YouTube optimization session.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className={`bg-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className={`text-center space-y-3 ${isCompact ? 'mb-8' : 'mb-16'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Questions
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Frequently Asked Questions
            </h3>
            <p className={`font-sans text-gray-500 max-w-xl mx-auto ${isCompact ? 'text-xs' : 'text-base'}`}>
              Got questions? We have answers. Find everything you need to know about starting your content scaling process.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  id={`faq-item-${index}`}
                  className="border border-gray-200/80 rounded-md overflow-hidden bg-white shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full flex items-center justify-between text-left font-sans font-bold text-gray-900 hover:bg-gray-50/50 transition-colors cursor-pointer focus:outline-none ${
                      isCompact ? 'p-3 text-xs' : 'p-5 text-sm'
                    }`}
                  >
                    <span>{faq.question}</span>
                    <ChevronRight 
                      className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-[#4F46E5]' : ''} ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className={`font-sans text-gray-500 leading-relaxed bg-gray-50/30 ${isCompact ? 'p-3 text-[11px]' : 'p-5 text-sm'}`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS / TESTIMONIALS SECTION */}
      <TestimonialsSection density={density} />

      {/* 7. YOUTUBE OPTIMIZATION SEO DIRECTORY SECTION */}
      <section className={`bg-white border-t border-b border-gray-100 transition-all duration-150 ${isCompact ? 'py-12' : 'py-20'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1 bg-[#4F46E5]/10 text-[#4F46E5] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              SEO Features Directory
            </div>
            <h2 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              The Ultimate YouTube Scriptwriting Suite
            </h2>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-sm'}`}>
              Explore our core capabilities optimized to supercharge your channel's search ranking, audience engagement, and click-through rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5] mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                AI Script Writer for YouTube
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Unlock professional storytelling. Our <strong className="text-gray-900 font-semibold">ai script writer for youtube</strong> is trained on thousands of viral videos to construct pacing, hooks, and seamless visual callouts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-105 transition-transform">
                <Sparkle className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                YouTube Script Generator
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Save hours of brainstorming with our fully automated <strong className="text-gray-900 font-semibold">youtube script generator</strong>. Turn raw concepts or single-line descriptions into structured, complete recording drafts instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                AI YouTube Title Generator
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Our advanced <strong className="text-gray-900 font-semibold">ai youtube title generator</strong> builds highly clickable, CTR-optimized headlines. Analyze trends to formulate magnetic titles customized for viral, suspense, or educational hooks.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5] mb-4 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                YouTube Video Script Generator
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                The smart <strong className="text-gray-900 font-semibold">youtube video script generator</strong> ensures high-audience retention. It designs precise segment outlines, transitions, visual direction notes, and natural conversational dialogue.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                Free YouTube Script Generator
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Start without credit cards or hidden fees. Try our <strong className="text-gray-900 font-semibold">free youtube script generator</strong> tools to instantly kickstart your creative scriptwriting process.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-105 transition-transform">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                Script Writing Tool for YouTube
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Elevate your workflow with a dedicated <strong className="text-gray-900 font-semibold">script writing tool for youtube</strong> built to organize your content library, draft notes, customize pacing, and structure outline presets.
              </p>
            </div>

            {/* Card 7 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                AI Content Generator for YouTube
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                ScriptIQ is more than a script editor—it is a comprehensive <strong className="text-gray-900 font-semibold">ai content generator for youtube</strong> that yields viral descriptions, relevant tag recommendations, and detailed timestamps.
              </p>
            </div>

            {/* Card 8 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4 group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                YouTube Video Idea Generator
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Never run out of video topics. Our built-in <strong className="text-gray-900 font-semibold">youtube video idea generator</strong> continuously mines active creator trends and popular niches to recommend clickable video ideas.
              </p>
            </div>

            {/* Card 9 */}
            <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-6 rounded-2xl transition-all duration-200 group hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-105 transition-transform">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-2">
                All-in-One AI Script Writer
              </h3>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">
                Experience the next generation of creative support. Empower your channel with an adaptive, easy-to-use <strong className="text-gray-900 font-semibold">ai script writer</strong> designed for modern content entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className={`bg-[#4F46E5] text-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-16'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 space-y-4">
          <h3 className={`font-sans font-bold tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
            Ready to streamline your video pipeline?
          </h3>
          <p className={`font-sans text-[#E0E7FF] max-w-lg mx-auto leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
            Create high-retention YouTube scripts and meta-data packages. Try ScriptIQ absolutely free.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`inline-flex items-center gap-1.5 font-sans font-bold text-black bg-white hover:bg-gray-100 cursor-pointer transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-150 ${
                isCompact ? 'px-4 py-2 text-xs rounded-md' : 'px-7 py-3.5 rounded-xl text-sm'
              }`}
            >
              Get Started Now — It's Free
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Sandbox Modal Dialog */}
      <FeaturePlaygroundModal
        featureId={selectedFeatureId}
        onClose={() => setSelectedFeatureId(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
