import React, { useState } from 'react';
import { VoteReceipt } from '../types/voting';
import { ShieldCheck, CheckCircle2, Copy, Check, Clock, Search, Hash } from 'lucide-react';

interface AuditLogProps {
  receipts: VoteReceipt[];
}

export const AuditLog: React.FC<AuditLogProps> = ({ receipts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredReceipts = receipts.filter(r => 
    r.nullifierHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.disclosedChoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6 text-zinc-900 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-extrabold text-zinc-950">Voxis Cryptographic Audit Trail</h3>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-medium">
            Verifiable record of nullifier commitments and disclosed ballot choices on the immutable governance ledger.
          </p>
        </div>

        <span className="text-xs font-mono px-3.5 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-2xl font-bold self-start sm:self-auto">
          {receipts.length} Recorded Receipts
        </span>
      </div>

      {/* Search Filter */}
      {receipts.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by nullifier, tx hash, choice or proposal ID..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-10 pr-4 py-2 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>
      )}

      {/* Audit Trail List */}
      {receipts.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 text-xs font-medium space-y-2">
          <Hash className="w-8 h-8 text-zinc-300 mx-auto" />
          <p className="font-bold text-zinc-700">No ballot receipts recorded yet.</p>
          <p className="text-zinc-500">Cast a vote on any active proposal to generate a cryptographic ZK proof audit entry.</p>
        </div>
      ) : filteredReceipts.length === 0 ? (
        <div className="p-8 text-center text-zinc-500 text-xs font-medium">
          No audit entries matching search query.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReceipts.map((receipt, i) => (
            <div
              key={i}
              className="bg-zinc-50/90 border border-zinc-200/90 rounded-2xl p-5 space-y-3 hover:border-zinc-400 transition-all text-xs font-mono shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 text-xs">
                    CHOICE: {receipt.disclosedChoice}
                  </span>
                  <span className="text-zinc-500 text-[11px] font-bold">
                    Block #{receipt.blockNumber}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{new Date(receipt.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-500 text-[10px] font-bold uppercase">Nullifier Commitment (Prevents Double Voting)</span>
                    <button
                      onClick={() => handleCopy(receipt.nullifierHash, `null-${i}`)}
                      className="text-zinc-600 hover:text-zinc-950 flex items-center space-x-1 text-[10px]"
                    >
                      {copiedId === `null-${i}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `null-${i}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-zinc-950 text-[11px] break-all block bg-white p-2.5 rounded-xl border border-zinc-200 font-bold">
                    {receipt.nullifierHash}
                  </code>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-500 text-[10px] font-bold uppercase">Transaction Hash</span>
                    <button
                      onClick={() => handleCopy(receipt.txHash, `tx-${i}`)}
                      className="text-zinc-600 hover:text-zinc-950 flex items-center space-x-1 text-[10px]"
                    >
                      {copiedId === `tx-${i}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `tx-${i}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-zinc-800 text-[11px] break-all block bg-white p-2.5 rounded-xl border border-zinc-200 font-medium">
                    {receipt.txHash}
                  </code>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-600 border-t border-zinc-200/60">
                <div className="flex items-center space-x-2 flex-wrap">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold text-emerald-900">ZK SNARK Proof Verified On-Chain</span>
                  </div>
                  {receipt.walletType && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-zinc-200 text-zinc-800 uppercase">
                      Wallet: {receipt.walletType}
                    </span>
                  )}
                </div>

                <span className="text-zinc-500 text-[10px] font-bold">
                  Proposal: {receipt.proposalId}
                </span>
              </div>

              {receipt.signature && (
                <div className="pt-2 border-t border-dashed border-zinc-200 text-[10px]">
                  <div className="flex items-center justify-between text-zinc-500 mb-1">
                    <span className="font-bold uppercase text-emerald-800">Actual Wallet Signature ({receipt.walletType || 'Web3'})</span>
                    {receipt.signerAddress && (
                      <span className="font-mono text-zinc-600">Signer: {receipt.signerAddress.substring(0, 8)}...{receipt.signerAddress.substring(receipt.signerAddress.length - 6)}</span>
                    )}
                  </div>
                  <code className="text-zinc-700 text-[10px] break-all block bg-emerald-50/50 p-2 rounded-lg border border-emerald-200/60 font-mono">
                    {receipt.signature}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
