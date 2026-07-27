import React, { useState } from 'react';
import { Terminal, Copy, Check, Edit3, ShieldAlert, Zap, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { MidnightService } from '../services/midnightService';

interface ContractBannerProps {
  onContractAddressUpdated: () => void;
  onOpenDeployGuide: () => void;
}

export const ContractBanner: React.FC<ContractBannerProps> = ({
  onContractAddressUpdated,
  onOpenDeployGuide
}) => {
  const currentAddress = MidnightService.getContractAddress();
  const isDeployed = MidnightService.isContractDeployed();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputAddress, setInputAddress] = useState(
    currentAddress === '<YOUR_DEPLOYED_CONTRACT_ADDRESS>' ? '' : currentAddress
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNew = () => {
    const newAddr = MidnightService.generateAndSaveNewContractAddress();
    setInputAddress(newAddr);
    setIsEditing(false);
    onContractAddressUpdated();
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAddress.trim()) {
      MidnightService.setContractAddress(inputAddress.trim());
    } else {
      MidnightService.setContractAddress('<YOUR_DEPLOYED_CONTRACT_ADDRESS>');
    }
    setIsEditing(false);
    onContractAddressUpdated();
  };

  return (
    <div className="bg-zinc-100 border-b border-zinc-200/80 py-2.5 px-4 sm:px-6 text-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Left Side: Status & Contract Name */}
        <div className="flex items-center space-x-3">
          <div className={`p-1.5 rounded-lg ${
            isDeployed ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
          }`}>
            {isDeployed ? <Zap className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Ledger Contract:
              </span>
              <span className="font-mono text-xs font-bold text-zinc-950 bg-white px-2 py-0.5 rounded border border-zinc-300">
                voxis.voting.v2
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDeployed 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {isDeployed ? 'Active on Preprod' : 'Pending Deployment'}
              </span>
            </div>

            {/* Address Display or Input Form */}
            {isEditing ? (
              <form onSubmit={handleSaveAddress} className="mt-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                  placeholder="Paste deployed contract address (e.g. 0x0200a789...)"
                  className="bg-white border border-zinc-300 rounded px-2.5 py-1 text-xs font-mono text-zinc-900 w-72 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-zinc-950 hover:bg-zinc-800 text-white px-2.5 py-1 rounded text-xs font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 px-2.5 py-1 rounded text-xs"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-xs text-zinc-500 font-mono">Address:</span>
                <code className="text-xs font-mono font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                  {currentAddress}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-1 text-zinc-500 hover:text-zinc-900 transition-colors"
                  title="Copy contract address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-zinc-700 hover:text-zinc-950 transition-colors text-xs flex items-center space-x-1"
                  title="Update address"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] font-medium">Edit Address</span>
                </button>
                <button
                  onClick={handleGenerateNew}
                  className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded text-xs font-bold flex items-center space-x-1 transition-all"
                  title="Generate new ZK contract address"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span className="text-[11px]">Generate New</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Manual Deployment Command Preview */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden lg:flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-zinc-200 text-xs font-mono text-zinc-800 shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-500">Deploy CLI:</span>
            <span className="text-zinc-950 font-bold">npm run deploy</span>
          </div>

          <button
            onClick={onOpenDeployGuide}
            className="flex items-center space-x-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-nowrap shadow-xs"
          >
            <span>Deployment Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
