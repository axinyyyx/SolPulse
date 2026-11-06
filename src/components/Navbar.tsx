import React, { useState } from 'react';
import { WalletState } from '../types';
import { shortenAddress, formatSol, getExplorerAddressUrl } from '../utils/solana';
import { Zap, Droplets, ChevronDown, LogOut, Copy, ExternalLink, Check, ShieldCheck, Scale, Presentation } from 'lucide-react';

export type AppTab = 'marketplace' | 'judge' | 'analytics' | 'passport' | 'deck';

interface NavbarProps {
  wallet: WalletState;
  onConnectPhantom: () => void;
  onConnectDemoWallet: () => void;
  onDisconnect: () => void;
  onRequestAirdrop: () => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenCreateModal: () => void;
  pendingSubmissionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onConnectPhantom,
  onConnectDemoWallet,
  onDisconnect,
  onRequestAirdrop,
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  pendingSubmissionsCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090E]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none cursor-pointer"
            aria-label="SolPulse Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9945FF] to-[#14F195] p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#08090E] rounded-[6px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] font-black text-sm tracking-tighter">
                  SP
                </span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              Sol<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Pulse</span>
            </span>
          </button>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            Devnet
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'marketplace'
                ? 'text-white border-b-2 border-[#14F195]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Marketplace
          </button>

          <button
            onClick={() => setActiveTab('judge')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'judge'
                ? 'text-white border-b-2 border-[#14F195]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Judge Portal</span>
            {pendingSubmissionsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-[#14F195] text-[10px] font-mono font-bold border border-emerald-500/30">
                {pendingSubmissionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'analytics'
                ? 'text-white border-b-2 border-[#14F195]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ecosystem Analytics
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'passport'
                ? 'text-white border-b-2 border-[#14F195]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Builder Passport
          </button>

          <button
            onClick={() => setActiveTab('deck')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 cursor-pointer ${
              activeTab === 'deck'
                ? 'text-purple-300 border-b-2 border-purple-400 font-semibold'
                : 'text-purple-400/80 hover:text-purple-300'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Pitch Deck</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Wallet Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateModal}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            + Post Bounty
          </button>

          {!wallet.connected ? (
            <div className="flex items-center gap-2">
              {/* Quick Judge Demo Wallet Button (Crucial for hackathon judges!) */}
              <button
                onClick={onConnectDemoWallet}
                disabled={wallet.isConnecting}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#14F195] to-[#14F195]/90 hover:brightness-110 active:scale-95 rounded-lg shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                title="Generates a live in-browser keypair with devnet SOL so you can test all features instantly without installing Phantom"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>⚡ Quick Demo Wallet</span>
              </button>

              <button
                onClick={onConnectPhantom}
                disabled={wallet.isConnecting}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-purple-500/40 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Phantom</span>
              </button>
            </div>
          ) : (
            <div className="relative flex items-center gap-2">
              {/* Airdrop Button */}
              <button
                onClick={onRequestAirdrop}
                disabled={wallet.airdropping}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
                title="Request 1.0 SOL Devnet Airdrop"
              >
                <Droplets className={`w-3.5 h-3.5 text-[#14F195] ${wallet.airdropping ? 'animate-bounce' : ''}`} />
                <span>{wallet.airdropping ? 'Airdropping...' : '+1 SOL'}</span>
              </button>

              {/* Wallet Info Pill & Dropdown Toggle */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#121622] hover:bg-[#1A2030] border border-white/10 rounded-lg text-xs transition-colors cursor-pointer"
                  aria-expanded={dropdownOpen}
                >
                  <span className="font-mono font-semibold text-[#14F195]">
                    {formatSol(wallet.balanceSol)} SOL
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="font-mono text-slate-300">
                    {shortenAddress(wallet.address || '')}
                  </span>
                  {wallet.isDemoWallet && (
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1 py-0.2 rounded font-sans">
                      Demo
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F131D] border border-white/15 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] text-slate-400 mb-1">Connected Address</div>
                    <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg font-mono text-xs text-slate-200 mb-2">
                      <span className="truncate mr-2">{wallet.address}</span>
                      <button
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-white p-1"
                        title="Copy address"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1.5 px-1 text-slate-300 border-b border-white/5 mb-2">
                      <span>Network</span>
                      <span className="text-emerald-400 font-mono">Devnet</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1.5 px-1 text-slate-300 border-b border-white/5 mb-2">
                      <span>Wallet Mode</span>
                      <span className="text-purple-400 font-medium">
                        {wallet.isDemoWallet ? '⚡ In-Browser Keypair' : 'Phantom Wallet'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      {wallet.address && (
                        <a
                          href={getExplorerAddressUrl(wallet.address)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white p-1.5 rounded hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View on Solana Explorer</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onDisconnect();
                        }}
                        className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-500/10 transition-colors w-full text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Disconnect Wallet</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <nav className="md:hidden flex items-center justify-around px-1 py-2 border-t border-white/5 bg-[#090C14] overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'marketplace'
              ? 'bg-[#14F195]/15 text-[#14F195] font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setActiveTab('judge')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'judge'
              ? 'bg-[#14F195]/15 text-[#14F195] font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Judge</span>
          {pendingSubmissionsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-900 text-[10px] font-bold flex items-center justify-center">
              {pendingSubmissionsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-[#14F195]/15 text-[#14F195] font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('passport')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'passport'
              ? 'bg-[#14F195]/15 text-[#14F195] font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Passport
        </button>
        <button
          onClick={() => setActiveTab('deck')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'deck'
              ? 'bg-purple-600/30 text-purple-300 font-semibold'
              : 'text-purple-400 hover:text-white'
          }`}
        >
          Deck
        </button>
      </nav>
    </header>
  );
};
