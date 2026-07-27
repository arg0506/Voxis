import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { Proposal } from '../types/voting';
import { MidnightService } from '../services/midnightService';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProposalCreated: (newProp: Proposal) => void;
}

export const CreateProposalModal: React.FC<CreateProposalModalProps> = ({
  isOpen,
  onClose,
  onProposalCreated
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Protocol Upgrade');
  const [daysActive, setDaysActive] = useState('14');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 5) {
      setErrorMsg('Please enter a descriptive proposal title (at least 5 characters).');
      return;
    }
    if (!description.trim() || description.length < 15) {
      setErrorMsg('Please enter a detailed description explaining the proposal rationale.');
      return;
    }

    const created = MidnightService.createProposal({
      title: title.trim(),
      description: description.trim(),
      category,
      creator: 'voxis1q84z9x7...v92k',
      endsAt: new Date(Date.now() + Number(daysActive) * 86400000).toISOString()
    });

    onProposalCreated(created);
    setTitle('');
    setDescription('');
    setErrorMsg(null);
    onClose();
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

          {/* Animated Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white border border-zinc-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-900 overflow-hidden"
          >
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-zinc-950">Create Voxis Proposal</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Proposal Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. VIP-2027: Enable Shielded Voting for Grant Disbursals"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  >
                    <option value="Protocol Upgrade">Protocol Upgrade</option>
                    <option value="Treasury & Grants">Treasury & Grants</option>
                    <option value="Security Council">Security Council</option>
                    <option value="Ecosystem Grant">Ecosystem Grant</option>
                    <option value="Governance & Staking">Governance & Staking</option>
                    <option value="Community & Events">Community & Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                    Voting Period (Days)
                  </label>
                  <select
                    value={daysActive}
                    onChange={(e) => setDaysActive(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  >
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Proposal Rationale &amp; Details
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the background, technical specification, and impact of this proposal..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-extrabold transition-all shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Publish Proposal</span>
                </button>
              </div>

            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
