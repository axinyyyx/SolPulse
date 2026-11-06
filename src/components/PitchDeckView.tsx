import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Server,
  FileCode
} from 'lucide-react';

interface PitchDeckViewProps {
  onGoToJudgePortal: () => void;
  onGoToMarketplace: () => void;
}

export const PitchDeckView: React.FC<PitchDeckViewProps> = ({
  onGoToJudgePortal,
  onGoToMarketplace,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Vision & Mission',
      headline: 'SolPulse — The Micro-Bounty & Proof-of-Skill Platform on Solana',
      subtitle: 'We help builders instantly verify skills and judges instantly reward talent at the speed of Solana.',
      category: 'Deck Slide 01 // Vision',
      render: () => (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#9945FF] to-[#14F195] p-1 shadow-2xl shadow-purple-500/30 mb-6">
            <div className="w-full h-full bg-[#08090E] rounded-[12px] flex items-center justify-center">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                SP
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Sol<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Pulse</span>
          </h1>

          <div className="h-1 w-32 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full mb-6" />

          <h2 className="text-xl sm:text-2xl font-bold text-slate-200 max-w-2xl mb-4">
            The Micro-Bounty &amp; Proof-of-Skill Platform on Solana
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
            We help builders instantly verify skills and judges instantly reward talent at the speed of Solana.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoToJudgePortal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14F195] hover:bg-[#14F195]/90 text-slate-900 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>Test 1-Click Judge Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToMarketplace}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 cursor-pointer"
            >
              <span>Browse Micro-Bounties</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'The Problem',
      headline: 'Hackathons and Bounties are Broken for Both Sides',
      subtitle: 'The verification layer is completely disconnected from the settlement layer.',
      category: 'Deck Slide 02 // The Problem',
      render: () => (
        <div className="py-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-rose-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  For Developers (The Waiting Game)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Work is completed over the weekend, but payouts take weeks to process through manual Web2 financial rails.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs text-rose-300 font-mono">
                No verifiable, on-chain proof of the specific skills demonstrated.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  For Judges (The Admin Nightmare)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Evaluating 100+ projects requires managing disjointed spreadsheets and executing manual wallet transfers one by one.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs text-amber-300 font-mono">
                High friction in verifying actual code contributions versus team claims.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-purple-500/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  The Root Cause
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Disjointed systems: GitHub, Discord, and Crypto Wallets do not talk to each other seamlessly.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs text-purple-300 font-mono font-medium">
                The verification layer is completely disconnected from the settlement layer.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'The Solution',
      headline: 'SolPulse Binds Task Verification with Instant Payouts',
      subtitle: 'The verification layer and the settlement layer are now one unified Solana protocol.',
      category: 'Deck Slide 03 // Solution',
      render: () => (
        <div className="py-8 px-4 flex flex-col items-center">
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-8">
            <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-center">
              <div className="text-xs font-mono text-purple-400 uppercase mb-2">For Developers</div>
              <div className="text-xl font-bold text-white mb-3">Devs</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build → Submit → Earn Instant SOL &amp; On-Chain Reputation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-xl">
              <div className="text-xs font-mono text-emerald-400 uppercase mb-2">Unified Engine</div>
              <div className="text-base font-bold text-white mb-2">SolPulse Protocol</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A decentralized platform powered by Web3 Shadcn UI components for a seamless, wallet-native experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <div className="text-xs font-mono text-emerald-400 uppercase mb-2">For Hackathon Judges</div>
              <div className="text-xl font-bold text-white mb-3">Judges</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review → 1-Click Approve → Programmatic Distribution.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-emerald-500/10 to-purple-500/10 border border-white/10 text-center max-w-xl">
            <p className="text-xs sm:text-sm text-slate-200 font-mono">
              The verification layer and the settlement layer are now one unified Solana protocol.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'The Prototype Journey',
      headline: 'The SolPulse 4-Step Prototype Journey',
      subtitle: 'From wallet authentication to sub-second settlement and SPL Proof-of-Skill token minting.',
      category: 'Deck Slide 04 // 4-Step Journey',
      render: () => (
        <div className="py-6 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-purple-400 font-semibold mb-2">Step 1</div>
                <h4 className="text-base font-bold text-white mb-2">Authenticate</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dev &amp; Judge connect via @phantom/react-sdk or Quick In-Browser Keypair.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-500">
                Zero friction onboarding
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-purple-400 font-semibold mb-2">Step 2</div>
                <h4 className="text-base font-bold text-white mb-2">Submit Proof-of-Skill</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dev submits GitHub PR or design link tied directly to a smart contract bounty.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-500">
                Verifiable code diff
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">Step 3</div>
                <h4 className="text-base font-bold text-white mb-2">1-Click Judge Approval</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Judge reviews work and utilizes Phantom useAutoConfirm hook for frictionless approval.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                Auto-Confirm enabled
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">Step 4</div>
                <h4 className="text-base font-bold text-white mb-2">Instant Settlement</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Solana web3.js triggers payout via Chainstack Global Nodes. Dev receives SOL &amp; SPL Proof token.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                Sub-second confirmation
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Performance & Friction Matrix',
      headline: 'The Performance and Friction Matrix',
      subtitle: 'Comparing traditional hackathon payout rails vs the SolPulse 1-Click Judge Wallet.',
      category: 'Deck Slide 05 // Matrix',
      render: () => (
        <div className="py-6 px-2 space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="py-3 px-4 font-mono font-medium text-slate-400 uppercase">Metric</th>
                  <th className="py-3 px-4 font-mono font-medium text-slate-400 uppercase">Traditional Platforms</th>
                  <th className="py-3 px-4 font-mono font-bold text-emerald-400 uppercase bg-emerald-500/5">SolPulse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Payout Speed</td>
                  <td className="py-3 px-4 text-slate-400">Weeks (manual bank rails)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold bg-emerald-500/5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sub-second via Solana</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Judge Friction</td>
                  <td className="py-3 px-4 text-slate-400">Manual TX signing per team</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold bg-emerald-500/5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>1-Click Auto-Confirm Wallet</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Reputation</td>
                  <td className="py-3 px-4 text-slate-400">Off-chain PDF resumes</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold bg-emerald-500/5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Immutable SPL Token Minting</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Architecture</td>
                  <td className="py-3 px-4 text-slate-400">Siloed Web2 DBs</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold bg-emerald-500/5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Solana-Native Program</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-black/40 border border-emerald-500/30">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#14F195]" />
              <span>The 1-Click Judge Wallet</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Utilizing Phantom's Injected Provider useAutoConfirm hook, judges can rapidly approve 50+ payouts in a row without signing individual pop-ups. Administrative friction drops to zero.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Architecture & Tech Stack',
      headline: 'Engineered for Low Latency and High Trust',
      subtitle: 'Three-tier architecture binding Web3 UI Blocks, Phantom Hooks, and Chainstack Global Nodes.',
      category: 'Deck Slide 06 // Architecture',
      render: () => (
        <div className="py-6 px-2 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="text-[11px] font-mono text-purple-400 font-semibold mb-1">
              Tier 1: Frontend &amp; UI (The Presentation Layer)
            </div>
            <div className="text-sm font-bold text-white mb-1">React.js / Next.js Architecture</div>
            <p className="text-xs text-slate-400">
              Web3 UI Blocks for rapid, wallet-agnostic interface deployment and accessible Tailwind glassmorphism.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-emerald-500/30">
            <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1">
              Tier 2: Wallet &amp; Authentication (The Interaction Layer)
            </div>
            <div className="text-sm font-bold text-white mb-1">Phantom React SDK Integration</div>
            <p className="text-xs text-slate-400">
              Leveraging useDiscoveredWallets for onboarding and useAutoConfirm hooks for seamless judge workflows.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-purple-500/30">
            <div className="text-[11px] font-mono text-purple-400 font-semibold mb-1">
              Tier 3: Blockchain &amp; Infrastructure (The Settlement Layer)
            </div>
            <div className="text-sm font-bold text-white mb-1">@solana/web3.js &amp; Chainstack Global RPC Nodes</div>
            <p className="text-xs text-slate-400">
              @solana/spl-token for program interactions and custom token minting. Ultra-low latency Global Nodes powering instant Devnet state updates.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'What We Executed in 48 Hours',
      headline: 'Shipped Code & Tested Assumptions',
      subtitle: 'Validated with real Devnet SOL transfers, SPL token minting, and ~3 minutes saved per project.',
      category: 'Deck Slide 07 // 48-Hour Execution',
      render: () => (
        <div className="py-6 px-2">
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Sprint Progress</span>
              <span className="text-emerald-400 font-bold">100% Executed (48 Hours Total)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#9945FF] to-[#14F195]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                <span>Shipped Code</span>
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Integrated Phantom React SDK Connect &amp; UI Modals natively.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Engineered the 1-Click Judge Wallet approval flow using Auto-Confirm hooks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Successfully executed web3.js Devnet SOL transfers routed through Chainstack RPC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Minted and distributed customized SPL tokens representing 'Proof of Skill'.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Tested Assumptions</span>
              </h4>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-purple-300 mb-1">Time Saved: ~3 Minutes per Evaluation</div>
                  <p className="text-slate-400">
                    Judges save approximately 3 minutes per project evaluation by eliminating manual wallet transfers.
                  </p>
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-emerald-300 mb-1">Onboarding: Zero-Friction User Onboarding</div>
                  <p className="text-slate-400">
                    Achieved zero-friction user onboarding by utilizing the embedded Phantom provider and Wallet Standard discovery.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Roadmap to Mainnet',
      headline: 'The Roadmap to Mainnet',
      subtitle: "SolPulse doesn't just fund builders; it builds on-chain resumes at the speed of Solana.",
      category: 'Deck Slide 08 // Roadmap',
      render: () => (
        <div className="py-6 px-2 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-xs font-mono text-purple-400 font-bold mb-1">Month 1</div>
              <h4 className="text-base font-bold text-white mb-2">Escrow Smart Contract Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mainnet deployment &amp; comprehensive security audit of the Escrow Smart Contract.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Month 2</div>
              <h4 className="text-base font-bold text-white mb-2">GitHub Actions Automation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deep integration with GitHub Actions for automated, commit-based bounty validation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1">Month 3</div>
              <h4 className="text-base font-bold text-white mb-2">3 Major Hackathons Pilot</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pilot launch executing real-time payouts for 3 major Solana ecosystem hackathons.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#0B0E17] to-emerald-950/60 border border-white/15 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              SolPulse doesn’t just fund builders;
            </h3>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195] mb-6 tracking-tight">
              it builds on-chain resumes at the speed of Solana.
            </h3>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={onGoToJudgePortal}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#14F195] to-[#14F195]/90 text-slate-900 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Experience Live Demo Now
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Deck Container */}
        <div className="rounded-3xl bg-[#0B0E17] border border-white/15 shadow-2xl overflow-hidden p-6 sm:p-8">
          {/* Top Bar of Deck */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono text-purple-400 mb-0.5">
                {current.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {current.headline}
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-slate-400 px-2">
                Slide {currentSlide + 1} of {slides.length}
              </span>

              <button
                onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                disabled={currentSlide === slides.length - 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Current Slide Content */}
          <div className="min-h-[420px] flex flex-col justify-center">
            {current.render()}
          </div>

          {/* Bottom Slide Navigator Dots */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1 text-xs rounded-lg font-mono transition-colors cursor-pointer whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}. {s.title}
                </button>
              ))}
            </div>

            <a
              href="/assets/aistudio/SolPulse_Pitch_Deck_ee1aef17.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#14F195] hover:underline font-mono whitespace-nowrap"
            >
              <span>Download Pitch Deck PDF ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
