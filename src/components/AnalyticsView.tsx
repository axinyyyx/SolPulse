import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { Bounty } from '../types';
import { formatSol } from '../utils/solana';
import { Activity, TrendingUp, Zap, Shield, Server, Cpu } from 'lucide-react';

interface AnalyticsViewProps {
  bounties: Bounty[];
}

const VOLUME_DATA = [
  { day: 'Mon', solVolume: 8.4, proofs: 24, builders: 42 },
  { day: 'Tue', solVolume: 12.1, proofs: 38, builders: 59 },
  { day: 'Wed', solVolume: 15.6, proofs: 45, builders: 71 },
  { day: 'Thu', solVolume: 10.8, proofs: 31, builders: 53 },
  { day: 'Fri', solVolume: 18.2, proofs: 54, builders: 88 },
  { day: 'Sat', solVolume: 14.5, proofs: 41, builders: 67 },
  { day: 'Sun', solVolume: 21.0, proofs: 62, builders: 104 },
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Security & Audit', count: 18, sol: 14.2 },
  { name: 'Smart Contracts', count: 26, sol: 19.5 },
  { name: 'Blinks & Actions', count: 32, sol: 22.8 },
  { name: 'RPC & Infra', count: 14, sol: 12.0 },
  { name: 'AI & Agents', count: 21, sol: 16.1 },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ bounties }) => {
  const totalBountyValue = bounties.reduce((sum, b) => sum + b.rewardSol, 0);
  const completedBounties = bounties.filter(b => b.status === 'Completed').length;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Protocol Telemetry</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Live Devnet Consensus</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Ecosystem Analytics &amp; SOL Volume
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time on-chain metrics, bounty distribution velocity, and builder activity across Solana Devnet.
          </p>
        </div>

        {/* Top telemetry cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>7-Day Volume</span>
              <TrendingUp className="w-4 h-4 text-[#14F195]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              100.60 <span className="text-xs text-[#14F195] font-sans">SOL</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-mono">+28.4% from last week</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Current Open Pool</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {formatSol(totalBountyValue)} <span className="text-xs text-purple-400 font-sans">SOL</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">{bounties.length} active bounties</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Solana Cluster TPS</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#14F195] tabular-nums">
              2,845 <span className="text-xs text-slate-400 font-sans">TPS</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Devnet blocktime ~410ms</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Median Fee / TX</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              0.000005 <span className="text-xs text-slate-400 font-sans">SOL</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">&lt; $0.001 per verification</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main 7-Day Area Volume Chart */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  7-Day On-Chain Bounty Volume (SOL)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily aggregate reward volume disbursed through verified proofs
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14F195]" />
                  <span>SOL Volume</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOLUME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="solVolumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14F195" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#14F195" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    unit=" SOL"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0D1017',
                      borderColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono',
                    }}
                    formatter={(value: any) => [`${value} SOL`, 'Volume']}
                  />
                  <Area
                    type="monotone"
                    dataKey="solVolume"
                    stroke="#14F195"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#solVolumeGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                Volume by Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution across Web3 domains
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_DISTRIBUTION} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    unit=" SOL"
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                    width={90}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0D1017',
                      borderColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono',
                    }}
                    formatter={(value: any) => [`${value} SOL`, 'Category SOL']}
                  />
                  <Bar dataKey="sol" fill="#9945FF" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Top Category:</span>
              <span className="text-purple-400 font-semibold font-mono">Blinks &amp; Actions (22.8 SOL)</span>
            </div>
          </div>
        </div>

        {/* Network Validator & Consensus Specs */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            <span>Solana Devnet Architecture Invariants</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px] mb-1">Execution Engine</div>
              <div className="text-white font-mono font-medium">Sealevel Parallel SVM Runtime</div>
              <p className="text-slate-500 text-[11px] mt-1">Multi-threaded transaction scheduling without cross-account locks.</p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px] mb-1">State Settlement</div>
              <div className="text-emerald-400 font-mono font-medium">Tower BFT Consensus</div>
              <p className="text-slate-500 text-[11px] mt-1">Proof of History verifiable delay clock enforcing deterministic slot order.</p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px] mb-1">Verification Payload</div>
              <div className="text-purple-400 font-mono font-medium">Atomic Micro-Instruction</div>
              <p className="text-slate-500 text-[11px] mt-1">SystemProgram transfer + cryptographic signature logged in explorer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
