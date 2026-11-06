import React, { useState } from 'react';
import { Bounty, BountyCategory } from '../types';
import { filterBounties } from '../utils/bountyLogic';
import { formatSol, shortenAddress } from '../utils/solana';
import { Search, Plus, ExternalLink, Clock, CheckCircle, ChevronRight, Layers } from 'lucide-react';

interface MarketplaceProps {
  bounties: Bounty[];
  onSelectBounty: (bounty: Bounty) => void;
  onSubmitProof: (bounty: Bounty) => void;
  onOpenCreateModal: () => void;
}

const CATEGORIES: Array<'All' | BountyCategory> = [
  'All',
  'Security & Audit',
  'Blinks & Actions',
  'RPC & Infra',
  'Smart Contracts',
  'AI & Agents',
  'Frontend & Tooling',
];

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const Marketplace: React.FC<MarketplaceProps> = ({
  bounties,
  onSelectBounty,
  onSubmitProof,
  onOpenCreateModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBounties = filterBounties(bounties, {
    category: selectedCategory,
    difficulty: selectedDifficulty,
    searchQuery,
  });

  return (
    <section id="marketplace-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marketplace Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Micro-Bounty Marketplace
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select an open task, solve the technical requirement, and verify on-chain to claim SOL.
            </p>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 active:scale-95 rounded-lg shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Bounty</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, keywords, or tags (e.g. Anchor, Blinks, Geyser)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Difficulty Segmented Selector */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#14F195]/15 text-[#14F195] border border-[#14F195]/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 bg-white/[0.02] border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bounty Cards Grid (Bento Style) */}
        {filteredBounties.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No bounties match your filters</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, changing the category, or clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBounties.map((bounty) => {
              const isClaimed = bounty.status === 'Completed';

              return (
                <div
                  key={bounty.id}
                  className={`relative flex flex-col justify-between p-5 rounded-2xl backdrop-blur-xl bg-white/[0.03] border transition-all duration-200 group hover:border-purple-500/40 hover:bg-white/[0.05] ${
                    isClaimed ? 'border-emerald-500/30' : 'border-white/10'
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata Header (Zero-Pill discipline) */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-purple-400 font-medium">{bounty.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className={
                          bounty.difficulty === 'Advanced' ? 'text-rose-400' :
                          bounty.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-emerald-400'
                        }>
                          {bounty.difficulty}
                        </span>
                      </div>

                      {isClaimed ? (
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{bounty.deadlineDays}d left</span>
                        </div>
                      )}
                    </div>

                    {/* Bounty Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {bounty.title}
                    </h3>

                    {/* Bounty Description */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {bounty.description}
                    </p>

                    {/* Unboxed Tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-slate-500 mb-5">
                      {bounty.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>#{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Reward & Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        Reward Pool
                      </div>
                      <div className="text-lg font-bold font-mono text-[#14F195] tracking-tight">
                        {formatSol(bounty.rewardSol)} <span className="text-xs font-sans text-slate-300 font-normal">SOL</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectBounty(bounty)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="View Full Scope & Requirements"
                      >
                        Specs
                      </button>

                      {!isClaimed ? (
                        <button
                          onClick={() => onSubmitProof(bounty)}
                          className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 active:scale-95 rounded-lg shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <span>Claim SOL</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <a
                          href={`https://explorer.solana.com/tx/${bounty.claimTxHash}?cluster=devnet`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-emerald-400 hover:underline"
                        >
                          <span>TX Hash</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
