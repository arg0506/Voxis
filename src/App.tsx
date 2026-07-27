import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Proposal, VoteReceipt, WalletState } from './types/voting';
import { MidnightService } from './services/midnightService';
import { Header } from './components/Header';
import { ContractBanner } from './components/ContractBanner';
import { VotingCard } from './components/VotingCard';
import { TallyDashboard } from './components/TallyDashboard';
import { PrivacyDiagram } from './components/PrivacyDiagram';
import { ProposalList } from './components/ProposalList';
import { CreateProposalModal } from './components/CreateProposalModal';
import { AuditLog } from './components/AuditLog';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { LandingPage } from './components/LandingPage';
import { Sparkles, Shield, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [activeProposal, setActiveProposal] = useState<Proposal | null>(null);
  const [receipts, setReceipts] = useState<VoteReceipt[]>([]);
  const [wallet, setWallet] = useState<WalletState>(MidnightService.getInitialWalletState());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadedProposals = MidnightService.getProposals();
    setProposals(loadedProposals);
    if (loadedProposals.length > 0) {
      setActiveProposal(loadedProposals[0]);
    }
    setReceipts(MidnightService.getAuditReceipts());
  }, [refreshKey]);

  const handleVoteSuccess = (receipt: VoteReceipt, updatedProp: Proposal) => {
    setReceipts(MidnightService.getAuditReceipts());
    setProposals(MidnightService.getProposals());
    setActiveProposal(updatedProp);
  };

  const handleProposalCreated = (newProp: Proposal) => {
    const updated = MidnightService.getProposals();
    setProposals(updated);
    setActiveProposal(newProp);
    setActiveTab('vote');
  };

  const handleContractAddressUpdated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      
      {/* Top Navbar */}
      <Header
        wallet={wallet}
        onConnectWallet={() => setWallet({ ...wallet, isConnected: true })}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area with Motion Tab Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <LandingPage
                proposals={proposals}
                onStartVoting={() => setActiveTab('vote')}
                onExploreProposals={() => setActiveTab('proposals')}
                onSelectProposal={(proposal) => {
                  setActiveProposal(proposal);
                  setActiveTab('vote');
                }}
                onViewPrivacy={() => setActiveTab('privacy')}
                onViewTally={() => setActiveTab('tally')}
              />
            )}

            {activeTab === 'vote' && activeProposal && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950 flex items-center space-x-2">
                      <span>Zero-Knowledge Shielded Voting</span>
                      <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                    </h1>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      Powered by Voxis Proof Engine (<code className="text-zinc-900 font-bold">voxis.voting.v2</code>)
                    </p>
                  </div>

                  {proposals.length > 1 && (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-zinc-500 font-mono hidden sm:inline">Active Proposal:</span>
                      <select
                        value={activeProposal.id}
                        onChange={(e) => {
                          const sel = proposals.find(p => p.id === e.target.value);
                          if (sel) setActiveProposal(sel);
                        }}
                        className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-zinc-900 text-xs font-mono focus:outline-none shadow-xs"
                      >
                        {proposals.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.title.substring(0, 40)}...
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <VotingCard
                  proposal={activeProposal}
                  onVoteSuccess={handleVoteSuccess}
                  onViewTally={() => setActiveTab('tally')}
                />
              </div>
            )}

            {activeTab === 'tally' && activeProposal && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
                    Verified Public Ledger Tally &amp; Analytics
                  </h1>
                </div>

                <TallyDashboard
                  proposal={activeProposal}
                  allProposals={proposals}
                  onSelectProposal={(p) => setActiveProposal(p)}
                />
              </div>
            )}

            {activeTab === 'privacy' && (
              <PrivacyDiagram />
            )}

            {activeTab === 'proposals' && (
              <ProposalList
                proposals={proposals}
                onSelectProposalToVote={(p) => {
                  setActiveProposal(p);
                  setActiveTab('vote');
                }}
                onOpenCreateModal={() => setIsCreateModalOpen(true)}
              />
            )}

            {activeTab === 'audit' && (
              <AuditLog receipts={receipts} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <CreateProposalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProposalCreated={handleProposalCreated}
      />

      <DeploymentGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        onAddressSaved={handleContractAddressUpdated}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-xs text-zinc-500 font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-md bg-zinc-950 flex items-center justify-center text-white font-extrabold text-xs">
              V
            </div>
            <div>
              <span className="text-zinc-950 font-bold block">Voxis Governance Inc.</span>
              <span className="text-zinc-500">Enterprise Shielded Decision Platform</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span>Contract: <code className="text-zinc-950 font-bold">voxis.voting.v2</code></span>
            <span>Network: <strong className="text-emerald-700 font-bold">Mainnet Ready</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}

