import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Bounty, WalletState, BuilderProfile, ProjectSubmission } from './types';
import { INITIAL_BOUNTIES, INITIAL_PROJECT_SUBMISSIONS, INITIAL_SPL_TOKENS, generateSplTokenMint } from './utils/bountyLogic';
import {
  getSolanaConnection,
  getOrCreateJudgeKeypair,
  generateNewJudgeKeypair,
  requestDevnetAirdrop,
  lamportsToSol,
  formatSol,
} from './utils/solana';
import { Navbar, AppTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marketplace } from './components/Marketplace';
import { AnalyticsView } from './components/AnalyticsView';
import { BuilderPassportView } from './components/BuilderPassportView';
import { JudgePortal } from './components/JudgePortal';
import { BountyDetailModal } from './components/BountyDetailModal';
import { SubmitProofModal } from './components/SubmitProofModal';
import { CreateBountyModal } from './components/CreateBountyModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const connection = useMemo(() => getSolanaConnection(), []);

  // Application Tabs (Slide 3: Devs vs Judges vs Ecosystem)
  const [activeTab, setActiveTab] = useState<AppTab>('marketplace');

  // Wallet State with Auto-Confirm Hook Support (Slide 5)
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balanceSol: 0,
    isDemoWallet: false,
    publicKeyObj: null,
    keypairObj: null,
    isConnecting: false,
    airdropping: false,
    autoConfirmEnabled: true, // Default to true as featured in PPT
  });

  // Bounties & Submissions State (Slide 2 & 4: Submissions Queue)
  const [bounties, setBounties] = useState<Bounty[]>(INITIAL_BOUNTIES);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(INITIAL_PROJECT_SUBMISSIONS);

  // Modals
  const [detailBounty, setDetailBounty] = useState<Bounty | null>(null);
  const [claimBounty, setClaimBounty] = useState<Bounty | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Builder Profile with SPL Soulbound Tokens (Slide 4, 6, 7)
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile>({
    address: 'BhXaWsyfVcfJRdpuBQ53scQfoyCuAvnRzM78eaAf2iAt',
    name: 'Solana Devnet Judge / Builder',
    avatarUrl: '/src/assets/images/builder_avatar_judge_1793978564709.jpg',
    level: 4,
    levelTitle: 'Solana Elite Engineer',
    xp: 750,
    nextLevelXp: 1000,
    totalEarnedSol: 0.55,
    completedBountiesCount: 2,
    joinedAt: 'Nov 2026',
    skills: ['Anchor / Rust', 'Solana Blinks & Actions', 'Token-2022 Extensions', 'Chainstack RPC Optimization'],
    splTokens: INITIAL_SPL_TOKENS,
    proofHistory: [
      {
        bountyId: 'bounty-1',
        bountyTitle: 'Audit Token-2022 Transfer Hook for Fee Deflation Invariants',
        githubUrl: 'https://github.com/solana-labs/solana-program-library/tree/master/token-2022',
        notes: 'Verified fee split math, CPI recursion limits, and zero-remainder checks to prevent deflationary drain attacks.',
        builderAddress: 'BhXaWsyfVcfJRdpuBQ53scQfoyCuAvnRzM78eaAf2iAt',
        submittedAt: '2026-11-05',
        txSignature: '5itW4CpafDQ4nLHb2LJNST6hfMKY27Pnxg6Zrh8mmHKVG48cNSFbhAU1nFFjczqxFwZivjFS3UNZp6fSQxY7U9Mf',
        rewardSol: 0.35,
        verified: true,
        splTokenMint: '2zxFsgijx4wAXPqQKPVh8AaJspu4R66bc72XS5FPseoX',
      },
      {
        bountyId: 'bounty-3',
        bountyTitle: 'Anchor Escrow Smart Contract for Automated Hackathon Payouts',
        githubUrl: 'https://github.com/coral-xyz/anchor',
        notes: 'Constructed PDA escrow vault with release_funds instruction.',
        builderAddress: 'BhXaWsyfVcfJRdpuBQ53scQfoyCuAvnRzM78eaAf2iAt',
        submittedAt: '2026-11-02',
        txSignature: '21YbhY2biBvMv1UibcxUeUNkTCdsr3LxvZkkdmaLKp3a2tAgTvkxMPwEZwg4C8JPYpb7JZkHj6uS3Y6YLhwGoRwF',
        rewardSol: 0.20,
        verified: true,
        splTokenMint: 'HUQGGd3xjxbUxZ5KPVXUVg8hmBwHwHCtdsmLa7KZKLNo',
      },
    ],
  });

  // Fetch real balance helper
  const refreshBalance = useCallback(
    async (pubKey: PublicKey) => {
      try {
        const lamports = await connection.getBalance(pubKey);
        const sol = lamportsToSol(lamports);
        setWallet((w) => ({
          ...w,
          balanceSol: sol,
        }));
      } catch (err) {
        console.warn('Could not fetch Devnet balance:', err);
      }
    },
    [connection]
  );

  // Quick Demo Wallet Generator (Instant in-browser Keypair)
  const handleConnectDemoWallet = useCallback(async () => {
    try {
      setWallet((w) => ({ ...w, isConnecting: true }));
      const keypair = await getOrCreateJudgeKeypair();
      const pubKey = keypair.publicKey;
      const address = pubKey.toBase58();

      let balance = 0;
      try {
        const lamports = await connection.getBalance(pubKey);
        balance = lamportsToSol(lamports);
      } catch (rpcErr) {
        console.warn('RPC balance lookup warning:', rpcErr);
      }

      if (balance <= 0.001) {
        balance = 3.50; // default demo sandbox balance
      }

      setWallet({
        connected: true,
        address,
        balanceSol: balance,
        isDemoWallet: true,
        publicKeyObj: pubKey,
        keypairObj: keypair,
        isConnecting: false,
        airdropping: false,
        autoConfirmEnabled: true,
      });

      setBuilderProfile((prev) => ({
        ...prev,
        address,
      }));

      addToast({
        type: 'success',
        title: '⚡ Quick Demo Wallet Connected!',
        message: `Generated Devnet keypair (${address.slice(0, 4)}...${address.slice(-4)}) with Auto-Confirm enabled for instant hackathon judging.`,
      });
    } catch (err: any) {
      console.error('Demo wallet error:', err);
      addToast({
        type: 'error',
        title: 'Demo Wallet Error',
        message: err?.message || 'Could not initialize keypair.',
      });
      setWallet((w) => ({ ...w, isConnecting: false }));
    }
  }, [connection]);

  // Connect Real Phantom Wallet
  const handleConnectPhantom = useCallback(async () => {
    const solana = typeof window !== 'undefined' ? (window as any).solana : null;
    if (!solana || !solana.isPhantom) {
      addToast({
        type: 'info',
        title: 'Phantom Wallet Not Detected',
        message: 'No Phantom extension detected. Use the "⚡ Quick Demo Wallet" button for instant in-browser testing!',
      });
      return;
    }

    try {
      setWallet((w) => ({ ...w, isConnecting: true }));
      const resp = await solana.connect();
      const pubKey = resp.publicKey as PublicKey;
      const address = pubKey.toBase58();

      let balance = 0;
      try {
        const lamports = await connection.getBalance(pubKey);
        balance = lamportsToSol(lamports);
      } catch (err) {
        console.warn('Failed to fetch Phantom balance:', err);
      }

      setWallet({
        connected: true,
        address,
        balanceSol: balance,
        isDemoWallet: false,
        publicKeyObj: pubKey,
        keypairObj: null,
        isConnecting: false,
        airdropping: false,
        autoConfirmEnabled: true,
      });

      setBuilderProfile((prev) => ({
        ...prev,
        address,
      }));

      addToast({
        type: 'success',
        title: 'Phantom Connected',
        message: `Connected to Solana Devnet (${address.slice(0, 4)}...${address.slice(-4)})`,
      });
    } catch (err: any) {
      console.error('Phantom connection rejected:', err);
      setWallet((w) => ({ ...w, isConnecting: false }));
      addToast({
        type: 'error',
        title: 'Connection Cancelled',
        message: 'Phantom connection request was denied or closed.',
      });
    }
  }, [connection]);

  // Disconnect
  const handleDisconnect = useCallback(() => {
    setWallet({
      connected: false,
      address: null,
      balanceSol: 0,
      isDemoWallet: false,
      publicKeyObj: null,
      keypairObj: null,
      isConnecting: false,
      airdropping: false,
      autoConfirmEnabled: false,
    });
    addToast({
      type: 'info',
      title: 'Wallet Disconnected',
      message: 'You have disconnected your Solana wallet.',
    });
  }, []);

  // Request 1 SOL Devnet Airdrop
  const handleRequestAirdrop = useCallback(async () => {
    if (!wallet.connected || !wallet.publicKeyObj) return;

    setWallet((w) => ({ ...w, airdropping: true }));
    addToast({
      type: 'info',
      title: 'Requesting Devnet Airdrop',
      message: 'Broadcasting 1.0 SOL faucet request to Solana Devnet...',
    });

    try {
      const result = await requestDevnetAirdrop(connection, wallet.publicKeyObj, wallet.balanceSol);
      
      setWallet((w) => ({
        ...w,
        balanceSol: result.newBalance,
        airdropping: false,
      }));

      addToast({
        type: 'success',
        title: result.isSimulatedFallback ? '💧 Demo Balance Credited (+1.0 SOL)' : '💧 Devnet Airdrop Confirmed (+1.0 SOL)',
        message: result.message,
        txHash: result.signature,
      });
    } catch (err: any) {
      console.error('Airdrop failed:', err);
      setWallet((w) => ({ ...w, airdropping: false }));
      addToast({
        type: 'error',
        title: 'Airdrop Failed',
        message: err?.message || 'Could not complete faucet airdrop.',
      });
    }
  }, [connection, wallet.connected, wallet.publicKeyObj, wallet.balanceSol]);

  // Toggle Auto-Confirm (Slide 5)
  const handleToggleAutoConfirm = useCallback(() => {
    setWallet((prev) => {
      const nextState = !prev.autoConfirmEnabled;
      addToast({
        type: nextState ? 'success' : 'info',
        title: nextState ? '⚡ Auto-Confirm Activated' : 'Auto-Confirm Disabled',
        message: nextState 
          ? 'Phantom Provider Auto-Confirm enabled: Judges can rapidly approve 50+ payouts without popup friction.' 
          : 'Transactions will require manual confirmation signatures.',
      });
      return { ...prev, autoConfirmEnabled: nextState };
    });
  }, []);

  // Judge Approves Submission (Slide 4 & 5 & 7)
  const handleApproveSubmission = useCallback(
    (submissionId: string, txHash: string, splMint: string) => {
      const targetSub = submissions.find(s => s.id === submissionId);
      if (!targetSub) return;

      const reward = targetSub.solReward;

      // Update submissions list
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: 'approved',
                payoutTxHash: txHash,
                splTokenMint: splMint,
                autoConfirmed: wallet.autoConfirmEnabled,
              }
            : s
        )
      );

      // Create new SPL Proof-of-Skill token
      const newSplToken = {
        mintAddress: splMint,
        symbol: 'SKILL-AWARD',
        name: `${targetSub.bountyTitle.slice(0, 24)}... Attestation`,
        bountyTitle: targetSub.bountyTitle,
        recipientAddress: targetSub.builderAddress,
        mintedAt: new Date().toISOString().slice(0, 10),
        txHash,
        tier: 'Pioneer' as const,
        imageBadge: '/src/assets/images/builder_badge_emblem_1793978567156.jpg',
      };

      // Also update builder profile if builder address matches
      setBuilderProfile((prev) => ({
        ...prev,
        totalEarnedSol: Number((prev.totalEarnedSol + reward).toFixed(3)),
        completedBountiesCount: prev.completedBountiesCount + 1,
        splTokens: [newSplToken, ...prev.splTokens],
        proofHistory: [
          {
            bountyId: targetSub.bountyId,
            bountyTitle: targetSub.bountyTitle,
            githubUrl: targetSub.githubPrUrl,
            notes: targetSub.summary,
            builderAddress: targetSub.builderAddress,
            submittedAt: new Date().toISOString().slice(0, 10),
            txSignature: txHash,
            rewardSol: reward,
            verified: true,
            splTokenMint: splMint,
          },
          ...prev.proofHistory,
        ],
      }));

      addToast({
        type: 'success',
        title: `🏆 1-Click Payout Disbursed (+${formatSol(reward)} SOL)`,
        message: `Settled on Devnet via Chainstack Global Nodes. SPL Proof-of-Skill token minted!`,
        txHash,
      });
    },
    [submissions, wallet.autoConfirmEnabled]
  );

  // Judge Rejects Submission
  const handleRejectSubmission = useCallback((submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'rejected' } : s))
    );
    addToast({
      type: 'info',
      title: 'Revision Requested',
      message: 'Developer notified to address code review feedback before re-evaluating.',
    });
  }, []);

  // Developer Proof Success Handler
  const handleProofSuccess = useCallback(
    (bountyId: string, txSignature: string, githubUrl: string, notes: string) => {
      const target = bounties.find((b) => b.id === bountyId);
      if (!target) return;

      const reward = target.rewardSol;
      const splMint = target.splTokenMint || generateSplTokenMint();

      // Update bounty status in marketplace
      setBounties((prev) =>
        prev.map((b) =>
          b.id === bountyId
            ? {
                ...b,
                status: 'Completed',
                claimedBy: wallet.address || 'BhXaWsyfVcfJRdpuBQ53scQfoyCuAvnRzM78eaAf2iAt',
                claimTxHash: txSignature,
                claimedAt: new Date().toISOString().slice(0, 10),
              }
            : b
        )
      );

      // Add to submissions queue for judges
      const newSubmission: ProjectSubmission = {
        id: `sub-${Date.now()}`,
        bountyId,
        bountyTitle: target.title,
        teamName: 'Live Demo Builder',
        builderAddress: wallet.address || 'H5xjpFiAthMDCxBu7caAbG6z6EtVyENRoPCoGv6oRpiY',
        githubPrUrl: githubUrl,
        commitHash: Math.random().toString(16).substring(2, 8),
        summary: notes || 'Verified submission with automated integration test pass.',
        solReward: reward,
        submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: 'approved',
        payoutTxHash: txSignature,
        splTokenMint: splMint,
      };

      setSubmissions((prev) => [newSubmission, ...prev]);

      // Update wallet balance (+ reward)
      setWallet((w) => ({
        ...w,
        balanceSol: w.balanceSol + reward,
      }));

      // Update Builder Profile
      setBuilderProfile((prev) => ({
        ...prev,
        totalEarnedSol: Number((prev.totalEarnedSol + reward).toFixed(3)),
        completedBountiesCount: prev.completedBountiesCount + 1,
        splTokens: [
          {
            mintAddress: splMint,
            symbol: 'SKILL-MINT',
            name: `${target.title.slice(0, 20)}... Badge`,
            bountyTitle: target.title,
            recipientAddress: wallet.address || prev.address,
            mintedAt: new Date().toISOString().slice(0, 10),
            txHash: txSignature,
            tier: 'Master',
            imageBadge: '/src/assets/images/builder_badge_emblem_1793978567156.jpg',
          },
          ...prev.splTokens,
        ],
        proofHistory: [
          {
            bountyId,
            bountyTitle: target.title,
            githubUrl,
            notes,
            builderAddress: wallet.address || prev.address,
            submittedAt: new Date().toISOString().slice(0, 10),
            txSignature,
            rewardSol: reward,
            verified: true,
            splTokenMint: splMint,
          },
          ...prev.proofHistory,
        ],
      }));

      addToast({
        type: 'success',
        title: `🎉 Claimed ${formatSol(reward)} SOL!`,
        message: `On-chain proof registered on Devnet. View verification hash.`,
        txHash: txSignature,
      });
    },
    [bounties, wallet.address]
  );

  // Create Bounty Handler
  const handleCreateBounty = useCallback((newBounty: Bounty) => {
    setBounties((prev) => [newBounty, ...prev]);
    addToast({
      type: 'success',
      title: 'Bounty Published!',
      message: `"${newBounty.title}" is now live with ${formatSol(newBounty.rewardSol)} SOL reward pool.`,
    });
  }, []);

  const pendingSubmissionsCount = submissions.filter(s => s.status === 'pending_review').length;

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans">
      {/* Navbar with 3-Zone Contract & Judge Portal Tab */}
      <Navbar
        wallet={wallet}
        onConnectPhantom={handleConnectPhantom}
        onConnectDemoWallet={handleConnectDemoWallet}
        onDisconnect={handleDisconnect}
        onRequestAirdrop={handleRequestAirdrop}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setCreateModalOpen(true)}
        pendingSubmissionsCount={pendingSubmissionsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <>
            <Hero
              onExplore={() => {
                const el = document.getElementById('marketplace-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPostBounty={() => setCreateModalOpen(true)}
              onConnectDemoWallet={handleConnectDemoWallet}
              isWalletConnected={wallet.connected}
            />

            <Marketplace
              bounties={bounties}
              onSelectBounty={(b) => setDetailBounty(b)}
              onSubmitProof={(b) => setClaimBounty(b)}
              onOpenCreateModal={() => setCreateModalOpen(true)}
            />
          </>
        )}

        {activeTab === 'judge' && (
          <JudgePortal
            submissions={submissions}
            wallet={wallet}
            connection={connection}
            onConnectDemoWallet={handleConnectDemoWallet}
            onApproveSubmission={handleApproveSubmission}
            onRejectSubmission={handleRejectSubmission}
            onToggleAutoConfirm={handleToggleAutoConfirm}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView bounties={bounties} />
        )}

        {activeTab === 'passport' && (
          <BuilderPassportView
            wallet={wallet}
            builderProfile={builderProfile}
            onConnectDemoWallet={handleConnectDemoWallet}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 bg-[#06070B] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SolPulse</span>
            <span>·</span>
            <span>The Micro-Bounty &amp; Proof-of-Skill Platform on Solana</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a
              href="https://solpulse-rs.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[#14F195] hover:underline transition-colors"
            >
              solpulse-rs.vercel.app ↗
            </a>
            <span>·</span>
            <a
              href="https://explorer.solana.com/?cluster=devnet"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Solana Explorer ↗
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BountyDetailModal
        bounty={detailBounty}
        isOpen={Boolean(detailBounty)}
        onClose={() => setDetailBounty(null)}
        onClaim={(b) => setClaimBounty(b)}
      />

      <SubmitProofModal
        bounty={claimBounty}
        wallet={wallet}
        connection={connection}
        isOpen={Boolean(claimBounty)}
        onClose={() => setClaimBounty(null)}
        onConnectDemoWallet={handleConnectDemoWallet}
        onProofSuccess={handleProofSuccess}
      />

      <CreateBountyModal
        isOpen={createModalOpen}
        wallet={wallet}
        onClose={() => setCreateModalOpen(false)}
        onCreateBounty={handleCreateBounty}
      />

      {/* Sleek Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
