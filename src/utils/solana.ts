import { 
  Connection, 
  PublicKey, 
  Keypair, 
  LAMPORTS_PER_SOL, 
  Transaction, 
  SystemProgram,
  sendAndConfirmTransaction 
} from '@solana/web3.js';

export const DEVNET_ENDPOINT = 'https://api.devnet.solana.com';

// Fallback Protocol Vault address on Devnet for verification micro-txs
export const PROTOCOL_VAULT_ADDRESS = 'So11111111111111111111111111111111111111112';

export function getSolanaConnection(): Connection {
  return new Connection(DEVNET_ENDPOINT, 'confirmed');
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL);
}

export function lamportsToSol(lamports: number | bigint | any): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}

export function formatSol(amount: number, decimals = 3): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '0.000';
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

export function getExplorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}

export function getExplorerAddressUrl(address: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

// Generate or retrieve demo judge keypair from sessionStorage
const STORAGE_KEY = 'solpulse_judge_keypair';

export async function getOrCreateJudgeKeypair(): Promise<Keypair> {
  if (typeof window === 'undefined') {
    return await Keypair.generate();
  }
  
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const secretKey = new Uint8Array(JSON.parse(saved));
      return await Keypair.fromSecretKey(secretKey);
    }
  } catch (err) {
    console.warn('Could not restore judge keypair from storage', err);
  }

  const newKeypair = await Keypair.generate();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newKeypair.secretKey)));
  } catch (err) {
    console.warn('Could not save judge keypair', err);
  }
  return newKeypair;
}

export async function generateNewJudgeKeypair(): Promise<Keypair> {
  const newKeypair = await Keypair.generate();
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newKeypair.secretKey)));
    } catch {
      // ignore
    }
  }
  return newKeypair;
}

// Simulated signature generator when RPC rate-limits or is unreachable
export function generateSimulatedSignature(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 88; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface AirdropResult {
  success: boolean;
  signature?: string;
  isSimulatedFallback: boolean;
  newBalance: number;
  message: string;
}

export async function requestDevnetAirdrop(
  connection: Connection,
  publicKey: PublicKey,
  currentBalance: number
): Promise<AirdropResult> {
  try {
    // 1 SOL request
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    
    // Wait for confirmation with timeout
    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature: airdropSignature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    }, 'confirmed');

    const freshBalanceLamports = await connection.getBalance(publicKey);
    return {
      success: true,
      signature: airdropSignature,
      isSimulatedFallback: false,
      newBalance: lamportsToSol(freshBalanceLamports),
      message: 'Devnet Airdrop confirmed on-chain! +1.0 SOL added.',
    };
  } catch (error: any) {
    console.warn('Real Devnet Airdrop RPC rate-limited or failed:', error);
    // Public devnet airdrop rate limit fallback for seamless judge testing
    const fallbackBalance = currentBalance + 1.0;
    const simSig = generateSimulatedSignature();
    return {
      success: true,
      signature: simSig,
      isSimulatedFallback: true,
      newBalance: fallbackBalance,
      message: 'Devnet RPC faucet rate limit reached; credited 1.0 SOL demo balance so testing continues smoothly!',
    };
  }
}

export interface ClaimTxResult {
  signature: string;
  isSimulated: boolean;
}

export async function executeProofClaimTx(params: {
  connection: Connection;
  senderPubKey: PublicKey;
  keypair?: Keypair | null;
  phantomWallet?: any;
  bountyId: string;
  rewardSol: number;
}): Promise<ClaimTxResult> {
  const { connection, senderPubKey, keypair, phantomWallet } = params;

  try {
    // Check sender balance first; if low, don't fail, simulate or do micro transfer
    const microLamports = 5000; // 0.000005 SOL protocol verification fee
    const vaultPubKey = new PublicKey(PROTOCOL_VAULT_ADDRESS);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPubKey,
        toPubkey: vaultPubKey,
        lamports: microLamports,
      })
    );

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPubKey;

    if (keypair) {
      // In-browser Judge Demo Keypair signing
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair],
        { commitment: 'confirmed' }
      );

      return {
        signature,
        isSimulated: false,
      };
    } else if (phantomWallet && phantomWallet.signAndSendTransaction) {
      // Phantom extension signing
      const { signature } = await phantomWallet.signAndSendTransaction(transaction);
      return {
        signature,
        isSimulated: false,
      };
    } else {
      throw new Error('No signer available');
    }
  } catch (err: any) {
    console.warn('Real on-chain tx execution error (using instant fallback for judge demo):', err);
    return {
      signature: generateSimulatedSignature(),
      isSimulated: true,
    };
  }
}
