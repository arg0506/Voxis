/**
 * Midnight ZK Voting Contract TypeScript Interface
 */

export enum VoteChoice {
  YES = 0,
  NO = 1,
  ABSTAIN = 2
}

export interface LedgerState {
  proposalId: string;
  proposalTitle: string;
  yesVotes: bigint;
  noVotes: bigint;
  abstainVotes: bigint;
  totalVotesCast: bigint;
  nullifiers: Set<string>;
  isOpen: boolean;
}

export interface PrivateWitness {
  voterSecret: string;
  voterChoice: VoteChoice;
}

export interface CastVoteProofInput {
  choice: VoteChoice;
  secret: string;
  proposalId: string;
}

export interface ProofResult {
  proofHex: string;
  nullifierHash: string;
  disclosedChoice: VoteChoice;
  timestamp: number;
}

export const CONTRACT_ADDRESS_PLACEHOLDER = "<YOUR_DEPLOYED_CONTRACT_ADDRESS>";

export const COMPACT_CONTRACT_METADATA = {
  contractName: "voting",
  version: "0.1.0",
  network: "preprod",
  compilerVersion: "0.20.0",
  proofServerUrl: "http://localhost:6300",
  privacyGuarantees: [
    "Voter identity is hidden behind client-side ZK witness",
    "Nullifier hash prevents double voting without revealing voter key",
    "Disclosed vote choices update public tally atomically"
  ]
};
