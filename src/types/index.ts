export type BountyCategory = 
  | 'Security & Audit'
  | 'Smart Contracts'
  | 'Blinks & Actions'
  | 'RPC & Infra'
  | 'AI & Agents'
  | 'Frontend & Tooling'
  | 'SPL Tokens & DeFi';

export type BountyDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type BountyStatus = 'Open' | 'In Review' | 'Completed';

export type UserRole = 'builder' | 'judge';

export interface Bounty {
  id: string;
  title: string;
  category: BountyCategory;
  rewardSol: number;
  difficulty: BountyDifficulty;
  status: BountyStatus;
  description: string;
  requirements: string[];
  deliverables: string;
  creatorAddress: string;
  createdAt: string;
  deadlineDays: number;
  tags: string[];
  submissionsCount: number;
  claimedBy?: string;
  claimTxHash?: string;
  claimedAt?: string;
  splTokenMint?: string;
}

export interface ProjectSubmission {
  id: string;
  bountyId: string;
  bountyTitle: string;
  teamName: string;
  builderAddress: string;
  githubPrUrl: string;
  commitHash: string;
  summary: string;
  solReward: number;
  submittedAt: string;
  status: 'pending_review' | 'approved' | 'rejected';
  payoutTxHash?: string;
  splTokenMint?: string;
  autoConfirmed?: boolean;
}

export interface ProofSubmission {
  bountyId: string;
  bountyTitle: string;
  githubUrl: string;
  notes: string;
  builderAddress: string;
  submittedAt: string;
  txSignature: string;
  rewardSol: number;
  verified: boolean;
  splTokenMint?: string;
}

export interface SplProofToken {
  mintAddress: string;
  symbol: string;
  name: string;
  bountyTitle: string;
  recipientAddress: string;
  mintedAt: string;
  txHash: string;
  tier: 'Master' | 'Expert' | 'Pioneer' | 'Verified';
  imageBadge: string;
}

export interface BuilderProfile {
  address: string;
  name: string;
  avatarUrl: string;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  totalEarnedSol: number;
  completedBountiesCount: number;
  joinedAt: string;
  skills: string[];
  proofHistory: ProofSubmission[];
  splTokens: SplProofToken[];
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balanceSol: number;
  isDemoWallet: boolean;
  publicKeyObj: any | null;
  keypairObj?: any | null; // For judge demo wallet signing
  isConnecting: boolean;
  airdropping: boolean;
  autoConfirmEnabled?: boolean; // PPT Slide 5: 1-Click Judge Auto-Confirm hook
}

export interface AnalyticsVolumePoint {
  day: string;
  solVolume: number;
  bountiesCompleted: number;
  activeBuilders: number;
}
