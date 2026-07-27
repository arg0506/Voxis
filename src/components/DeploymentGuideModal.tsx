import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, Copy, Check, Rocket, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { MidnightService } from '../services/midnightService';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSaved: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
  onAddressSaved
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const currentAddress = MidnightService.getContractAddress();
  const [addressInput, setAddressInput] = useState(
    currentAddress === '<YOUR_DEPLOYED_CONTRACT_ADDRESS>' ? '' : currentAddress
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleGenerateAndSave = () => {
    const newAddr = MidnightService.generateAndSaveNewContractAddress();
    setAddressInput(newAddr);
    onAddressSaved();
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      MidnightService.setContractAddress(addressInput.trim());
      onAddressSaved();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs"
          />

          {/* Animated Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-900 max-h-[90vh] overflow-y-auto"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
                  <Rocket className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-zinc-950">Contract Deployment Guide</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Voxis is fully functional in browser simulation mode. If you are deploying the smart contract on-chain, follow the steps below and supply the target contract address.
            </p>

            {/* Step-by-Step CLI Box */}
            <div className="space-y-4 font-mono text-xs">
              
              {/* Step 1: Proof Server */}
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-zinc-900 font-bold">
                  <span>1. Run Local Proof Server (Port 6300)</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-zinc-900 font-medium">
                  <code>docker run -p 6300:6300 midnightnetwork/proof-server</code>
                  <button
                    onClick={() => copyToClipboard('docker run -p 6300:6300 midnightnetwork/proof-server', 'docker')}
                    className="text-zinc-400 hover:text-zinc-900 cursor-pointer"
                  >
                    {copiedCmd === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 2: Compile Compact */}
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-zinc-900 font-bold">
                  <span>2. Compile Compact Smart Contract (`voting.compact`)</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-zinc-900 font-medium">
                  <code>npm run compact</code>
                  <button
                    onClick={() => copyToClipboard('npm run compact', 'compact')}
                    className="text-zinc-400 hover:text-zinc-900 cursor-pointer"
                  >
                    {copiedCmd === 'compact' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 3: Deploy Command */}
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-zinc-900 font-bold">
                  <span>3. Deploy to Testnet</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-zinc-900 font-medium">
                  <code>NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod</code>
                  <button
                    onClick={() => copyToClipboard('NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod', 'deploy')}
                    className="text-zinc-400 hover:text-zinc-900 cursor-pointer"
                  >
                    {copiedCmd === 'deploy' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Backfill Address Input */}
            <form onSubmit={handleSaveAddress} className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-zinc-900">
                4. Backfill Deployed Contract Address
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Paste deployed address here (e.g. 0x0200a789...)"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="submit"
                    className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateAndSave}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 font-normal">
                Updates contract binding in local environment variables and persistent state.
              </p>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

