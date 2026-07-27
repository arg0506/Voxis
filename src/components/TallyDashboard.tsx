import React from 'react';
import { Proposal } from '../types/voting';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ShieldCheck, BarChart3, PieChart as PieIcon, Users, CheckCircle, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';

interface TallyDashboardProps {
  proposal: Proposal;
  allProposals: Proposal[];
  onSelectProposal: (prop: Proposal) => void;
}

export const TallyDashboard: React.FC<TallyDashboardProps> = ({
  proposal,
  allProposals,
  onSelectProposal
}) => {
  const total = proposal.totalVotesCast || 1;
  const yesPct = Math.round((proposal.yesVotes / total) * 100);
  const noPct = Math.round((proposal.noVotes / total) * 100);
  const abstainPct = Math.round((proposal.abstainVotes / total) * 100);

  const chartData = [
    { name: 'YES / FOR', votes: proposal.yesVotes, color: '#10b981' },
    { name: 'NO / AGAINST', votes: proposal.noVotes, color: '#f43f5e' },
    { name: 'ABSTAIN', votes: proposal.abstainVotes, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 text-zinc-900">
      
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-zinc-200 p-5 rounded-3xl shadow-xs">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Public Auditable Ledger
          </span>
          <h2 className="text-xl font-extrabold text-zinc-950 mt-1">
            {proposal.title}
          </h2>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Select Poll:</span>
          <select
            value={proposal.id}
            onChange={(e) => {
              const selected = allProposals.find(p => p.id === e.target.value);
              if (selected) onSelectProposal(selected);
            }}
            className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          >
            {allProposals.map(p => (
              <option key={p.id} value={p.id}>
                {p.title.length > 40 ? p.title.substring(0, 40) + '...' : p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-zinc-200/90 p-5 rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Ballots Cast</span>
            <Users className="w-4 h-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-zinc-950 pt-1">
            {proposal.totalVotesCast.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-mono font-bold flex items-center space-x-1">
            <span>✓ 100% Verified ZK Nullifiers</span>
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 p-5 rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <span>YES / Approval Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 pt-1">
            {yesPct}%
          </div>
          <p className="text-[11px] text-zinc-500 font-mono font-medium">
            {proposal.yesVotes.toLocaleString()} votes cast
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 p-5 rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <span>NO / Rejection Rate</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-600 pt-1">
            {noPct}%
          </div>
          <p className="text-[11px] text-zinc-500 font-mono font-medium">
            {proposal.noVotes.toLocaleString()} votes cast
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 p-5 rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <span>ZK Prover Circuit</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-sm font-extrabold text-zinc-950 pt-2 font-mono">
            voxis.voting.v2
          </div>
          <p className="text-[11px] text-emerald-700 font-mono font-bold">
            Zero Identity Leakage
          </p>
        </div>

      </div>

      {/* Charts Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Progress Bars & Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="border-b border-zinc-100 pb-4">
            <h3 className="text-base font-extrabold text-zinc-950">Ballot Breakdown & Proportional Standings</h3>
            <p className="text-xs text-zinc-500">Real-time aggregate votes recorded on the Voxis ledger.</p>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            
            {/* YES */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-emerald-700">YES / APPROVE ({proposal.yesVotes} votes)</span>
                <span className="text-emerald-700">{yesPct}%</span>
              </div>
              <div className="w-full bg-zinc-100 h-4 rounded-full overflow-hidden border border-zinc-200/80 p-0.5">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${yesPct}%` }}
                />
              </div>
            </div>

            {/* NO */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-rose-700">NO / REJECT ({proposal.noVotes} votes)</span>
                <span className="text-rose-700">{noPct}%</span>
              </div>
              <div className="w-full bg-zinc-100 h-4 rounded-full overflow-hidden border border-zinc-200/80 p-0.5">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${noPct}%` }}
                />
              </div>
            </div>

            {/* ABSTAIN */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-amber-700">ABSTAIN ({proposal.abstainVotes} votes)</span>
                <span className="text-amber-700">{abstainPct}%</span>
              </div>
              <div className="w-full bg-zinc-100 h-4 rounded-full overflow-hidden border border-zinc-200/80 p-0.5">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${abstainPct}%` }}
                />
              </div>
            </div>

          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-zinc-900" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Vote Comparison Bar Graph
              </h4>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '16px', fontSize: '12px', color: '#ffffff' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Col: Pie Chart & Verification Notice */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
          
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <PieIcon className="w-4 h-4 text-zinc-900" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Proportional Distribution
              </h4>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="votes"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '16px', fontSize: '12px', color: '#ffffff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Mathematical Proof Guarantee</span>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
              Every vote incrementing these counts was validated by the Voxis Proof Engine through recursive zero-knowledge SNARK proofs. No voter credentials or wallet addresses are disclosed.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
