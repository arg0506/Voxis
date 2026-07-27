import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle2, 
  FileCode, 
  ArrowRight, 
  Server, 
  Key, 
  Cpu, 
  Sparkles, 
  ShieldCheck,
  Terminal,
  Layers,
  ChevronRight
} from 'lucide-react';

export const PrivacyDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'pipeline'>('matrix');

  return (
    <div className="space-y-6 text-zinc-900">
      
      {/* Intro Hero Header */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-zinc-950 text-white shadow-md">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950">
                Voxis Zero-Knowledge Security Model
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Engine Target: <code className="text-zinc-950 font-bold">voxis.voting.v2</code> | Proof Type: SNARK Recursive Circuit
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-zinc-100 p-1 rounded-2xl border border-zinc-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'matrix' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Privacy Matrix
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'pipeline' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Circuit Pipeline
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
          Voxis isolates governance operations into two cryptographically distinct execution spaces: <strong className="text-zinc-950">Private Client Witness Execution</strong> (100% client-side inside the user's browser) and <strong className="text-zinc-950">Public Verified Ledger State</strong> (decentralized consensus layer).
        </p>
      </div>

      {activeTab === 'matrix' ? (
        /* Two Column Visual Split */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Private Witness Data */}
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-zinc-900" />
                <h3 className="font-extrabold text-zinc-950 text-sm">Private Client Witness (Encrypted)</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                100% Browser Local
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              The following witness fields are supplied locally to compute the zero-knowledge proof without sending data to any central server:
            </p>

            <ul className="space-y-3">
              {[
                { label: 'witness voterSecret()', desc: '32-byte high-entropy key used to derive the single-use nullifier hash.', icon: Key },
                { label: 'witness voterChoice()', desc: 'The vote choice (YES, NO, ABSTAIN) chosen locally by the user.', icon: Lock },
                { label: 'Voter Identity / Wallet', desc: 'Your wallet identity is decoupled and never attached to the vote transaction.', icon: Shield }
              ].map((item, i) => (
                <li key={i} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 flex items-start space-x-3 text-xs">
                  <item.icon className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-zinc-950 block">{item.label}</span>
                    <span className="text-zinc-600 text-[11px] font-normal">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Public Ledger State */}
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-zinc-950 text-sm">Public Ledger State (On-Chain)</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Publicly Auditable
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              These parameters are committed publicly on the ledger for mathematical verification and real-time tallying:
            </p>

            <ul className="space-y-3">
              {[
                { label: 'ledger nullifiers', desc: 'Set<Bytes<32>> storing spent commitments to prevent double voting.', icon: Server },
                { label: 'ledger yesVotes, noVotes...', desc: 'Public aggregate counters incremented upon valid ZK proof verification.', icon: CheckCircle2 },
                { label: 'ledger proposalId & title', desc: 'On-chain governance records describing proposal parameters.', icon: FileCode }
              ].map((item, i) => (
                <li key={i} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 flex items-start space-x-3 text-xs">
                  <item.icon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-emerald-950 block">{item.label}</span>
                    <span className="text-zinc-600 text-[11px] font-normal">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      ) : (
        /* Proof Circuit Pipeline Step Flow Box */
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-base font-extrabold text-zinc-950">Proof Execution Pipeline (`castVote` workflow)</h3>
            <p className="text-xs text-zinc-500">Step-by-step cryptographic circuit evaluation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            
            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-zinc-950 text-white font-mono flex items-center justify-center font-bold text-xs shadow-2xs">1</span>
              <span className="font-bold text-zinc-950 block text-sm">Fetch Governance ID</span>
              <p className="text-zinc-600 text-[11px] font-normal leading-relaxed">
                Engine reads public <code className="text-zinc-900 font-bold">proposalId</code> from the ledger.
              </p>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-zinc-950 text-white font-mono flex items-center justify-center font-bold text-xs shadow-2xs">2</span>
              <span className="font-bold text-zinc-950 block text-sm">Derive Nullifier</span>
              <p className="text-zinc-600 text-[11px] font-normal leading-relaxed">
                Computes <code className="text-zinc-900 font-bold">hash(secret, proposalId)</code> and verifies uniqueness.
              </p>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-zinc-950 text-white font-mono flex items-center justify-center font-bold text-xs shadow-2xs">3</span>
              <span className="font-bold text-zinc-950 block text-sm">Disclose Ballot Choice</span>
              <p className="text-zinc-600 text-[11px] font-normal leading-relaxed">
                Publishes vote selection without leaking voter credentials or source IP address.
              </p>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-mono flex items-center justify-center font-bold text-xs shadow-2xs">4</span>
              <span className="font-bold text-zinc-950 block text-sm">Commit On-Chain</span>
              <p className="text-zinc-600 text-[11px] font-normal leading-relaxed">
                Increments public counters on-chain once the ZK proof passes validation.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
