import React, { useState } from 'react';
import { ProjectSubmission, WalletState } from '../types';
import { formatSol, shortenAddress, getExplorerTxUrl, getExplorerAddressUrl, executeProofClaimTx } from '../utils/solana';
import { generateSplTokenMint } from '../utils/bountyLogic';
import { Connection } from '@solana/web3.js';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Clock, 
  GitPullRequest, 
  Layers, 
  Award,
  Sparkles,
  ArrowRight,
  Sliders,
  Check
} from 'lucide-react';

interface JudgePortalProps {
  submissions: ProjectSubmission[];
  wallet: WalletState;
  connection: Connection;
  onConnectDemoWallet: () => void;
  onApproveSubmission: (submissionId: string, txHash: string, splMint: string) => void;
  onRejectSubmission: (submissionId: string) => void;
  onToggleAutoConfirm: () => void;
}

export const JudgePortal: React.FC<JudgePortalProps> = ({
  submissions,
  wallet,
  connection,
  onConnectDemoWallet,
  onApproveSubmission,
  onRejectSubmission,
  onToggleAutoConfirm,
}) => {
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const pendingCount = submissions.filter(s => s.status === 'pending_review').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const totalApprovedSol = submissions
    .filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + s.solReward, 0);

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'pending') return s.status === 'pending_review';
    if (filter === 'approved') return s.status === 'approved';
    return true;
  });

  const handleApprove = async (sub: ProjectSubmission) => {
    if (!wallet.connected || !wallet.publicKeyObj) {
      onConnectDemoWallet();
      return;
    }

    try {
      setApprovingId(sub.id);

      // Execute on-chain Solana Devnet transaction
      const result = await executeProofClaimTx({
        connection,
        senderPubKey: wallet.publicKeyObj,
        keypair: wallet.keypairObj,
        phantomWallet: typeof window !== 'undefined' ? (window as any).solana : null,
        bountyId: sub.bountyId,
        rewardSol: sub.solReward,
      });

      // Generate or reuse real Devnet SPL Token Mint
      const splMint = sub.splTokenMint || generateSplTokenMint();

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#14F195', '#9945FF', '#38BDF8'],
        });
      } catch {
        // ignore
      }

      onApproveSubmission(sub.id, result.signature, splMint);
    } catch (err) {
      console.error('Failed to approve submission on-chain:', err);
    } finally {
      setApprovingId(null);
    }
  };

  const handleBatchApprove = async () => {
    const pendings = submissions.filter(s => s.status === 'pending_review');
    for (const sub of pendings) {
      await handleApprove(sub);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Auto-Confirm Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>Judge Evaluation Dashboard</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>1-Click Payout Protocol</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Zero-Friction Settlement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              1-Click Judge Review &amp; Settlement
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Eliminate disjointed spreadsheets and manual wallet transfers. Review submitted GitHub PRs, verify technical requirements, and trigger instant SOL payouts plus SPL Proof-of-Skill token minting.
            </p>
          </div>

          {/* 1-Click Judge Wallet Auto-Confirm Toggle (PPT Slide 5) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#13192B] to-[#0D101A] border border-purple-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${wallet.autoConfirmEnabled ? 'bg-emerald-500/20 text-[#14F195]' : 'bg-purple-500/20 text-purple-300'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">1-Click Auto-Confirm</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    wallet.autoConfirmEnabled 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-white/10 text-slate-400'
                  }`}>
                    {wallet.autoConfirmEnabled ? 'Active (50+ TXs)' : 'Manual Popups'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phantom Injected Provider hook for frictionless batch approvals.
                </p>
              </div>
            </div>

            <button
              onClick={onToggleAutoConfirm}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                wallet.autoConfirmEnabled
                  ? 'bg-[#14F195] text-slate-900 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
              }`}
            >
              {wallet.autoConfirmEnabled ? 'Disable Auto-Confirm' : 'Enable 1-Click Approval'}
            </button>
          </div>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Pending Reviews</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {pendingCount} <span className="text-xs text-amber-400 font-sans">Projects</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Awaiting 1-click payout</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Projects Approved</span>
              <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#14F195] tabular-nums">
              {approvedCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Settled on Devnet</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Disbursed by Judge</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {formatSol(totalApprovedSol)} <span className="text-xs text-purple-400 font-sans">SOL</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">+ SPL Proof tokens minted</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Admin Time Saved</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
              ~{Math.max(3, approvedCount * 3)} <span className="text-xs text-slate-400 font-sans">Mins</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">3 mins saved per project</div>
          </div>
        </div>

        {/* Filter controls and Batch Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Submissions ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'pending' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'approved' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Approved ({approvedCount})
            </button>
          </div>

          {pendingCount > 0 && (
            <button
              onClick={handleBatchApprove}
              disabled={approvingId !== null}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#14F195] to-[#14F195]/90 hover:brightness-110 active:scale-95 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>1-Click Batch Approve All ({pendingCount} Projects)</span>
            </button>
          )}
        </div>

        {/* Submissions Cards List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No submissions in this filter</h3>
              <p className="text-xs text-slate-400 mt-1">
                Submissions from hackathon developers will appear here for judge evaluation.
              </p>
            </div>
          ) : (
            filteredSubmissions.map((sub) => {
              const isApproved = sub.status === 'approved';
              const isProcessing = approvingId === sub.id;

              return (
                <div
                  key={sub.id}
                  className={`p-5 rounded-2xl backdrop-blur-xl bg-white/[0.03] border transition-all ${
                    isApproved
                      ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                      : 'border-white/10 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mb-2 font-mono">
                        <span className="text-purple-400 font-semibold">{sub.teamName}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <a
                          href={getExplorerAddressUrl(sub.builderAddress)}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white hover:underline transition-colors"
                          title="Inspect builder wallet on Solana Explorer"
                        >
                          {shortenAddress(sub.builderAddress, 4)} ↗
                        </a>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
                          <span>Commit {sub.commitHash}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-500">{sub.submittedAt}</span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 leading-snug">
                        {sub.bountyTitle}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-3">
                        {sub.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        <a
                          href={sub.githubPrUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Verified GitHub PR ↗</span>
                        </a>

                        {sub.splTokenMint && (
                          <a
                            href={getExplorerAddressUrl(sub.splTokenMint)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>SPL Mint: {shortenAddress(sub.splTokenMint, 5)} ↗</span>
                          </a>
                        )}

                        {sub.payoutTxHash && (
                          <a
                            href={getExplorerTxUrl(sub.payoutTxHash)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[#14F195] hover:underline"
                          >
                            <span>Solana TX: {shortenAddress(sub.payoutTxHash, 4)} ↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Reward & 1-Click Action */}
                    <div className="flex items-center lg:flex-col lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
                      <div className="text-left lg:text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Bounty Payout</div>
                        <div className="text-xl font-bold font-mono text-[#14F195]">
                          {formatSol(sub.solReward)} <span className="text-xs text-slate-300 font-sans font-normal">SOL</span>
                        </div>
                      </div>

                      <div>
                        {isApproved ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium font-mono">
                            <Check className="w-4 h-4" />
                            <span>Paid &amp; Minted</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onRejectSubmission(sub.id)}
                              disabled={isProcessing}
                              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                            >
                              Request Revisions
                            </button>

                            <button
                              onClick={() => handleApprove(sub)}
                              disabled={isProcessing}
                              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#14F195] to-[#14F195]/90 hover:brightness-110 active:scale-95 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
                            >
                              {isProcessing ? (
                                <span>Broadcasting...</span>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>1-Click Approve</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
