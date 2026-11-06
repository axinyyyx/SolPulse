import React, { useState } from 'react';
import { BuilderProfile, WalletState } from '../types';
import { formatSol, shortenAddress, getExplorerTxUrl } from '../utils/solana';
import { calculateBuilderLevel } from '../utils/bountyLogic';
import { ShieldCheck, Award, ExternalLink, Share2, Copy, Check, Zap, Flame, Terminal, Sparkles } from 'lucide-react';

interface BuilderPassportViewProps {
  wallet: WalletState;
  builderProfile: BuilderProfile;
  onConnectDemoWallet: () => void;
}

export const BuilderPassportView: React.FC<BuilderPassportViewProps> = ({
  wallet,
  builderProfile,
  onConnectDemoWallet,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const levelInfo = calculateBuilderLevel(
    builderProfile.totalEarnedSol,
    builderProfile.completedBountiesCount
  );

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <span>Proof-of-Skill Protocol</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Soulbound Credential</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Solana Builder Passport
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Your verified cryptographic credentials, on-chain bounty completions, and developer reputation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Passport'}</span>
            </button>
          </div>
        </div>

        {/* Warning if wallet disconnected */}
        {!wallet.connected && (
          <div className="mb-8 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Previewing Default Builder Passport</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Connect your Phantom wallet or click the Quick Demo Wallet to bind your own Devnet public key.
                </p>
              </div>
            </div>
            <button
              onClick={onConnectDemoWallet}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 rounded-lg shadow-md cursor-pointer whitespace-nowrap"
            >
              ⚡ Quick Demo Wallet
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Holographic Passport ID Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden p-8 border border-white/15 shadow-2xl bg-gradient-to-br from-[#121626] via-[#0B0E17] to-[#0A0D14]">
              {/* Holographic light streak & glow */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#14F195]/15 rounded-full blur-[100px] pointer-events-none" />
              
              {/* Card Watermark pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full min-h-[380px]">
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/src/assets/images/builder_avatar_judge_1793978564709.jpg"
                      alt="Builder Avatar"
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40 shadow-xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {builderProfile.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                      <div className="font-mono text-xs text-slate-400 mt-0.5">
                        {wallet.address ? shortenAddress(wallet.address, 6) : shortenAddress(builderProfile.address, 6)}
                      </div>
                    </div>
                  </div>

                  <img
                    src="/src/assets/images/builder_badge_emblem_1793978567156.jpg"
                    alt="Solana Elite Emblem"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-contain drop-shadow-[0_0_15px_rgba(153,69,255,0.5)]"
                  />
                </div>

                {/* Level & XP Progression */}
                <div className="my-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">
                        Level {levelInfo.level} · {levelInfo.levelTitle}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-purple-400">
                      {levelInfo.xp} / {levelInfo.nextLevelXp} XP
                    </span>
                  </div>

                  {/* XP Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] transition-all duration-500"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Stat Counters Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Total Earned</div>
                    <div className="text-xl font-bold font-mono text-[#14F195] mt-0.5 tabular-nums">
                      {formatSol(builderProfile.totalEarnedSol)} SOL
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Verified Proofs</div>
                    <div className="text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
                      {builderProfile.completedBountiesCount}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Cluster</div>
                    <div className="text-base font-bold font-mono text-purple-400 mt-1">
                      Devnet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Matrix & Badges */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/10">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#14F195]" />
                <span>Verified Skill Attestations</span>
              </h3>

              <div className="space-y-3 mb-6">
                {builderProfile.skills.map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-slate-200">{skill}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Tier {idx === 0 ? 'Master' : idx === 1 ? 'Expert' : 'Verified'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-300">
              <div className="font-semibold text-white mb-1">On-Chain Identity Standard</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Credentials on SolPulse are linked directly to cryptographic transaction hashes on the Solana ledger, ensuring tamper-proof verifiable proof of technical work.
              </p>
            </div>
          </div>
        </div>

        {/* Minted SPL Proof-of-Skill Tokens Grid (PPT Slide 4, 6, 7) */}
        <div className="mb-8 rounded-2xl bg-white/[0.02] border border-white/10 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#14F195] mb-1">
                <span>Token-2022 Soulbound Standard</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Non-Transferable Attestations</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Minted SPL Proof-of-Skill Tokens</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 self-start sm:self-auto">
              {builderProfile.splTokens?.length || 2} Soulbound Tokens
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(builderProfile.splTokens || []).map((token) => (
              <div
                key={token.mintAddress}
                className="p-4 rounded-xl bg-gradient-to-br from-black/60 to-purple-950/20 border border-white/10 flex items-start gap-4 hover:border-purple-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-purple-500/30 shrink-0 p-1">
                  <img
                    src={token.imageBadge || '/src/assets/images/builder_badge_emblem_1793978567156.jpg'}
                    alt={token.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate">{token.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                      {token.symbol}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {token.bountyTitle}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5">
                    <span className="text-slate-500">Mint: {shortenAddress(token.mintAddress, 4)}</span>
                    <a
                      href={`https://explorer.solana.com/address/${token.mintAddress}?cluster=devnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#14F195] hover:underline flex items-center gap-1"
                    >
                      <span>Explorer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On-Chain Verified Proof History Table */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Cryptographic Proof Ledger
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every verified bounty submission signed and confirmed on Solana Devnet
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {builderProfile.proofHistory.length} Recorded TXs
            </div>
          </div>

          {builderProfile.proofHistory.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No bounties claimed yet. Go to the Marketplace and submit your first proof to mint an on-chain record!
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {builderProfile.proofHistory.map((proof, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                      <span className="text-emerald-400 font-semibold">+{formatSol(proof.rewardSol)} SOL</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{proof.submittedAt}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate">
                      {proof.bountyTitle}
                    </h4>
                    {proof.githubUrl && (
                      <a
                        href={proof.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-purple-400 hover:underline mt-1 font-mono truncate max-w-md"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{proof.githubUrl}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={getExplorerTxUrl(proof.txSignature)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#14F195] hover:underline"
                    >
                      <span>{shortenAddress(proof.txSignature, 5)}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
