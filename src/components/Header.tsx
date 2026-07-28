import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  Cpu, 
  Server, 
  HelpCircle, 
  RefreshCw, 
  Home, 
  Vote, 
  FileText, 
  BarChart3, 
  Shield, 
  History, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Globe2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WalletState } from '../types/voting';
import { MidnightService } from '../services/midnightService';

interface HeaderProps {
  wallet: WalletState;
  onConnectWallet: (updatedWallet?: WalletState) => void;
  onOpenDeployGuide: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  wallet,
  onConnectWallet,
  onOpenDeployGuide,
  activeTab,
  setActiveTab
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [connectNotice, setConnectNotice] = useState<string | null>(null);

  const isLaceInstalled = MidnightService.isLaceInstalled();
  const isMetaMaskInstalled = MidnightService.isMetaMaskInstalled();

  useEffect(() => {
    // Listen for MetaMask account changes if present
    if (typeof window !== 'undefined' && (window as any).ethereum?.on) {
      const handleAccounts = (accounts: string[]) => {
        if (accounts && accounts.length > 0 && wallet.walletType === 'metamask') {
          onConnectWallet({
            ...wallet,
            isConnected: true,
            address: accounts[0]
          });
        }
      };
      (window as any).ethereum.on('accountsChanged', handleAccounts);
      return () => {
        if ((window as any).ethereum?.removeListener) {
          (window as any).ethereum.removeListener('accountsChanged', handleAccounts);
        }
      };
    }
  }, [wallet, onConnectWallet]);

  const handleConnectWithMode = async (mode: 'lace' | 'metamask' | 'zk') => {
    setIsConnecting(true);
    setConnectNotice(null);
    try {
      const newWallet = await MidnightService.connectWallet(mode);
      onConnectWallet(newWallet);
      setIsWalletModalOpen(false);
      if (mode === 'lace') {
        const isInstalled = MidnightService.isLaceInstalled();
        if (!isInstalled) {
          setConnectNotice('Lace extension not detected in window.cardano. Connected via Lace Midnight Preprod testnet. Install Lace extension from lace.io for CIP-30 dApp signing.');
        }
      } else if (mode === 'metamask') {
        const isInstalled = MidnightService.isMetaMaskInstalled();
        if (!isInstalled) {
          setConnectNotice('MetaMask extension not detected in window.ethereum. Connected via Web3 testnet account. Install MetaMask from metamask.io for browser signing.');
        }
      }
    } catch (err: any) {
      console.warn('Wallet connection fallback:', err);
      const fallbackWallet = MidnightService.getInitialWalletState();
      onConnectWallet(fallbackWallet);
      setConnectNotice('Wallet connection fallback activated.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDirectConnect = () => {
    setIsWalletModalOpen(true);
  };

  const isLandingPage = activeTab === 'home';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHamburgerOpen) {
        setIsHamburgerOpen(false);
      }
    };
    if (isHamburgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHamburgerOpen]);

  const appNavItems = [
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'vote', label: 'Cast ZK Vote', icon: Vote },
    { id: 'tally', label: 'Public Tally', icon: BarChart3 },
    { id: 'privacy', label: 'Security & Circuit', icon: Shield },
    { id: 'audit', label: 'Audit Log', icon: History }
  ];

  const handleSearchSelect = (tabId: string) => {
    setActiveTab(tabId);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-xl border-b border-zinc-200/90 text-zinc-900 sticky top-0 z-40 shadow-xs">
        
        {/* Top Mini Status Bar */}
        <div className="bg-zinc-950 text-zinc-300 text-[11px] py-1 px-4 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                MAINNET V2.4 ACTIVE
              </span>
              <span className="text-zinc-400 hidden sm:inline">Voxis Shielded Zero-Knowledge Governance Protocol</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400">
              <button 
                onClick={onOpenDeployGuide}
                className="hover:text-white transition-colors flex items-center space-x-1 font-mono text-[10px]"
              >
                <span>Prover Contract: <code className="text-emerald-400 font-bold">0x0200a78...</code></span>
                <ChevronRight className="w-3 h-3 text-zinc-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Simple V Text Logo & Core Brand */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              <button 
                onClick={() => {
                  setActiveTab('home');
                  setIsHamburgerOpen(false);
                }} 
                className="flex items-center space-x-3 text-left focus:outline-none group"
              >
                {/* Clean Simple 'V' Text Logo Mark */}
                <div className="relative">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md border border-zinc-800 ring-2 ring-zinc-900/10 group-hover:bg-zinc-900 group-hover:scale-105 transition-all">
                    <span className="bg-gradient-to-tr from-white via-zinc-100 to-emerald-400 bg-clip-text text-transparent">
                      V
                    </span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-950 group-hover:text-zinc-800 transition-colors">
                      Voxis
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-zinc-950 text-white shadow-2xs">
                      ZK
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium uppercase font-mono hidden xl:block">
                    Zero-Knowledge Governance
                  </p>
                </div>
              </button>

              {/* Separator Line & Active Context Indicator */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className="h-6 w-px bg-zinc-200"></div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/90 text-xs font-bold text-zinc-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] text-zinc-500 font-mono uppercase">Page:</span>
                  <span className="text-zinc-950 font-extrabold capitalize">
                    {isLandingPage ? 'Landing Page' : appNavItems.find(i => i.id === activeTab)?.label || activeTab}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side Actions with Hamburger Menu Trigger */}
            <div className="flex items-center space-x-2.5">
              
              {/* Quick Launch App Button (Visible when on Landing Page) */}
              {isLandingPage && (
                <button
                  onClick={() => {
                    setActiveTab('vote');
                    setIsHamburgerOpen(false);
                  }}
                  className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm transition-all active:scale-95"
                >
                  <Vote className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Launch App</span>
                </button>
              )}

              {/* Search Command Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-2xl bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/90 text-zinc-600 hover:text-zinc-950 text-xs transition-all shadow-2xs cursor-pointer"
                title="Quick Command Search"
              >
                <Search className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-medium text-[11px] hidden md:inline">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-zinc-600 bg-white border border-zinc-200 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Deploy Config Guide Button */}
              <button
                onClick={onOpenDeployGuide}
                className="p-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border border-zinc-200/90 transition-all shadow-2xs cursor-pointer"
                title="Deployment & Contract Settings"
              >
                <HelpCircle className="w-4 h-4 text-zinc-800" />
              </button>

              {/* Wallet Connection Button */}
              {wallet.isConnected ? (
                <div className="flex items-center space-x-2 bg-zinc-950 text-white pl-3 pr-2 py-1.5 rounded-2xl text-xs shadow-md border border-zinc-800">
                  <div className="flex flex-col text-right">
                    <div className="flex items-center space-x-1.5 justify-end">
                      {wallet.walletType === 'lace' && (
                        <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-400 rounded">
                          LACE
                        </span>
                      )}
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">
                        {wallet.address?.substring(0, 5)}...{wallet.address?.substring(wallet.address.length - 4)}
                      </span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono font-medium">
                      {wallet.dustBalance.toLocaleString()} VOX
                    </span>
                  </div>
                  <button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="w-7 h-7 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white shadow-inner transition-colors cursor-pointer"
                    title="Wallet Settings"
                  >
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDirectConnect}
                  disabled={isConnecting}
                  className="hidden sm:flex items-center space-x-2 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 py-2 rounded-2xl text-xs font-bold shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  ) : (
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>Connect</span>
                </button>
              )}

              {/* Prominent Animated Hamburger Navigation Button */}
              <button
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                className={`group flex items-center space-x-2.5 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-300 shadow-md cursor-pointer ${
                  isHamburgerOpen
                    ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400/50 scale-102'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700'
                }`}
                aria-label="Toggle navigation menu"
              >
                {/* Pure CSS Animated 3-Bar / Cross Icon */}
                <div className="w-4 h-3.5 flex flex-col justify-between items-center relative my-0.5">
                  <span className={`w-4 h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                    isHamburgerOpen ? 'bg-zinc-950 rotate-45 translate-y-[6px]' : 'bg-emerald-400 group-hover:bg-white'
                  }`}></span>
                  <span className={`w-4 h-0.5 rounded-full transition-all duration-300 ${
                    isHamburgerOpen ? 'opacity-0 scale-0' : 'bg-emerald-400 group-hover:bg-white'
                  }`}></span>
                  <span className={`w-4 h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                    isHamburgerOpen ? 'bg-zinc-950 -rotate-45 -translate-y-[6px]' : 'bg-emerald-400 group-hover:bg-white'
                  }`}></span>
                </div>

                <span className="font-sans tracking-tight">Menu</span>
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  isHamburgerOpen ? 'bg-zinc-950' : 'bg-emerald-400 animate-pulse'
                }`}></span>
              </button>

            </div>

          </div>
        </div>

        {/* Full-Screen Hamburger Navigation Overlay */}
        {isHamburgerOpen && (
          <div 
            onClick={() => setIsHamburgerOpen(false)}
            className="fixed inset-0 z-[200] w-screen h-screen bg-zinc-950/95 backdrop-blur-xl text-white overflow-y-auto animate-in fade-in duration-200 flex flex-col justify-between"
          >
            {/* Top Navigation Bar with Prominent Close Button */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="sticky top-0 z-10 w-full px-6 sm:px-12 py-5 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center font-black text-xl text-emerald-400 shadow-inner">
                  V
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-base tracking-tight text-white">Voxis Protocol</h3>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
                      ZK Governance
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">Full-Screen Navigation Control Hub</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[11px] font-mono text-zinc-400 hidden md:inline-block">
                  Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">ESC</kbd> or click anywhere to close
                </span>
                
                {/* Dedicated Close Button */}
                <button
                  onClick={() => setIsHamburgerOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  title="Close navigation panel"
                >
                  <X className="w-4 h-4" />
                  <span>Close Menu</span>
                </button>
              </div>
            </div>

            {/* Main Full-Screen Body Container */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-8 sm:py-12 flex-1 flex flex-col justify-between space-y-10"
            >
              
              {/* Main Navigation Modules Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Section: Core Modules (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Landing Page Primary Banner */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2.5 px-1">
                      Protocol Overview
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('home');
                        setIsHamburgerOpen(false);
                      }}
                      className={`w-full p-5 sm:p-6 rounded-3xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                        isLandingPage
                          ? 'bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-950 border-emerald-500/60 ring-2 ring-emerald-500/30 shadow-xl'
                          : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4 sm:space-x-5 z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isLandingPage ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'bg-zinc-800 text-emerald-400 border border-zinc-700'}`}>
                          <Globe2 className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-base sm:text-lg text-white block">Landing Page &amp; ZK Simulator</span>
                            {isLandingPage && (
                              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-400 text-zinc-950 rounded-full">
                                ACTIVE VIEW
                              </span>
                            )}
                          </div>
                          <span className="text-xs sm:text-sm text-zinc-400 block mt-1">
                            Explore zero-knowledge architecture, cryptography whitepaper &amp; live interactive proof simulator.
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-6 h-6 transition-transform group-hover:translate-x-1.5 shrink-0 ${isLandingPage ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    </button>
                  </div>

                  {/* DApp Applications Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        Core Governance Applications
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">5 Modules</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {appNavItems.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        const descriptions: Record<string, string> = {
                          proposals: 'Explore, track and draft governance proposals',
                          vote: 'Cast zero-knowledge client-side anonymous ballots',
                          tally: 'Live cryptographically verified ledger tallies',
                          privacy: 'Inspect SNARK circuits, keys and nullifiers',
                          audit: 'Immutable cryptographic event verification'
                        };

                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id);
                              setIsHamburgerOpen(false);
                            }}
                            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start space-x-3.5 cursor-pointer group ${
                              isActive
                                ? 'bg-emerald-500/10 border-emerald-500/60 ring-1 ring-emerald-500/40 text-white shadow-lg'
                                : 'bg-zinc-900/50 hover:bg-zinc-800/90 border-zinc-800/90 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center transition-all ${
                              isActive ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'bg-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-zinc-750'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`font-bold text-sm ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                                  {tab.label}
                                </span>
                                {isActive && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                )}
                              </div>
                              <span className="text-xs text-zinc-400 block mt-1 line-clamp-1">
                                {descriptions[tab.id] || 'Navigate to module'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Section: System Utilities & Identity (4 cols) */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
                  
                  {/* System Commands & Shortcuts */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block px-1">
                      Quick System Tools
                    </span>

                    <button
                      onClick={() => {
                        setIsHamburgerOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="w-full p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-left transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Command Palette</span>
                          <span className="text-[11px] font-mono text-zinc-400">Search ⌘K</span>
                        </div>
                      </div>
                      <kbd className="px-2.5 py-1 text-[10px] font-mono font-bold text-zinc-300 bg-zinc-800 border border-zinc-700 rounded">
                        ⌘K
                      </kbd>
                    </button>

                    <button
                      onClick={() => {
                        setIsHamburgerOpen(false);
                        onOpenDeployGuide();
                      }}
                      className="w-full p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-left transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Contract Deployment</span>
                          <span className="text-[11px] font-mono text-zinc-400">Prover Binding Settings</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                    </button>
                  </div>

                  {/* Shielded Identity Box */}
                  <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-zinc-400">Shielded Identity</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>

                    {wallet.isConnected ? (
                      <div className="space-y-3">
                        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-zinc-500 font-mono block">Connected Address</span>
                            <span className="font-mono text-xs font-bold text-emerald-400">
                              {wallet.address?.substring(0, 8)}...{wallet.address?.substring(wallet.address.length - 6)}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 rounded-lg">
                            {wallet.dustBalance.toLocaleString()} VOX
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setIsHamburgerOpen(false);
                            setIsWalletModalOpen(true);
                          }}
                          className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <Wallet className="w-4 h-4 text-emerald-400" />
                          <span>Manage Wallet Identity</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-zinc-400">Connect a Web3 identity or zero-knowledge keypair to vote anonymously.</p>
                        <button
                          onClick={() => {
                            setIsHamburgerOpen(false);
                            setIsWalletModalOpen(true);
                          }}
                          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <Wallet className="w-4 h-4 text-zinc-950" />
                          <span>Connect Wallet</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Network Status Badge */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span>ZK Prover Circuit</span>
                    </div>
                    <span className="text-emerald-400 font-bold">ACTIVE (12ms)</span>
                  </div>

                </div>

              </div>

              {/* Bottom Close Action Footer */}
              <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Voxis Protocol v2.4 Zero-Knowledge Suite</span>
                </div>

                <button
                  onClick={() => setIsHamburgerOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-200 hover:text-white rounded-2xl border border-zinc-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                  <span>Close Full-Screen Menu</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </header>

      {/* Quick Search & Command Palette Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-zinc-900 animate-in fade-in-50 zoom-in-95 duration-150">
            
            <div className="p-4 border-b border-zinc-100 flex items-center space-x-3">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or destination (e.g. Vote, Proposals, Audit)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium placeholder-zinc-400 focus:outline-none bg-transparent"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-zinc-400">
                Navigation Options
              </div>
              
              <button
                onClick={() => handleSearchSelect('home')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-left text-xs font-semibold text-zinc-800 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Globe2 className="w-4 h-4 text-emerald-600" />
                  <span>Go to Landing Page</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>

              {appNavItems
                .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSearchSelect(tab.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-left text-xs font-semibold text-zinc-800 transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-zinc-600" />
                        <span>Go to {tab.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>
                  );
                })}
            </div>

            <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-zinc-800 font-bold">ESC</kbd> to exit</span>
              <span>Voxis Governance Engine v2.4</span>
            </div>

          </div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 text-zinc-900 relative animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-zinc-950 text-base">Select Web3 / Identity Wallet</h3>
                  <p className="text-xs text-zinc-500 font-mono">Voxis Zero-Knowledge Governance Protocol</p>
                </div>
              </div>

              <button
                onClick={() => setIsWalletModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {connectNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{connectNotice}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Lace Wallet Button (Midnight / Cardano) */}
              <div className="relative">
                <button
                  type="button"
                  disabled={isConnecting}
                  onClick={() => handleConnectWithMode('lace')}
                  className="w-full p-4 rounded-2xl border-2 border-emerald-600/90 bg-emerald-500/10 hover:bg-emerald-500/20 text-left transition-all duration-200 flex items-center justify-between group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-emerald-400 border border-zinc-800 flex items-center justify-center font-black text-sm shadow-md shrink-0">
                      🌀
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-zinc-950">Lace Wallet</span>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-600 text-white">
                          Midnight / CIP-30
                        </span>
                        {isLaceInstalled ? (
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Detected
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            Extension Needed
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-600 block mt-0.5">
                        Connect via official IOG Lace browser extension &amp; Midnight network
                      </span>
                    </div>
                  </div>
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0" />
                  )}
                </button>
                {!isLaceInstalled && (
                  <div className="mt-1 text-[10px] text-zinc-500 px-3 flex items-center justify-between font-mono">
                    <span>Don't have Lace browser extension?</span>
                    <a
                      href="https://www.lace.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold"
                    >
                      Install Lace Wallet &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* MetaMask / EVM Extension Button */}
              <div className="relative">
                <button
                  type="button"
                  disabled={isConnecting}
                  onClick={() => handleConnectWithMode('metamask')}
                  className="w-full p-4 rounded-2xl border border-zinc-200 hover:border-zinc-300 bg-zinc-50/60 hover:bg-zinc-100/80 text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold flex items-center justify-center text-base shrink-0">
                      🦊
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-zinc-950">MetaMask / Web3</span>
                        {isMetaMaskInstalled ? (
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Detected
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            Extension Needed
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 block mt-0.5">Connect via browser Web3 provider</span>
                    </div>
                  </div>
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 text-zinc-400 animate-spin shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0" />
                  )}
                </button>
                {!isMetaMaskInstalled && (
                  <div className="mt-1 text-[10px] text-zinc-500 px-3 flex items-center justify-between font-mono">
                    <span>Don't have MetaMask installed?</span>
                    <a
                      href="https://metamask.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:underline font-bold"
                    >
                      Install MetaMask &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Built-in Voxis ZK Shielded Identity Button */}
              <button
                type="button"
                disabled={isConnecting}
                onClick={() => handleConnectWithMode('zk')}
                className="w-full p-4 rounded-2xl border border-zinc-200 hover:border-zinc-300 bg-zinc-50/60 hover:bg-zinc-100/80 text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-zinc-950">Voxis ZK Keypair</span>
                      <span className="px-2 py-0.2 rounded-full text-[9px] font-mono font-bold bg-zinc-200 text-zinc-800">
                        In-Memory
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 block mt-0.5">Instant deterministic zero-knowledge keypair</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0" />
              </button>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200/80 text-xs text-zinc-500 space-y-1">
              <div className="font-bold text-zinc-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Private Key Transmission</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-600">
                All voter keypairs and secret hashes stay completely isolated inside client-side memory.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};



