import React, { useState } from 'react';
import { Proposal } from '../types/voting';
import { 
  Vote, 
  Plus, 
  Search, 
  Clock, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  MinusCircle,
  TrendingUp
} from 'lucide-react';

interface ProposalListProps {
  proposals: Proposal[];
  onSelectProposalToVote: (prop: Proposal) => void;
  onOpenCreateModal: () => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  onSelectProposalToVote,
  onOpenCreateModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'CONCLUDED'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['ALL', ...Array.from(new Set(proposals.map(p => p.category)))];

  return (
    <div className="space-y-6 text-zinc-900">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950 flex items-center space-x-2">
            <span>Governance Proposals</span>
            <span className="text-xs font-mono font-bold bg-zinc-900 text-white px-2.5 py-0.5 rounded-full">
              {proposals.length} Total
            </span>
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Participate in organization decisions with zero-knowledge cryptographic ballots.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center space-x-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-zinc-950/10 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Create New Proposal</span>
        </button>
      </div>

      {/* Search & Filtering Controls */}
      <div className="bg-white border border-zinc-200/90 p-4 rounded-3xl shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search proposals by title, description, or ID..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 font-medium"
            />
          </div>

          {/* Status Pills & View Switcher */}
          <div className="flex items-center space-x-2 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Status Selector */}
            <div className="flex items-center space-x-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-bold">
              {(['ALL', 'ACTIVE', 'CONCLUDED'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? 'bg-zinc-950 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center space-x-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'grid' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'list' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pt-2 border-t border-zinc-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-50 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Proposals Grid / List Display */}
      {filteredProposals.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center text-zinc-500 space-y-3 shadow-xs">
          <Search className="w-8 h-8 text-zinc-400 mx-auto" />
          <p className="text-sm font-bold text-zinc-800">No proposals matching your filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('ALL');
              setStatusFilter('ALL');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
          {filteredProposals.map((proposal) => {
            const total = proposal.totalVotesCast || 1;
            const yesPct = Math.round((proposal.yesVotes / total) * 100);
            const noPct = Math.round((proposal.noVotes / total) * 100);
            const abstainPct = Math.round((proposal.abstainVotes / total) * 100);

            return (
              <div
                key={proposal.id}
                className="bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-3xl p-6 transition-all duration-200 shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200/80">
                      {proposal.category}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                      proposal.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 leading-snug hover:text-indigo-600 transition-colors">
                      {proposal.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed line-clamp-2 font-normal">
                      {proposal.description}
                    </p>
                  </div>

                </div>

                {/* Progress Breakdown */}
                <div className="space-y-3 pt-3 border-t border-zinc-100">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
                    <span>Approval: <strong className="text-emerald-700">{yesPct}%</strong></span>
                    <span>Ballots: <strong className="text-zinc-950">{proposal.totalVotesCast}</strong></span>
                  </div>

                  <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200 flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${yesPct}%` }} />
                    <div className="bg-rose-500 h-full" style={{ width: `${noPct}%` }} />
                    <div className="bg-amber-500 h-full" style={{ width: `${abstainPct}%` }} />
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Ends: {new Date(proposal.endsAt).toLocaleDateString()}</span>
                    </div>

                    <button
                      onClick={() => onSelectProposalToVote(proposal)}
                      className="flex items-center space-x-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      <Vote className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Cast ZK Ballot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
