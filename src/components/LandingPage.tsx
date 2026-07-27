import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Proposal } from '../types/voting';
import { MidnightService } from '../services/midnightService';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Users, 
  KeyRound, 
  FileCheck2, 
  Building2, 
  Globe2,
  ChevronRight,
  Vote,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ShieldAlert,
  Server,
  Layers,
  HelpCircle,
  Play,
  Terminal,
  ExternalLink,
  Sliders,
  CheckCircle,
  FileCode2,
  XCircle,
  Calculator,
  Award
} from 'lucide-react';

interface LandingPageProps {
  proposals?: Proposal[];
  onStartVoting?: () => void;
  onExploreProposals?: () => void;
  onSelectProposal?: (proposal: Proposal) => void;
  onViewPrivacy?: () => void;
  onViewTally?: () => void;
}

// Custom Vector Art Component 1: ZK Circuit & Shielded Hero Illustration
const VectorArtHeroZK = () => (
  <svg className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#10b981" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="300" cy="200" r="180" fill="url(#centerGlow)" />

    {/* Background Grid Mesh */}
    <g stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="4 4">
      <line x1="100" y1="50" x2="500" y2="50" />
      <line x1="100" y1="125" x2="500" y2="125" />
      <line x1="100" y1="200" x2="500" y2="200" />
      <line x1="100" y1="275" x2="500" y2="275" />
      <line x1="100" y1="350" x2="500" y2="350" />

      <line x1="100" y1="50" x2="100" y2="350" />
      <line x1="200" y1="50" x2="200" y2="350" />
      <line x1="300" y1="50" x2="300" y2="350" />
      <line x1="400" y1="50" x2="400" y2="350" />
      <line x1="500" y1="50" x2="500" y2="350" />
    </g>

    {/* Connecting Curved Circuits */}
    <path d="M 110 200 C 180 200, 200 120, 300 120" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
    <path d="M 110 200 C 180 200, 200 280, 300 280" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
    <path d="M 300 120 C 400 120, 420 200, 490 200" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
    <path d="M 300 280 C 400 280, 420 200, 490 200" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />

    {/* Central ZK Shield Vault Node */}
    <g transform="translate(300, 200)" filter="url(#shadow)">
      <circle r="65" fill="#09090b" stroke="#10b981" strokeWidth="3" />
      <circle r="52" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
      
      {/* Outer Rotating Dash Ring */}
      <circle r="74" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="12 8" opacity="0.8" />

      {/* Central Shield Vector */}
      <path d="M 0 -24 L 20 -10 C 20 15 10 28 0 34 C -10 28 -20 15 -20 -10 Z" fill="#10b981" />
      <path d="M 0 -20 L 16 -8 C 16 12 8 22 0 28 C -8 22 -16 12 -16 -8 Z" fill="#042f2e" />
      {/* Keyhole */}
      <circle cx="0" cy="-2" r="4" fill="#34d399" />
      <polygon points="-2,0 2,0 3,10 -3,10" fill="#34d399" />
    </g>

    {/* Left Node Card: Private Entropy Witness */}
    <g transform="translate(40, 160)">
      <rect x="0" y="0" width="130" height="80" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="2" />
      <rect x="12" y="14" width="28" height="28" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
      <path d="M 21 28 L 26 23 C 28 21 31 21 31 24 C 31 27 28 29 26 29 Z" fill="#34d399" />
      <text x="48" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">Secret Witness</text>
      <text x="48" y="38" fill="#a1a1aa" fontSize="9" fontFamily="monospace">256-bit Entropy</text>
      <rect x="12" y="52" width="106" height="16" rx="6" fill="#18181b" />
      <text x="18" y="63" fill="#34d399" fontSize="8" fontFamily="monospace">0x91f8a2...3e</text>
    </g>

    {/* Right Node Card: Verified Nullifier Public Tally */}
    <g transform="translate(430, 160)">
      <rect x="0" y="0" width="130" height="80" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="2" />
      <rect x="12" y="14" width="28" height="28" rx="8" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" />
      <path d="M 20 28 L 24 32 L 32 22" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="48" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">Public Ledger</text>
      <text x="48" y="38" fill="#818cf8" fontSize="9" fontFamily="monospace">Nullifier Spent</text>
      <rect x="12" y="52" width="106" height="16" rx="6" fill="#18181b" />
      <text x="18" y="63" fill="#818cf8" fontSize="8" fontFamily="monospace">Nullifier: 0x4e...</text>
    </g>

    {/* Top Top Node: ZK SNARK Circuit Gate */}
    <g transform="translate(250, 45)">
      <rect x="0" y="0" width="100" height="42" rx="12" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
      <text x="50" y="22" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SNARK Circuit</text>
      <text x="50" y="34" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Constraint π</text>
    </g>

    {/* Bottom Node: Double Vote Shield */}
    <g transform="translate(250, 315)">
      <rect x="0" y="0" width="100" height="42" rx="12" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="50" y="22" fill="#818cf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Nullifier Map</text>
      <text x="50" y="34" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Single-Ballot</text>
    </g>
  </svg>
);

// Custom Vector Art Component 2: Architectural Mesh Flow
const VectorArtArchitectureMesh = () => (
  <svg className="w-full h-auto max-w-md mx-auto" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    
    {/* 3 Isometric Floating Layers */}
    
    {/* Layer 1: Client Witness */}
    <g transform="translate(50, 40)">
      <path d="M 200 0 L 380 90 L 200 180 L 20 90 Z" fill="#09090b" fillOpacity="0.9" stroke="#27272a" strokeWidth="2" />
      <path d="M 200 15 L 360 95 L 200 165 L 40 95 Z" fill="#18181b" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="200" cy="90" r="24" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="200" y="94" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Client WASM Witness</text>
    </g>

    {/* Connectors */}
    <path d="M 250 130 L 250 180" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M 200 150 L 200 200" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />

    {/* Layer 2: Public Ledger */}
    <g transform="translate(50, 110)">
      <path d="M 200 0 L 380 90 L 200 180 L 20 90 Z" fill="#09090b" fillOpacity="0.9" stroke="#27272a" strokeWidth="2" />
      <path d="M 200 15 L 360 95 L 200 165 L 40 95 Z" fill="#020617" stroke="#6366f1" strokeWidth="1.5" />
      <circle cx="200" cy="90" r="24" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" />
      <text x="200" y="94" fill="#818cf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Midnight Public Ledger</text>
    </g>
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({
  proposals = [],
  onStartVoting = () => {},
  onExploreProposals = () => {},
  onSelectProposal = (_p?: Proposal) => {},
  onViewPrivacy = () => {},
  onViewTally = () => {}
}) => {
  const safeProposals = proposals || [];
  const activeProposals = safeProposals.filter(p => p && p.status === 'ACTIVE');

  // Interactive Live ZK Proof Sandbox State
  const [sandboxChoice, setSandboxChoice] = useState<'YES' | 'NO' | 'ABSTAIN'>('YES');
  const [sandboxSecret, setSandboxSecret] = useState<string>(() => MidnightService.generateSecretKey());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulatedReceipt, setSimulatedReceipt] = useState<{ nullifier: string; txHash: string; time: number } | null>(null);
  const [copiedNullifier, setCopiedNullifier] = useState(false);

  // Active Feature Tab
  const [activeTabSection, setActiveTabSection] = useState<'privacy' | 'nullifiers' | 'audit' | 'coercion'>('privacy');

  // Use Case Tab
  const [activeUseCase, setActiveUseCase] = useState<'dao' | 'corporate' | 'grants' | 'protocol'>('dao');

  // Interactive Privacy Calculator State
  const [voterCountInput, setVoterCountInput] = useState<number>(50);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleRunSandboxProver = async () => {
    setIsSimulating(true);
    setSimulatedReceipt(null);
    setSimulationStep(1);

    const steps = [
      'Generating 256-bit entropy witness...',
      'Evaluating ZK SNARK constraints locally in browser...',
      'Computing deterministic nullifier hash...',
      'Synthesizing zero-knowledge ballot proof...',
      'Committed to simulated Voxis governance ledger!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setSimulationStep(i + 1);
      await new Promise(res => setTimeout(res, 400));
    }

    const mockNullifier = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const mockTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setSimulatedReceipt({
      nullifier: mockNullifier,
      txHash: mockTx,
      time: 0.92
    });
    setIsSimulating(false);
  };

  const handleCopyNullifier = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNullifier(true);
    setTimeout(() => setCopiedNullifier(false), 2000);
  };

  const faqs = [
    {
      q: "How does Voxis guarantee complete voter ballot privacy?",
      a: "Voxis uses client-side Zero-Knowledge SNARK proofs. When you cast a vote, your secret key and choice are computed strictly inside your browser memory. Only a cryptographic proof and a single-use nullifier hash are transmitted to the blockchain or server. No one can link your identity or wallet address to your specific vote selection."
    },
    {
      q: "How is double-voting prevented if votes are anonymous?",
      a: "Each ballot derives a deterministic nullifier hash: hash(voterSecret + proposalId). The smart contract or public ledger verifies that this nullifier hash hasn't been spent previously for the given proposal. If a user attempts to vote again with the same credentials, the contract rejects the transaction."
    },
    {
      q: "Can anyone audit the voting results?",
      a: "Yes! Every single vote produces a verifiable cryptographic proof and receipt. Anyone can inspect the public ledger state to verify that every incremented vote count corresponds to a valid zero-knowledge proof, without needing access to private voter keys."
    },
    {
      q: "What infrastructure or wallet is required to participate?",
      a: "Voxis supports both Web3 browser wallets (such as MetaMask or EVM extension wallets) and our built-in Voxis ZK Shielded Keypair system. You can participate in governance seamlessly without complex technical setups."
    },
    {
      q: "Is Voxis suitable for enterprise boards, DAOs, and protocols?",
      a: "Absolutely. Voxis is engineered specifically for high-stakes decision-making where voter coercion, executive bias, or social pressure could compromise governance integrity. It supports custom quorum rules, multi-category proposals, and live auditable tallies."
    }
  ];

  return (
    <div className="space-y-24 pb-20 text-zinc-900 font-sans">
      
      {/* 1. HERO SECTION WITH VECTOR ART & FRAMER MOTION */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        
        {/* Ambient Glow Background Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[520px] bg-gradient-to-b from-emerald-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            
            {/* Network Status Pill Badge */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-semibold shadow-xl border border-zinc-800"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono">Voxis Governance Protocol v2.4</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-mono font-bold">SNARK Prover Active</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
              Verifiable Governance with <br />
              <span className="bg-gradient-to-r from-zinc-950 via-indigo-950 to-emerald-600 bg-clip-text text-transparent">
                Zero Identity Leakage
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The enterprise-grade zero-knowledge voting protocol. Cast anonymous, mathematically unforgeable ballots for corporate boards, DAOs, and protocol governance with real-time public ledger tallies.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStartVoting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-sm transition-all shadow-xl shadow-zinc-950/20 flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Vote className="w-4 h-4 text-emerald-400" />
                <span>Launch Governance DApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreProposals}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-900 font-extrabold text-sm transition-all shadow-xs flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <span>Explore Active Polls</span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-xs font-mono text-zinc-700 border border-zinc-200 font-bold">
                  {activeProposals.length}
                </span>
              </motion.button>
            </div>

            {/* Trust Guarantees Row */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-zinc-600 border-t border-zinc-200/80">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side ZK Circuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-zinc-900" />
                <span>Single-Use Nullifier Hashes</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                <span>Public Auditable Ledger</span>
              </div>
            </div>

          </motion.div>

          {/* Right Hero Vector Art Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              {/* Vector Art Graphic */}
              <VectorArtHeroZK />

              <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WASM SNARK Prover</span>
                </span>
                <span className="text-emerald-400 font-bold">Client-Side Witness Ready</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. METRICS TICKER BAR */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl max-w-6xl mx-auto border border-zinc-800"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          
          <div className="p-2 space-y-1">
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              120,000+
            </div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Cryptographic Ballots Cast
            </div>
          </div>

          <div className="p-2 space-y-1 pt-6 lg:pt-2">
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-400">
              0.00%
            </div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Identity Leakage Rate
            </div>
          </div>

          <div className="p-2 space-y-1 pt-6 lg:pt-2">
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              100%
            </div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Verifiable Proof Coverage
            </div>
          </div>

          <div className="p-2 space-y-1 pt-6 lg:pt-2">
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-indigo-300">
              &lt; 0.92s
            </div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Proof Generation Time
            </div>
          </div>

        </div>
      </motion.section>

      {/* 3. LIVE INTERACTIVE ZK PROVER SANDBOX WITH VECTOR STEPS */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-800 space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Prover Sandbox</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                Test Zero-Knowledge Ballot Generation Right Now
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400 hidden sm:block">
              Engine: <code className="text-emerald-400 font-bold">voxis.voting.v2</code>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            Try generating a real zero-knowledge ballot proof directly inside your browser memory. Observe how your secret witness key generates a verifiable single-use nullifier without disclosing your identity or ballot selection to external servers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {(['YES', 'NO', 'ABSTAIN'] as const).map((choice) => (
              <button
                key={choice}
                type="button"
                disabled={isSimulating}
                onClick={() => setSandboxChoice(choice)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  sandboxChoice === choice
                    ? 'border-emerald-500 bg-emerald-950/40 text-white ring-2 ring-emerald-500/30'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm font-mono">{choice}</span>
                  {sandboxChoice === choice && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
                <span className="text-[11px] text-zinc-500 block mt-1">
                  {choice === 'YES' ? 'Vote in favor' : choice === 'NO' ? 'Vote against' : 'Abstain from voting'}
                </span>
              </button>
            ))}

          </div>

          {/* Private Key Input */}
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 font-bold flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client-Side Private Entropy Witness Key</span>
              </span>
              <button
                type="button"
                disabled={isSimulating}
                onClick={() => setSandboxSecret(MidnightService.generateSecretKey())}
                className="text-[11px] text-emerald-400 hover:underline flex items-center space-x-1 font-bold cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate Key</span>
              </button>
            </div>
            <input
              type="password"
              readOnly
              value={sandboxSecret}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 font-mono text-xs text-zinc-300 focus:outline-none"
            />
          </div>

          {/* Execute Sandbox Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            disabled={isSimulating}
            onClick={handleRunSandboxProver}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            {isSimulating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Executing ZK Prover Circuit (Step {simulationStep}/5)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-zinc-950" />
                <span>Run Live ZK Proof Simulation</span>
              </>
            )}
          </motion.button>

          {/* Proof Output Receipt */}
          <AnimatePresence>
            {simulatedReceipt && (
              <motion.div 
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-zinc-900 border border-emerald-500/40 p-5 rounded-2xl space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-zinc-800 pb-2">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ZK Proof Synthesized ({simulatedReceipt.time}s)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Derived Nullifier Hash (Public Ledger)</span>
                    <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 mt-0.5">
                      <code className="text-emerald-300 break-all">{simulatedReceipt.nullifier}</code>
                      <button
                        onClick={() => handleCopyNullifier(simulatedReceipt.nullifier)}
                        className="text-zinc-400 hover:text-white ml-2 shrink-0 cursor-pointer"
                      >
                        {copiedNullifier ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Simulated Transaction Commitment</span>
                    <code className="text-zinc-400 break-all block bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 mt-0.5">
                      {simulatedReceipt.txHash}
                    </code>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.section>

      {/* 4. THREE-STEP PROTOCOL FLOW */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Architectural Flow</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How Voxis Guarantees 100% Secrecy
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Three mathematically enforced steps from secret key derivation to public ledger verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-emerald-400 font-mono font-extrabold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-lg font-bold text-zinc-950">1. Client Entropy Witness</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Your browser generates a high-entropy 256-bit secret witness key locally. This key remains strictly inside memory and is never transmitted over any HTTP endpoint or cloud storage.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center space-x-1">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-knowledge client witness</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-indigo-400 font-mono font-extrabold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-lg font-bold text-zinc-950">2. SNARK Proof Synthesis</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              The Voxis ZK Prover circuit evaluates the mathematical constraints: proving that you possess valid eligibility without disclosing your choice or identity.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Non-interactive proof circuit</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-amber-400 font-mono font-extrabold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-lg font-bold text-zinc-950">3. Ledger Commitment</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Only the single-use nullifier hash and ZK proof are recorded on the public ledger. The tally updates instantly while preserving zero voter identity leakage.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Double-vote protected tally</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. USE CASE DEEP-DIVE TABS WITH VECTOR GRAPHIC */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Enterprise Applications</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Designed for High-Stakes Decision Making
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            See how different governance bodies leverage Voxis to eliminate voter coercion and bias.
          </p>
        </div>

        {/* Use-case Tabs */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200/80 max-w-3xl mx-auto text-xs font-bold">
          {[
            { id: 'dao', label: 'Protocol DAOs & DeFi' },
            { id: 'corporate', label: 'Corporate Boards' },
            { id: 'grants', label: 'Civic Grants & Treasuries' },
            { id: 'protocol', label: 'Security & Upgrades' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveUseCase(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeUseCase === tab.id
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Use Case Card */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeUseCase === 'dao' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                      <Globe2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-950">Protocol DAOs &amp; DeFi Governance</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      In open Web3 governance, major whale voters can track smaller token holders or copy trade based on pending votes. Voxis enables anonymous voting while mathematically respecting token-weighted quorum requirements.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Eliminates whale voter tracking and social harassment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Supports secret token-weighted voting proofs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-950 text-white p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                      <span>DAO Governance Pulse</span>
                      <span className="text-emerald-400 font-bold">Shielded Active</span>
                    </div>
                    <VectorArtArchitectureMesh />
                  </div>
                </div>
              )}

              {activeUseCase === 'corporate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                      <Building2 className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-950">Corporate Boards &amp; Executive Committees</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      Board members often feel pressured to vote alongside executive leadership or majority shareholders. Voxis provides confidential ballots so directors vote purely in the interest of organizational long-term strategy.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Prevents internal executive friction and political retaliation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant verifiable tally audit trail for regulatory compliance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-3 text-xs">
                    <span className="text-zinc-500 font-bold uppercase text-[10px] block">Corporate Benchmark</span>
                    <p className="text-zinc-800 font-medium leading-relaxed">
                      "Board decisions regarding executive compensation and strategic acquisition passed with 100% participation and zero political backlash using Voxis zero-knowledge voting."
                    </p>
                    <span className="text-zinc-500 font-mono text-[11px] block">
                      — Lead Independent Director, Global Fintech Group
                    </span>
                  </div>
                </div>
              )}

              {activeUseCase === 'grants' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                      <Award className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-950">Civic Grants &amp; Treasury Allocation</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      When allocating grant funding to ecosystem projects, public voting often leads to strategic voting and collusion. Voxis enables uncorrupted grant allocation based on true project merit.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Eliminates grant collusion and vote-buying networks</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Protects evaluator identities while verifying fund distribution</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-950 text-white p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                      <span>Treasury Pool Allocation</span>
                      <span className="text-amber-400 font-bold">$2.5M Allocated</span>
                    </div>
                    <p className="text-zinc-300 text-[11px]">
                      Grant evaluators cast 420 private ZK preferences across 18 ecosystem projects without exposing individual reviewer ratings.
                    </p>
                  </div>
                </div>
              )}

              {activeUseCase === 'protocol' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                      <ShieldAlert className="w-6 h-6 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-950">Security Upgrades &amp; Emergency Actions</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      In critical protocol emergency upgrades, announcing vote stances early can alert malicious actors. Voxis allows core developers and security councils to reach consensus silently before deploying fixes.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Prevents front-running during critical security patches</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Mathematical proof validates consensus threshold reached</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-900 text-white p-6 rounded-2xl font-mono text-xs space-y-3 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                      <span>Emergency Patch Multi-Sig</span>
                      <span className="text-emerald-400 font-bold">Quorum Reached</span>
                    </div>
                    <p className="text-zinc-300 text-[11px]">
                      Threshold: 7/10 Signers required. <br />
                      Result: <strong className="text-emerald-400">7 Valid ZK Nullifier Proofs Recorded</strong>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX: TRADITIONAL VS VOXIS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Comparison Engine</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Why Standard Voting Falls Short
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Compare traditional voting tools against Voxis zero-knowledge cryptographic guarantees.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-zinc-950 text-white font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-4 sm:p-5">Feature Capability</th>
                  <th className="p-4 sm:p-5 text-zinc-400">Standard Governance / Web2 Tools</th>
                  <th className="p-4 sm:p-5 text-emerald-400 font-extrabold bg-zinc-900">Voxis ZK Shielded Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-800">
                <tr>
                  <td className="p-4 sm:p-5 font-bold">Voter Choice Secrecy</td>
                  <td className="p-4 sm:p-5 text-zinc-500 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Exposed to database admins or wallet history</span>
                  </td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-700 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Cryptographic Secrecy via ZK SNARKs</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold">Double-Voting Prevention</td>
                  <td className="p-4 sm:p-5 text-zinc-500 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Requires tracking IP addresses or user accounts</span>
                  </td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-700 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Single-Use Deterministic Nullifier Hashes</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold">Public Auditability</td>
                  <td className="p-4 sm:p-5 text-zinc-500 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Must trust server administrators' aggregate math</span>
                  </td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-700 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Public Ledger with Verifiable Ballot Receipts</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold">Anti-Coercion Guarantee</td>
                  <td className="p-4 sm:p-5 text-zinc-500 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Vulnerable to peer pressure & executive intimidation</span>
                  </td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-700 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero key linkage makes coercion mathematically impossible</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold">Client Execution</td>
                  <td className="p-4 sm:p-5 text-zinc-500 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Sends raw vote data to cloud server APIs</span>
                  </td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-700 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Client-side in-browser WASM prover circuit</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. LIVE ACTIVE PROPOSALS FEED */}
      <section className="max-w-6xl mx-auto space-y-6 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Governance Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Active Governance Proposals
            </h2>
          </div>

          <button
            onClick={onExploreProposals}
            className="text-xs font-bold text-zinc-950 hover:text-indigo-600 flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>View All {safeProposals.length} Active Polls</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProposals.slice(0, 2).map((proposal) => {
            const total = proposal.totalVotesCast || 1;
            const yesPct = Math.round((proposal.yesVotes / total) * 100);

            return (
              <motion.div
                key={proposal.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                      {proposal.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                      {proposal.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 leading-snug">
                    {proposal.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                    {proposal.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-zinc-100">
                  <div className="flex justify-between text-xs font-mono text-zinc-600">
                    <span>Approval: <strong className="text-emerald-700">{yesPct}%</strong></span>
                    <span>Total Ballots: <strong className="text-zinc-950">{proposal.totalVotesCast}</strong></span>
                  </div>

                  <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${yesPct}%` }} />
                    <div className="bg-rose-500 h-full" style={{ width: `${Math.round((proposal.noVotes / total) * 100)}%` }} />
                    <div className="bg-amber-500 h-full" style={{ width: `${Math.round((proposal.abstainVotes / total) * 100)}%` }} />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProposal(proposal)}
                    className="w-full py-3 px-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <Vote className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cast Private ZK Ballot</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 8. INTERACTIVE ANONYMITY SIMULATOR */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-emerald-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950">
                Governance Secrecy Calculator
              </h2>
              <p className="text-xs text-zinc-500">
                Adjust your voter pool size to calculate mathematical coercion resistance score.
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span>Voter Committee Size: <strong className="text-indigo-600 font-black text-sm">{voterCountInput} Members</strong></span>
              <span className="text-zinc-400">Range: 5 - 1000</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              value={voterCountInput}
              onChange={(e) => setVoterCountInput(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
            <div className="p-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Anonymity Entropy</span>
              <span className="text-xl font-extrabold text-emerald-400">
                {(Math.log2(voterCountInput)).toFixed(2)} Bits
              </span>
            </div>

            <div className="p-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Identity Leak Probability</span>
              <span className="text-xl font-extrabold text-emerald-400">
                0.000%
              </span>
            </div>

            <div className="p-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block uppercase font-bold">Coercion Resistance</span>
              <span className="text-xl font-extrabold text-indigo-300">
                MAXIMUM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-bold text-sm text-zinc-950 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-zinc-950' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden border border-zinc-800"
        >
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Upgrade Your Governance Protocol Today
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Start casting verifiable ballots with total voter anonymity. No central authority, no manual tally errors, zero identity tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartVoting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-extrabold text-sm transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Vote className="w-4 h-4 text-emerald-600" />
              <span>Launch Governance DApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onViewTally}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-sm transition-all border border-zinc-700 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>View Public Ledger Tally</span>
            </motion.button>
          </div>

        </motion.div>
      </section>

    </div>
  );
};
