/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Loader2, 
  Search, 
  TrendingUp, 
  FileText, 
  FileSpreadsheet, 
  MessageSquare, 
  Send, 
  ArrowRight, 
  Flame, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Video,
  ThumbsUp,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react';
import { PageView } from '../types';

interface FeaturePlaygroundModalProps {
  featureId: string | null;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
}

export default function FeaturePlaygroundModal({ featureId, onClose, onNavigate }: FeaturePlaygroundModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!featureId) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4.5 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-9 h-9 rounded-lg flex items-center justify-center">
                <FeatureIcon id={featureId} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-gray-900 leading-snug">
                  <FeatureTitle id={featureId} />
                </h3>
                <span className="font-sans text-[11px] text-gray-400">
                  Interactive Demo Playground • Real-time AI simulation
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Core */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <PlaygroundSwitcher 
              id={featureId} 
              onCopy={handleCopy} 
              copiedKey={copiedKey} 
              onNavigate={onNavigate}
              onClose={onClose}
            />
          </div>

          {/* Footer CTA */}
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-gray-500 text-center sm:text-left">
              These simulations use high-accuracy templates. Try the full version to unlock custom LLM generations.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 font-sans text-xs font-semibold text-gray-500 hover:text-black border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer bg-white transition-all text-center"
              >
                Close Sandbox
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('dashboard');
                }}
                className="w-full sm:w-auto px-4.5 py-2 font-sans text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Open Full Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Icon mapper for individual feature headers
function FeatureIcon({ id }: { id: string }) {
  switch (id) {
    case 'script-writer': return <FileText className="w-5 h-5" />;
    case 'keyword-research': return <Search className="w-5 h-5" />;
    case 'seo-optimization': return <TrendingUp className="w-5 h-5" />;
    case 'title-generator': return <Sparkles className="w-5 h-5" />;
    case 'description-generator': return <FileSpreadsheet className="w-5 h-5" />;
    case 'ai-assistant': return <MessageSquare className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
}

// Title mapper for individual features
function FeatureTitle({ id }: { id: string }) {
  switch (id) {
    case 'script-writer': return <>AI Script Writer Sandbox</>;
    case 'keyword-research': return <>Smart Keyword Research Engine</>;
    case 'seo-optimization': return <>YouTube SEO Content Auditor</>;
    case 'title-generator': return <>Viral Title Planner &amp; CTR Predictor</>;
    case 'description-generator': return <>Structured Description Architect</>;
    case 'ai-assistant': return <>Scripty AI Assistant Chat</>;
    default: return <>ScriptIQ Core Tool</>;
  }
}

/* ==========================================
   FEATURE SWITCHER & INDIVIDUAL PLAYGROUNDS
   ========================================== */

interface PlaygroundProps {
  onCopy: (text: string, id: string) => void;
  copiedKey: string | null;
  onNavigate: (view: PageView) => void;
  onClose: () => void;
}

function PlaygroundSwitcher({ id, onCopy, copiedKey, onNavigate, onClose }: { id: string } & PlaygroundProps) {
  switch (id) {
    case 'script-writer':
      return <ScriptWriterPlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    case 'keyword-research':
      return <KeywordPlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    case 'seo-optimization':
      return <SEOPlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    case 'title-generator':
      return <TitlePlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    case 'description-generator':
      return <DescriptionPlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    case 'ai-assistant':
      return <AssistantPlayground onCopy={onCopy} copiedKey={copiedKey} onNavigate={onNavigate} onClose={onClose} />;
    default:
      return (
        <div className="text-center py-12 text-gray-500">
          This feature playground is loading...
        </div>
      );
  }
}

/* ==========================================
   1. AI SCRIPT WRITER PLAYGROUND
   ========================================== */
function ScriptWriterPlayground({ onCopy, copiedKey, onNavigate, onClose }: PlaygroundProps) {
  const [topic, setTopic] = useState('5 coding hacks every engineer should know');
  const [tonality, setTonality] = useState('educational');
  const [targetDuration, setTargetDuration] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [generatedScript, setGeneratedScript] = useState<{
    hook: string;
    body: string;
    cta: string;
  } | null>(null);

  const steps = [
    'Analyzing search intent and audience profile...',
    'Drafting highly addictive hook formulas...',
    'Structuring body paragraphs with retention nodes...',
    'Splicing cinematic visual cues and SFX tags...',
    'Formatting complete camera-ready script package...'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedScript(null);
    setStepIndex(0);

    // Simulate step increments
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      const cleanTopic = topic.trim();
      
      setGeneratedScript({
        hook: `[VISUAL: Staccato edits showing high-end IDEs, code error flashes, then smooth green execution grids. Dynamic ambient tech beat drops.]\n\n[AUDIO: Upbeat, intellectual lo-fi electronic rhythm enters.]\n\nPresenter: "Most developers waste 15 hours a week debugging problems that have already been solved. In this video, we are stripping down the absolute top 5 coding hacks that will immediately optimize your local environment and streamline your typing speed. These aren't standard tutorial tips—these are real production-grade methods used by senior staff engineers to 10x their outputs. Let's write some cleaner code."`,
        body: `[VISUAL: Screen share of modern terminal showing split panes and keyboard heatmaps.]\n\nPresenter: "Hack #1: Absolute Terminal Mastery. Stop typing out long directory routes manually. By establishing semantic shell aliases in your configuration files, you compress dozens of keypresses into a single term. For instance, setting 'gcm' to auto-resolve nested git branch commits saves an average of four hours monthly. Clean workspace, clear brain."\n\n[VISUAL: Split view comparing traditional nested condition logic with early return guards.]\n\nPresenter: "Hack #2: Early Return Guards. Stop nesting your if-else blocks five layers deep. It drains your mental processing bandwidth and causes fatal runtime loops. Adopt early-return guard structures instead. Clear the negative cases instantly at the top of your function, and let the core happy path run smoothly below. It makes your code self-documenting and exponentially faster to parse."`,
        cta: `[VISUAL: End screen layout with clean dark backdrop, displaying subscribing icons and social links.]\n\nPresenter: "Implementing just two of these hacks will save you massive time on your next build. Which one is your favorite? Let me know in the comments. Grab the complete shortcut cheat sheet via the link below, smash the subscribe button for daily dev roadmaps, and I'll see you in the next build."`
      });
      setIsGenerating(false);
    }, 2400);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left panel: Input parameters */}
      <div className="lg:col-span-5 space-y-4">
        <h4 className="font-sans font-bold text-sm text-black flex items-center gap-1.5">
          <Settings className="w-4.5 h-4.5 text-[#4F46E5]" /> Setup Script Blueprint
        </h4>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Video Topic / Theme
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full font-sans text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Target Tonality
              </label>
              <select
                value={tonality}
                onChange={(e) => setTonality(e.target.value)}
                className="w-full font-sans text-xs px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] transition-all cursor-pointer"
              >
                <option value="educational">🎓 Educational</option>
                <option value="energetic">🔥 Ultra Energetic</option>
                <option value="storytelling">🕵️ Suspense Narrative</option>
                <option value="casual">💬 Friendly Talk</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Length (Minutes)
              </label>
              <select
                value={targetDuration}
                onChange={(e) => setTargetDuration(e.target.value)}
                className="w-full font-sans text-xs px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] transition-all cursor-pointer"
              >
                <option value="3">3 Mins (~450 words)</option>
                <option value="5">5 Mins (~750 words)</option>
                <option value="10">10 Mins (~1500 words)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full font-sans font-bold text-xs flex items-center justify-center gap-1.5 px-4 py-3 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Script Engine Running...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Draft Retention Script
              </>
            )}
          </button>
        </form>

        <div className="bg-gray-50 rounded-lg p-3.5 border border-gray-100">
          <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Why hook optimization matters:
          </span>
          <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
            The first 30 seconds of your script determine whether 60% of your audience clicks away or watches to the end. Our AI structures visual and audio hooks precisely for this goal.
          </p>
        </div>
      </div>

      {/* Right panel: Output sandbox */}
      <div className="lg:col-span-7 flex flex-col min-h-[340px] bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
            <div className="text-center space-y-1.5 max-w-xs">
              <p className="font-sans text-xs font-bold text-black animate-pulse">
                {steps[stepIndex]}
              </p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#4F46E5] h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        ) : generatedScript ? (
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-2 border-b border-gray-200 bg-white flex items-center justify-between">
              <span className="font-mono text-[9px] text-[#4F46E5] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Structure Generated Successfully
              </span>
              <button
                onClick={() => onCopy(`${generatedScript.hook}\n\n${generatedScript.body}\n\n${generatedScript.cta}`, 'sandbox-full-script')}
                className="font-sans text-[10px] text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer bg-gray-50 px-2 py-1 rounded border border-gray-200"
              >
                {copiedKey === 'sandbox-full-script' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 animate-pulse" /> Copied Script!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Full Script
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 max-h-[300px] overflow-y-auto bg-white">
              <div className="space-y-1.5 border-l-2 border-indigo-500 pl-3">
                <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase tracking-wider">
                  01. The Hook (0:00 - 0:45)
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {generatedScript.hook}
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-emerald-500 pl-3">
                <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                  02. The Body (0:45 - 4:15)
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {generatedScript.body}
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-amber-500 pl-3">
                <span className="font-mono text-[9px] text-amber-500 font-bold uppercase tracking-wider">
                  03. The Outro / CTA (4:15 - 5:00)
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {generatedScript.cta}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h5 className="font-sans font-bold text-sm text-black">
                Ready to Draft Your Script
              </h5>
              <p className="font-sans text-xs text-gray-500 max-w-sm">
                Enter your niche topic and tonality details on the left, then trigger the engine to generate structured camera-ready video materials.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   2. KEYWORD RESEARCH PLAYGROUND
   ========================================== */
interface KeywordRow {
  keyword: string;
  volume: string;
  volumeNum: number;
  competition: 'Low' | 'Medium' | 'High';
  score: number;
  intent: string;
}

function KeywordPlayground({ onCopy, copiedKey }: PlaygroundProps) {
  const [seedKeyword, setSeedKeyword] = useState('TypeScript');
  const [isSearching, setIsSearching] = useState(false);
  const [keywordsList, setKeywordsList] = useState<KeywordRow[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedKeyword.trim()) return;

    setIsSearching(true);
    setKeywordsList(null);

    setTimeout(() => {
      const cleanSeed = seedKeyword.trim();
      const list: KeywordRow[] = [
        { 
          keyword: `${cleanSeed} Tutorial for Beginners`, 
          volume: '84,500/mo', 
          volumeNum: 85,
          competition: 'Low', 
          score: 88, 
          intent: 'Educational' 
        },
        { 
          keyword: `Learn ${cleanSeed} in 2026`, 
          volume: '42,100/mo', 
          volumeNum: 60,
          competition: 'Low', 
          score: 82, 
          intent: 'Skill Up' 
        },
        { 
          keyword: `Why Use ${cleanSeed} vs JavaScript`, 
          volume: '115,000/mo', 
          volumeNum: 95,
          competition: 'Medium', 
          score: 74, 
          intent: 'Comparison' 
        },
        { 
          keyword: `${cleanSeed} Projects for Portfolios`, 
          volume: '28,400/mo', 
          volumeNum: 40,
          competition: 'Low', 
          score: 79, 
          intent: 'Practical' 
        },
        { 
          keyword: `Advanced ${cleanSeed} Tips & Tricks`, 
          volume: '19,500/mo', 
          volumeNum: 25,
          competition: 'Low', 
          score: 71, 
          intent: 'Optimization' 
        },
        { 
          keyword: `Complete ${cleanSeed} Course`, 
          volume: '150,000/mo', 
          volumeNum: 100,
          competition: 'High', 
          score: 49, 
          intent: 'Longform' 
        }
      ];
      setKeywordsList(list);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            placeholder="Type seed keyword (e.g., Coding, React, Travel hacks...)"
            className="w-full font-sans text-xs pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !seedKeyword.trim()}
          className="px-5 py-3 font-sans font-bold text-xs text-white bg-black hover:bg-gray-900 rounded-lg transition-colors cursor-pointer disabled:opacity-50 shrink-0"
        >
          {isSearching ? 'Analyzing...' : 'Scan SEO Volume'}
        </button>
      </form>

      {/* Results Workspace */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[260px] flex flex-col justify-center">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-3">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F46E5]" />
            <p className="font-sans text-xs text-gray-500 font-medium">
              Scanning organic search volumes and competitor density tags...
            </p>
          </div>
        ) : keywordsList ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Recommended Tags for: <strong className="text-black normal-case">"{seedKeyword}"</strong>
              </span>
              <span className="text-[10px] text-[#4F46E5] font-semibold">
                Click any tag to copy
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                    <th className="pb-2">Target Keyword Phrase</th>
                    <th className="pb-2 text-center">Search Volume</th>
                    <th className="pb-2 text-center">Competition</th>
                    <th className="pb-2 text-center">SEO Score</th>
                    <th className="pb-2 text-right">Intent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {keywordsList.map((row, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => onCopy(row.keyword, `kw-${idx}`)}
                      className="group hover:bg-white cursor-pointer transition-all"
                    >
                      <td className="py-2.5 font-semibold text-gray-900 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] bg-gray-200/60 text-gray-500 w-5 h-5 rounded flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors shrink-0">
                          {idx + 1}
                        </span>
                        <span className="group-hover:text-[#4F46E5] transition-colors truncate max-w-[200px] sm:max-w-xs">
                          {row.keyword}
                        </span>
                        {copiedKey === `kw-${idx}` ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1 rounded flex items-center gap-0.5 animate-pulse shrink-0">
                            <Check className="w-2.5 h-2.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        )}
                      </td>
                      <td className="py-2.5 text-center text-gray-600">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-[10px]">{row.volume}</span>
                          <div className="w-16 bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${row.volumeNum}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          row.competition === 'Low' ? 'bg-emerald-50 text-emerald-700' :
                          row.competition === 'Medium' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {row.competition}
                        </span>
                      </td>
                      <td className="py-2.5 text-center font-bold">
                        <span className={`text-[11px] ${
                          row.score >= 80 ? 'text-emerald-600' :
                          row.score >= 60 ? 'text-indigo-600' :
                          'text-amber-600'
                        }`}>
                          {row.score}/100
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-[10px] text-gray-400 font-medium">
                        {row.intent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-black/5 text-gray-700 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <h5 className="font-sans font-bold text-sm text-gray-800">
              Discover High-Potential Search Niches
            </h5>
            <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
              Type a seed keyword above and run a simulated SEO keyword extract query to map search metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   3. SEO OPTIMIZATION AUDITOR PLAYGROUND
   ========================================== */
function SEOPlayground({ onCopy, copiedKey }: PlaygroundProps) {
  const [title, setTitle] = useState('react rules');
  const [desc, setDesc] = useState('react video. watch it.');
  const [isAuditing, setIsAuditing] = useState(false);
  const [hasAudited, setHasAudited] = useState(false);
  
  // Audited metrics
  const [seoScore, setSeoScore] = useState(35);
  const [isOptimized, setIsOptimized] = useState(false);

  const runAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setSeoScore(35);
      setIsOptimized(false);
      setHasAudited(true);
      setIsAuditing(false);
    }, 1000);
  };

  const handleAutoOptimize = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setTitle('I Tried React in 2026 for 30 Days (And It Changed My Life) 🤯');
      setDesc('Learn React from scratch in this complete 2026 beginner course! We cover everything from components, props, hooks, state, and advanced optimization metrics. \n\n🔥 Grab the Code: https://www.scriptiq.site/code-repo\n\n📌 Timestamps:\n0:00 - Intro\n1:30 - The Foundation of Components\n4:15 - Mastering the State Hook\n8:10 - Deploying to Production\n\n#ReactJS #CodingRoadmap #LearnCode');
      setSeoScore(96);
      setIsOptimized(true);
      setIsAuditing(false);
    }, 1400);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Column: Metadata Forms */}
      <div className="md:col-span-6 space-y-4">
        <h4 className="font-sans font-bold text-sm text-black">
          Enter Your Current Video Meta
        </h4>
        <div className="space-y-3.5">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Video Title ({title.length} chars)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasAudited(false);
              }}
              className="w-full font-sans text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Video Description ({desc.length} chars)
            </label>
            <textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                setHasAudited(false);
              }}
              rows={4}
              className="w-full font-sans text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white transition-all font-mono"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={runAudit}
              disabled={isAuditing || !title.trim()}
              className="flex-1 px-4 py-2.5 font-sans font-bold text-xs text-black border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Audit Score
            </button>
            <button
              onClick={handleAutoOptimize}
              disabled={isAuditing || !title.trim()}
              className="flex-1 px-4 py-2.5 font-sans font-bold text-xs text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Auto-Optimize
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: SEO Audit Report cards */}
      <div className="md:col-span-6 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-center">
        {isAuditing ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
            <p className="font-sans text-xs text-gray-500 font-medium animate-pulse">
              Running semantic audit checklist &amp; predicting CTR indexes...
            </p>
          </div>
        ) : hasAudited ? (
          <div className="space-y-4">
            {/* Score circle */}
            <div className="flex items-center gap-4 border-b border-gray-200 pb-3">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-2xs">
                {/* SVG Circular progress */}
                <svg className="absolute w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-gray-100 fill-none"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="26"
                    className={`fill-none ${seoScore > 80 ? 'stroke-emerald-500' : 'stroke-rose-500'}`}
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 26}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - seoScore / 100) }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <span className={`font-mono text-base font-extrabold ${seoScore > 80 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {seoScore}
                </span>
              </div>
              <div>
                <h5 className="font-sans font-bold text-sm text-black">
                  {seoScore > 80 ? 'Excellent Optimization!' : 'Critical Optimization Needed'}
                </h5>
                <p className="font-sans text-[11px] text-gray-500">
                  {seoScore > 80 
                    ? 'Your title is highly clickable and description satisfies search indexes.' 
                    : 'The text is too short, missing keywords, and lacks clear retention triggers.'}
                </p>
              </div>
            </div>

            {/* Verification checklist */}
            <div className="space-y-2">
              <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                Optimization Checklist:
              </span>
              <div className="space-y-1.5 font-sans text-xs">
                <CheckItem 
                  success={title.length >= 40 && title.length <= 70} 
                  text="Title Length (Ideally 40-70 characters)" 
                />
                <CheckItem 
                  success={isOptimized} 
                  text="Has high-converting Emotional CTR hook in title" 
                />
                <CheckItem 
                  success={desc.length > 100} 
                  text="Detailed description length (Over 100 characters)" 
                />
                <CheckItem 
                  success={isOptimized} 
                  text="Contains structured timestamps &amp; resource URLs" 
                />
                <CheckItem 
                  success={isOptimized} 
                  text="Includes descriptive search keyword tags" 
                />
              </div>
            </div>

            {isOptimized && (
              <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 flex items-start gap-2 text-[11px] leading-relaxed">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Check out the improvements!</p>
                  <p className="text-emerald-700/90">The title length was optimized to 60 characters with high-volume keywords. Description timestamps and interactive social links have been auto-injected.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-black/5 text-gray-700 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h5 className="font-sans font-bold text-sm text-gray-800">
              Audit and Optimize Your Meta Data
            </h5>
            <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
              Click "Audit Score" to check your metrics, or click "Auto-Optimize" to let AI restructure your SEO elements with one click.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckItem({ success, text }: { success: boolean; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {success ? (
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
      )}
      <span className={success ? 'text-gray-700 font-medium' : 'text-gray-400'}>
        {text}
      </span>
    </div>
  );
}

/* ==========================================
   4. VIRAL TITLE PLANNER & CTR PREDICTOR
   ========================================== */
function TitlePlayground({ onCopy, copiedKey, onNavigate }: PlaygroundProps) {
  const [topic, setTopic] = useState('Learning React in 2026');
  const [tone, setTone] = useState('viral');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<{ text: string; ctr: string; explanation: string }[] | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTitles(null);

    setTimeout(() => {
      const cleanTopic = topic.trim();
      let results = [];

      if (tone === 'viral') {
        results = [
          { text: `I Tried ${cleanTopic} for 30 Days (And It Changed My Life)`, ctr: '11.8%', explanation: 'Timeline-based challenge + emotional reward creates high investment.' },
          { text: `The Secret to ${cleanTopic} That Nobody Tells You!`, ctr: '10.5%', explanation: 'Curiosity gatekeeping: makes user feel like they are getting secret intel.' },
          { text: `Why 99% of Developers Fail at ${cleanTopic}`, ctr: '9.4%', explanation: 'Negative framing + error avoidance triggers strong click actions.' }
        ];
      } else if (tone === 'mystery') {
        results = [
          { text: `The Shocking Truth About ${cleanTopic} Revealed`, ctr: '10.1%', explanation: 'Exposure & disclosure angles always generate heavy click traffic.' },
          { text: `Something is Weirdly Wrong with ${cleanTopic}...`, ctr: '9.7%', explanation: 'Incomplete story creates an immediate open loop in viewer memory.' },
          { text: `What Happens If You Actually Try ${cleanTopic}?`, ctr: '8.9%', explanation: 'Direct query prompts the viewer to seek the physical answer.' }
        ];
      } else {
        results = [
          { text: `How to Master ${cleanTopic} Faster (The Step-by-Step Blueprint)`, ctr: '9.2%', explanation: 'Provides immediate high-value instruction roadmap.' },
          { text: `${cleanTopic} Explained in 10 Minutes (Simple & Easy)`, ctr: '8.8%', explanation: 'Promises fast execution without wasting the viewer’s time.' },
          { text: `5 Advanced ${cleanTopic} Techniques You Must Learn`, ctr: '8.1%', explanation: 'Numbered lists provide a structured, easy-to-digest cognitive load.' }
        ];
      }

      setTitles(results);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Inputs Form */}
      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-7">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Video Topic / Focus
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full font-sans text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Tone Preset
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full font-sans text-xs px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] transition-all cursor-pointer"
          >
            <option value="viral">🔥 Viral Hook</option>
            <option value="mystery">🕵️ Suspense Mystery</option>
            <option value="educational">🎓 Educational Blueprint</option>
          </select>
        </div>
        <div className="md:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full py-2.5 font-sans font-bold text-xs text-white bg-black hover:bg-gray-900 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Generate
          </button>
        </div>
      </form>

      {/* Output list with CTR Predictors */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[220px] flex flex-col justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F46E5]" />
            <p className="font-sans text-xs text-gray-500 font-medium">
              Running CTR simulation and comparative niche analysis...
            </p>
          </div>
        ) : titles ? (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Predicted High-CTR Suggestions:
              </span>
              <button
                onClick={() => onNavigate('title-generator')}
                className="font-sans text-[10px] text-[#4F46E5] font-semibold flex items-center gap-0.5 hover:underline"
              >
                Go to Standalone Page <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {titles.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white hover:bg-white/90 border border-gray-150 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all relative overflow-hidden"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold bg-gray-100 text-gray-500 w-5 h-5 rounded flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="font-sans font-extrabold text-xs text-gray-900 leading-snug">
                        {item.text}
                      </p>
                    </div>
                    <p className="font-sans text-[10px] text-gray-400 pl-7">
                      <strong className="text-gray-500 font-semibold">Why it works:</strong> {item.explanation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0 pl-7 sm:pl-0">
                    <div className="bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-center shrink-0">
                      <span className="block text-[8px] font-mono text-emerald-600 font-bold uppercase tracking-wider leading-none">
                        Est. CTR
                      </span>
                      <span className="font-mono text-xs text-emerald-700 font-extrabold">
                        {item.ctr}
                      </span>
                    </div>
                    <button
                      onClick={() => onCopy(item.text, `title-${idx}`)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-black cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                      title="Copy Title"
                    >
                      {copiedKey === `title-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-black/5 text-gray-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h5 className="font-sans font-bold text-sm text-gray-800">
              Generate High Click-Through Titles
            </h5>
            <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
              Click Generate to create custom title structures and see predicted Click-Through Rates based on viral metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   5. STRUCTURED DESCRIPTION ARCHITECT
   ========================================== */
function DescriptionPlayground({ onCopy, copiedKey }: PlaygroundProps) {
  const [videoTitle, setVideoTitle] = useState('10 productivity habits');
  const [includeSocials, setIncludeSocials] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [descriptionOutput, setDescriptionOutput] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    setIsGenerating(true);
    setDescriptionOutput(null);

    setTimeout(() => {
      const cleanTitle = videoTitle.charAt(0).toUpperCase() + videoTitle.slice(1);
      let resStr = `In this video, we dive deep into "${cleanTitle}" to show you exactly how to master the core principles and unlock dramatic results. Whether you are a beginner starting out or an expert optimizing your setup, this breakdown covers the complete strategy.\n\n`;

      if (includeSocials) {
        resStr += `📌 Grab our free cheat-sheet guides: https://www.scriptiq.site/cheat-sheets\n`;
        resStr += `🔥 Subscribe to the channel: https://www.scriptiq.site/subscribe\n`;
        resStr += `💬 Join our Discord community: https://www.scriptiq.site/discord\n\n`;
      }

      if (includeTimestamps) {
        resStr += `⏱️ TIMESTAMPS:\n`;
        resStr += `0:00 - Intro & The Big Problem\n`;
        resStr += `1:30 - The Foundation of ${cleanTitle}\n`;
        resStr += `4:20 - Phase 2: Hyper Optimization Hacks\n`;
        resStr += `8:45 - Key Mistakes to Avoid\n`;
        resStr += `11:15 - Final Verdict & Summary\n\n`;
      }

      resStr += `#${cleanTitle.replace(/\s+/g, '')} #ProductivitySecrets #ScriptIQ`;
      
      setDescriptionOutput(resStr);
      setIsGenerating(false);
    }, 1100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Setup column */}
      <div className="md:col-span-5 space-y-4">
        <h4 className="font-sans font-bold text-sm text-black flex items-center gap-1.5">
          <Settings className="w-4.5 h-4.5 text-[#4F46E5]" /> Build Description Options
        </h4>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Primary Video Title
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full font-sans text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-2.5 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between font-sans text-xs">
              <span className="text-gray-600 font-medium">Include social &amp; resource URLs</span>
              <input
                type="checkbox"
                checked={includeSocials}
                onChange={(e) => setIncludeSocials(e.target.checked)}
                className="w-4 h-4 text-[#4F46E5] border-gray-200 rounded focus:ring-[#4F46E5] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between font-sans text-xs">
              <span className="text-gray-600 font-medium">Generate rich timestamps block</span>
              <input
                type="checkbox"
                checked={includeTimestamps}
                onChange={(e) => setIncludeTimestamps(e.target.checked)}
                className="w-4 h-4 text-[#4F46E5] border-gray-200 rounded focus:ring-[#4F46E5] cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !videoTitle.trim()}
            className="w-full py-2.5 font-sans font-bold text-xs text-white bg-black hover:bg-gray-900 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? 'Structuring...' : 'Generate Description'}
          </button>
        </form>
      </div>

      {/* Output column */}
      <div className="md:col-span-7 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F46E5]" />
            <p className="font-sans text-xs text-gray-500 font-medium">
              Synthesizing key chapters and injecting call-to-actions...
            </p>
          </div>
        ) : descriptionOutput ? (
          <div className="space-y-3.5 flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Generated SEO Description:
              </span>
              <button
                onClick={() => onCopy(descriptionOutput, 'desc-sandbox-output')}
                className="font-sans text-[10px] text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'desc-sandbox-output' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied Description!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              value={descriptionOutput}
              className="w-full flex-1 font-mono text-[11px] text-gray-600 bg-white border border-gray-200 rounded-lg p-3 focus:outline-none leading-relaxed resize-none min-h-[220px]"
            />
          </div>
        ) : (
          <div className="text-center py-8 space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-black/5 text-gray-700 flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h5 className="font-sans font-bold text-sm text-gray-800">
              Create Structured Metadata
            </h5>
            <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
              Enter a primary video topic or title on the left and choose formatting templates to construct full descriptive templates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   6. SCRIPTY — AI ASSISTANT CHAT PLAYGROUND
   ========================================== */
interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

function AssistantPlayground({ onCopy }: PlaygroundProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'assistant', text: "Hi! I'm Scripty, your expert YouTube co-writer. What are we brainstorming today? Pick a quick option below or write your own custom question!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const predefinedPrompts = [
    { label: '⚡ Exciting Hook Formula', prompt: 'Give me a highly engaging formula to make my video hook 10x more exciting!' },
    { label: '🎥 Direct Camera Cues', prompt: 'What are some effective visual cues I should place in my video script?' },
    { label: '🎯 Call-to-Action Ideas', prompt: 'Provide some high-converting CTA templates that increase subscriber numbers.' }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';

      if (text.includes('hook') || text.includes('Formula')) {
        responseText = `To build a 10x more exciting hook, use the **Story Gap** framework:\n\n1. **Identify the Reward**: Start with the ultimate positive outcome (e.g., "This saving method saved me $10,000...").\n2. **Establish the Tension**: Present the counter-intuitive error immediately (e.g., "...yet 95% of people waste money doing the opposite").\n3. **Provide the Timeline**: Promise a prompt resolution (e.g., "In the next 3 minutes, I'll show you exactly how to apply it").\n\n*Avoid saying "Welcome back to my channel"* — start directly with the action!`;
      } else if (text.includes('Camera') || text.includes('cues')) {
        responseText = `Visual cues are crucial for preventing visual drop-off. Keep your frame changing every **3 to 5 seconds**:\n\n- **[VISUAL: B-ROLL]**: Cut away from the talking head to show actual screen captures, graphic slides, or product mockups.\n- **[VISUAL: JUMP CUT - CLOSE UP]**: Zoom in slightly (1.1x) to highlight high-value points or change pacing.\n- **[VISUAL: CHECKLIST GRAPHIC]**: Overlay numbered bullet lists on the screen in high-contrast monospaced font to organize details.`;
      } else if (text.includes('CTA') || text.includes('Action')) {
        responseText = `Standard CTAs like "Subscribe to my channel" are largely ignored. Try these high-converting alternatives instead:\n\n- **The Commitment Hook**: *"If you want to master TypeScript with me this month, comment 'I am in' below and hit subscribe."* (Triggers community engagement).\n- **The Reward Trigger**: *"Grab the complete PDF cheatsheet linked in the top comment below. Subscribe to catch tomorrow's course."*`;
      } else {
        responseText = `That is an excellent topic! To write a high-retention video script about that, I recommend starting with an active visual hook, mapping out exactly 3 key educational pillars with supporting B-Roll graphics, and concluding with a highly focused value-swap Call to Action. Would you like me to draft a complete outline?`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[380px] border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Messages Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs font-sans leading-relaxed shadow-3xs ${
                msg.sender === 'user' 
                  ? 'bg-[#4F46E5] text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-150 rounded-bl-none whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-150 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-3xs">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Dynamic Suggestions bar */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-1.5">
        {predefinedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.prompt)}
            className="text-[10px] font-sans font-bold text-gray-500 hover:text-black hover:border-gray-300 transition-colors bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-full border border-gray-150 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage(inputText);
          }}
          placeholder="Ask Scripty anything about video scripting..."
          className="flex-1 font-sans text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all"
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isTyping}
          className="bg-black hover:bg-gray-900 disabled:opacity-40 text-white p-2.5 rounded-lg cursor-pointer transition-colors shrink-0 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
