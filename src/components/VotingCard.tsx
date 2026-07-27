import React, { useState } from 'react';
import { Proposal, VoteChoice, VoteReceipt } from '../types/voting';
import { MidnightService } from '../services/midnightService';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  Send, 
  ExternalLink, 
  Cpu, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  MinusCircle,
  HelpCircle,
  Shield,
  Clock
} from 'lucide-react';

interface VotingCardProps {
  proposal: Proposal;
  onVoteSuccess: (receipt: VoteReceipt, updatedProp: Proposal) => void;
  onViewTally: () => void;
}

export const VotingCard: React.FC<VotingCardProps> = ({
  proposal,
  onVoteSuccess,
  onViewTally
}) => {
  const [selectedChoice, setSelectedChoice] = useState<VoteChoice | null>(null);
  const [voterSecret, setVoterSecret] = useState<string>(() => MidnightService.generateSecretKey());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStepText, setCurrentStepText] = useState<string>('');
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<VoteReceipt | null>(null);
  const [copiedNullifier, setCopiedNullifier] = useState(false);
  const [copiedProof, setCopiedProof] = useState(false);

  const handleGenerateNewSecret = () => {
    setVoterSecret(MidnightService.generateSecretKey());
    setErrorMsg(null);
  };

  const handleCastVote = async () => {
    if (!selectedChoice) {
      setErrorMsg('Please select a vote choice (YES, NO, or ABSTAIN).');
      return;
    }
    if (!voterSecret || voterSecret.length < 10) {
      setErrorMsg('Please enter or generate a valid private voter secret.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    setStepIndex(0);

    try {
      const result = await MidnightService.castVoteWithZKProof(
        proposal.id,
        selectedChoice,
        voterSecret,
        (stepIdx, text) => {
          setStepIndex(stepIdx);
          setCurrentStepText(text);
        }
      );
      setReceipt(result.receipt);
      onVoteSuccess(result.receipt, result.proposal);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate ZK proof and cast vote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyText = (text: string, type: 'nullifier' | 'proof') => {
    navigator.clipboard.writeText(text);
    if (type === 'nullifier') {
      setCopiedNullifier(true);
      setTimeout(() => setCopiedNullifier(false), 2000);
    } else {
      setCopiedProof(true);
      setTimeout(() => setCopiedProof(false), 2000);
    }
  };

  const totalVotes = proposal.totalVotesCast || 1;
  const yesPct = Math.round((proposal.yesVotes / totalVotes) * 100);
  const noPct = Math.round((proposal.noVotes / totalVotes) * 100);
  const abstainPct = Math.round((proposal.abstainVotes / totalVotes) * 100);

  return (
    <div className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xl text-zinc-900 transition-all duration-300">
      
      {/* Header Banner */}
      <div className="bg-zinc-950 text-white p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700/80 flex items-center space-x-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{proposal.category}</span>
            </span>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-zinc-400">Ledger Status:</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-800/80 shadow-xs">
                {proposal.status}
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {proposal.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-4xl">
            {proposal.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 pt-4 border-t border-zinc-800/80">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Proposal ID</span>
              <span className="text-zinc-200 font-bold">{proposal.id}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Author Identity</span>
              <span className="text-zinc-300">{proposal.creator}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Voting Deadline</span>
              <span className="text-zinc-300 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-zinc-500" />
                <span>{new Date(proposal.endsAt).toLocaleDateString()}</span>
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Verified Ballots Cast</span>
              <span className="text-emerald-400 font-bold text-sm">{proposal.totalVotesCast.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Approval Preview Bar */}
      <div className="bg-zinc-900/95 text-zinc-300 px-6 sm:px-10 py-3 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-4">
          <span className="text-zinc-400 font-bold">Current Standings:</span>
          <span className="text-emerald-400 font-bold">YES: {yesPct}%</span>
          <span className="text-rose-400 font-bold">NO: {noPct}%</span>
          <span className="text-amber-400 font-bold">ABSTAIN: {abstainPct}%</span>
        </div>
        <div className="w-full sm:w-48 bg-zinc-800 h-2 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full" style={{ width: `${yesPct}%` }} />
          <div className="bg-rose-500 h-full" style={{ width: `${noPct}%` }} />
          <div className="bg-amber-500 h-full" style={{ width: `${abstainPct}%` }} />
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-10 space-y-8">

        {/* Step 1: Select Ballot Choice */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">1</span>
            <span className="text-zinc-900 font-extrabold text-sm">Select Your Confidential Vote Choice</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* YES Choice Card */}
            <button
              type="button"
              disabled={isSubmitting || !!receipt}
              onClick={() => {
                setSelectedChoice(VoteChoice.YES);
                setErrorMsg(null);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                selectedChoice === VoteChoice.YES
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-4 ring-emerald-500/10 shadow-md scale-[1.02]'
                  : 'border-zinc-200 hover:border-emerald-400 bg-white text-zinc-800 hover:bg-emerald-50/20'
              } ${isSubmitting || !!receipt ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedChoice === VoteChoice.YES ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  {yesPct}% Support
                </span>
              </div>
              <div>
                <span className="font-extrabold text-base block text-emerald-950">YES / APPROVE</span>
                <span className="text-xs text-zinc-600 font-medium block mt-0.5">Vote in favor of executing this proposal.</span>
              </div>
            </button>

            {/* NO Choice Card */}
            <button
              type="button"
              disabled={isSubmitting || !!receipt}
              onClick={() => {
                setSelectedChoice(VoteChoice.NO);
                setErrorMsg(null);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                selectedChoice === VoteChoice.NO
                  ? 'border-rose-600 bg-rose-50/70 text-rose-950 ring-4 ring-rose-500/10 shadow-md scale-[1.02]'
                  : 'border-zinc-200 hover:border-rose-400 bg-white text-zinc-800 hover:bg-rose-50/20'
              } ${isSubmitting || !!receipt ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedChoice === VoteChoice.NO ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800'}`}>
                  <ThumbsDown className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-md">
                  {noPct}% Reject
                </span>
              </div>
              <div>
                <span className="font-extrabold text-base block text-rose-950">NO / REJECT</span>
                <span className="text-xs text-zinc-600 font-medium block mt-0.5">Vote against executing this proposal.</span>
              </div>
            </button>

            {/* ABSTAIN Choice Card */}
            <button
              type="button"
              disabled={isSubmitting || !!receipt}
              onClick={() => {
                setSelectedChoice(VoteChoice.ABSTAIN);
                setErrorMsg(null);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                selectedChoice === VoteChoice.ABSTAIN
                  ? 'border-amber-600 bg-amber-50/70 text-amber-950 ring-4 ring-amber-500/10 shadow-md scale-[1.02]'
                  : 'border-zinc-200 hover:border-amber-400 bg-white text-zinc-800 hover:bg-amber-50/20'
              } ${isSubmitting || !!receipt ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedChoice === VoteChoice.ABSTAIN ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  <MinusCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
                  {abstainPct}% Abstain
                </span>
              </div>
              <div>
                <span className="font-extrabold text-base block text-amber-950">ABSTAIN</span>
                <span className="text-xs text-zinc-600 font-medium block mt-0.5">Contribute to quorum without casting a directional vote.</span>
              </div>
            </button>

          </div>
        </div>

        {/* Step 2: Private Witness Key Generator */}
        <div className="bg-zinc-50/80 p-6 rounded-2xl border border-zinc-200/90 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
              <Key className="w-4 h-4 text-zinc-900" />
              <span className="text-zinc-900 font-extrabold text-sm">Client-Side Witness Entropy</span>
            </label>

            <button
              type="button"
              disabled={isSubmitting || !!receipt}
              onClick={handleGenerateNewSecret}
              className="text-xs font-mono font-bold text-zinc-900 hover:text-indigo-600 flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs hover:shadow-xs transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-700" />
              <span>Generate Fresh Entropy</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="password"
              readOnly
              value={voterSecret}
              className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 font-mono text-xs text-zinc-900 pr-12 focus:outline-none shadow-2xs"
            />
            <div className="absolute right-3.5 top-3 text-zinc-500" title="100% Client-Side ZK Witness (Never leaves browser memory)">
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600 pt-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>256-bit SHA-256 Entropy Strength Verified</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline">
              Deterministic Nullifier Engine
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block">Vote Submission Prevented</span>
              <span className="mt-0.5 block">{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Real-time Prover Progress Box */}
        {isSubmitting && (
          <div className="bg-zinc-950 text-white p-6 rounded-2xl space-y-4 shadow-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Voxis Cryptographic Proof Engine</span>
              </span>
              <span className="text-emerald-400 font-bold">Phase {stepIndex + 1} / 5</span>
            </div>

            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${((stepIndex + 1) / 5) * 100}%` }}
              />
            </div>

            <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
              <span>{currentStepText}</span>
            </div>
          </div>
        )}

        {/* Verifiable Ballot Receipt */}
        {receipt && (
          <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 border border-emerald-300/80 p-6 sm:p-8 rounded-3xl space-y-6 shadow-md">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-200/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-emerald-950">Ballot Cryptographically Sealed!</h3>
                  <p className="text-xs text-emerald-700 font-mono">Zero-Knowledge Nullifier committed to public ledger</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-mono font-bold shadow-xs">
                CONFIRMED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Disclosed Choice</span>
                <span className="text-emerald-700 font-extrabold text-base block">{receipt.disclosedChoice}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Ledger Block Height</span>
                <span className="text-zinc-950 font-extrabold text-base block">#{receipt.blockNumber}</span>
              </div>

              <div className="md:col-span-2 bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Nullifier Commitment (Prevents Double Voting)</span>
                  <button
                    onClick={() => handleCopyText(receipt.nullifierHash, 'nullifier')}
                    className="text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 font-bold text-[11px]"
                  >
                    {copiedNullifier ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNullifier ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <code className="text-zinc-950 text-[11px] break-all font-bold block bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                  {receipt.nullifierHash}
                </code>
              </div>

              <div className="md:col-span-2 bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Transaction Hash</span>
                  <button
                    onClick={() => handleCopyText(receipt.txHash, 'proof')}
                    className="text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 font-bold text-[11px]"
                  >
                    {copiedProof ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedProof ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <code className="text-zinc-700 text-[11px] break-all block bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 font-mono">
                  {receipt.txHash}
                </code>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onViewTally}
                className="text-xs font-bold text-zinc-950 hover:text-indigo-600 flex items-center space-x-1.5 transition-colors"
              >
                <span>View Public Tally & Analytics</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* Submit Action Button */}
        {!receipt && (
          <button
            type="button"
            disabled={isSubmitting || !selectedChoice}
            onClick={handleCastVote}
            className={`w-full py-4 px-8 rounded-2xl text-sm font-extrabold text-white transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
              isSubmitting || !selectedChoice
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-200 shadow-none'
                : 'bg-zinc-950 hover:bg-zinc-800 shadow-zinc-950/20 active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Generating Cryptographic ZK Proof...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Cast Zero-Knowledge Ballot</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}

      </div>
    </div>
  );
};
