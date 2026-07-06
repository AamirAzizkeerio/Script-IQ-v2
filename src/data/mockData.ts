/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureItem, FaqItem, MockProject, ScriptPreset } from '../types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'script-writer',
    title: 'AI Script Writer',
    description: 'Create high-retention video scripts with hook, body, and call-to-action sections customized for your niche.',
    iconName: 'FileText'
  },
  {
    id: 'keyword-research',
    title: 'Keyword Research',
    description: 'Uncover high-volume, low-competition keywords specifically tailored for YouTube search visibility.',
    iconName: 'Search'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Ensure your scripts and metadata perfectly align with YouTube’s search algorithm for maximum organic reach.',
    iconName: 'TrendingUp'
  },
  {
    id: 'title-generator',
    title: 'AI Title Generator',
    description: 'Generate high-CTR, click-worthy titles that spark curiosity without resorting to spammy clickbait.',
    iconName: 'Sparkles'
  },
  {
    id: 'description-generator',
    title: 'AI Description Generator',
    description: 'Create rich, timestamp-ready descriptions featuring automated social links and optimization keywords.',
    iconName: 'FileSpreadsheet'
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Refine your hooks, request rephrases, or adjust pacing in real-time with an expert co-writer.',
    iconName: 'MessageSquare'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Is ScriptIQ free?',
    answer: 'Yes! ScriptIQ is free to try. Our free tier allows you to generate up to 3 complete YouTube scripts and SEO metadata packages per month. No credit card is required to sign up.'
  },
  {
    question: 'Do I need writing experience?',
    answer: 'Not at all. ScriptIQ is designed for creators of all levels. Just enter your raw topic idea, choose your desired tone, and our AI produces a polished, camera-ready script formatted with audio and visual cues.'
  },
  {
    question: 'Can I edit AI-generated scripts?',
    answer: 'Absolutely. ScriptIQ includes a fully interactive workspace editor where you can tweak, expand, rephrase, and customize every section of your generated script before exporting it.'
  },
  {
    question: 'Does ScriptIQ support YouTube SEO?',
    answer: 'Yes. Every generated project automatically includes search-optimized title variants, keywords/tags, and structured descriptions designed to optimize search relevance and trigger recommends.'
  },
  {
    question: 'Do I need to install anything?',
    answer: 'No installation required. ScriptIQ is a modern, fully responsive web application that runs directly in your browser on desktop, tablet, or mobile devices.'
  }
];

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 'proj-1',
    title: 'Why Everyone is Leaving Silicon Valley',
    topic: 'Silicon Valley Migration',
    date: '2 hours ago',
    scriptSnippet: '[Hook] The era of the single-city tech monopoly is officially over. But where are all the builders going? Let’s look at the numbers...',
    keywords: ['Silicon Valley', 'tech trends', 'future of work', 'remote work', 'tech migration'],
    description: 'In this video, we investigate the mass exodus of engineers and startups from Silicon Valley, analyzing the data behind the top new tech hubs.',
    category: 'Tech & Business'
  },
  {
    id: 'proj-2',
    title: '10 Life Hacks to Save 2 Hours Every Day',
    topic: 'Productivity Hacks',
    date: 'Yesterday',
    scriptSnippet: '[Hook] Imagine what you could do with an extra 730 hours this year. That’s exactly what these 10 micro-habits will give you back...',
    keywords: ['productivity hacks', 'time management', 'save time', 'daily habits', 'life hacks'],
    description: 'Discover 10 simple life hacks backed by cognitive science that will help you eliminate distractions and reclaim 2 hours of your day.',
    category: 'Productivity'
  },
  {
    id: 'proj-3',
    title: 'Learn to Code in 30 Days (With No Experience)',
    topic: 'Learn coding fast',
    date: '3 days ago',
    scriptSnippet: '[Hook] If you think you need a computer science degree to land a software engineering job in 2026, you are about to be proven wrong...',
    keywords: ['learn to code', 'coding for beginners', 'programming roadmap', 'self taught developer', 'web development'],
    description: 'The step-by-step 30-day roadmap to learning programming from scratch. We cover exactly what to study and what projects to build.',
    category: 'Education'
  }
];

export const SCRIPT_PRESETS: ScriptPreset[] = [
  {
    id: 'preset-1',
    topic: 'Life hacks to save time',
    titles: [
      '10 Life Hacks to Save 2 Hours Every Single Day',
      'How to Reclaim 730 Hours This Year (Productivity Cheat Code)',
      'The Science of Saving Time: 10 Micro-Habits That Actually Work'
    ],
    description: 'Do you feel like there are never enough hours in the day? In this video, we reveal 10 evidence-backed micro-habits that can save you up to 2 hours daily. From the "2-minute rule" to cognitive offloading, these productivity cheat codes are easy to implement and yield massive results. Stop wasting time and start operating at peak performance.',
    keywords: ['productivity hacks', 'save time', 'time management', 'how to be productive', 'save 2 hours', 'habits of highly successful people', 'efficiency tips', 'daily routine optimization'],
    script: `[VISUAL: Fast-paced montage of a clock spinning, followed by a stressed person looking at an endless to-do list. High energy transition.]

[AUDIO: Upbeat, modern ambient lofi beat kicks in under the voiceover.]

[SECTION: THE HOOK]
Presenter: Imagine what you could do with an extra 730 hours this year. That is an entire month of waking hours, fully restored to you. That is not science fiction—it is the direct mathematical result of saving just two hours every single day. Most creators, developers, and builders are losing this time to micro-frictions they don't even realize exist. In this video, we are breaking down 10 scientifically proven life hacks to reclaim that time. No theoretical fluff—just hyper-practical actions you can implement today. Let's go.

[VISUAL: Screen flashes with bold text: "01. COGNITIVE OFFLOADING" in JetBrains Mono font.]

[SECTION: HACK 1: COGNITIVE OFFLOADING]
Presenter: Hack number one: Cognitive Offloading. Your brain is for having ideas, not holding them. The moment a task, a thought, or an open question pops into your mind, you lose up to 15% of your working memory capacity simply trying not to forget it. 
[Visual Cue: Graphic of an overflowing bucket, then a clean notepad.]
The fix is immediate capture. Keep a single, unified digital scratchpad or physical pocket-notebook on you at all times. If it takes less than two minutes, do it right now. If it takes longer, offload it into your system instantly, and clear your mental RAM.

[VISUAL: Transition to clean office environment with an analog timer.]

[SECTION: HACK 2: THE TIME-BLOCKING MATRIX]
Presenter: Hack number two: The Time-Blocking Matrix. Stop working from to-do lists. To-do lists are passive lists of demands. Instead, turn your to-do items into events on your calendar. Block out exact times for "deep work," "admin tasks," and "communication." When the calendar block starts, you do not choose what to do—you simply execute what was scheduled. This single shift eliminates decision fatigue, which is the primary driver of procrastination.

[VISUAL: B-roll showing a phone being placed inside a drawer, out of sight.]

[SECTION: HACK 3: CELLULAR ISOLATION]
Presenter: Hack number three: Cellular Isolation. Research shows that just having your phone on your desk—even if it is turned completely off and face down—reduces your cognitive capacity by up to 10% because your brain has to actively exert energy to ignore it. 
Put it in another room or inside a drawer. Out of sight is literally out of mind.

[VISUAL: Montage of other quick-fire tips: 04. Batching emails, 05. Keyboard shortcut mastery, 06. Parkinson's Law limits, 07. Temple prep, 08. Zero-Inbox templates, 09. Smart cooking, 10. Evening reflection.]

[SECTION: CALL TO ACTION]
Presenter: If you implement just three of these hacks today, you will easily save an hour. Implement all ten, and you get two. Which hack are you starting with? Drop a comment below. If you want more evidence-based guides to level up your workflow, hit the subscribe button and turn on notifications. I'll see you in the next video!`
  },
  {
    id: 'preset-2',
    topic: 'Why everyone is leaving Silicon Valley',
    titles: [
      'Why Everyone is Leaving Silicon Valley in 2026',
      'The Tech Exodus: What the Media Isn’t Telling You About California',
      'Is Silicon Valley Officially Dead? Where Builders Are Going Next'
    ],
    description: 'The era of the single-city tech monopoly is officially over. For decades, Silicon Valley was the undisputed mecca of software engineering and startup capitals. But today, a quiet migration is shifting the balance of power. In this video, we analyze the cost structures, remote-work realities, and regulatory shifts causing the greatest geographical reallocation of talent in tech history.',
    keywords: ['Silicon Valley exodus', 'tech migration', 'Austin tech', 'Miami tech', 'where to move', 'future of tech hubs', 'startup ecosystems', 'california tech scene', 'cost of living tech'],
    script: `[VISUAL: Cinematic drone footage of the Golden Gate Bridge shrouded in fog, followed by empty office buildings in downtown San Francisco. Slower, analytical tone.]

[AUDIO: Minimal, slightly dramatic electronic synth pad hums in the background.]

[SECTION: THE HOOK]
Presenter: For over fifty years, one tiny strip of land in Northern California held a near-monopoly on global innovation. If you wanted to build software, raise venture capital, or change the world, you had to be in Silicon Valley. But the numbers don’t lie. Over the last few years, a quiet, massive migration has been underway. Top-tier founders, senior engineers, and multi-billion dollar venture funds are packing up and leaving. But why now? And is the valley actually dying, or is it just evolving? Let’s look at the real data.

[VISUAL: Interactive map charting arrow lines pointing from SF to Austin, Miami, Denver, and Lisbon.]

[SECTION: THE DISTRIBUTED FUTURE]
Presenter: First, let’s look at the primary driver: geographical cost arbitrage. When the median house price in the Silicon Valley area passed one and a half million dollars, it created a massive burden for early-stage companies. A startup raising a standard pre-seed round of two million dollars would see over seventy percent of that capital go directly to rent and local cost-of-living premiums, rather than actual product development.

[VISUAL: Split-screen comparing living expenses and tax rates in California vs. Texas and Florida.]

[SECTION: THE TECH ECOSYSTEMS]
Presenter: But it isn’t just about taxes. It’s about community density. Thanks to modern remote workflows, collaborative software, and digital-first capital networks, a developer in Austin, Miami, or Denver has virtually the same access to investors as someone sitting in Palo Alto. The "accidental serendipity" of meeting someone in a coffee shop on Sand Hill Road has been replaced by highly focused global digital communities.

[SECTION: THE VERDICT]
Presenter: So, is Silicon Valley dead? No. The intellectual density of Stanford, Berkeley, and the legacy companies means it will always remain a premier research hub. But its monopoly is over. Innovation has been democratized, and the next trillion-dollar company is just as likely to be founded in a bedroom in Colorado or a co-working space in Spain. What do you think? Would you still move to Silicon Valley to build your startup? Let me know in the comments. Subscribe for more deep-dive analyses on the business of tech.`
  },
  {
    id: 'preset-3',
    topic: 'Learn coding in 30 days',
    titles: [
      'How to Learn to Code in 30 Days (A Self-Taught Roadmap)',
      'The Only 30-Day Programming Roadmap You Will Ever Need',
      'Learn Coding Fast: My 30-Day Step-by-Step Blueprint'
    ],
    description: 'Can you actually learn to code in 30 days? Yes, if you focus on the right 20% of concepts that yield 80% of real-world results. In this video, we break down a hyper-efficient 30-day curriculum designed for complete beginners to build real, deployable projects and think like an engineer.',
    keywords: ['learn to code in 30 days', 'learn programming fast', 'web development tutorial', 'how to become a software engineer', 'self taught coder', 'javascript roadmap', 'python for beginners'],
    script: `[VISUAL: Screen recording showing a sleek modern terminal running code, then a beautiful finished web dashboard in action. Engaging and motivational tone.]

[AUDIO: Uplifting, inspiring lofi track with a steady head-nodding rhythm.]

[SECTION: THE HOOK]
Presenter: If you think you need a four-year computer science degree or a twenty-thousand-dollar bootcamp to build software and land a job in tech, you are about to be proven wrong. Over ninety percent of modern web applications are built using the same core, reusable patterns. If you learn to master the right twenty percent of concepts, you can build production-ready applications in just one month. In this video, I’m giving you my exact step-by-step 30-day coding roadmap. No filler, no useless theory—just the raw pipeline to building real software fast.

[VISUAL: Text overlay on clean light background: "DAYS 1-10: THE FOUNDATIONS" in bold black letters.]

[SECTION: THE ROADMAP]
Presenter: Days 1 through 10 are all about the building blocks of the web: HTML, CSS, and basic programming logic. Do not try to memorize everything. Focus on understanding how layouts are structured and how variables, loops, and conditions work. Write simple scripts that print statements or calculate basic values. The goal here is simply to get comfortable looking at code without feeling overwhelmed.

[VISUAL: Interactive folder tree diagram showcasing components and API routes.]

[SECTION: BUILD REAL THINGS]
Presenter: Days 11 to 20: This is where the magic happens. You enter JavaScript or Python, and you start building *interactive* components. Create a interactive calculator, a habit tracker, or a task board. This teaches you how to handle data, listen to user clicks, and update the screen in real-time. By building real things, you learn how to debug, search documentation, and solve actual problems—which is ninety percent of what real engineers do.

[SECTION: THE EXPORT]
Presenter: Days 21 to 30: You learn Git, deploy your site to the world using a service like Vercel, and build a multi-page portfolio. Once your code is live on the internet, you are officially a developer. If you are ready to start this 30-day challenge, comment "I am in" below. Download the free PDF curriculum in the description, and subscribe to watch the daily walkthroughs. Let's make it happen.`
  }
];

export function getDynamicScript(topic: string): ScriptPreset {
  const normalized = topic.trim().toLowerCase();
  
  // Try to find a matching preset
  const matched = SCRIPT_PRESETS.find(p => 
    normalized.includes(p.topic.toLowerCase()) || 
    p.topic.toLowerCase().includes(normalized) ||
    normalized.split(' ').some(word => word.length > 3 && p.topic.toLowerCase().includes(word))
  );

  if (matched) {
    return matched;
  }

  // Generate a dynamic high-quality script preset based on the user's custom topic
  const cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  const words = cleanTopic.split(' ');
  const primaryKeyword = words[0] || 'YouTube';
  
  return {
    id: `dyn-${Date.now()}`,
    topic: cleanTopic,
    titles: [
      `The Ultimate Guide to ${cleanTopic} (What You Need to Know)`,
      `How to Master ${cleanTopic} in 5 Simple Steps`,
      `The Shocking Truth About ${cleanTopic} They Don’t Want You to Know!`
    ],
    description: `Are you looking to learn more about ${cleanTopic}? In this comprehensive video guide, we break down the core principles of ${cleanTopic} and how you can apply them to achieve extraordinary results. Whether you are a beginner looking for a step-by-step roadmap or an expert seeking advanced optimizations, this video covers everything you need to succeed with ${cleanTopic}.`,
    keywords: [
      normalized,
      `${normalized} guide`,
      `how to do ${normalized}`,
      `${normalized} tips`,
      `${normalized} tutorial`,
      `mastering ${normalized}`,
      `best ${normalized} practices`,
      primaryKeyword.toLowerCase()
    ],
    script: `[VISUAL: Sleek high-contrast intro card showing the words "${cleanTopic.toUpperCase()}" with a glowing accent border. Energetic jump cut to the presenter.]

[AUDIO: Dynamic, punchy tech-vibe beat kicks in with a solid rhythm.]

[SECTION: THE HOOK]
Presenter: If you have been looking for a real, practical guide to ${cleanTopic}, you are in the right place. Most tutorials on the internet make this subject ten times more complicated than it actually is. They drown you in jargon, theory, and fluff. But today, we are stripping all of that away. We are going to cover the exact blueprint you need to master ${cleanTopic}, starting from absolute scratch. By the end of this video, you will know more than ninety percent of people on this topic. Let's dive straight in.

[VISUAL: Transition graphic: Step 1 text fades in cleanly in a bold sans-serif font.]

[SECTION: STEP 1: THE CORE UNDERSTANDING]
Presenter: First, let's establish the foundation. The single biggest mistake people make with ${cleanTopic} is trying to learn everything at once. Instead, you need to focus on the core foundational pillar. 
[Visual Cue: Key text highlight on screen: "Pillar #1: Strategic Simplification."]
Once you master this baseline, everything else clicks into place. It’s about building a solid habit, keeping your workflow clean, and iterating constantly based on real feedback.

[VISUAL: B-roll showing high-quality close-ups of planning, drafting, and executing.]

[SECTION: STEP 2: HYPER-OPTIMIZATION]
Presenter: Next, let's talk about execution. To take your results to the next level, you have to optimize your routine. In our research of ${cleanTopic}, we discovered that the top creators and industry leaders rely on a simple three-step cycle: plan thoroughly, execute without distraction, and review objectively. If you can automate or streamline just one of these phases, you will double your speed instantly.

[VISUAL: Clean checklist overlay listing the core action steps.]

[SECTION: CONCLUSION & CALL TO ACTION]
Presenter: That is the complete blueprint for ${cleanTopic}. If you found this breakdown helpful, do me a massive favor and smash that thumbs-up button—it really helps the channel grow. Which part of this blueprint are you going to implement first? Let me know in the comments section below. Make sure to subscribe and click the bell icon so you don't miss our next deep dive. Thanks for watching, and I'll see you in the next one!`
  };
}
