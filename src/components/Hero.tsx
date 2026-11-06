import React from 'react';
import { ArrowRight, Zap, Plus, ShieldCheck, Activity, Award, Cpu } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onPostBounty: () => void;
  onConnectDemoWallet: () => void;
  isWalletConnected: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onPostBounty,
  onConnectDemoWallet,
  isWalletConnected,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-white/5">
      {/* Background ambient neon glow lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero: Content & High-Res Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean category kicker (no pill boxes) */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3 tracking-wide">
              <span>Solana Devnet Hackathon Edition</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Instant Verification</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Blinks &amp; Anchor Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-5">
              Decentralized Micro-Bounties &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] via-[#A855F7] to-[#14F195]">
                Proof-of-Skill
              </span>{' '}
              Protocol
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              Solve real Web3 developer challenges, audit Token-2022 hooks, craft Solana Blinks, and earn SOL on Devnet. Every verified submission triggers an on-chain cryptographic transaction stamped into your builder passport.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-[#14F195] hover:bg-[#14F195]/90 active:scale-98 rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Bounties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {!isWalletConnected ? (
                <button
                  onClick={onConnectDemoWallet}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-purple-500/40 hover:border-purple-500/80 rounded-xl transition-all shadow-lg shadow-purple-500/10 cursor-pointer whitespace-nowrap"
                  title="Click to generate an instant in-browser keypair and test right away"
                >
                  <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>⚡ Quick Judge Demo Wallet</span>
                </button>
              ) : (
                <button
                  onClick={onPostBounty}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 text-slate-300" />
                  <span>Post a Micro-Bounty</span>
                </button>
              )}
            </div>

            <div className="mt-6 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>On-chain Devnet Tx</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#14F195]" />
                <span>Zero Phantom Required for Judges</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-[#0F131D]/80 shadow-2xl p-2 group">
              <div className="relative aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src="/src/assets/images/solpulse_hero_orb_1793978564221.jpg"
                  alt="SolPulse holographic laser orb representing decentralized consensus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-transparent to-transparent opacity-80" />
                
                {/* Overlay live status banner */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg backdrop-blur-md bg-black/60 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Solana Devnet Cluster</div>
                    <div className="text-white font-mono font-medium">devnet.solana.com</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Verification Protocol</div>
                    <div className="text-emerald-400 font-mono font-medium">Atomic Micro-Tx</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Total SOL Paid Out</span>
              <Activity className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              84.60 <span className="text-xs text-[#14F195] font-sans font-normal">SOL</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Verified on-chain</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Proofs Minted</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              418 <span className="text-xs text-purple-400 font-sans font-normal">Proofs</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Devnet transactions</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Active Builders</span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              1,280+
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Solana developers</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Avg Confirmation</span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">
              0.48 <span className="text-xs text-slate-300 font-sans font-normal">sec</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Sub-second finality</div>
          </div>
        </div>
      </div>
    </div>
  );
};
