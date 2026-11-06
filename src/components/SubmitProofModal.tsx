import React, { useState } from 'react';
import { Bounty, WalletState } from '../types';
import { isValidUrl } from '../utils/bountyLogic';
import { executeProofClaimTx, formatSol } from '../utils/solana';
import { Connection } from '@solana/web3.js';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ExternalLink, ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface SubmitProofModalProps {
  bounty: Bounty | null;
  wallet: WalletState;
  connection: Connection;
  isOpen: boolean;
  onClose: () => void;
  onConnectDemoWallet: () => void;
  onProofSuccess: (bountyId: string, txSignature: string, githubUrl: string, notes: string) => void;
}

export const SubmitProofModal: React.FC<SubmitProofModalProps> = ({
  bounty,
  wallet,
  connection,
  isOpen,
  onClose,
  onConnectDemoWallet,
  onProofSuccess,
}) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedTx, setConfirmedTx] = useState<{ signature: string; isSimulated: boolean } | null>(null);

  if (!isOpen || !bounty) return null;

  const handleClose = () => {
    setGithubUrl('');
    setNotes('');
    setError(null);
    setConfirmedTx(null);
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!wallet.connected || !wallet.publicKeyObj) {
      setError('Please connect your Solana wallet or Quick Demo Wallet first.');
      return;
    }

    if (!githubUrl.trim()) {
      setError('Please provide a repository, PR, or deployment URL.');
      return;
    }

    if (!isValidUrl(githubUrl.trim())) {
      setError('Please enter a valid HTTP or HTTPS URL (e.g. https://github.com/...)');
      return;
    }

    try {
      setSubmitting(true);

      // Execute on-chain transaction
      const result = await executeProofClaimTx({
        connection,
        senderPubKey: wallet.publicKeyObj,
        keypair: wallet.keypairObj,
        phantomWallet: typeof window !== 'undefined' ? (window as any).solana : null,
        bountyId: bounty.id,
        rewardSol: bounty.rewardSol,
      });

      setConfirmedTx(result);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9945FF', '#14F195', '#00C2FF', '#FFFFFF'],
        });
      } catch (confettiErr) {
        console.warn('Confetti animation skipped', confettiErr);
      }

      onProofSuccess(bounty.id, result.signature, githubUrl.trim(), notes.trim());
    } catch (err: any) {
      console.error('Failed to claim bounty on-chain:', err);
      setError(err?.message || 'Transaction failed. Try using Quick Demo Wallet or Fallback Mode.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1017] border border-white/15 shadow-2xl p-6 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <span>On-Chain Verification Protocol</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Reward: {formatSol(bounty.rewardSol)} SOL</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Submit Work &amp; Claim Bounty
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State View */}
        {confirmedTx ? (
          <div className="py-4 text-center relative z-10 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[#14F195] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-white mb-2">
              Proof Verified On-Chain!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-5 leading-relaxed">
              Your cryptographic proof has been recorded on Solana Devnet. The bounty reward of{' '}
              <span className="font-mono font-bold text-[#14F195]">{formatSol(bounty.rewardSol)} SOL</span>{' '}
              has been credited to your Builder Passport.
            </p>

            <div className="bg-black/50 border border-white/10 rounded-xl p-3 mb-6 text-left">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span>Transaction Signature</span>
                <span className="text-emerald-400">Devnet Confirmed</span>
              </div>
              <div className="font-mono text-xs text-purple-300 break-all select-all bg-white/[0.03] p-2 rounded border border-white/5">
                {confirmedTx.signature}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://explorer.solana.com/tx/${confirmedTx.signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>View on Solana Explorer</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Target Bounty Card Snippet */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[11px] text-slate-400">Target Bounty</div>
              <div className="text-sm font-semibold text-white truncate mt-0.5">{bounty.title}</div>
            </div>

            {/* Wallet Status Warning */}
            {!wallet.connected && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-purple-200">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Wallet not connected. Connect to broadcast real devnet transaction.</span>
                </div>
                <button
                  type="button"
                  onClick={onConnectDemoWallet}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 rounded-md shrink-0 cursor-pointer"
                >
                  ⚡ Connect Demo
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Work URL (GitHub Repo / PR / Deployment) <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/solana-bounty-solution"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Proof Notes / Execution Details (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of how requirements were met, test coverage, and benchmark results..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 transition-colors resize-none"
              />
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
                onClick={handleClose}
                disabled={submitting}
                className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#14F195] to-[#14F195]/90 hover:brightness-110 active:scale-95 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Broadcasting On-Chain...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Execute On-Chain TX</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
