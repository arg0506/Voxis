export enum VoteChoice {
  YES = 'YES',
  NO = 'NO',
  ABSTAIN = 'ABSTAIN'
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  creator: string;
  category: string;
  createdAt: string;
  endsAt: string;
  status: 'ACTIVE' | 'CONCLUDED';
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalVotesCast: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  dustBalance: number;
  proofServerOnline: boolean;
  walletType?: 'lace' | 'metamask' | 'zk';
  walletName?: string;
  isExtensionInstalled?: boolean;
  chainId?: string;
}

export interface ZKProofStep {
  step: number;
  title: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  details?: string;
}

export interface VoteReceipt {
  txHash: string;
  nullifierHash: string;
  proposalId: string;
  disclosedChoice: VoteChoice;
  timestamp: string;
  blockNumber: number;
  proofHex: string;
  signature?: string;
  signerAddress?: string;
  walletType?: string;
}

export interface PrivacyFeature {
  title: string;
  description: string;
  isPublic: boolean;
  badge: string;
}
