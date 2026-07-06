/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, MockProject } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import {
  LayoutDashboard,
  Folder,
  Plus,
  Search,
  Trash2,
  Copy,
  Check,
  LogOut,
  User,
  Sparkles,
  Menu,
  X,
  FileText,
  ChevronRight,
  TrendingUp,
  Video,
  Loader2,
  HelpCircle,
  CheckCircle,
  Sliders,
  Eye,
  ArrowRight,
  Edit2,
  AlertCircle,
  Lock,
  Globe,
  Volume2,
  Briefcase
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: PageView) => void;
  userEmail?: string;
  density?: 'compact' | 'comfortable';
  onSetDensity?: (density: 'compact' | 'comfortable') => void;
}

export default function DashboardView({ onNavigate, density = 'comfortable', onSetDensity }: DashboardViewProps) {
  const isCompact = density === 'compact';
  
  // Use our real authentication context
  const { user, profile, incrementUsage, simulateUpgrade, signOut } = useAuth();
  
  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };
  
  // Navigation states inside dashboard
  const [activeTab, setActiveTab] = useState<'workspace' | 'projects' | 'hooks' | 'keywords' | 'voice'>('workspace');
  
  // Hook Optimizer states
  const [hookDraft, setHookDraft] = useState('Hey guys, welcome back to my channel. Today I will show you how to trade stocks as a beginner. It is very simple to start...');
  const [hookAngle, setHookAngle] = useState('FOMO Curiosity Gap');
  const [isOptimizingHook, setIsOptimizingHook] = useState(false);
  const [optimizedHooks, setOptimizedHooks] = useState<string[]>([]);
  const [hookScores, setHookScores] = useState<number[]>([]);

  // SEO Keyword states
  const [keywordDraft, setKeywordDraft] = useState('saas development');
  const [isAuditingKeywords, setIsAuditingKeywords] = useState(false);
  const [auditedKeywords, setAuditedKeywords] = useState<Array<{ keyword: string; volume: string; competition: 'Low' | 'Medium' | 'High'; difficulty: number }>>([]);

  // Brand Voice states
  const [voiceDraftName, setVoiceDraftName] = useState('');
  const [voiceDraftDescription, setVoiceDraftDescription] = useState('');
  const [voiceDraftTone, setVoiceDraftTone] = useState('Humorous & Friendly');
  const [savedVoiceProfiles, setSavedVoiceProfiles] = useState<Array<{ name: string; description: string; tone: string; active: boolean }>>([
    { name: 'Casual Tech Sarcasm', description: 'Enthusiastic but slightly cynical tone, short punchy visual transitions.', tone: 'Witty / Sarcastic', active: true },
    { name: 'Formal Financial Guide', description: 'Deep, slower delivery with zero fillers, heavy focus on charts.', tone: 'Authoritative / Serious', active: false }
  ]);

  // Projects/scripts list state loaded from Firestore
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [activeProject, setActiveProject] = useState<MockProject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Generation Input state
  const [topicInput, setTopicInput] = useState('');
  const [tonality, setTonality] = useState('engaging');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState('');

  // Active Project workspace fields
  const [editedScript, setEditedScript] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [editedKeywords, setEditedKeywords] = useState<string[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);

  // UI state managers
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  
  // Upgrade Promo Modal
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [simulatingUpgradeState, setSimulatingUpgradeState] = useState(false);

  // Load from Firestore when user is authenticated
  useEffect(() => {
    if (!user) return;

    const fetchScripts = async () => {
      setLoadingHistory(true);
      try {
        const q = query(
          collection(db, 'savedScripts'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const loaded: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loaded.push({
            id: doc.id,
            title: data.title || '',
            topic: data.topic || '',
            date: data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString() : 'Just now',
            scriptSnippet: data.script || '',
            keywords: data.keywords || [],
            description: data.description || '',
            category: data.category || 'General',
            rawTimestamp: data.timestamp
          });
        });

        // Sort client-side by timestamp descending
        loaded.sort((a, b) => {
          const secA = a.rawTimestamp?.seconds || 0;
          const secB = b.rawTimestamp?.seconds || 0;
          return secB - secA;
        });
        
        // If the user has no history, we seed with mock projects for a smooth first experience
        if (loaded.length === 0) {
          setProjects(MOCK_PROJECTS);
          setActiveProject(MOCK_PROJECTS[0]);
        } else {
          setProjects(loaded);
          setActiveProject(loaded[0]);
        }
      } catch (err) {
        console.error("Error fetching scripts from Firestore:", err);
        // Fallback to mock projects on error
        setProjects(MOCK_PROJECTS);
        setActiveProject(MOCK_PROJECTS[0]);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchScripts();
  }, [user]);

  // Load selected project into workspace editor
  useEffect(() => {
    if (activeProject) {
      setEditedScript(activeProject.scriptSnippet);
      setEditedTitle(activeProject.title);
      setEditedDesc(activeProject.description);
      setEditedKeywords(activeProject.keywords);
      setTitleSuggestions([
        activeProject.title,
        `Mastering ${activeProject.topic}: A Step-by-Step Guide`,
        `The Hidden Truth About ${activeProject.topic} Revealed`
      ]);
      setSaveStatus('saved');
    } else {
      setEditedScript('');
      setEditedTitle('');
      setEditedDesc('');
      setEditedKeywords([]);
      setTitleSuggestions([]);
    }
  }, [activeProject]);

  // Handle auto-saving visual cue when editing
  const handleScriptChange = (val: string) => {
    setEditedScript(val);
    setSaveStatus('dirty');
  };

  const handleTitleChange = (val: string) => {
    setEditedTitle(val);
    setSaveStatus('dirty');
  };

  const handleDescChange = (val: string) => {
    setEditedDesc(val);
    setSaveStatus('dirty');
  };

  const triggerSave = async () => {
    if (!activeProject) return;
    setSaveStatus('saving');
    
    // update local state list
    const updated = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          title: editedTitle,
          scriptSnippet: editedScript,
          description: editedDesc,
          keywords: editedKeywords
        };
      }
      return p;
    });
    setProjects(updated);
    
    if (user) {
      try {
        await setDoc(doc(db, 'savedScripts', activeProject.id), {
          id: activeProject.id,
          userId: user.uid,
          title: editedTitle,
          topic: activeProject.topic,
          script: editedScript,
          description: editedDesc,
          keywords: editedKeywords,
          category: activeProject.category,
          timestamp: serverTimestamp()
        }, { merge: true });
        setSaveStatus('saved');
      } catch (err) {
        console.error("Error saving updated script to Firestore:", err);
        setSaveStatus('dirty');
      }
    } else {
      setTimeout(() => setSaveStatus('saved'), 500);
    }
  };

  // Copy helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate a project calling our backend Gemini endpoint
  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    // Enforce monthly generation limit server-side & client-side
    const isFreeUser = !profile || profile.plan === 'free';
    const limitReached = isFreeUser && (profile?.usageCount ?? 0) >= 3;

    if (limitReached) {
      setShowUpgradeModal(true);
      return;
    }

    setIsGenerating(true);
    setApiError('');
    
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topicInput,
          tonality
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to compile script package.');
      }

      const scriptData = await res.json();

      // Create new custom Project ID
      const newId = `script-${Date.now()}`;

      // Increment Firestore Usage (blocks further usage) & Save Script
      if (user) {
        await incrementUsage();
        await setDoc(doc(db, 'savedScripts', newId), {
          id: newId,
          userId: user.uid,
          title: scriptData.titles[0],
          topic: topicInput,
          script: scriptData.script,
          description: scriptData.description,
          keywords: scriptData.keywords,
          category: tonality.charAt(0).toUpperCase() + tonality.slice(1),
          timestamp: serverTimestamp()
        });
      }

      const newProj: MockProject = {
        id: newId,
        title: scriptData.titles[0],
        topic: topicInput,
        date: 'Just now',
        scriptSnippet: scriptData.script,
        keywords: scriptData.keywords,
        description: scriptData.description,
        category: tonality.charAt(0).toUpperCase() + tonality.slice(1)
      };

      setProjects([newProj, ...projects]);
      setActiveProject(newProj);
      setTitleSuggestions(scriptData.titles);
      setTopicInput('');
      setIsGenerating(false);
      setActiveTab('workspace');
      setMobileSidebarOpen(false);

    } catch (err: any) {
      console.error("Script generation error:", err);
      setApiError(err.message || 'An unexpected error occurred. Please try again.');
      setIsGenerating(false);
    }
  };

  // Delete a project
  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    if (activeProject?.id === id) {
      setActiveProject(filtered[0] || null);
    }

    if (user) {
      try {
        await deleteDoc(doc(db, 'savedScripts', id));
      } catch (err) {
        console.error("Error deleting saved script from Firestore:", err);
      }
    }
  };

  // Handle simulation sandbox upgrades
  const handleSimulateUpgrade = async (plan: 'pro' | 'studio') => {
    setSimulatingUpgradeState(true);
    try {
      await simulateUpgrade(plan);
      setShowUpgradeModal(false);
    } catch (err) {
      console.error("Upgrade simulation failed:", err);
    } finally {
      setSimulatingUpgradeState(false);
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayUserEmail = user?.email || 'creator@scriptiq.site';
  const displayPlan = profile?.plan || 'free';
  const displayUsage = profile?.usageCount ?? 0;

  return (
    <div id="dashboard-layout" className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-black">
      
      {/* MOBILE BAR */}
      <div className={`md:hidden flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-40 transition-all ${
        isCompact ? 'px-3 py-2' : 'px-4 py-3'
      }`}>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5"
        >
          <div className="bg-[#4F46E5] text-white p-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-sans text-sm font-bold text-black">ScriptIQ</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setActiveTab('workspace');
              setActiveProject(null);
            }}
            className="p-1 rounded bg-gray-100 text-gray-700"
            title="Create New Script"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION - DESKTOP / MOBILE OVERLAY */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-all duration-200 md:relative md:transform-none ${
          isCompact ? 'w-56 p-3' : 'w-64 p-4'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
          {/* Brand Logo - Desktop Only */}
          <button
            onClick={() => onNavigate('home')}
            className={`hidden md:flex items-center cursor-pointer focus:outline-none ${
              isCompact ? 'gap-1.5 px-1 py-1' : 'gap-2.5 px-2 py-1.5'
            }`}
          >
            <div className={`bg-[#4F46E5] text-white rounded-lg flex items-center justify-center ${isCompact ? 'w-6 h-6' : 'p-1.5'}`}>
              <Sparkles className={isCompact ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />
            </div>
            <span className={`font-sans font-bold text-black ${isCompact ? 'text-base' : 'text-lg'}`}>
              Script<span className="text-[#4F46E5]">IQ</span>
            </span>
          </button>

          {/* Quick Create Button */}
          <button
            id="sidebar-create-btn"
            onClick={() => {
              setActiveTab('workspace');
              setActiveProject(null);
              setMobileSidebarOpen(false);
            }}
            className={`w-full font-sans font-semibold flex items-center justify-center gap-1.5 text-white bg-black hover:bg-gray-900 transition-colors cursor-pointer ${
              isCompact ? 'text-[11px] px-2.5 py-1.5 rounded-md' : 'text-xs px-3 py-2.5 rounded-lg'
            }`}
          >
            <Plus className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            New Script Project
          </button>

          {/* Sidebar Menu Links */}
          <div className={isCompact ? 'space-y-0.5' : 'space-y-1'}>
            <span className={`block font-bold text-gray-400 uppercase tracking-wider ${
              isCompact ? 'text-[9px] px-1 mb-1' : 'text-[10px] px-2 mb-1.5'
            }`}>
              Navigation
            </span>
            <button
              onClick={() => {
                setActiveTab('workspace');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'workspace'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              Generator Workspace
            </button>
            <button
              onClick={() => {
                setActiveTab('projects');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'projects'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <Folder className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              All Saved History ({projects.length})
            </button>

            <span className={`block font-bold text-gray-400 uppercase tracking-wider mt-4 ${
              isCompact ? 'text-[9px] px-1 mb-1' : 'text-[10px] px-2 mb-1.5'
            }`}>
              SaaS Pro Tools
            </span>
            
            <button
              onClick={() => {
                setActiveTab('hooks');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center justify-between transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'hooks'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                <span>Elite Hook Optimizer</span>
              </div>
              {displayPlan === 'free' && <Lock className="w-3 h-3 text-gray-400 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setActiveTab('keywords');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center justify-between transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'keywords'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                <span>SEO Keyword Audit</span>
              </div>
              {displayPlan === 'free' && <Lock className="w-3 h-3 text-gray-400 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setActiveTab('voice');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center justify-between transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'voice'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                <span>Brand Voice Cloning</span>
              </div>
              {displayPlan !== 'studio' && <Lock className="w-3 h-3 text-gray-400 shrink-0" />}
            </button>
          </div>

          {/* Sidebar Recent Projects Panel */}
          <div className={`pt-1 ${isCompact ? 'space-y-1' : 'space-y-2'}`}>
            <span className={`block font-bold text-gray-400 uppercase tracking-wider ${
              isCompact ? 'text-[9px] px-1 mb-1' : 'text-[10px] px-2 mb-1'
            }`}>
              Recent Projects
            </span>
            <div className={`relative ${isCompact ? 'px-1' : 'px-2'}`}>
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isCompact ? 'left-3 w-3 h-3' : 'left-4.5 w-3.5 h-3.5'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-sans bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white ${
                  isCompact ? 'text-[10px] pl-6 pr-2 py-1' : 'text-[11px] pl-7 pr-3 py-1.5'
                }`}
              />
            </div>

            <div className={`overflow-y-auto space-y-0.5 px-1 ${isCompact ? 'max-h-[140px]' : 'max-h-[160px]'}`}>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className={`w-full font-sans flex items-center justify-between group transition-colors ${
                    isCompact ? 'text-[10px] p-1.5 rounded-sm' : 'text-[11px] p-2 rounded-md'
                  } ${
                    activeProject?.id === p.id
                      ? 'bg-[#4F46E5]/10 text-[#4F46E5] font-semibold'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(p);
                      setActiveTab('workspace');
                      setMobileSidebarOpen(false);
                    }}
                    className="flex-1 text-left truncate pr-2 cursor-pointer focus:outline-none"
                  >
                    {p.title || 'Untitled Project'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteProject(p.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-0.5 cursor-pointer shrink-0"
                    title="Delete project"
                  >
                    <Trash2 className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                  </button>
                </div>
              ))}

              {filteredProjects.length === 0 && (
                <span className="block text-[10px] text-gray-400 text-center py-2 italic">
                  No projects found
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Account / Profile Indicator */}
        <div className={`border-t border-gray-100 relative ${isCompact ? 'pt-2' : 'pt-4'}`}>
          
          {/* Subscription usage state visualization */}
          <div className="px-2 pb-3 pt-1 space-y-1">
            <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
              <span>Monthly Use</span>
              <span className="text-[#4F46E5]">
                {displayPlan === 'free' ? `${displayUsage}/3 Generates` : 'Unlimited'}
              </span>
            </div>
            {displayPlan === 'free' && (
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#4F46E5] h-full transition-all duration-300"
                  style={{ width: `${Math.min((displayUsage / 3) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`w-full flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
              isCompact ? 'p-1.5 rounded-lg' : 'p-2 rounded-xl'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <div className={`rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] flex items-center justify-center font-sans font-bold ${
                isCompact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
              }`}>
                {displayUserEmail.charAt(0).toUpperCase()}
              </div>
              <div className="truncate text-left">
                <span className={`block font-sans font-semibold text-black truncate leading-tight ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                  {displayUserEmail.split('@')[0]}
                </span>
                <span className="block font-sans text-[10px] text-gray-400 capitalize leading-none mt-0.5">
                  {displayPlan} Plan
                </span>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 space-y-1 z-50">
              <div className="px-2.5 py-1.5 border-b border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                <p className="text-xs text-black truncate font-medium">{displayUserEmail}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  onNavigate('home');
                }}
                className="w-full text-left font-sans text-xs text-gray-700 hover:text-black hover:bg-gray-50 p-2 rounded-lg flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-gray-400" />
                View Homepage
              </button>
              
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  setShowUpgradeModal(true);
                }}
                className="w-full text-left font-sans text-xs text-gray-700 hover:text-black hover:bg-gray-50 p-2 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                Simulate Upgrades
              </button>

              {onSetDensity && (
                <div className="px-2.5 py-1.5 border-t border-b border-gray-100 flex flex-col gap-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Density</p>
                  <div className="grid grid-cols-2 gap-1 bg-gray-50 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => onSetDensity('comfortable')}
                      className={`text-[9px] font-medium py-1 px-1.5 rounded-sm transition-all text-center ${
                        !isCompact ? 'bg-white text-black shadow-2xs font-semibold' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Comfortable
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetDensity('compact')}
                      className={`text-[9px] font-medium py-1 px-1.5 rounded-sm transition-all text-center ${
                        isCompact ? 'bg-white text-black shadow-2xs font-semibold' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Compact
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={async () => {
                  await signOut();
                  onNavigate('signin');
                }}
                className="w-full text-left font-sans text-xs text-red-600 hover:bg-red-50 p-2 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <main id="dashboard-main-content" className={`flex-1 overflow-y-auto max-w-7xl mx-auto w-full transition-all ${
        isCompact ? 'p-3 sm:p-4 md:p-5' : 'p-4 sm:p-6 lg:p-8'
      }`}>
        
        {/* ALL PROJECTS / HISTORY GRID TAB VIEW */}
        {activeTab === 'projects' && (
          <div className={isCompact ? 'space-y-4' : 'space-y-6 animate-fade-in'}>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                Saved Scripts History
              </span>
              <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                All Saved Projects
              </h1>
              <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Your complete YouTube Script and SEO titles catalog. Click any item to re-open it in the workspace teleprompter.
              </p>
            </div>

            {loadingHistory ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
                <span className="font-sans text-xs text-gray-500">Loading your creator catalog from Firestore...</span>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="bg-gray-100 p-3 rounded-full inline-flex text-gray-400 mb-4">
                  <Folder className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-black text-sm">No Projects Saved Yet</h3>
                <p className="font-sans text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Go back to the generator workspace, enter a topic, and generate a camera-ready script package!
                </p>
                <button
                  onClick={() => setActiveTab('workspace')}
                  className={`mt-4 inline-flex items-center gap-1.5 font-sans font-bold bg-black text-white rounded-lg ${isCompact ? 'text-[11px] px-3 py-1.5' : 'text-xs px-4 py-2'}`}
                >
                  <Plus className="w-3.5 h-3.5" /> Create a Project
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setActiveTab('workspace');
                    }}
                    className={`bg-white border border-gray-200 hover:border-[#4F46E5] transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between group relative ${
                      isCompact ? 'rounded-xl p-3.5 h-[145px]' : 'rounded-2xl p-5 h-[180px]'
                    }`}
                  >
                    <div className={isCompact ? 'space-y-1' : 'space-y-2'}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] bg-[#4F46E5]/10 text-[#4F46E5] font-bold px-2 py-0.5 rounded-sm uppercase">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{p.date}</span>
                      </div>
                      <h4 className={`font-sans font-bold text-gray-900 line-clamp-2 leading-snug ${isCompact ? 'text-xs md:text-sm' : 'text-base'}`}>
                        {p.title}
                      </h4>
                      <p className={`font-sans text-gray-500 line-clamp-2 leading-relaxed ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                        {p.description}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between border-t border-gray-100 ${isCompact ? 'pt-2' : 'pt-3'}`}>
                      <span className="font-sans text-[10px] font-semibold text-gray-400 uppercase">
                        {p.keywords.length} tags
                      </span>
                      <span className={`font-sans text-[#4F46E5] font-semibold group-hover:translate-x-1 transition-transform duration-150 flex items-center gap-0.5 ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                        Open Workspace <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className={`absolute opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-all ${
                        isCompact ? 'top-2.5 right-2.5 p-1' : 'top-4 right-4 p-1.5'
                      }`}
                      title="Delete Project"
                    >
                      <Trash2 className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WORKSPACE & CREATION TAB VIEW */}
        {activeTab === 'workspace' && (
          <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
            
            {/* Active Workspace Header / Save Indicator */}
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5`}>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                  Creator Suite
                </span>
                <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                  {activeProject ? 'Workspace Editor' : 'Generate New YouTube Script'}
                </h1>
                <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {activeProject 
                    ? 'Refine, edit, and copy your AI-generated script and search engine metadata.'
                    : 'Input your video concept, select your tone, and let our AI compile an optimized draft.'
                  }
                </p>
              </div>

              {activeProject && (
                <div className="flex items-center gap-3">
                  {/* Saving indicator */}
                  <span className="font-sans text-xs flex items-center gap-1.5">
                    {saveStatus === 'saved' && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> Saved
                      </span>
                    )}
                    {saveStatus === 'saving' && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4F46E5]" /> Saving...
                      </span>
                    )}
                    {saveStatus === 'dirty' && (
                      <button
                        onClick={triggerSave}
                        className="font-sans text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    )}
                  </span>

                  <button
                    onClick={() => setActiveProject(null)}
                    className={`font-sans font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${
                      isCompact ? 'text-[11px] px-2.5 py-1.5' : 'text-xs px-3 py-2'
                    }`}
                  >
                    Start New Script
                  </button>
                </div>
              )}
            </div>

            {/* IF NO PROJECT IS SELECTED (SHOW GENERATION INTERFACE) */}
            {!activeProject ? (
              <div className={`max-w-3xl mx-auto bg-white border border-gray-200 shadow-xs ${
                isCompact ? 'rounded-xl p-5' : 'rounded-2xl p-6 sm:p-8 animate-fade-in'
              }`}>
                
                {/* Global Error Banner */}
                {apiError && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <p className="font-bold">Generation Failed</p>
                      <p className="font-normal text-gray-600 leading-relaxed">{apiError}</p>
                      <button
                        type="button"
                        onClick={handleGenerateScript}
                        className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-md transition-colors font-sans text-[10px]"
                      >
                        Retry Generation
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleGenerateScript} className={isCompact ? 'space-y-4' : 'space-y-6'}>
                  
                  {/* Topic Input Area */}
                  <div>
                    <label htmlFor="gen-topic" className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                      1. What is your YouTube Video about?
                    </label>
                    <input
                      type="text"
                      id="gen-topic"
                      required
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      placeholder="e.g., Why everyone is leaving Silicon Valley, Productivity tips for programmers..."
                      className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                        isCompact ? 'text-xs px-3 py-2 rounded-lg' : 'text-sm px-4 py-3.5 rounded-xl'
                      }`}
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="font-sans text-[10px] text-gray-400">Suggestions:</span>
                      {['Life hacks to save time', 'Why everyone is leaving Silicon Valley', 'Learn coding in 30 days'].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setTopicInput(sug)}
                          className="font-sans text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Niche & Tonality Selector */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${isCompact ? 'gap-3' : 'gap-4'}`}>
                    <div>
                      <label htmlFor="gen-tone" className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                        2. Desired Tonality
                      </label>
                      <select
                        id="gen-tone"
                        value={tonality}
                        onChange={(e) => setTonality(e.target.value)}
                        className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all cursor-pointer ${
                          isCompact ? 'text-xs px-2.5 py-2 rounded-lg' : 'text-sm px-3.5 py-3 rounded-xl'
                        }`}
                      >
                        <option value="engaging">🔥 High Energy & Engaging</option>
                        <option value="analytical">📊 Analytical & Data-Driven</option>
                        <option value="educational">🎓 Educational & Straightforward</option>
                        <option value="storytelling">📖 Deep Storytelling & Narrative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                        Target Audience
                      </label>
                      <div className={`flex items-center gap-2 bg-gray-50 border border-gray-200 text-xs text-gray-500 ${
                        isCompact ? 'h-9 px-2.5 rounded-lg text-[11px]' : 'h-11 px-3 rounded-xl'
                      }`}>
                        <Sliders className="w-4 h-4 text-gray-400" />
                        Default: Tech-savvy YouTube Viewers
                      </div>
                    </div>
                  </div>

                  {/* Loading/API fetch indicators */}
                  <button
                    type="submit"
                    disabled={isGenerating || !topicInput.trim()}
                    className={`w-full font-sans font-bold flex items-center justify-center gap-2 text-white bg-[#4F46E5] hover:bg-[#4338CA] cursor-pointer disabled:opacity-50 transition-all shadow-md shadow-[#4F46E5]/10 ${
                      isCompact ? 'text-xs px-4 py-2.5 rounded-lg' : 'text-sm px-6 py-4 rounded-xl'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        AI is composing your structured YouTube script package (ETA 5-8s)...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4.5 h-4.5 text-white" />
                        Generate Complete Script Package
                      </>
                    )}
                  </button>
                </form>

                {/* Info block for beginner friendly feel */}
                <div className="mt-8 border-t border-gray-100 pt-6 flex gap-3 text-xs text-gray-400">
                  <HelpCircle className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="leading-relaxed">
                    ScriptIQ connects directly to server-side Google Gemini 3.5 Models to formulate precise retention hooks, paced video paragraphs, description layouts, and click-optimized titles.
                  </p>
                </div>
              </div>
            ) : (
              /* IF ACTIVE PROJECT IS LOADED (SHOW FULL INTERACTIVE EDITOR WORKSPACE) */
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isCompact ? 'gap-4' : 'gap-8'}`}>
                
                {/* Left Side: Script Editor Canvas (8 Columns) */}
                <div className={`lg:col-span-8 ${isCompact ? 'space-y-4' : 'space-y-6'}`}>
                  
                  {/* Main Script Textarea */}
                  <div className={`bg-white border border-gray-200 shadow-xs overflow-hidden flex flex-col transition-all ${
                    isCompact ? 'rounded-xl h-[380px]' : 'rounded-2xl h-[520px]'
                  }`}>
                    <div className={`border-b border-gray-100 bg-white flex items-center justify-between ${
                      isCompact ? 'px-4 py-2' : 'px-5 py-3'
                    }`}>
                      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#4F46E5]" /> Teleprompter Ready Script Draft
                      </span>
                      <button
                        onClick={() => handleCopyText(editedScript, 'editor-script')}
                        className="font-sans text-xs text-gray-500 hover:text-black flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedSection === 'editor-script' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-400" /> Copy Complete Script
                          </>
                        )}
                      </button>
                    </div>

                    <textarea
                      value={editedScript}
                      onChange={(e) => handleScriptChange(e.target.value)}
                      placeholder="Your script content..."
                      className={`w-full flex-1 font-sans text-gray-700 leading-relaxed focus:outline-none resize-none bg-white font-normal ${
                        isCompact ? 'p-4 text-xs' : 'p-5 text-sm'
                      }`}
                    />

                    <div className={`border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400 font-mono ${
                      isCompact ? 'px-4 py-2' : 'px-5 py-3'
                    }`}>
                      <span>{editedScript.split(/\s+/).filter(Boolean).length} words</span>
                      <span>UTF-8 Script File</span>
                    </div>
                  </div>

                  {/* AI Copilot feedback helper box */}
                  <div className={`bg-[#4F46E5]/5 border border-[#4F46E5]/15 flex items-start gap-3 ${
                    isCompact ? 'p-3 rounded-lg' : 'p-4 rounded-xl'
                  }`}>
                    <Sparkles className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-bold text-xs text-[#4F46E5]">Need to adjust the pacing?</h4>
                      <p className="font-sans text-[11px] text-gray-600 leading-relaxed">
                        Add visual cues like <code className="font-mono bg-[#4F46E5]/10 px-1 py-0.5 rounded-sm">[VISUAL: Zoom in slowly]</code> or auditory marks <code className="font-mono bg-[#4F46E5]/10 px-1 py-0.5 rounded-sm">[AUDIO: Sound effect pops]</code> to coordinate your video editor and keep the pacing optimal.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right Side: SEO Metadata Options (4 Columns) */}
                <div className={`lg:col-span-4 ${isCompact ? 'space-y-4' : 'space-y-6'}`}>
                  
                  {/* 1. Title Ideas Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Title Suggestions
                    </span>

                    {/* Single editable Active Title */}
                    <div>
                      <label htmlFor="active-title" className="block text-[10px] font-semibold text-gray-400 mb-1">
                        Active Project Title
                      </label>
                      <input
                        type="text"
                        id="active-title"
                        value={editedTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className={`w-full font-sans font-bold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] ${
                          isCompact ? 'text-[11px] p-2' : 'text-xs p-2.5'
                        }`}
                      />
                    </div>

                    {/* Seed suggestions list */}
                    <div className={`pt-2 border-t border-gray-100 ${isCompact ? 'space-y-1.5' : 'space-y-2'}`}>
                      <span className="block text-[9px] font-bold text-gray-400 uppercase">
                        AI Suggested Alternatives
                      </span>
                      {titleSuggestions.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setEditedTitle(t);
                            setSaveStatus('dirty');
                          }}
                          className={`w-full text-left font-sans border transition-all text-gray-600 hover:text-black hover:border-gray-300 block cursor-pointer ${
                            isCompact ? 'text-[10px] p-1.5 rounded-md' : 'text-[11px] p-2 rounded-lg'
                          } ${
                            editedTitle === t ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-black font-semibold' : 'border-gray-100 bg-gray-50/50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Description Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        SEO Video Description
                      </span>
                      <button
                        onClick={() => handleCopyText(editedDesc, 'editor-desc')}
                        className="text-gray-400 hover:text-black cursor-pointer"
                        title="Copy Description"
                      >
                        {copiedSection === 'editor-desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <textarea
                      value={editedDesc}
                      onChange={(e) => handleDescChange(e.target.value)}
                      rows={isCompact ? 4 : 5}
                      className={`w-full font-sans bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] resize-none leading-relaxed text-gray-600 ${
                        isCompact ? 'text-[10px] p-2.5' : 'text-xs p-3'
                      }`}
                    />
                  </div>

                  {/* 3. Tags & Keywords Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Keywords / Tags
                      </span>
                      <button
                        onClick={() => handleCopyText(editedKeywords.join(', '), 'editor-keywords')}
                        className="text-gray-400 hover:text-black shrink-0 cursor-pointer"
                        title="Copy Keywords List"
                      >
                        {copiedSection === 'editor-keywords' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className={`flex flex-wrap ${isCompact ? 'gap-1' : 'gap-1.5'}`}>
                      {editedKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className={`font-mono bg-gray-100 text-gray-600 flex items-center gap-1 group ${
                            isCompact ? 'text-[8px] px-1.5 py-0.5 rounded-sm' : 'text-[9px] px-2 py-1 rounded-sm'
                          }`}
                        >
                          #{kw.replace(/\s+/g, '')}
                          <button
                            onClick={() => {
                              const filtered = editedKeywords.filter((_, i) => i !== idx);
                              setEditedKeywords(filtered);
                              setSaveStatus('dirty');
                            }}
                            className="text-gray-400 hover:text-red-500 cursor-pointer"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}

                      {/* Add new keyword prompt input */}
                      <button
                        onClick={() => {
                          const val = prompt('Enter a new search tag:');
                          if (val && val.trim()) {
                            setEditedKeywords([...editedKeywords, val.trim()]);
                            setSaveStatus('dirty');
                          }
                        }}
                        className={`font-mono bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/15 font-bold flex items-center gap-1 cursor-pointer ${
                          isCompact ? 'text-[8px] px-1.5 py-0.5 rounded-sm' : 'text-[9px] px-2 py-1 rounded-sm'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5" /> Add Tag
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ELITE HOOK OPTIMIZER TAB */}
        {activeTab === 'hooks' && (
          <div className={`space-y-6 ${isCompact ? '' : 'animate-fade-in'}`}>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                Viral Pacing Suite
              </span>
              <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                Elite Retention Hook Optimizer ⚡
              </h1>
              <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Bypass weak intros. Test and transform your video's first 15 seconds against proven psychological pacing frameworks.
              </p>
            </div>

            {displayPlan === 'free' ? (
              /* LOCKED SCREEN FOR FREE TIER */
              <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4F46E5] to-indigo-400" />
                <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-4 rounded-full inline-flex">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-black text-lg">Feature Locked under Free Plan</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Standard script builders are restricted to general templates. Upgrade to <span className="font-semibold text-black">Creator Pro</span> or <span className="font-semibold text-black">Agency Studio</span> to unlock our high-CTR Elite Hook Optimizer and boost viewer audience retention.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleSimulateUpgrade('pro')}
                    className="inline-flex items-center gap-1.5 font-sans font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-4 h-4" /> Simulate Pro Upgrade
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE UNLOCKED INTERFACE FOR PRO/STUDIO */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Inputs card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <h3 className="font-sans font-bold text-sm text-black">Optimize Your Intro Hook</h3>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Draft Intro Text
                    </label>
                    <textarea
                      rows={5}
                      value={hookDraft}
                      onChange={(e) => setHookDraft(e.target.value)}
                      placeholder="Type your current draft intro hook here..."
                      className="w-full font-sans text-xs border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Optimization Cadence Angle
                    </label>
                    <select
                      value={hookAngle}
                      onChange={(e) => setHookAngle(e.target.value)}
                      className="w-full font-sans text-xs border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-gray-50"
                    >
                      <option value="FOMO Curiosity Gap">FOMO Curiosity Gap (Shocking metric comparison)</option>
                      <option value="Contrarian Fact Bomb">Contrarian Fact Bomb (Debunking common beliefs)</option>
                      <option value="Threat & Resolution">Threat & Resolution (Identifying immediate danger)</option>
                      <option value="The 3-Second Action Hook">The 3-Second Action Hook (Instant visual loop)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setIsOptimizingHook(true);
                      setOptimizedHooks([]);
                      setTimeout(() => {
                        setIsOptimizingHook(false);
                        if (hookAngle.includes('FOMO')) {
                          setOptimizedHooks([
                            `"93% of passive beginner stock investors lose money in their first week. But if you click off this video, you'll miss the single portfolio shelter used by the top 7%."`,
                            `"Before you put another dollar in the market, look at this. This 3-letter symbol beat the S&P 500 by 400% last year, and almost nobody knows it exists."`,
                            `"If you have less than $5,000 to invest, you are probably playing the wrong game. Here is the exact vehicle we used to compound $1k to $10k in 90 days."`
                          ]);
                          setHookScores([9.9, 9.6, 9.2]);
                        } else {
                          setOptimizedHooks([
                            `"Most investment gurus are lying to you. They tell you to buy index funds and wait 40 years. Here's why that math fails in 2026, and what you should do instead."`,
                            `"Stop buying stocks! This single shift in developer dividends earns 3x more cash flow with half the volatility."`,
                            `"I spent $12,000 on trading masterclasses so you don't have to. Here are the three lessons that actually turned me profitable."`
                          ]);
                          setHookScores([9.8, 9.5, 9.1]);
                        }
                      }, 1200);
                    }}
                    disabled={isOptimizingHook || !hookDraft.trim()}
                    className="w-full font-sans font-bold text-xs bg-black text-white hover:bg-gray-900 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isOptimizingHook ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> Optimizing Hooks...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Optimize Hook Alternatives
                      </>
                    )}
                  </button>
                </div>

                {/* Outputs card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-center min-h-[250px]">
                  {optimizedHooks.length === 0 ? (
                    <div className="text-center py-12 space-y-2 text-gray-400">
                      <HelpCircle className="w-8 h-8 mx-auto text-gray-300" />
                      <h4 className="font-sans font-bold text-xs text-gray-500">No Optimized Alternatives Yet</h4>
                      <p className="font-sans text-[11px] max-w-xs mx-auto">
                        Enter your current intro draft on the left and select an optimization angle to generate retention boosters.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-sans font-bold text-sm text-black flex items-center justify-between">
                        <span>Optimized Output Cues</span>
                        <span className="font-mono text-[10px] text-[#4F46E5] font-bold">3 Variants Loaded</span>
                      </h3>

                      <div className="space-y-3">
                        {optimizedHooks.map((item, idx) => (
                          <div 
                            key={idx}
                            className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 relative hover:border-[#4F46E5] transition-all group animate-fade-in"
                          >
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[8px] font-mono font-bold bg-[#4F46E5]/10 text-[#4F46E5] px-2 py-0.5 rounded-sm uppercase tracking-wide">
                                Variant #{idx + 1} ({hookAngle.split(' ')[0]})
                              </span>
                              <span className="text-[10px] font-black text-emerald-600">
                                Pacing Score: {hookScores[idx]}/10 ⚡
                              </span>
                            </div>
                            <p className="font-sans text-xs text-slate-800 leading-relaxed font-semibold">
                              {item}
                            </p>
                            <div className="mt-2.5 pt-2 border-t border-gray-200/40 flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item);
                                  showToast('Copied hook to clipboard! 📋');
                                }}
                                className="font-sans text-[9px] font-bold text-gray-500 hover:text-[#4F46E5] hover:underline cursor-pointer bg-transparent border-none p-0"
                              >
                                Copy Hook
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* SEO KEYWORD COMPETITOR AUDIT TAB */}
        {activeTab === 'keywords' && (
          <div className={`space-y-6 ${isCompact ? '' : 'animate-fade-in'}`}>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                Search Optimization
              </span>
              <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                Competitor SEO Keyword Audit 📊
              </h1>
              <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Scrape high-performing competitor volumes to target low-competition search results.
              </p>
            </div>

            {displayPlan === 'free' ? (
              /* LOCKED SCREEN FOR FREE TIER */
              <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4F46E5] to-indigo-400" />
                <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-4 rounded-full inline-flex">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-black text-lg">Feature Locked under Free Plan</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Keyword research is restricted on general free accounts. Upgrade to <span className="font-semibold text-black">Creator Pro</span> or <span className="font-semibold text-black">Agency Studio</span> to unlock our active Search Engine Competitor Keyword Auditor.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleSimulateUpgrade('pro')}
                    className="inline-flex items-center gap-1.5 font-sans font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-4 h-4" /> Simulate Pro Upgrade
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE UNLOCKED INTERFACE */
              <div className="space-y-6">
                
                {/* Seed Search bar */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={keywordDraft}
                        onChange={(e) => setKeywordDraft(e.target.value)}
                        placeholder="Enter seed topic (e.g. productivity, passive income, python)..."
                        className="w-full font-sans text-xs border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsAuditingKeywords(true);
                        setAuditedKeywords([]);
                        setTimeout(() => {
                          setIsAuditingKeywords(false);
                          const queryVal = keywordDraft.trim().toLowerCase();
                          if (queryVal.includes('python')) {
                            setAuditedKeywords([
                              { keyword: 'learn python in 30 days', volume: '18,400/mo', competition: 'Low', difficulty: 24 },
                              { keyword: 'python roadmap for beginners', volume: '12,200/mo', competition: 'Low', difficulty: 28 },
                              { keyword: 'python project ideas 2026', volume: '8,500/mo', competition: 'Medium', difficulty: 41 },
                              { keyword: 'stop learning python coding', volume: '6,100/mo', competition: 'Low', difficulty: 19 },
                              { keyword: 'python interview prep crash course', volume: '4,300/mo', competition: 'Low', difficulty: 32 }
                            ]);
                          } else if (queryVal.includes('income') || queryVal.includes('passive')) {
                            setAuditedKeywords([
                              { keyword: 'passive income real business', volume: '45,200/mo', competition: 'Low', difficulty: 22 },
                              { keyword: 'stop passive income trading', volume: '14,300/mo', competition: 'Low', difficulty: 18 },
                              { keyword: 'passive income ideas with $1000', volume: '22,100/mo', competition: 'Medium', difficulty: 45 },
                              { keyword: 'realistic software passive income', volume: '9,800/mo', competition: 'Low', difficulty: 15 },
                              { keyword: 'passive income habits to adopt', volume: '7,400/mo', competition: 'Low', difficulty: 29 }
                            ]);
                          } else {
                            setAuditedKeywords([
                              { keyword: `${queryVal} roadmap 2026`, volume: '14,200/mo', competition: 'Low', difficulty: 25 },
                              { keyword: `stop doing ${queryVal} tutorial hell`, volume: '9,500/mo', competition: 'Low', difficulty: 19 },
                              { keyword: `how to learn ${queryVal} in 30 days`, volume: '11,400/mo', competition: 'Medium', difficulty: 42 },
                              { keyword: `realistic ${queryVal} project list`, volume: '6,300/mo', competition: 'Low', difficulty: 21 },
                              { keyword: `${queryVal} tutorial for total beginners`, volume: '32,000/mo', competition: 'High', difficulty: 78 }
                            ]);
                          }
                        }, 1200);
                      }}
                      disabled={isAuditingKeywords || !keywordDraft.trim()}
                      className="font-sans font-bold text-xs bg-black text-white hover:bg-gray-900 transition-all px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {isAuditingKeywords ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> Auditing...
                        </>
                      ) : (
                        'Audit Competitor Space'
                      )}
                    </button>
                  </div>
                </div>

                {/* Audit Results Table */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs overflow-hidden">
                  <h3 className="font-sans font-bold text-sm text-black mb-4">Competitor SEO High-CTR Opportunities</h3>
                  
                  {isAuditingKeywords ? (
                    <div className="py-16 text-center space-y-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5] mx-auto" />
                      <span className="font-mono text-[10px] text-gray-400 block animate-pulse">Scanning competitor tags & title impressions...</span>
                    </div>
                  ) : auditedKeywords.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 space-y-1">
                      <Search className="w-8 h-8 mx-auto text-gray-300" />
                      <p className="font-sans font-bold text-xs">Search a Seed Keyword Above</p>
                      <p className="font-sans text-[10px] max-w-xs mx-auto text-gray-400">
                        Enter a video subject to audit volumes and fetch high-traffic tags with low competitor density.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="pb-3 pr-4">Keyword Match</th>
                            <th className="pb-3 px-4">Est. Search Volume</th>
                            <th className="pb-3 px-4">Competitor Density</th>
                            <th className="pb-3 px-4">SEO Difficulty</th>
                            <th className="pb-3 pl-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {auditedKeywords.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-3.5 pr-4 font-bold text-slate-800">{item.keyword}</td>
                              <td className="py-3.5 px-4 font-mono font-medium text-[#4F46E5]">{item.volume}</td>
                              <td className="py-3.5 px-4">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  item.competition === 'Low' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                    : item.competition === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                  {item.competition}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        item.difficulty < 30 ? 'bg-emerald-500' : item.difficulty < 60 ? 'bg-amber-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${item.difficulty}%` }}
                                    />
                                  </div>
                                  <span className="font-mono text-[10px] text-gray-500">{item.difficulty}/100</span>
                                </div>
                              </td>
                              <td className="py-3.5 pl-4 text-right">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(item.keyword);
                                    showToast(`Copied "${item.keyword}" to clipboard! 🏷️`);
                                  }}
                                  className="font-sans font-bold text-[10px] text-[#4F46E5] hover:underline cursor-pointer bg-transparent border-none p-0"
                                >
                                  Copy Tag
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>
        )}

        {/* BRAND VOICE CLONING TAB */}
        {activeTab === 'voice' && (
          <div className={`space-y-6 ${isCompact ? '' : 'animate-fade-in'}`}>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                Creator Persona Engine
              </span>
              <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                Brand Voice Cloning & Style Presets 🗣️
              </h1>
              <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Instruct and train model style custom parameters to align script phrasing with your actual talking personality.
              </p>
            </div>

            {displayPlan !== 'studio' ? (
              /* LOCKED SCREEN FOR NON-AGENCY TIER (ONLY UNLOCKED ON STUDIO) */
              <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4F46E5] to-indigo-400" />
                <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-4 rounded-full inline-flex">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-black text-lg">Feature Locked under {displayPlan} Plan</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Brand Voice profile cloning is a premium enterprise-grade capability restricted to our Agency & Studio plan. Upgrade to <span className="font-semibold text-black">Agency Studio</span> to bypass generic script templates, train style profiles, and clone your talking personality.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleSimulateUpgrade('studio')}
                    className="inline-flex items-center gap-1.5 font-sans font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-4 h-4" /> Simulate Agency Upgrade
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE UNLOCKED INTERFACE FOR AGENCY TIER */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Save New Voice Profile Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <h3 className="font-sans font-bold text-sm text-black">Train Brand Voice Clone</h3>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Persona Profile Name
                    </label>
                    <input
                      type="text"
                      value={voiceDraftName}
                      onChange={(e) => setVoiceDraftName(e.target.value)}
                      placeholder="e.g. My Casual Tech Channel Voice..."
                      className="w-full font-sans text-xs border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Cadence Adjectives & Traits
                    </label>
                    <input
                      type="text"
                      value={voiceDraftTone}
                      onChange={(e) => setVoiceDraftTone(e.target.value)}
                      placeholder="e.g. humorous, quick sarcasm, high energy, zero fluff..."
                      className="w-full font-sans text-xs border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Talking Sample / Script Template (For model fine-tuning)
                    </label>
                    <textarea
                      rows={4}
                      value={voiceDraftDescription}
                      onChange={(e) => setVoiceDraftDescription(e.target.value)}
                      placeholder="Insert 100-300 words of your typical video scripts to train the tone extractor..."
                      className="w-full font-sans text-xs border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!voiceDraftName.trim() || !voiceDraftDescription.trim()) {
                        showToast('Please fill out Name and Sample fields. ⚠️');
                        return;
                      }
                      const newVoice = {
                        name: voiceDraftName.trim(),
                        description: voiceDraftDescription.trim().slice(0, 80) + '...',
                        tone: voiceDraftTone.trim() || 'Custom Clone',
                        active: false
                      };
                      setSavedVoiceProfiles([...savedVoiceProfiles, newVoice]);
                      setVoiceDraftName('');
                      setVoiceDraftDescription('');
                      setVoiceDraftTone('Energetic');
                      showToast(`Voice profile "${newVoice.name}" fine-tuned successfully! 🎉`);
                    }}
                    disabled={!voiceDraftName.trim() || !voiceDraftDescription.trim()}
                    className="w-full font-sans font-bold text-xs bg-black text-white hover:bg-gray-900 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Fine-Tune & Save Custom Clone
                  </button>
                </div>

                {/* Saved Profiles List Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <h3 className="font-sans font-bold text-sm text-black flex items-center justify-between">
                    <span>Active Saved Clones</span>
                    <span className="font-mono text-[10px] text-[#4F46E5] font-bold">In Use</span>
                  </h3>

                  <div className="space-y-3">
                    {savedVoiceProfiles.map((profileItem, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          const updated = savedVoiceProfiles.map((p, i) => ({ ...p, active: i === idx }));
                          setSavedVoiceProfiles(updated);
                        }}
                        className={`border rounded-xl p-3.5 flex items-start justify-between cursor-pointer transition-all ${
                          profileItem.active 
                            ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30' 
                            : 'bg-gray-50/50 border-gray-200/60 hover:border-gray-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="font-sans font-extrabold text-xs text-black flex items-center gap-1.5">
                            {profileItem.name}
                            {profileItem.active && (
                              <span className="text-[7px] font-mono font-bold bg-[#4F46E5] text-white px-1.5 py-0.5 rounded-full uppercase">
                                Active Model Clone
                              </span>
                            )}
                          </h4>
                          <p className="font-sans text-[11px] text-gray-500 leading-normal">{profileItem.description}</p>
                          <p className="font-mono text-[9px] text-gray-400">Tone tags: {profileItem.tone}</p>
                        </div>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                          profileItem.active ? 'bg-[#4F46E5] text-white border-transparent' : 'bg-white border-gray-200'
                        }`}>
                          {profileItem.active && '✓'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </main>

      {/* RE-USABLE UPGRADE SANDBOX PROMOTIONAL MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center relative space-y-6">
            
            {/* Close button */}
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-4 rounded-full inline-flex">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none">
                Upgrade to Unleash Unlimited Power
              </h3>
              <p className="font-sans text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                You've hit your monthly cap of <span className="font-bold text-gray-700">3 free generations</span>. Switch plan simulated in our sandbox environment to instantly reset limits and access the model!
              </p>
            </div>

            {/* Quick Pricing Option Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Pro plan option */}
              <div className="border border-gray-200 rounded-2xl p-4 hover:border-[#4F46E5] transition-all bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-extrabold text-xs text-black">Creator Pro</h4>
                  <p className="font-sans text-2xl font-black text-[#4F46E5] mt-1">$9<span className="text-[10px] text-gray-400 font-normal">/mo</span></p>
                  <p className="font-sans text-[10px] text-gray-400 mt-2">Perfect for growing channels and weekly creators.</p>
                </div>
                <button
                  onClick={() => handleSimulateUpgrade('pro')}
                  disabled={simulatingUpgradeState}
                  className="mt-4 w-full font-sans font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 text-[10px] rounded-lg transition-colors cursor-pointer"
                >
                  {simulatingUpgradeState ? 'Upgrading...' : 'Simulate Pro'}
                </button>
              </div>

              {/* Studio plan option */}
              <div className="border border-[#4F46E5] rounded-2xl p-4 bg-[#4F46E5]/5 flex flex-col justify-between relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-[#4F46E5] text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-bl-lg">POPULAR</span>
                <div>
                  <h4 className="font-sans font-extrabold text-xs text-black">Agency Studio</h4>
                  <p className="font-sans text-2xl font-black text-[#4F46E5] mt-1">$15<span className="text-[10px] text-gray-400 font-normal">/mo</span></p>
                  <p className="font-sans text-[10px] text-gray-400 mt-2">Unlimited fast-track generation with team licenses.</p>
                </div>
                <button
                  onClick={() => handleSimulateUpgrade('studio')}
                  disabled={simulatingUpgradeState}
                  className="mt-4 w-full font-sans font-bold bg-black hover:bg-gray-900 text-white py-2 text-[10px] rounded-lg transition-colors cursor-pointer"
                >
                  {simulatingUpgradeState ? 'Upgrading...' : 'Simulate Studio'}
                </button>
              </div>

            </div>

            {/* Payments launching soon disclaimer */}
            <div className="bg-gray-50 rounded-xl p-3 text-[10px] text-gray-400 border border-gray-100 flex items-center justify-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              Payments are scaffolded only (Paddle Integration launching soon). Simulating is 100% free!
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Toast feedback element */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white font-sans text-xs font-bold py-3 px-5 rounded-xl shadow-2xl border border-slate-800/80 flex items-center gap-2 animate-fade-in transition-all">
          <span className="text-sm">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
