/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  ChevronRight, 
  Play, 
  RefreshCw, 
  Video, 
  TrendingUp, 
  ThumbsUp, 
  Trophy 
} from 'lucide-react';

interface AIPresentationRobotProps {
  currentView: PageView;
  onNavigate: (view: PageView, sectionId?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'robot';
  text: string;
  timestamp: Date;
}

export default function AIPresentationRobot({ currentView, onNavigate }: AIPresentationRobotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [robotState, setRobotState] = useState<'idle' | 'thinking' | 'happy' | 'success'>('idle');
  const [speechBubbleText, setSpeechBubbleText] = useState<string>('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [hasNewTip, setHasNewTip] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'robot',
      text: "Beep boop! 🤖 I'm **Scripty**, your AI Youtube Creator Sidekick! Click on me or ask any scripting, hook, or keyword questions below, and I'll share my viral YouTube secrets with you!",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Play synthetic sound effects using Web Audio API safely
  const playRobotSound = (type: 'beep' | 'happy' | 'success' | 'click') => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'happy') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(783.99, now + 0.08); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.16); // C6
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(880.00, now + 0.16); // A5
        osc.frequency.setValueAtTime(1174.66, now + 0.24); // D6
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      // Audio might be blocked/not supported, ignore
    }
  };

  // Set view-specific suggestions
  useEffect(() => {
    let message = '';
    switch (currentView) {
      case 'home':
        message = "Psst! Try the Interactive Demo in the hero section to see how I automatically refine hooks and generate visual directions! ⚡";
        break;
      case 'dashboard':
        message = "Welcome to your Dashboard! Fill out your target theme and let me structure an optimized intro-body-CTA loop for you. 🚀";
        break;
      case 'title-generator':
        message = "Ready to boost your CTR? 📈 Keep titles under 65 characters and use curiosity brackets or numbers for massive click potential!";
        break;
      case 'signin':
        message = "Need to sync scripts? Feel free to sign in to backup drafts and share layouts seamlessly! 💾";
        break;
      default:
        message = "I am here to guide you! Just click on me for smart tips & answers anytime. 🤖";
    }

    setSpeechBubbleText(message);
    setHasNewTip(true);
    
    // Auto show speech bubble briefly on route change
    setShowSpeechBubble(true);
    playRobotSound('beep');
    
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentView]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle preset queries
  const handlePresetQuery = (topic: string, question: string) => {
    playRobotSound('click');
    setRobotState('thinking');
    
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = '';
      if (topic === 'hook') {
        replyText = "Chirp! ⚡ **The 5-Second Hook is EVERYTHING.**\n\nTo hook viewers instantly:\n- 🚫 **Never say standard intros** like 'Hi, welcome back to my channel'. They cause an immediate 15% drop-off.\n- ✅ **State the exact reward** of the video in the first sentence. (e.g., 'This is exactly how I built a full-stack App in 10 minutes from my bed.')\n- 🎥 **Insert a Pattern Interrupt**: Change the camera angle, pop a text graphic, or play a sound effect before 3 seconds!";
      } else if (topic === 'cta') {
        replyText = "Bzzzt! 📣 **The 'Like & Subscribe' routine is dead.**\n\nTry these dynamic call-to-actions:\n- **The Interactive Hook**: 'Comment below with your exact video topic, and I will personally write a hook for you!'\n- **The Seamless Bridge**: Connect the end of this script directly to another relevant video on your screen right now so viewers stay on your channel without realizing the video ended.";
      } else if (topic === 'structure') {
        replyText = "Ping! 📊 **A high-retention script uses the H-I-B-C structure:**\n\n1. **Hook (0-15s)**: Capture interest, sync directly with thumbnail/title promise.\n2. **Intro/Stakes (15-45s)**: Explain what is at risk if they miss out on this knowledge.\n3. **Body (45s - End)**: Pack with specific actionable points. Avoid fluff!\n4. **CTA & Transition (Last 15s)**: Bridge directly to the next video.";
      } else if (topic === 'seo') {
        replyText = "Zzzap! 🔍 **SEO SEO SEO! Here is my checklist:**\n\n- Put your **Main Keyword** in the first **70 characters** of your Title.\n- Place the keyword naturally in the **first 3 lines** of your video Description.\n- Say your keyword **out loud** in the first 30 seconds (YouTube's algorithm auto-transcribes this to index your content!)";
      }

      const robotMsg: Message = {
        id: Math.random().toString(),
        sender: 'robot',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, robotMsg]);
      setRobotState('happy');
      playRobotSound('success');
    }, 900);
  };

  // Handle custom text input
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    playRobotSound('click');
    setRobotState('thinking');

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    const currentText = inputText.toLowerCase();
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let replyText = '';
      
      if (currentText.includes('hello') || currentText.includes('hi') || currentText.includes('hey')) {
        replyText = "Bleep boop! Hello fellow creator! How is your channel going? Ask me about **hooks**, **structures**, **SEO optimization**, or click any preset tags for pro advice!";
      } else if (currentText.includes('hook') || currentText.includes('start') || currentText.includes('beginning')) {
        replyText = "Chirp! ⚡ **The 5-Second Hook is EVERYTHING.**\n\nTo hook viewers instantly:\n- 🚫 **Never say standard intros** like 'Hi, welcome back to my channel'. They cause an immediate 15% drop-off.\n- ✅ **State the exact reward** of the video in the first sentence. (e.g., 'This is exactly how I built a full-stack App in 10 minutes from my bed.')\n- 🎥 **Insert a Pattern Interrupt**: Change the camera angle, pop a text graphic, or play a sound effect before 3 seconds!";
      } else if (currentText.includes('cta') || currentText.includes('subscribe') || currentText.includes('like')) {
        replyText = "Bzzzt! 📣 **The 'Like & Subscribe' routine is dead.**\n\nTry these dynamic call-to-actions:\n- **The Interactive Hook**: 'Comment below with your exact video topic, and I will personally write a hook for you!'\n- **The Seamless Bridge**: Connect the end of this script directly to another relevant video on your screen right now so viewers stay on your channel without realizing the video ended.";
      } else if (currentText.includes('seo') || currentText.includes('title') || currentText.includes('tag') || currentText.includes('keyword')) {
        replyText = "Zzzap! 🔍 **SEO checklist for high-CTR views:**\n\n- Put your **Main Keyword** in the first **70 characters** of your Title.\n- Place the keyword naturally in the **first 3 lines** of your video Description.\n- Say your keyword **out loud** in the first 30 seconds (YouTube's algorithm auto-transcribes this to index your content!)";
      } else if (currentText.includes('structure') || currentText.includes('script') || currentText.includes('format')) {
        replyText = "Ping! 📊 **A high-retention script uses the H-I-B-C structure:**\n\n1. **Hook (0-15s)**: Capture interest, sync directly with thumbnail/title promise.\n2. **Intro/Stakes (15-45s)**: Explain what is at risk if they miss out on this knowledge.\n3. **Body (45s - End)**: Pack with specific actionable points. Avoid fluff!\n4. **CTA & Transition (Last 15s)**: Bridge directly to the next video.";
      } else if (currentText.includes('views') || currentText.includes('algorithm') || currentText.includes('grow')) {
        replyText = "Beep boop! 🚀 YouTube's algorithm values two core metrics: **CTR (Click-Through Rate)** and **AVD (Average View Duration)**.\n\n- **CTR**: Use curiosity gaps or tension-based thumbnails.\n- **AVD**: Keep your pacing tight, remove silent pauses, and use pattern interrupts every 10-15 seconds.";
      } else {
        replyText = "Whirrr... bleep! 🤖 That's a great question! While my database optimizes for viral youtube scripts, remember this golden rule: **Pace for human attention, not just search spiders.** Try asking about **hooks**, **SEO**, **CTR**, or click the quick action tags!";
      }

      const robotMsg: Message = {
        id: Math.random().toString(),
        sender: 'robot',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, robotMsg]);
      setRobotState('happy');
      playRobotSound('success');
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Speech Bubble / Tips Notification */}
      <AnimatePresence>
        {showSpeechBubble && speechBubbleText && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="mb-3 mr-1 max-w-[280px] bg-white text-gray-800 p-3 rounded-2xl shadow-xl border border-gray-150 relative text-xs font-medium leading-relaxed"
          >
            {/* Speach bubble tip arrow */}
            <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-gray-150 rotate-45" />
            <div className="flex gap-2 items-start">
              <Sparkles className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="text-[11px] text-[#4F46E5] font-mono font-bold uppercase tracking-wider mb-0.5">Scripty Tip ⚡</p>
                <p>{speechBubbleText}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Expandable Panel Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="w-80 md:w-96 h-[500px] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#4F46E5] text-white p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-2.5">
                {/* Micro Animated Logo Icon inside Header */}
                <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                  <Video className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-sans text-sm flex items-center gap-1.5">
                    Scripty AI Bot
                    <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full font-mono font-medium">v2.4</span>
                  </h3>
                  <p className="text-[10px] text-indigo-100 font-medium">Your YouTube YouTube Creator Sidekick</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Audio volume toggle */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    playRobotSound('click');
                  }}
                  className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    playRobotSound('beep');
                  }}
                  className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat History Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#4F46E5] text-white rounded-br-none'
                        : 'bg-white border border-gray-150 text-gray-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.sender === 'robot' ? (
                      <div className="space-y-1">
                        <p className="font-sans whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <p className="font-sans">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Simulated Robot Thinking Loader */}
              {robotState === 'thinking' && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-150 text-gray-500 rounded-2xl rounded-bl-none p-3 shadow-2xs text-xs flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4F46E5]" />
                    <span className="font-medium animate-pulse">Scripty is scanning YouTube algorithm...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Tags Grid */}
            <div className="p-3 bg-white border-t border-gray-100">
              <span className="text-[10px] text-gray-400 font-mono block mb-1.5 px-1 uppercase tracking-wider">Quick Ask Scripty:</span>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                <button
                  onClick={() => handlePresetQuery('hook', 'How do I write a high-retention hook?')}
                  className="text-[10px] bg-gray-50 border border-gray-200/80 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-gray-700 px-2 py-1 rounded-full font-sans transition-all duration-150 cursor-pointer flex items-center gap-0.5"
                >
                  <TrendingUp className="w-2.5 h-2.5 text-[#4F46E5]" />
                  Viral Hook Rule
                </button>
                <button
                  onClick={() => handlePresetQuery('cta', 'Suggest a viral CTA')}
                  className="text-[10px] bg-gray-50 border border-gray-200/80 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-gray-700 px-2 py-1 rounded-full font-sans transition-all duration-150 cursor-pointer flex items-center gap-0.5"
                >
                  <ThumbsUp className="w-2.5 h-2.5 text-[#4F46E5]" />
                  Smart CTAs
                </button>
                <button
                  onClick={() => handlePresetQuery('structure', 'Explain YouTube script structure')}
                  className="text-[10px] bg-gray-50 border border-gray-200/80 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-gray-700 px-2 py-1 rounded-full font-sans transition-all duration-150 cursor-pointer flex items-center gap-0.5"
                >
                  <Trophy className="w-2.5 h-2.5 text-[#4F46E5]" />
                  Script Blueprint
                </button>
                <button
                  onClick={() => handlePresetQuery('seo', 'How do I optimize keywords for search?')}
                  className="text-[10px] bg-gray-50 border border-gray-200/80 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-gray-700 px-2 py-1 rounded-full font-sans transition-all duration-150 cursor-pointer flex items-center gap-0.5"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#4F46E5]" />
                  SEO Checklist
                </button>
              </div>
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-gray-50 border-t border-gray-150 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Scripty about scripting tips..."
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] font-sans text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-[#4F46E5] hover:bg-indigo-700 text-white p-2 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Robot Avatar trigger */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewTip(false);
          playRobotSound('happy');
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group focus:outline-none cursor-pointer focus:ring-0 select-none bg-transparent"
        style={{ width: '84px', height: '84px' }}
      >
        {/* Glowing floating aura */}
        <span className="absolute inset-2 bg-[#4F46E5]/15 blur-md rounded-full group-hover:bg-[#4F46E5]/25 transition-colors animate-pulse" />
        
        {/* Pulsing indicator if tip/notif is active */}
        {hasNewTip && !isOpen && (
          <span className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white z-10 animate-bounce" />
        )}

        {/* CUTE SVG ROBOT BODY WITH INLINE KEYFRAME BOBBING EFFECT */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-0"
          style={{
            animation: 'robot-bob 3.2s ease-in-out infinite'
          }}
        >
          <defs>
            {/* Robot bobbing animation inside style tag */}
            <style>{`
              @keyframes robot-bob {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(1.5deg); }
              }
              @keyframes robot-blink {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.05); }
              }
            `}</style>
            
            <linearGradient id="robotGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Antenna line */}
          <line x1="50" y1="28" x2="50" y2="14" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
          {/* Antenna pulsing ring light */}
          <circle 
            cx="50" 
            cy="11" 
            r="6" 
            fill="#A78BFA" 
            className="animate-ping origin-center"
            style={{ animationDuration: '2.5s' }}
          />
          {/* Antenna solid tip */}
          <circle cx="50" cy="11" r="5" fill="#22D3EE" />

          {/* Ears / Side Screws */}
          <rect x="18" y="38" width="8" height="14" rx="3" fill="#6B7280" />
          <rect x="74" y="38" width="8" height="14" rx="3" fill="#6B7280" />

          {/* Main Head Case */}
          <rect x="23" y="24" width="54" height="42" rx="14" fill="url(#robotGrad)" stroke="#C084FC" strokeWidth="2" />

          {/* Glass Face Shield screen */}
          <rect x="29" y="30" width="42" height="30" rx="8" fill="url(#faceGrad)" stroke="#4338CA" strokeWidth="1.5" />

          {/* Eyes state transitions */}
          {robotState === 'thinking' ? (
            // Thinking/Processing Eye state (spinning spiral dials)
            <g className="origin-center animate-spin" style={{ transformOrigin: '50% 45%', animationDuration: '1.2s' }}>
              <circle cx="41" cy="45" r="4.5" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeDasharray="3 3" />
              <circle cx="59" cy="45" r="4.5" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeDasharray="3 3" />
            </g>
          ) : robotState === 'happy' || isOpen ? (
            // Curved upward happy smiling eyes ^ ^
            <g>
              <path d="M 37 47 Q 41 40 45 47" fill="none" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 55 47 Q 59 40 63 47" fill="none" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : (
            // Regular blinking eyes
            <g style={{ transformOrigin: '50% 45%', animation: 'robot-blink 4s infinite' }}>
              {/* Left Eye */}
              <circle cx="41" cy="45" r="5.5" fill="#22D3EE" />
              <circle cx="41" cy="45" r="10" fill="url(#eyeGlow)" opacity="0.4" />
              {/* Right Eye */}
              <circle cx="59" cy="45" r="5.5" fill="#22D3EE" />
              <circle cx="59" cy="45" r="10" fill="url(#eyeGlow)" opacity="0.4" />
            </g>
          )}

          {/* Digital Mouth wave indicator */}
          <path 
            d={robotState === 'thinking' ? "M 44 54 Q 50 56 56 54" : "M 46 54 L 54 54"} 
            fill="none" 
            stroke="#22D3EE" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />

          {/* Cute rosy cheeks (soft pink indicators) */}
          <circle cx="34" cy="51" r="2.5" fill="#EC4899" opacity="0.75" />
          <circle cx="66" cy="51" r="2.5" fill="#EC4899" opacity="0.75" />

          {/* Little Floating Body underneath */}
          <path d="M 38 66 L 62 66 L 56 80 L 44 80 Z" fill="url(#robotGrad)" opacity="0.9" />
          <line x1="50" y1="80" x2="50" y2="88" stroke="#3730A3" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="50" cy="88" rx="8" ry="2.5" fill="#A78BFA" className="animate-pulse" />
        </svg>

        {/* Interactive tooltip hovering */}
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/85 text-white py-1 px-2.5 rounded-lg text-[10px] font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
          Chat with Scripty! ⚡
        </div>
      </motion.button>

    </div>
  );
}
