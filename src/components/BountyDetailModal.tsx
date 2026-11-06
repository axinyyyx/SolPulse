import React from 'react';
import { Bounty } from '../types';
import { formatSol, shortenAddress, getExplorerAddressUrl } from '../utils/solana';
import { X, CheckSquare, ExternalLink, Calendar, Users, Award, ChevronRight } from 'lucide-react';

interface BountyDetailModalProps {
  bounty: Bounty | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (bounty: Bounty) => void;
}

export const BountyDetailModal: React.FC<BountyDetailModalProps> = ({
  bounty,
  isOpen,
  onClose,
  onClaim,
}) => {
  if (!isOpen || !bounty) return null;

  const isClaimed = bounty.status === 'Completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D1017] border border-white/15 shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <span>{bounty.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className={
                bounty.difficulty === 'Advanced' ? 'text-rose-400' :
                bounty.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-emerald-400'
              }>
                {bounty.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {bounty.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reward & Metadata strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Reward</div>
            <div className="text-base font-bold font-mono text-[#14F195] mt-0.5">
              {formatSol(bounty.rewardSol)} SOL
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Status</div>
            <div className={`text-xs font-semibold mt-1 ${isClaimed ? 'text-emerald-400' : 'text-purple-400'}`}>
              {bounty.status}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Submissions</div>
            <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{bounty.submissionsCount} Builders</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Created</div>
            <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{bounty.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Overview &amp; Scope
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
            {bounty.description}
          </p>
        </div>

        {/* Technical Requirements Checklist */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Technical Requirements
          </h4>
          <div className="space-y-2">
            {bounty.requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Required Deliverables
          </h4>
          <p className="text-xs text-slate-300 bg-white/[0.02] p-3 rounded-lg border border-white/5">
            {bounty.deliverables}
          </p>
        </div>

        {/* Creator & Explorer Info */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5 mb-6">
          <div className="flex items-center gap-1.5">
            <span>Creator:</span>
            <span className="font-mono text-slate-300">{shortenAddress(bounty.creatorAddress)}</span>
          </div>
          <a
            href={getExplorerAddressUrl(bounty.creatorAddress)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-purple-400 hover:underline font-mono"
          >
            <span>View Creator</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          {!isClaimed ? (
            <button
              onClick={() => {
                onClose();
                onClaim(bounty);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 active:scale-95 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Submit Proof &amp; Claim</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <Award className="w-4 h-4" />
              <span>Claimed &amp; Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
