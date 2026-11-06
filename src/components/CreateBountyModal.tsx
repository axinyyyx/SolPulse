import React, { useState } from 'react';
import { Bounty, BountyCategory, BountyDifficulty, WalletState } from '../types';
import { generateSplTokenMint } from '../utils/bountyLogic';
import { X, Plus, AlertCircle, Sparkles } from 'lucide-react';

interface CreateBountyModalProps {
  isOpen: boolean;
  wallet: WalletState;
  onClose: () => void;
  onCreateBounty: (bounty: Bounty) => void;
}

const CATEGORIES: BountyCategory[] = [
  'Security & Audit',
  'Blinks & Actions',
  'RPC & Infra',
  'Smart Contracts',
  'AI & Agents',
  'Frontend & Tooling',
];

const DIFFICULTIES: BountyDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const CreateBountyModal: React.FC<CreateBountyModalProps> = ({
  isOpen,
  wallet,
  onClose,
  onCreateBounty,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BountyCategory>('Smart Contracts');
  const [rewardSol, setRewardSol] = useState('0.25');
  const [difficulty, setDifficulty] = useState<BountyDifficulty>('Intermediate');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const rewardNum = parseFloat(rewardSol);
    if (isNaN(rewardNum) || rewardNum <= 0) {
      setError('Reward must be a positive number in SOL.');
      return;
    }

    if (!title.trim() || title.length < 5) {
      setError('Title must be at least 5 characters.');
      return;
    }

    if (!description.trim() || description.length < 15) {
      setError('Description must be at least 15 characters.');
      return;
    }

    const requirements = requirementsText
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);

    const newBounty: Bounty = {
      id: `bounty-${Date.now()}`,
      title: title.trim(),
      category,
      rewardSol: rewardNum,
      difficulty,
      status: 'Open',
      description: description.trim(),
      requirements: requirements.length > 0 ? requirements : ['Deliver working, tested implementation', 'Provide documentation in README'],
      deliverables: deliverables.trim() || 'GitHub repository or PR link with test suite.',
      creatorAddress: wallet.address || 'BhXaWsyfVcfJRdpuBQ53scQfoyCuAvnRzM78eaAf2iAt',
      createdAt: new Date().toISOString().slice(0, 10),
      deadlineDays: 7,
      tags: tags.length > 0 ? tags : ['Solana', category.split(' ')[0]],
      submissionsCount: 0,
      splTokenMint: generateSplTokenMint(),
    };

    onCreateBounty(newBounty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D1017] border border-white/15 shadow-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-1">
              Decentralized Marketplace Post
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Post a Solana Micro-Bounty</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close post modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Bounty Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement Zero-Knowledge proof verification in Anchor program"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BountyCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/60"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Reward in SOL <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={rewardSol}
                onChange={(e) => setRewardSol(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#14F195] font-mono text-sm font-semibold focus:outline-none focus:border-purple-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as BountyDifficulty)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/60"
              >
                {DIFFICULTIES.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Task Description &amp; Scope <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detailed description of the bug, feature, or optimization needed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500/60 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Technical Requirements (1 per line)
            </label>
            <textarea
              rows={3}
              placeholder="Anchor test suite passes&#10;Compute units under 20k&#10;Zero safety warnings"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500/60 font-mono resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Deliverables Expected
              </label>
              <input
                type="text"
                placeholder="e.g. GitHub PR with unit tests"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="Anchor, Rust, Blinks"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-purple-500/60"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 active:scale-95 rounded-xl shadow-lg shadow-purple-600/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Bounty</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
