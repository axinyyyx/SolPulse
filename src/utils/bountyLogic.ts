import { Bounty, BountyCategory, BountyDifficulty, ProjectSubmission, SplProofToken } from '../types';

export const INITIAL_BOUNTIES: Bounty[] = [
  {
    id: 'bounty-1',
    title: 'Audit Token-2022 Transfer Hook for Fee Deflation Invariants',
    category: 'Security & Audit',
    rewardSol: 0.45,
    difficulty: 'Advanced',
    status: 'Open',
    description: 'Perform a comprehensive security audit on an Anchor-based Token-2022 Transfer Hook program. Validate fee split math, CPI recursion limits, and zero-remainder checks to prevent deflationary drain attacks.',
    requirements: [
      'Analyze Anchor program in lib.rs for account reentrancy',
      'Verify arithmetic overflow protection in transfer_hook logic',
      'Provide test suite demonstrating failed exploit payloads',
      'Submit written report with CVSS ratings and recommended remediation'
    ],
    deliverables: 'GitHub repository or PR link containing the test suite and Markdown audit report.',
    creatorAddress: 'SolSec71J2Zk3bQx8VvLpZ9xR2T6Wq81LpU9',
    createdAt: '2026-11-04',
    deadlineDays: 5,
    tags: ['Anchor', 'Token-2022', 'Security', 'Rust'],
    submissionsCount: 4,
    splTokenMint: 'sk1LL2022SecAuditHookMint77Xz89PqLm44K',
  },
  {
    id: 'bounty-2',
    title: 'Build Solana Blink & Action for Campus Hacker House Ticket Mint',
    category: 'Blinks & Actions',
    rewardSol: 0.35,
    difficulty: 'Intermediate',
    status: 'Open',
    description: 'Implement a Solana Dial.to compliant Action and Blink API. It must allow users on Twitter/X or Discord to click a one-tap Blink to mint a soulbound devnet ticket NFT directly from their timeline.',
    requirements: [
      'Expose actions.json with CORS and OpenAPI specification',
      'Validate GET actions metadata with banner, icon, and dynamic label',
      'Construct POST action returning serialized unsigned Transaction',
      'Verify wallet signature on devnet cluster'
    ],
    deliverables: 'Live deployed Action endpoint or vercel URL + open-source repo with README.',
    creatorAddress: 'BlinkGuild9xKy18MvQz81Tp2YqR8sW76',
    createdAt: '2026-11-05',
    deadlineDays: 3,
    tags: ['Blinks', 'Actions', 'TypeScript', 'Next.js'],
    submissionsCount: 7,
    splTokenMint: 'sk1LLBlinkCampusActionMint22Vv89PqLm77J',
  },
  {
    id: 'bounty-3',
    title: 'Anchor Escrow Smart Contract for Automated Hackathon Payouts',
    category: 'Smart Contracts',
    rewardSol: 0.60,
    difficulty: 'Advanced',
    status: 'Open',
    description: 'Develop the core SolPulse Escrow Anchor smart contract. Binds milestone task verification directly with instant programmatic SOL distribution upon 1-click judge approval.',
    requirements: [
      'Implement initialize_escrow, deposit_bounty, and release_funds instructions',
      'PDA authority seeds with bump validation for hackathon vault',
      'Zero-fee programmatic settlement for verified builders',
      'Anchor mocha integration test covering 10 concurrent payouts'
    ],
    deliverables: 'Anchor program repository with passing tests on localnet/devnet.',
    creatorAddress: 'EscrowCore44P2x9W8v44Lz7M10XqR91Z',
    createdAt: '2026-11-05',
    deadlineDays: 6,
    tags: ['Anchor', 'Escrow', 'Smart-Contracts', 'Rust'],
    submissionsCount: 5,
    splTokenMint: 'sk1LLEscrowProgramAnchorVaultMint55Qx',
  },
  {
    id: 'bounty-4',
    title: 'Integrate Chainstack Global RPC Nodes for Ultra-Low Latency Broadcasting',
    category: 'RPC & Infra',
    rewardSol: 0.40,
    difficulty: 'Intermediate',
    status: 'Open',
    description: 'Configure high-speed Chainstack Global RPC nodes with geographic failover and retry backoff. Reduce average devnet transaction submission latency below 350ms for judge approval flows.',
    requirements: [
      'Implement multi-endpoint round-robin with latency scoring',
      'Automated fallback to secondary RPC during rate-limit bursts',
      'Benchmark commit confirmation times across 50 simulated batches',
      'Provide reusable TypeScript helper package'
    ],
    deliverables: 'TypeScript npm module or PR with benchmark charts comparing standard RPC vs Chainstack Global.',
    creatorAddress: 'ChainstackOps99Wx1L2v4M81Zp90VxK55Q',
    createdAt: '2026-11-03',
    deadlineDays: 4,
    tags: ['Chainstack', 'RPC', 'Low-Latency', 'Devnet'],
    submissionsCount: 3,
    splTokenMint: 'sk1LLChainstackGlobalNodeMint88Zp41Lp',
  },
  {
    id: 'bounty-5',
    title: 'Engineer 1-Click Judge Wallet Auto-Confirm Hook with Phantom Provider',
    category: 'Frontend & Tooling',
    rewardSol: 0.35,
    difficulty: 'Intermediate',
    status: 'Open',
    description: 'Build the friction-free evaluation UI allowing hackathon judges to approve 50+ projects in a row using Phantom Provider auto-confirm without repetitive manual signature popups.',
    requirements: [
      'Integrate Phantom React SDK with useAutoConfirm session hook',
      'Implement batch transaction pipeline with optimistic UI updates',
      'Display countdown timer and active session security guardrails',
      'Handle graceful fallback if judge revokes session permissions'
    ],
    deliverables: 'React component library and demo storybook with full test suite.',
    creatorAddress: 'JudgeUX11P2x9W8v44Lz7M10X',
    createdAt: '2026-11-04',
    deadlineDays: 3,
    tags: ['Phantom', 'AutoConfirm', 'UI-Blocks', 'Web3'],
    submissionsCount: 6,
    splTokenMint: 'sk1LLJudgeAutoConfirmHookMint44Lm22Q',
  },
  {
    id: 'bounty-6',
    title: 'Mint & Distribute Customized Non-Transferable SPL Proof-of-Skill Tokens',
    category: 'SPL Tokens & DeFi',
    rewardSol: 0.50,
    difficulty: 'Advanced',
    status: 'Open',
    description: 'Construct a Token-2022 soulbound proof-of-skill minting pipeline. Automatically mints an immutable, non-transferable SPL token into the winning builder wallet upon judge payout settlement.',
    requirements: [
      'Use @solana/spl-token with NonTransferable extension',
      'Attach on-chain metadata with hackathon name, category, and CVSS score',
      'Verify recipient account ownership before atomic mintTo instruction',
      'Emit on-chain event log parseable by Solana Explorer'
    ],
    deliverables: 'Token-2022 program or script with end-to-end devnet minting verification.',
    creatorAddress: 'SoulboundLab88Qx3P90VvM21Z9w8xK44Lp',
    createdAt: '2026-11-02',
    deadlineDays: 5,
    tags: ['Token-2022', 'Soulbound', 'SPL-Token', 'Rust'],
    submissionsCount: 4,
    splTokenMint: 'sk1LLSoulboundProofOfSkillTokenMint99Xx',
  },
];

export const INITIAL_PROJECT_SUBMISSIONS: ProjectSubmission[] = [
  {
    id: 'sub-1',
    bountyId: 'bounty-2',
    bountyTitle: 'Build Solana Blink & Action for Campus Hacker House Ticket Mint',
    teamName: 'BlinkPioneers',
    builderAddress: '7YwK9zM82P10vL8291M41Xy99Q5555abcdef1234',
    githubPrUrl: 'https://github.com/solana-developers/campus-blink/pull/42',
    commitHash: 'a8f3b21c',
    summary: 'Delivered fully compliant actions.json API with Dial.to specification. Campus attendees can mint soulbound devnet ticket passes with 1-click directly from Twitter/X timeline.',
    solReward: 0.35,
    submittedAt: '2026-11-06 09:15',
    status: 'pending_review',
    splTokenMint: 'sk1LLBlinkCampusActionMint22Vv89PqLm77J',
  },
  {
    id: 'sub-2',
    bountyId: 'bounty-3',
    bountyTitle: 'Anchor Escrow Smart Contract for Automated Hackathon Payouts',
    teamName: 'AnchorVault Lab',
    builderAddress: '4KxM921Zp81MvQz81Tp2YqR8sW76P10vL8291M41',
    githubPrUrl: 'https://github.com/solpulse-protocol/escrow-contract/pull/17',
    commitHash: 'c4e9120a',
    summary: 'Implemented Anchor PDA escrow vault with release_funds instruction. Zero-copy account layout reduces compute units to 14,200 CU per payout release.',
    solReward: 0.60,
    submittedAt: '2026-11-06 10:30',
    status: 'pending_review',
    splTokenMint: 'sk1LLEscrowProgramAnchorVaultMint55Qx',
  },
  {
    id: 'sub-3',
    bountyId: 'bounty-4',
    bountyTitle: 'Integrate Chainstack Global RPC Nodes for Ultra-Low Latency Broadcasting',
    teamName: 'LatencyKillers',
    builderAddress: '88Qx3P90VvM21Z9w8xK44Lp9xKy18MvQz81Tp2Yq',
    githubPrUrl: 'https://github.com/chainstacklabs/solana-failover-router/pull/9',
    commitHash: '77d291fa',
    summary: 'Benchmarked 500 consecutive transaction broadcasts on devnet. Chainstack Global Nodes achieved 320ms avg latency with zero dropped confirmations during network peak.',
    solReward: 0.40,
    submittedAt: '2026-11-06 11:45',
    status: 'pending_review',
    splTokenMint: 'sk1LLChainstackGlobalNodeMint88Zp41Lp',
  },
  {
    id: 'sub-4',
    bountyId: 'bounty-1',
    bountyTitle: 'Audit Token-2022 Transfer Hook for Fee Deflation Invariants',
    teamName: 'ZeroDrain Security',
    builderAddress: 'H5xjpFiAthMDCxBu7caAbG6z6EtVyENRoPCoGv6oRpiY',
    githubPrUrl: 'https://github.com/solpulse-builder/token-2022-audit/pull/91',
    commitHash: '99e41ba8',
    summary: 'Discovered and remediated a critical fee rounding vulnerability in transfer_hook. Added formal mathematical invariant proofs and 12 Anchor exploit unit tests.',
    solReward: 0.45,
    submittedAt: '2026-11-05 16:20',
    status: 'approved',
    payoutTxHash: '5wKqZ2K99v1xLmQ8pT9sYqZ81MvQz81Tp2YqR8sW76P10vL8291M41Xy99Q5555abcdef123456789012345678',
    splTokenMint: 'sk1LL2022SecAuditHookMint77Xz89PqLm44K',
    autoConfirmed: true,
  },
];

export const INITIAL_SPL_TOKENS: SplProofToken[] = [
  {
    mintAddress: 'sk1LL2022SecAuditHookMint77Xz89PqLm44K',
    symbol: 'SKILL-AUDIT',
    name: 'Token-2022 Security Auditor',
    bountyTitle: 'Audit Token-2022 Transfer Hook for Fee Deflation Invariants',
    recipientAddress: 'H5xjpFiAthMDCxBu7caAbG6z6EtVyENRoPCoGv6oRpiY',
    mintedAt: '2026-11-05',
    txHash: '5wKqZ2K99v1xLmQ8pT9sYqZ81MvQz81Tp2YqR8sW76P10vL8291M41Xy99Q5555abcdef123456789012345678',
    tier: 'Master',
    imageBadge: '/src/assets/images/builder_badge_emblem_1793978567156.jpg',
  },
  {
    mintAddress: 'sk1LLEscrowProgramAnchorVaultMint55Qx',
    symbol: 'SKILL-ANCHOR',
    name: 'Anchor Escrow Architect',
    bountyTitle: 'Anchor Escrow Smart Contract for Automated Hackathon Payouts',
    recipientAddress: 'H5xjpFiAthMDCxBu7caAbG6z6EtVyENRoPCoGv6oRpiY',
    mintedAt: '2026-11-02',
    txHash: '4zR8sW76P10vL8291M41Xy99Q55555wKqZ2K99v1xLmQ8pT9sYqZ81MvQz81Tp2YqR8sW76P10vL8291M41Xy9',
    tier: 'Expert',
    imageBadge: '/src/assets/images/builder_badge_emblem_1793978567156.jpg',
  },
];

export interface BuilderRank {
  level: number;
  title: string;
  minXp: number;
  nextLevelXp: number;
  badgeColor: string;
}

export const RANKS: BuilderRank[] = [
  { level: 1, title: 'Apprentice Builder', minXp: 0, nextLevelXp: 100, badgeColor: 'text-slate-400' },
  { level: 2, title: 'Verified Contributor', minXp: 100, nextLevelXp: 250, badgeColor: 'text-cyan-400' },
  { level: 3, title: 'Protocol Architect', minXp: 250, nextLevelXp: 500, badgeColor: 'text-purple-400' },
  { level: 4, title: 'Solana Elite Engineer', minXp: 500, nextLevelXp: 1000, badgeColor: 'text-emerald-400' },
  { level: 5, title: 'Genesis Vanguard', minXp: 1000, nextLevelXp: 2500, badgeColor: 'text-amber-400' },
];

export function calculateBuilderLevel(totalEarnedSol: number, completedCount: number): {
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  const xp = Math.round(completedCount * 100 + (totalEarnedSol * 1000));
  
  let currentRank = RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      currentRank = RANKS[i];
      break;
    }
  }

  const prevXp = currentRank.minXp;
  const targetXp = currentRank.nextLevelXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round(((xp - prevXp) / (targetXp - prevXp)) * 100)));

  return {
    level: currentRank.level,
    levelTitle: currentRank.title,
    xp,
    nextLevelXp: targetXp,
    progressPercent,
  };
}

export function filterBounties(
  bounties: Bounty[],
  filter: {
    category?: string;
    difficulty?: string;
    searchQuery?: string;
    status?: string;
  }
): Bounty[] {
  return bounties.filter((b) => {
    if (filter.category && filter.category !== 'All' && b.category !== filter.category) {
      return false;
    }
    if (filter.difficulty && filter.difficulty !== 'All' && b.difficulty !== filter.difficulty) {
      return false;
    }
    if (filter.status && filter.status !== 'All' && b.status !== filter.status) {
      return false;
    }
    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase();
      const inTitle = b.title.toLowerCase().includes(q);
      const inDesc = b.description.toLowerCase().includes(q);
      const inTags = b.tags.some(t => t.toLowerCase().includes(q));
      if (!inTitle && !inDesc && !inTags) {
        return false;
      }
    }
    return true;
  });
}

export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function calculateProtocolStats(bounties: Bounty[]) {
  const totalBounties = bounties.length;
  const completedBounties = bounties.filter(b => b.status === 'Completed');
  const openBounties = bounties.filter(b => b.status === 'Open');
  
  const totalSolVolume = bounties.reduce((sum, b) => sum + b.rewardSol, 0);
  const totalSolPaidOut = completedBounties.reduce((sum, b) => sum + b.rewardSol, 0);
  
  return {
    totalBounties,
    completedBountiesCount: completedBounties.length,
    openBountiesCount: openBounties.length,
    totalSolVolume: Number(totalSolVolume.toFixed(2)),
    totalSolPaidOut: Number(totalSolPaidOut.toFixed(2)),
  };
}

export function generateSplTokenMint(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let mint = 'sk1LL';
  for (let i = 0; i < 39; i++) {
    mint += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return mint;
}
